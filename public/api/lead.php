<?php
/*
 * Estimate form handler for SiteGround (the static site has no Node server).
 * Validates the lead like lib/lead.ts, filters spam and posts it to the
 * GoHighLevel inbound webhook.
 *
 * The webhook URL is not in the repo. It is read from lead-config.php, next to
 * public_html (preferred) or in this folder (blocked from the web by
 * .htaccess), which returns: ['webhook_url' => 'https://services.leadconnectorhq.com/hooks/...'].
 * The deploy workflow writes it from the GHL_WEBHOOK_URL secret.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// Same-site posts only.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    reply(403, ['ok' => false, 'error' => 'Forbidden.']);
}

/* Best-effort per-IP rate limit: 10 leads per 10 minutes. */
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/pr-lead-' . md5($ip);
$now = time();
$recent = array_filter(
    json_decode((string) @file_get_contents($bucket), true) ?: [],
    fn($t) => is_int($t) && $now - $t < 600
);
$recent[] = $now;
@file_put_contents($bucket, json_encode(array_values($recent)), LOCK_EX);
if (count($recent) > 10) {
    reply(429, ['ok' => false, 'error' => 'Too many requests. Please call us instead.']);
}

$raw = file_get_contents('php://input', false, null, 0, 64 * 1024);
$in = json_decode((string) $raw, true);
if (!is_array($in)) {
    reply(400, ['ok' => false, 'error' => 'Invalid request.']);
}

function text(array $in, string $key, int $max): string {
    $v = $in[$key] ?? '';
    if (!is_string($v)) return '';
    return mb_substr(trim($v), 0, $max);
}

// Keep in sync with lib/lead-options.ts.
$services = [
    'Roof replacement', 'Roof repair', 'Emergency / leak repair', 'Storm damage / insurance claim',
    'Free roof inspection', 'Commercial roofing', 'Gutters', 'Siding', 'Other',
];
$properties = ['Home', 'Commercial building', 'Rental / multifamily'];

$lead = [
    'name' => text($in, 'name', 120),
    'phone' => text($in, 'phone', 40),
    'email' => text($in, 'email', 200),
    'zip' => text($in, 'zip', 10),
    'address' => text($in, 'address', 240),
    'property' => text($in, 'property', 40),
    'service' => text($in, 'service', 80),
    'message' => text($in, 'message', 3000),
];

$errors = [];
if (mb_strlen($lead['name']) < 2) $errors['name'] = 'Please enter your name.';
if (strlen(preg_replace('/\D/', '', $lead['phone'])) < 10) $errors['phone'] = 'Please enter a phone number with area code.';
if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';
if (!preg_match('/^\d{5}(-\d{4})?$/', $lead['zip'])) $errors['zip'] = 'Please enter a 5-digit ZIP code.';
if (!in_array($lead['service'], $services, true)) $errors['service'] = 'Please choose a service.';
if ($lead['property'] !== '' && !in_array($lead['property'], $properties, true)) $lead['property'] = '';
if (($in['consent'] ?? false) !== true) $errors['consent'] = 'Please agree so we can contact you.';
if ($errors) {
    reply(422, ['ok' => false, 'error' => 'Please check the form.', 'fields' => $errors]);
}

// Spam: drop only when both signals agree (hidden field filled AND sent faster
// than a person can type). One signal alone can be autofill or a fast typist,
// so that lead is delivered with a "suspected-spam" tag.
$trapFilled = text($in, 'hp_pr', 200) !== '';
$elapsed = is_int($in['elapsed_ms'] ?? null) ? $in['elapsed_ms'] : null;
$tooFast = $elapsed !== null && $elapsed < 2500; // MIN_FILL_MS in lib/lead-options.ts
if ($trapFilled && $tooFast) {
    reply(200, ['ok' => true]);
}
$spamCheck = $trapFilled ? 'suspect: hidden field filled' : ($tooFast ? "suspect: sent in {$elapsed} ms" : 'ok');

// Settings
$config = [];
foreach ([dirname(__DIR__, 2) . '/lead-config.php', __DIR__ . '/lead-config.php'] as $file) {
    if (is_file($file)) {
        $config = (array) include $file;
        break;
    }
}
$webhook = trim((string) ($config['webhook_url'] ?? ''), " \t\n\r\0\x0B\"'");
if (!preg_match('#^https://#', $webhook)) {
    error_log('[lead] No GHL webhook configured: lead accepted but NOT sent. Add lead-config.php.');
    reply(200, ['ok' => true, 'delivered' => false]);
}

/** E.164 for US numbers. */
$digits = preg_replace('/\D/', '', $lead['phone']);
if (strlen($digits) === 10) $phone = '+1' . $digits;
elseif (strlen($digits) === 11 && $digits[0] === '1') $phone = '+' . $digits;
else $phone = (str_starts_with($lead['phone'], '+') ? '+' : '') . $digits;

$parts = preg_split('/\s+/', $lead['name']);
$slug = trim(preg_replace('/[^a-z0-9]+/', '-', strtolower($lead['service'])), '-');
$tags = ['website-lead', "service-{$slug}"];
if ($spamCheck !== 'ok') $tags[] = 'suspected-spam';

$payload = [
    'source' => 'Website form',
    'submitted_at' => gmdate('c'),
    'name' => $lead['name'],
    'first_name' => $parts[0],
    'last_name' => implode(' ', array_slice($parts, 1)),
    'email' => $lead['email'],
    'phone' => $phone,
    'phone_raw' => $lead['phone'],
    'address' => $lead['address'],
    'postal_code' => $lead['zip'],
    'property_type' => $lead['property'],
    'service_needed' => $lead['service'],
    'consent' => true,
    'message' => $lead['message'],
    'tags' => $tags,
    'spam_check' => $spamCheck,
];
foreach (['page_url', 'landing_page', 'referrer', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as $key) {
    $payload[$key] = text($in, $key, 1000);
}

// One retry for rate limits, server errors and network failures.
$body = json_encode($payload);
for ($attempt = 0; $attempt < 2; $attempt++) {
    $ch = curl_init($webhook);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
    ]);
    $res = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if ($status >= 200 && $status < 300) {
        reply(200, ['ok' => true, 'delivered' => true]);
    }
    error_log("[lead] GoHighLevel webhook answered {$status}: " . substr((string) $res, 0, 300));
    if ($status !== 0 && $status !== 429 && $status < 500) break;
    usleep(600000);
}

// Nothing saved the lead: tell the visitor so they can call instead.
reply(502, ['ok' => false, 'error' => 'We could not send your request. Please call us instead.']);
