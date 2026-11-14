import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/*
 * Sanity webhook target: https://<site>/api/revalidate
 * Projection to send: {_type, "slug": slug.current}
 * Secret: SANITY_REVALIDATE_SECRET (same value in the webhook and in Vercel).
 * Refreshes the content tags so a publish shows on the pages in seconds.
 */
const TAGS = ["siteSettings", "partners", "homePage", "roofingPage", "atlasPage", "insurancePage", "aboutPage", "service", "location", "project", "testimonial", "faq", "brands"];

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "Not configured." }, { status: 500 });
  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
  if (!isValidSignature) return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 401 });
  // Small site: any publish refreshes every content tag (they match lib/content.ts).
  for (const tag of TAGS) revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ ok: true, type: body?._type ?? null });
}
