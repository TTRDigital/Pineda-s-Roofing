const e = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const live = (items, allowHeld) => (items || []).filter((i) => allowHeld || !i.held);
export function render(d, { ttrKey, allowHeld = false }) {
  const BASE = `/${d.slug}/`; // absolute, so the page works at /start/ and at / (host rewrite)
  const IMG = BASE + "img/";
  const tel = d.phone.tel, ph = d.phone.display;
  const phoneBtn = (cls) => `<a class="btn ${cls}" href="tel:${e(tel)}" data-phone data-cta="call"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 3v12h8V5H8zm4 14.2a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z"/></svg><span data-phone-text>${e(ph)}</span></a>`;
  const ctaRow = () => `<div class="cta-row">${phoneBtn("btn-solid")}<a class="btn btn-outline" href="#quote" data-cta="estimate">${e(d.cta.estimate)}</a></div>`;
  const bullets = live(d.hero.bullets, allowHeld);
  const steps = d.steps.map((s, i) => `<div class="step ${i % 2 ? "rev" : ""}"><img class="step-ic" src="${IMG}${e(s.icon)}" alt="" width="130" height="130" loading="lazy"><div class="step-tx"><span class="pill">${e(s.label)}</span><h3>${e(s.title)}</h3><p>${e(s.text)}</p></div></div>`).join("");
  const services = live(d.services, allowHeld).map((s) => `<article class="card"><img src="${IMG}${e(s.image)}" alt="${e(s.title)}" width="450" height="450" loading="lazy"><h3>${e(s.title)}</h3><p>${e(s.text)}</p></article>`).join("");
  const why = live(d.why, allowHeld).map((w) => `<li><svg class="chk" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.4-4-4 1.4-1.4 2.6 2.6 5-5 1.4 1.4-6.4 6.4z"/></svg><span><b>${e(w.lead)}:</b> ${e(w.text)}</span></li>`).join("");
  const reviews = d.reviews.map((r) => `<figure class="review"><img src="${IMG}google.png" alt="Google" width="98" height="33"><img src="${IMG}stars.png" alt="5 stars" width="104" height="21" class="stars"><blockquote>${e(r.text)}</blockquote><figcaption>${e(r.name)}</figcaption></figure>`).join("");
  const gallery = (d.gallery || []).map((g) => `<img src="${IMG}${e(g)}" alt="Pineda's Roofing work" width="450" height="450" loading="lazy">`).join("");
  const faq = live(d.faq, allowHeld).map((f) => `<details><summary>${e(f.q)}</summary><p>${e(f.a)}</p></details>`).join("");
  const options = d.form.services.map((s) => `<option value="${e(s)}">${e(s)}</option>`).join("");
  const ld = { "@context": "https://schema.org", "@type": "RoofingContractor", name: "Pineda's Roofing", telephone: tel, areaServed: "Maryland" };

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(d.seo.title)}</title>
<meta name="description" content="${e(d.seo.description)}">
<meta name="robots" content="noindex, nofollow, noarchive">
<link rel="icon" href="${IMG}logo.webp">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:wght@500;600;700&display=swap">
<link rel="stylesheet" href="${BASE}style.css">
<!-- Google Tag Manager (same container as the old GHL page) -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5PZ4LZFZ');</script>
<!-- Microsoft Clarity (same project as the old GHL page) -->
<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","m0q1pcc9q4");</script>
<!-- Clixtell (same as the old GHL page) -->
<script>(function(){var s=document.createElement('script');s.async=true;s.src=document.location.protocol+'//scripts.clixtell.com/track.js';document.head.appendChild(s);})();</script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5PZ4LZFZ" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<noscript><img src="//tracker.clixtell.com/track/t.gif" alt="" width="1" height="1"></noscript>

