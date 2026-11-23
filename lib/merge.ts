/**
 * Merges Sanity content over fallback content. A CMS value wins when it is
 * "filled": not null, not an empty string, not an empty array and, for
 * images, has a src. Plain objects merge key by key, so one filled field
 * never wipes out its siblings. Arrays are replaced whole.
 */
type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

function filled(v: unknown): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  if (isObj(v) && "src" in v) return !!v.src;
  return true;
}

/** Site name: the alt text of last resort for a CMS photo with no alt and no titled parent. */
const SITE_ALT = "Pineda's Roofing";

/** The nearest words that name what a photo shows: its parent's title, name or heading. */
function label(v: Obj, ctx: string): string {
  for (const k of ["title", "name", "heading"]) {
    const x = v[k];
    if (typeof x === "string" && x.trim()) return x.trim();
  }
  return ctx;
}

/**
 * Drops empty images and empty values inside CMS arrays (e.g. a feature section without a photo).
 * A CMS photo saved without alt text gets its parent's title, name or heading as alt (TTR-2880:
 * every image carries alt text, even when the editor left the field blank). Nothing visible changes.
 */
export function clean<T>(v: T, ctx: string = SITE_ALT): T {
  if (Array.isArray(v)) return v.filter((x) => x !== null && x !== undefined).map((x) => clean(x, ctx)) as T;
  if (isObj(v)) {
    const here = label(v, ctx);
    const out: Obj = {};
    for (const [k, x] of Object.entries(v)) {
      if (!filled(x)) continue;
      out[k] = clean(x, here);
    }
    if (typeof out.src === "string" && !filled(out.alt)) out.alt = here;
    return out as T;
  }
  return v;
}

export function merge<T>(fallback: T, cms: unknown, ctx: string = SITE_ALT): T {
  if (!filled(cms)) return fallback;
  if (Array.isArray(fallback) || Array.isArray(cms)) return clean(cms, ctx) as T;
  if (isObj(fallback) && isObj(cms)) {
    const here = label(cms, label(fallback, ctx));
    const out: Obj = { ...fallback };
    for (const [k, v] of Object.entries(cms)) {
      out[k] = k in fallback ? merge((fallback as Obj)[k], v, here) : filled(v) ? clean(v, here) : undefined;
    }
    if (typeof out.src === "string" && !filled(out.alt)) out.alt = here;
    return out as T;
  }
  return (isObj(cms) ? clean(cms, ctx) : cms) as T;
}
