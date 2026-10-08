"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, CircleAlert, LoaderCircle, Phone } from "lucide-react";
import { ATTRIBUTION_STORAGE_KEY, attributionKeys, propertyOptions, serviceOptions } from "@/lib/lead-options";

type Field = "name" | "phone" | "email" | "zip" | "address" | "property" | "service" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field | "consent", string>>;

/* Light client checks that mirror the server schema in lib/lead.ts. */
const validators: Record<Field, (v: string) => string | undefined> = {
  name: (v) => (v.trim().length < 2 ? "Please enter your name." : undefined),
  phone: (v) => (v.replace(/\D/g, "").length < 10 ? "Please enter a phone number with area code." : undefined),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? undefined : "Please enter a valid email address."),
  zip: (v) => (/^\d{5}(-\d{4})?$/.test(v.trim()) ? undefined : "Please enter a 5-digit ZIP code."),
  address: () => undefined,
  property: () => undefined,
  service: (v) => (v ? undefined : "Please choose a service."),
  message: (v) => (v.length > 3000 ? "Please keep your message under 3,000 characters." : undefined),
};

const empty: Values = { name: "", phone: "", email: "", zip: "", address: "", property: "", service: "", message: "" };

const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230b0d10' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

export function LeadForm({
  phone,
  phoneHref,
  businessName,
  defaultService,
  compact = false,
  dark = false,
}: {
  phone: string;
  phoneHref: string;
  businessName: string;
  defaultService?: (typeof serviceOptions)[number];
  compact?: boolean;
  dark?: boolean;
}) {
  const router = useRouter();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(0);
  const [values, setValues] = useState<Values>({ ...empty, service: defaultService ?? "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const fields: Field[] = compact ? ["name", "phone", "email", "zip", "service"] : ["name", "phone", "email", "zip", "address", "property", "service", "message"];

  const setField = (f: Field, v: string) => {
    setValues((s) => ({ ...s, [f]: v }));
    if (touched[f]) setErrors((e) => ({ ...e, [f]: validators[f](v) }));
  };
  const blur = (f: Field) => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((e) => ({ ...e, [f]: validators[f](values[f]) }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const next: Errors = {};
    for (const f of fields) {
      const msg = validators[f](values[f]);
      if (msg) next[f] = msg;
    }
    if (!consent) next.consent = "Please agree so we can contact you.";
    setErrors(next);
    setTouched(Object.fromEntries(fields.map((f) => [f, true])));
    const bad = Object.keys(next).filter((k) => next[k as Field | "consent"]);
    if (bad.length) {
      setSummary(`Please fix ${bad.length === 1 ? "1 field" : `${bad.length} fields`} below.`);
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${bad[0]}`)}`)?.focus();
      return;
    }
    setSummary("");
    setStatus("sending");

    let attribution: Record<string, string> = {};
    try {
      attribution = JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? "{}");
    } catch {
      /* ignore */
    }
    const honeypot = (formRef.current?.elements.namedItem("hp_pr") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          consent: true,
          hp_pr: honeypot,
          elapsed_ms: Date.now() - startedAt.current,
          page_url: window.location.href,
          landing_page: attribution.landing_page ?? "",
          referrer: attribution.referrer ?? document.referrer,
          ...Object.fromEntries(attributionKeys.map((k) => [k, attribution[k] ?? ""])),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
      w.gtag?.("event", "generate_lead", { service: values.service });
      w.dataLayer?.push({ event: "generate_lead", service: values.service });
      window.setTimeout(() => router.push("/thank-you"), 1200);
    } catch {
      setStatus("error");
    }
  };

  const tone = dark
    ? { label: "text-white", hint: "text-on-dark-meta", input: "border-ink-line bg-ink-2 text-white placeholder:text-on-dark-meta focus:border-cyan", error: "text-[#ff9fb1]", errBorder: "border-[#ff9fb1]" }
    : { label: "text-ink", hint: "text-meta", input: "border-line bg-white text-ink placeholder:text-meta focus:border-cyan-deep", error: "text-[#b42346]", errBorder: "border-[#b42346]" };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex min-h-[380px] flex-col items-center justify-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan text-ink">
          <Check className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
        </span>
        <p className={`mt-6 font-display text-h3 uppercase ${tone.label}`}>Thanks, {values.name.split(" ")[0]}. We got it.</p>
        <p className={`mt-2 ${tone.hint}`}>One moment…</p>
      </div>
    );
  }

  const inputCls = (f: Field) =>
    `block w-full rounded-lg border-2 px-4 text-base outline-none transition-[border-color,box-shadow] duration-150 focus:shadow-[0_0_0_4px_rgb(0_180_240/0.18)] ${tone.input} ${errors[f] ? tone.errBorder : ""} ${
      f === "message" ? "min-h-32 py-3" : "min-h-13 py-2.5"
    }`;

  const label = (f: Field, text: string, optional = false) => (
    <label htmlFor={`${uid}-${f}`} className={`mb-2 block text-[0.8125rem] font-bold uppercase tracking-[0.12em] ${tone.label}`}>
      {text}
      {optional ? <span className={`ml-1 font-semibold normal-case tracking-normal ${tone.hint}`}>(optional)</span> : null}
    </label>
  );

  const err = (f: Field | "consent") =>
    errors[f] ? (
      <p id={`${uid}-${f}-err`} className={`mt-2 flex items-center gap-1.5 text-sm ${tone.error}`}>
        <CircleAlert className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
        {errors[f]}
      </p>
    ) : null;

  const aria = (f: Field) => ({
    id: `${uid}-${f}`,
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined,
    onBlur: () => blur(f),
  });

  const select = (f: "service" | "property", options: readonly string[], placeholder: string) => (
    <select
      {...aria(f)}
      value={values[f]}
      onChange={(e) => setField(f, e.target.value)}
      className={`${inputCls(f)} appearance-none bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11`}
      style={{ backgroundImage: chevron }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-summary`}>
      <p id={`${uid}-summary`} role="alert" aria-live="assertive" className={summary ? `mb-5 text-sm font-semibold ${tone.error}` : "sr-only"}>
        {summary}
      </p>

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          {label("name", "Full name")}
          <input {...aria("name")} type="text" autoComplete="name" value={values.name} onChange={(e) => setField("name", e.target.value)} className={inputCls("name")} />
          {err("name")}
        </div>
        <div>
          {label("phone", "Phone")}
          <input {...aria("phone")} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => setField("phone", e.target.value)} className={inputCls("phone")} />
          {err("phone")}
        </div>
        <div>
          {label("email", "Email")}
          <input {...aria("email")} type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => setField("email", e.target.value)} className={inputCls("email")} />
          {err("email")}
        </div>
        <div>
          {label("zip", "ZIP code")}
          <input {...aria("zip")} type="text" inputMode="numeric" autoComplete="postal-code" maxLength={10} value={values.zip} onChange={(e) => setField("zip", e.target.value)} className={inputCls("zip")} />
          {err("zip")}
        </div>
        {!compact ? (
          <>
            <div className="sm:col-span-2">
              {label("address", "Property address", true)}
              <input {...aria("address")} type="text" autoComplete="street-address" value={values.address} onChange={(e) => setField("address", e.target.value)} className={inputCls("address")} />
            </div>
            <div>
              {label("property", "Property type", true)}
              {select("property", propertyOptions, "Choose one")}
            </div>
          </>
        ) : null}
        <div>
          {label("service", "What do you need?")}
          {select("service", serviceOptions, "Choose a service")}
          {err("service")}
        </div>
        {!compact ? (
          <div className="sm:col-span-2">
            {label("message", "Tell us about your roof", true)}
            <textarea
              {...aria("message")}
              rows={4}
              value={values.message}
              onChange={(e) => setField("message", e.target.value)}
              placeholder="Leak location, roof age, storm date, insurance claim number..."
              className={inputCls("message")}
            />
            {err("message")}
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        <label htmlFor={`${uid}-consent`} className={`flex cursor-pointer items-start gap-3 text-sm leading-relaxed ${tone.hint}`}>
          <input
            id={`${uid}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setErrors((er) => ({ ...er, consent: undefined }));
            }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#00b4f0]"
          />
          <span>
            I agree to the{" "}
            <a href="/terms" className="font-semibold underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="font-semibold underline">
              Privacy Policy
            </a>{" "}
            of {businessName}, and to receive calls, texts and emails about my request at the number and address I provided. Message and data rates may apply. Reply STOP to opt out.
          </span>
        </label>
        {err("consent")}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-hp_pr`}>Leave this field empty</label>
        <input id={`${uid}-hp_pr`} name="hp_pr" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" />
      </div>

      {status === "error" ? (
        <p role="alert" className={`mt-5 text-sm ${tone.error}`}>
          Something went wrong sending your request. Please try again, or call us at{" "}
          <a href={phoneHref} className="font-semibold underline">
            {phone}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/btn inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-lg bg-cyan px-6 text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-cyan-hi disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" strokeWidth={2} aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Get my free estimate
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
            </>
          )}
        </button>
        <a href={phoneHref} data-track="click_to_call" className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold ${tone.hint} hover:underline`}>
          <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Or call {phone}
        </a>
      </div>
    </form>
  );
}
