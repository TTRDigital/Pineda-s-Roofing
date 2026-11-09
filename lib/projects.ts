import type { Location, Project } from "@/lib/types";

/*
 * Matches gallery projects to service-area pages. A project belongs to a
 * city page when its `area` is that page's slug or its `location` (city)
 * matches the page name; a county page collects its own projects plus
 * every project from the city pages in that county.
 */
function pageOf(p: Project, locations: Location[]) {
  if (p.area) return locations.find((l) => l.slug === p.area);
  const city = p.location?.trim().toLowerCase();
  return city ? locations.find((l) => l.name.toLowerCase() === city) : undefined;
}

export function projectsFor(loc: Location, projects: Project[], locations: Location[]) {
  return projects.filter((p) => {
    const page = pageOf(p, locations);
    if (page?.slug === loc.slug) return true;
    if (loc.kind === "county") return page?.county === loc.name || p.county === loc.name;
    return false;
  });
}

/** Project count per city name, for the map. */
export function projectCountsByCity(projects: Project[], locations: Location[]) {
  const counts: Record<string, number> = {};
  for (const p of projects) {
    const name = pageOf(p, locations)?.name ?? p.location;
    if (name) counts[name] = (counts[name] ?? 0) + 1;
  }
  return counts;
}
