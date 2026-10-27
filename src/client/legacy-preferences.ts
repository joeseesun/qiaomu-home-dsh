import {
  SEARCH_GROUPS,
  parseSearchTemplates,
  groupSites,
  defaultSiteIds,
  curatedPhotos,
  dailyIndex,
  dayKey,
} from "./data.js";
import { DISCOVERY_MODULES } from "../original/discovery";
export const SEARCH_MODULES: Record<string, keyof typeof DISCOVERY_MODULES> = {
  web: "multi-search",
  books: "book-finder",
  video: "watch-finder",
  music: "music-finder",
  ai: "ai-learning",
  papers: "paper-finder",
  words: "word-finder",
  translate: "translate",
  dev: "dev-inbox",
};
/** Preserve legacy search destinations as data in the original renderer, without introducing another UI. */
export function includeLegacySearchSites() {
  for (const group of SEARCH_GROUPS) {
    const catalog = DISCOVERY_MODULES[SEARCH_MODULES[group.id]];
    if (!catalog) continue;
    const known = new Set(catalog.sites.map((site) => site.id));
    for (const site of group.sites)
      if (!known.has(site.id)) catalog.sites.push({ ...site, icon: "globe" });
  }
}
export function legacySearchOptions(state: any) {
  const parsed = parseSearchTemplates(state.searchTemplates || "");
  const custom = parsed.ok ? parsed.sites : [];
  const options: Record<string, any> = {};
  for (const group of SEARCH_GROUPS) {
    const sites = groupSites(group.id, custom),
      ids = new Set(sites.map((site: any) => site.id));
    const saved = state.searchEnginesByGroup?.[group.id];
    const selected = Array.isArray(saved)
      ? saved.filter((id: any) => ids.has(id))
      : [];
    const legacy =
      group.id === "web"
        ? (state.searchEngines || []).filter((id: any) => ids.has(id))
        : [];
    options[SEARCH_MODULES[group.id]] = {
      sites: selected.length
        ? selected
        : legacy.length
          ? legacy
          : defaultSiteIds(group.id, custom),
      ...(group.id === "web"
        ? {
            customSites: custom.map((site: any) => ({
              name: site.zh,
              url: site.id.slice("custom:".length),
            })),
          }
        : {}),
    };
  }
  return options;
}
export function legacyWallpaper(state: any, date = dayKey()) {
  if (state.wallpaperMode !== "daily") return null;
  const photos = curatedPhotos();
  const offset = Number.isFinite(state.wallpaperShift)
    ? Math.trunc(state.wallpaperShift)
    : 0;
  return {
    current: photos[dailyIndex(date, photos.length, offset)],
    chosenOn: date,
  };
}