<header class="hero">
  <video class="hero-bg" autoplay muted loop playsinline poster="${IMG}hero-poster.webp"><source src="${IMG}hero-small.webm" type="video/webm"></video>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <img class="logo" src="${IMG}logo.webp" alt="Pineda's Roofing" width="148" height="60">
      <h1>${e(d.hero.headline)}</h1>
      <p class="sub">${e(d.hero.subheadline)}</p>
      <ul class="ticks">${bullets.map((b) => `<li><svg class="chk" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.4-4-4 1.4-1.4 2.6 2.6 5-5 1.4 1.4-6.4 6.4z"/></svg>${e(b.text)}</li>`).join("")}</ul>
      ${phoneBtn("btn-solid hero-call")}
      <p class="hint">${e(d.hero.formHint)} <svg viewBox="0 0 60 60" aria-hidden="true"><path d="M8 6c-2 22 12 40 40 40M36 36l12 10-14 6" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></p>
    </div>
    <form id="quote" class="form" novalidate>
      <h2>${e(d.form.title)}</h2>
      <div class="two"><input name="first_name" placeholder="First Name*" autocomplete="given-name" required><input name="last_name" placeholder="Last Name*" autocomplete="family-name" required></div>
      <input name="phone" type="tel" placeholder="Phone Number*" autocomplete="tel" required>
      <input name="email" type="email" placeholder="Email*" autocomplete="email" required>
      <input name="address" placeholder="Address*" autocomplete="street-address" required>
      <input name="postal_code" placeholder="Zip Code*" inputmode="numeric" autocomplete="postal-code" required>
      <select name="service" required><option value="" disabled selected>${e(d.form.serviceLabel)}*</option>${options}</select>
      <textarea name="comments" placeholder="Comments*" rows="4" required></textarea>
      <label class="consent"><input type="checkbox" name="consent" required><span>${consentHtml(d)}</span></label>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button type="submit" class="btn btn-solid">${e(d.form.submit)}</button>
      <p class="msg" role="status" aria-live="polite"></p>
    </form>
  </div>
</header>

<section class="sec"><div class="wrap"><h2 class="st">${e(d.stepsTitle)}</h2><div class="steps">${steps}</div>${ctaRow()}</div></section>
<section class="sec grey"><div class="wrap"><h2 class="st">${e(d.servicesTitle)}</h2><div class="cards">${services}</div>${ctaRow()}</div></section>
<section class="sec blue"><div class="wrap narrow"><h2 class="st">${e(d.whyTitle)}</h2><ul class="why">${why}</ul>${ctaRow()}</div></section>
<section class="sec"><div class="wrap"><h2 class="st">${e(d.reviewsTitle)}</h2><div class="reviews">${reviews}</div></div></section>
<section class="sec"><div class="wrap"><h2 class="st">${e(d.galleryTitle)}</h2><div class="gal">${gallery}</div></div></section>
<section class="sec"><div class="wrap narrow"><h2 class="st">${e(d.faqTitle)}</h2><div class="faq">${faq}</div></div></section>
<section class="sec final"><div class="wrap"><h2 class="st">${e(d.finalTitle)}</h2>${ctaRow()}</div></section>
<footer><p>&copy; <span id="yr"></span> ${e(d.footer.legal)} | <a href="${e(d.footer.privacyUrl)}">Privacy Policy</a> | <a href="${e(d.footer.termsUrl)}">Terms</a></p></footer>

<script>document.getElementById('yr').textContent=new Date().getFullYear();</script>
<script>window.TTR_SITE_KEY=${JSON.stringify(ttrKey)};window.TTR_SUCCESS=${JSON.stringify(d.form.success)};</script>
<script src="/number.js" defer></script>
<script src="/lead.js" defer></script>
</body>
</html>
`;
}

function consentHtml(d) {
  // Keep the exact consent wording; link the two legal documents.
  let t = e(d.form.consent);
  t = t.replace("Terms and Conditions", `<a href="${e(d.footer.termsUrl)}" target="_blank" rel="noopener">Terms and Conditions</a>`);
  t = t.replace("Privacy Policy", `<a href="${e(d.footer.privacyUrl)}" target="_blank" rel="noopener">Privacy Policy</a>`);
  return t;
}
