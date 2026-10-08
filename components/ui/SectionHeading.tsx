import type { Heading } from "@/lib/types";

/** Eyebrow, display heading and an optional short intro. */
export function SectionHeading({
  eyebrow,
  heading,
  text,
  align = "center",
  dark = false,
  as: Tag = "h2",
  className = "",
}: Heading & { align?: "center" | "left"; dark?: boolean; as?: "h1" | "h2"; className?: string }) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`} data-reveal>
      {eyebrow ? <p className={`eyebrow ${dark ? "on-dark" : ""} ${center ? "justify-center" : ""}`}>{eyebrow}</p> : null}
      <Tag className={`mt-4 text-h2 uppercase ${dark ? "text-white" : "text-ink"}`}>{heading}</Tag>
      {text ? <p className={`mt-5 text-lead ${dark ? "text-on-dark" : "text-body"}`}>{text}</p> : null}
    </div>
  );
}
