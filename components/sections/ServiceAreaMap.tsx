import { geoBounds, geoMercator, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import us from "us-atlas/counties-10m.json";
import type { Location } from "@/lib/types";
import { cityCoords, type County } from "@/lib/data/locations";

/*
 * Service area map, drawn at build time (no map library or tiles in the
 * browser): our counties shaded cyan over the surrounding counties, state
 * lines, and a dot for every city we list. Cities with their own page link to
 * it; Silver Spring, the home base, gets a larger pin.
 */

const W = 800;
const H = 760;
const HOME = "Silver Spring";

/* Label placement: [dx, dy, text-anchor] from the dot, tuned so labels don't collide. */
const LABEL_OFFSET: Record<string, [number, number, "start" | "end" | "middle"]> = {
  "Silver Spring": [12, -8, "start"],
  Wheaton: [-9, -5, "end"],
  Olney: [9, 4, "start"],
  Potomac: [-9, -3, "end"],
  Rockville: [-9, 4, "end"],
  Gaithersburg: [-9, 4, "end"],
  Germantown: [-9, -4, "end"],
  Bethesda: [-9, 13, "end"],
  Bowie: [9, 4, "start"],
  Laurel: [9, 4, "start"],
  Columbia: [-9, -6, "end"],
  "Ellicott City": [-9, -2, "end"],
  Frederick: [9, -6, "start"],
  Annapolis: [9, 4, "start"],
  Towson: [9, -4, "start"],
  Baltimore: [9, 6, "start"],
  Westminster: [9, 4, "start"],
  Arlington: [-9, 2, "end"],
  Alexandria: [9, 10, "start"],
  Fairfax: [-9, 4, "end"],
};

/* Where each region's name sits, as [longitude, latitude]. */
const COUNTY_LABEL: Record<string, [number, number]> = {
  "Montgomery County": [-77.2, 39.24],
  "Prince George's County": [-76.76, 38.74],
  "Howard County": [-76.94, 39.3],
  "Frederick County": [-77.4, 39.53],
  "Anne Arundel County": [-76.6, 38.92],
  "Baltimore County": [-76.62, 39.5],
  "Baltimore City": [-76.44, 39.25],
  "Carroll County": [-77.03, 39.66],
  "Northern Virginia": [-77.3, 38.77],
  "Washington, D.C.": [-76.99, 38.85],
};

type Counties = Topology<{ counties: GeometryCollection; states: GeometryCollection }>;

export function ServiceAreaMap({ counties, locations }: { counties: County[]; locations: Location[] }) {
  const topo = us as unknown as Counties;
  const all = feature(topo, topo.objects.counties) as FeatureCollection<Geometry, { name: string }>;
  const ours = new Set(counties.flatMap((c) => c.fips));
  const served = all.features.filter((f) => ours.has(String(f.id)));

  const projection = geoMercator().fitExtent(
    [
      [36, 36],
      [W - 36, H - 36],
    ],
    { type: "FeatureCollection", features: served },
  );
  const path = geoPath(projection);

  // Neighbouring counties that fall inside the frame (keeps the page light).
  const [[west, south], [east, north]] = geoBounds({ type: "FeatureCollection", features: served });
  const pad = 0.6;
  const nearby = all.features.filter((f) => {
    if (ours.has(String(f.id))) return false;
    const [[w, s], [e, n]] = geoBounds(f as Feature);
    return e > west - pad && w < east + pad && n > south - pad && s < north + pad;
  });
  const stateLines = path(mesh(topo, topo.objects.states, (a, b) => a !== b)) ?? "";

  const pageFor = (city: string) => locations.find((l) => l.featured && l.name.toLowerCase() === city.toLowerCase());
  const cities = counties.flatMap((c) => c.cities.map((name) => ({ name, county: c.name, at: cityCoords[name] }))).filter((c) => c.at);
  const xy = (lonLat: [number, number]) => projection(lonLat) ?? [0, 0];

  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-[#e8f6fd]">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="sa-map-title" className="block h-auto w-full">
        <title id="sa-map-title">
          {`Map of the Pineda's Roofing service area: ${counties.map((c) => c.name).join(", ")}`}
        </title>
        <g>
          {nearby.map((f) => (
            <path key={String(f.id)} d={path(f) ?? ""} fill="#f4f5f6" stroke="#d9dde1" strokeWidth={0.8} />
          ))}
        </g>
        <g>
          {counties.map((c) => (
            <g key={c.name} className="transition-opacity hover:opacity-80">
              <title>{`${c.name}: ${c.cities.join(", ")}`}</title>
              {served
                .filter((f) => c.fips.includes(String(f.id)))
                .map((f) => (
                  <path key={String(f.id)} d={path(f) ?? ""} fill="#00b4f0" fillOpacity={c.name === "Washington, D.C." ? 0.75 : 0.42} stroke="#fff" strokeWidth={1.5} />
                ))}
            </g>
          ))}
        </g>
        <path d={stateLines} fill="none" stroke="#0b0d10" strokeOpacity={0.35} strokeWidth={1.2} strokeDasharray="5 4" />

        {counties.map((c) => {
          const at = COUNTY_LABEL[c.name];
          if (!at) return null;
          const [x, y] = xy(at);
          return (
            <text key={c.name} x={x} y={y} textAnchor="middle" className="fill-ink/70 font-display uppercase" fontSize={15} letterSpacing={1.2} style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 4, strokeLinejoin: "round" }}>
              {c.name.replace(" County", " Co.")}
            </text>
          );
        })}

        {cities.map((c) => {
          const [x, y] = xy(c.at);
          const page = pageFor(c.name);
          const home = c.name === HOME;
          const label = LABEL_OFFSET[c.name];
          const dot = (
            <g>
              <title>{`${c.name}, ${c.county}`}</title>
              {home ? (
                <>
                  <circle cx={x} cy={y} r={11} fill="#00b4f0" fillOpacity={0.25} />
                  <circle cx={x} cy={y} r={6.5} fill="#0b0d10" stroke="#00b4f0" strokeWidth={3} />
                </>
              ) : (
                <circle cx={x} cy={y} r={page ? 4.5 : 3.2} fill={page ? "#0b0d10" : "#fff"} stroke="#0b0d10" strokeWidth={page ? 1.5 : 1.3} />
              )}
              {label ? (
                <text
                  x={x + label[0]}
                  y={y + label[1]}
                  textAnchor={label[2]}
                  fontSize={home ? 15 : 13}
                  fontWeight={home ? 800 : 700}
                  className="fill-ink"
                  style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 3.5, strokeLinejoin: "round" }}
                >
                  {c.name}
                </text>
              ) : null}
            </g>
          );
          return page ? (
            <a key={c.name} href={`/service-area/${page.slug}/`} aria-label={`Roofing in ${c.name}`}>
              {dot}
            </a>
          ) : (
            <g key={c.name}>{dot}</g>
          );
        })}
      </svg>
      <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line bg-white px-5 py-3 text-sm text-body">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-3.5 w-3.5 rounded-sm bg-cyan/45 ring-1 ring-cyan" />
          Counties we serve
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full border-[3px] border-cyan bg-ink" />
          Home base: Silver Spring
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-ink" />
          City page
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-[1.5px] border-ink bg-white" />
          Also served
        </span>
      </figcaption>
    </figure>
  );
}
