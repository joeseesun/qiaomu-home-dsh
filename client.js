window.__ModuleLoader__.load({
  id: "qiaomu-home-dsh",
  factory: (require) => {
    const module = { exports: {} };
    const exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    (function (module, exports, require) {
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// build/client-entry.js
var client_entry_exports = {};
__export(client_entry_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_entry_exports);

// src/client/index.jsx
var import_react7 = __toESM(require("react"), 1);

// src/client/page.jsx
var import_react6 = __toESM(require("react"), 1);

// src/client/data.js
var CURATED = [
  ["Q1p7bh3SHj8", "photo-1451187580459-43490279c0fa", "NASA", "nasa", "#0c2626"],
  ["phIFdC6lA4E", "photo-1519681393784-d120267933ba", "Benjamin Voros", "vorosbenisop", "#0c2659"],
  ["sO-JmQj95ec", "photo-1492724724894-7464c27d0ceb", "Kevin Lanceplaine", "lanceplaine", "#262640"],
  ["c9MFM8rSMsQ", "photo-1541599468348-e96984315921", "Michelle Spollen", "micki", "#264059"],
  ["oUTmhg97gzY", "photo-1615390265246-72d3198a48b7", "\xC1sa Steinarsd\xF3ttir", "asast", "#0c4040"],
  ["NRQV-hBF10M", "photo-1506744038136-46273834b3fb", "Bailey Zindel", "baileyzindel", "#405949"],
  ["1Z2niiBPg5A", "photo-1470071459604-3b5ec3a7fe05", "v2osk", "v2osk", "#404040"],
  ["JgOeRuGD_Y4", "photo-1477346611705-65d1883cee1e", "JOHN TOWNER", "heytowner", "#260c26"],
  ["DlkF4-dbCOU", "photo-1493246507139-91e8fad9978e", "garrett parker", "garrettpsystems", "#262626"],
  ["6KQETG8J-zI", "photo-1581610186406-5f6e9f9edbc1", "Daniel Olah", "danesduet", "#0c2640"],
  ["hvrpOmuMrAI", "photo-1500673922987-e212871fec22", "Johannes Plenio", "jplenio", "#262626"],
  ["RwHv7LgeC7s", "photo-1523712999610-f77fbcfc3843", "Johannes Plenio", "jplenio", "#59260c"],
  ["_RBcxo9AU-U", "photo-1472214103451-9374bd1c798e", "Robert Lukeman", "robertlukeman", "#40590c"],
  ["17_tB-oI0ao", "photo-1551309292-e185c0b6e22a", "Alessio Soggetti", "asoggetti", "#0c2626"],
  ["2Hzmz15wGik", "photo-1511884642898-4c92249e20b6", "pine watt", "pinewatt", "#262626"],
  ["7BjhtdogU3A", "photo-1475070929565-c985b496cb9f", "Karsten W\xFCrth", "karsten_wuerth", "#262626"],
  ["GA09PKfRIQY", "photo-1559310589-2673bfe16970", "Adam Vradenburg", "vradenburg", "#0c2626"],
  ["z_f2JrBRbOg", "photo-1603979649806-5299879db16b", "Ansgar Scheffold", "ansgarscheffold", "#26260c"],
  ["sGptUDSrMVU", "photo-1623423415485-1d36867376b6", "Annegret Kammer", "anneeaway", "#0c2626"],
  ["KMn4VEeEPR8", "photo-1507525428034-b723cf961d3e", "Sean Oulashin", "oulashin", "#4c6259"]
];
var UTM = "utm_source=qiaomu_home_dsh&utm_medium=referral";
function curatedPhotos() {
  return CURATED.map(([id, path, author, username, color]) => ({
    id: `curated:${id}`,
    url: `https://images.unsplash.com/${path}`,
    author,
    authorUrl: `https://unsplash.com/@${username}?${UTM}`,
    page: `https://unsplash.com/photos/${id}?${UTM}`,
    color
  }));
}
function targetWidth(screenWidth, pixelRatio) {
  const needed = Math.min(2560, Math.max(1280, screenWidth * Math.min(pixelRatio || 1, 2)));
  return Math.ceil(needed / 640) * 640;
}
function sizedUrl(photo, width) {
  return `${photo.url}?w=${width}&q=80&fm=jpg&fit=crop&crop=entropy`;
}
function dailyIndex(day, length, offset = 0) {
  if (length <= 0) return -1;
  let hash = 2166136261;
  for (const char of day) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (((hash >>> 0) + offset) % length + length) % length;
}
function dayKey(date = /* @__PURE__ */ new Date()) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}
var BUILTIN_QUOTES = {
  zh: [
    "\u5B66\u800C\u4E0D\u601D\u5219\u7F54\uFF0C\u601D\u800C\u4E0D\u5B66\u5219\u6B86\u3002\u2014\u2014\u300A\u8BBA\u8BED\u300B",
    "\u5343\u91CC\u4E4B\u884C\uFF0C\u59CB\u4E8E\u8DB3\u4E0B\u3002\u2014\u2014\u300A\u8001\u5B50\u300B",
    "\u77E5\u4E4B\u8005\u4E0D\u5982\u597D\u4E4B\u8005\uFF0C\u597D\u4E4B\u8005\u4E0D\u5982\u4E50\u4E4B\u8005\u3002\u2014\u2014\u300A\u8BBA\u8BED\u300B",
    "\u4E0D\u79EF\u8DEC\u6B65\uFF0C\u65E0\u4EE5\u81F3\u5343\u91CC\u3002\u2014\u2014\u300A\u8340\u5B50\u300B",
    "\u543E\u751F\u4E5F\u6709\u6DAF\uFF0C\u800C\u77E5\u4E5F\u65E0\u6DAF\u3002\u2014\u2014\u300A\u5E84\u5B50\u300B",
    "\u535A\u5B66\u4E4B\uFF0C\u5BA1\u95EE\u4E4B\uFF0C\u614E\u601D\u4E4B\uFF0C\u660E\u8FA8\u4E4B\uFF0C\u7B03\u884C\u4E4B\u3002\u2014\u2014\u300A\u4E2D\u5EB8\u300B",
    "\u4E1A\u7CBE\u4E8E\u52E4\uFF0C\u8352\u4E8E\u5B09\uFF1B\u884C\u6210\u4E8E\u601D\uFF0C\u6BC1\u4E8E\u968F\u3002\u2014\u2014\u97E9\u6108",
    "\u7EB8\u4E0A\u5F97\u6765\u7EC8\u89C9\u6D45\uFF0C\u7EDD\u77E5\u6B64\u4E8B\u8981\u8EAC\u884C\u3002\u2014\u2014\u9646\u6E38",
    "\u95EE\u6E20\u90A3\u5F97\u6E05\u5982\u8BB8\uFF1F\u4E3A\u6709\u6E90\u5934\u6D3B\u6C34\u6765\u3002\u2014\u2014\u6731\u71B9",
    "\u5929\u4E0B\u96BE\u4E8B\uFF0C\u5FC5\u4F5C\u4E8E\u6613\uFF1B\u5929\u4E0B\u5927\u4E8B\uFF0C\u5FC5\u4F5C\u4E8E\u7EC6\u3002\u2014\u2014\u300A\u8001\u5B50\u300B"
  ],
  en: [
    "Well done is better than well said. \u2014 Benjamin Franklin",
    "Our life is frittered away by detail. Simplify, simplify. \u2014 Henry David Thoreau",
    "The only person you are destined to become is the person you decide to be. \u2014 Ralph Waldo Emerson",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn. \u2014 Proverb",
    "What we achieve inwardly will change outer reality. \u2014 Plutarch",
    "It is not that we have a short time to live, but that we waste a lot of it. \u2014 Seneca",
    "Knowing is not enough; we must apply. \u2014 Johann Wolfgang von Goethe",
    "The secret of getting ahead is getting started. \u2014 Proverb"
  ]
};
var DEFAULT_ZONES = [
  { label: "\u5317\u4EAC", labelEn: "Beijing", zone: "Asia/Shanghai" },
  { label: "\u7EBD\u7EA6", labelEn: "New York", zone: "America/New_York" },
  { label: "\u4F26\u6566", labelEn: "London", zone: "Europe/London" }
];
var WEATHER_CITIES = [
  { id: "beijing", label: "\u5317\u4EAC", labelEn: "Beijing", latitude: 39.9042, longitude: 116.4074 },
  { id: "shanghai", label: "\u4E0A\u6D77", labelEn: "Shanghai", latitude: 31.2304, longitude: 121.4737 },
  { id: "shenzhen", label: "\u6DF1\u5733", labelEn: "Shenzhen", latitude: 22.5431, longitude: 114.0579 },
  { id: "hangzhou", label: "\u676D\u5DDE", labelEn: "Hangzhou", latitude: 30.2741, longitude: 120.1551 },
  { id: "chengdu", label: "\u6210\u90FD", labelEn: "Chengdu", latitude: 30.5728, longitude: 104.0668 },
  { id: "tokyo", label: "\u4E1C\u4EAC", labelEn: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
  { id: "singapore", label: "\u65B0\u52A0\u5761", labelEn: "Singapore", latitude: 1.3521, longitude: 103.8198 },
  { id: "newyork", label: "\u7EBD\u7EA6", labelEn: "New York", latitude: 40.7128, longitude: -74.006 },
  { id: "london", label: "\u4F26\u6566", labelEn: "London", latitude: 51.5072, longitude: -0.1276 },
  { id: "berlin", label: "\u67CF\u6797", labelEn: "Berlin", latitude: 52.52, longitude: 13.405 }
];
function weatherUrl(city) {
  const params = new URLSearchParams({
    latitude: city.latitude.toFixed(4),
    longitude: city.longitude.toFixed(4),
    current: "temperature_2m,apparent_temperature,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "3"
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}
function weatherQueryVariants(query) {
  const value = String(query ?? "").trim().slice(0, 100);
  if (!value) return [];
  if (!/^[\u3400-\u9fff]+$/.test(value)) return [value];
  const base = value.replace(/(?:省|市|县|区)$/u, "");
  return [.../* @__PURE__ */ new Set([value, base, `${base}\u5E02`, `${base}\u53BF`, `${base}\u533A`])].slice(0, 5);
}
function parseGeocoding(json) {
  const results = json?.results;
  if (!Array.isArray(results)) return [];
  return results.filter((item) => item && typeof item.name === "string" && Number.isFinite(item.latitude) && Number.isFinite(item.longitude) && Math.abs(item.latitude) <= 90 && Math.abs(item.longitude) <= 180).map((item) => ({
    name: item.name,
    latitude: item.latitude,
    longitude: item.longitude,
    detail: [...new Set([item.admin2, item.admin1, item.country].filter((value) => typeof value === "string" && value))].join(" \xB7 ")
  })).slice(0, 12);
}
function geocodingUrl(name, lang = "zh") {
  const params = new URLSearchParams({ name, count: "12", language: lang, format: "json" });
  return `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`;
}
async function searchWeatherPlaces(query, lang = "zh", fetchImpl = globalThis.fetch) {
  const variants = weatherQueryVariants(query);
  if (!variants.length) return [];
  const responses = await Promise.allSettled(variants.map(async (name) => {
    const response = await fetchImpl(geocodingUrl(name, lang));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parseGeocoding(await response.json());
  }));
  if (responses.every((entry) => entry.status === "rejected")) throw new Error("Location search unavailable");
  const unique = /* @__PURE__ */ new Map();
  for (const entry of responses) {
    if (entry.status !== "fulfilled") continue;
    for (const place of entry.value) {
      const key = `${place.name}:${place.latitude.toFixed(3)}:${place.longitude.toFixed(3)}`;
      if (!unique.has(key)) unique.set(key, place);
    }
  }
  return [...unique.values()].slice(0, 12);
}
var WEATHER_KINDS = [
  [[0], ["\u6674", "Clear"], "sun"],
  [[1, 2], ["\u591A\u4E91\u95F4\u6674", "Partly cloudy"], "cloud-sun"],
  [[3], ["\u9634", "Overcast"], "cloud"],
  [[45, 48], ["\u96FE", "Fog"], "cloud-fog"],
  [[51, 53, 55, 56, 57], ["\u6BDB\u6BDB\u96E8", "Drizzle"], "cloud-drizzle"],
  [[61, 63, 65, 66, 67], ["\u96E8", "Rain"], "cloud-rain"],
  [[71, 73, 75, 77], ["\u96EA", "Snow"], "cloud-snow"],
  [[80, 81, 82], ["\u9635\u96E8", "Showers"], "cloud-rain"],
  [[85, 86], ["\u9635\u96EA", "Snow showers"], "cloud-snow"],
  [[95, 96, 99], ["\u96F7\u96E8", "Thunderstorm"], "cloud-lightning"]
];
function weatherKind(code) {
  const found = WEATHER_KINDS.find(([codes]) => codes.includes(code));
  if (!found) return { zh: "\u672A\u77E5", en: "Unknown", icon: "cloud" };
  return { zh: found[1][0], en: found[1][1], icon: found[2] };
}
function parseWeather(json) {
  const num = (value) => {
    if (typeof value !== "number" || !Number.isFinite(value)) throw new Error("Invalid forecast");
    return value;
  };
  const current = {
    temperature: num(json?.current?.temperature_2m),
    feels: num(json?.current?.apparent_temperature),
    code: num(json?.current?.weather_code)
  };
  const daily = json?.daily ?? {};
  const days = (daily.time ?? []).slice(0, 3).map((day, index) => ({
    day: String(day),
    code: num(daily.weather_code?.[index]),
    max: num(daily.temperature_2m_max?.[index]),
    min: num(daily.temperature_2m_min?.[index])
  }));
  return { current, days };
}
function zonedTime(now, zone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(now).map((part) => [part.type, part.value])
  );
  const there = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  const here = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return { time: `${parts.hour}:${parts.minute}`, offset: Math.round((there - here) / 864e5) };
}
function timeProgress(now = /* @__PURE__ */ new Date()) {
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = (now - startOfDay) / 864e5;
  const weekStart = new Date(startOfDay);
  weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 6) % 7);
  const week = (now - weekStart) / (7 * 864e5);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const month = (now - monthStart) / (monthEnd - monthStart);
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
  const year = (now - yearStart) / (yearEnd - yearStart);
  const clamp = (value) => Math.min(1, Math.max(0, value));
  return { day: clamp(day), week: clamp(week), month: clamp(month), year: clamp(year) };
}
function relativeTime(updatedAt, now = Date.now()) {
  const diff = Math.max(0, now - updatedAt);
  if (diff < 6e4) return { unit: "justNow", n: 0 };
  if (diff < 36e5) return { unit: "minutes", n: Math.floor(diff / 6e4) };
  if (diff < 864e5) return { unit: "hours", n: Math.floor(diff / 36e5) };
  if (diff < 7 * 864e5) return { unit: "days", n: Math.floor(diff / 864e5) };
  return { unit: "date", n: updatedAt };
}
function addTodo(todos, text) {
  const value = String(text ?? "").trim().replace(/[\r\n]+/g, " ");
  if (!value) return todos;
  const id = `t${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
  return [...todos, { id, text: value.slice(0, 200), done: false, createdAt: Date.now() }];
}
function toggleTodo(todos, id) {
  return todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo);
}
function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}
function clearDoneTodos(todos) {
  return todos.filter((todo) => !todo.done);
}
function normalizeUrl(input) {
  try {
    const url = new URL(String(input ?? "").trim());
    if ((url.protocol === "http:" || url.protocol === "https:") && !url.username && !url.password) return url.href;
    return null;
  } catch {
    return null;
  }
}
function faviconUrl(href) {
  try {
    const host = new URL(href).hostname;
    return host ? `https://icons.duckduckgo.com/ip3/${host}.ico` : null;
  } catch {
    return null;
  }
}
function daysBetween(target, base) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(target) || !/^\d{4}-\d{2}-\d{2}$/.test(base)) return null;
  return Math.round((Date.parse(`${target}T12:00:00Z`) - Date.parse(`${base}T12:00:00Z`)) / 864e5);
}
function parseHabitInput(input) {
  const text = String(input ?? "").trim();
  if (!text) return null;
  const match = /^(.+?)\s*[:：]\s*(\d{1,2})\s*$/.exec(text);
  if (match) return { name: match[1].trim().slice(0, 30), target: Math.min(99, Math.max(1, Number(match[2]))) };
  return { name: text.slice(0, 30), target: 1 };
}
function addHabit(habits, input) {
  const parsed = parseHabitInput(input);
  if (!parsed) return habits;
  if (habits.some((habit) => habit.name === parsed.name)) return habits;
  const id = `h${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
  return [...habits, { id, ...parsed, createdAt: Date.now() }];
}
function checkinHabit(log, habitId, date, target) {
  const day = { ...log[habitId] ?? {} };
  const current = typeof day[date] === "number" ? day[date] : 0;
  day[date] = Math.min(target, current + 1);
  return { ...log, [habitId]: day };
}
function uncheckHabit(log, habitId, date) {
  const day = { ...log[habitId] ?? {} };
  const current = typeof day[date] === "number" ? day[date] : 0;
  if (current <= 1) delete day[date];
  else day[date] = current - 1;
  return { ...log, [habitId]: day };
}
function lastNDays(n, from = /* @__PURE__ */ new Date()) {
  const out = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    out.push(dayKey(new Date(from.getFullYear(), from.getMonth(), from.getDate() - i)));
  }
  return out;
}
function ensureDailyFocus(dailyFocus, today, max = 3) {
  if (dailyFocus?.date === today && Array.isArray(dailyFocus.items)) return dailyFocus;
  const carried = (dailyFocus?.items ?? []).filter((item) => !item.done).slice(0, max);
  return { date: today, items: carried };
}
function addFocusItem(dailyFocus, text, max = 3) {
  const value = String(text ?? "").trim().replace(/[\r\n]+/g, " ");
  if (!value || dailyFocus.items.length >= max) return dailyFocus;
  const id = `f${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
  return { ...dailyFocus, items: [...dailyFocus.items, { id, text: value.slice(0, 120), done: false }] };
}
function addQuickNote(notes, text, now = Date.now()) {
  const value = String(text ?? "").trim();
  if (!value) return notes;
  const id = `n${now.toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
  return [{ id, time: now, text: value.slice(0, 500) }, ...notes].slice(0, 200);
}
function quickNotesMarkdown(notes) {
  const byDay = /* @__PURE__ */ new Map();
  for (const note of [...notes].reverse()) {
    const key = dayKey(new Date(note.time));
    if (!byDay.has(key)) byDay.set(key, []);
    const date = new Date(note.time);
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    byDay.get(key).push(`- ${hh}:${mm} ${note.text}`);
  }
  const lines = [];
  for (const [day, items] of byDay) lines.push(`## ${day}`, "", ...items, "");
  return lines.join("\n").trim();
}
var DAILY_QUESTIONS = {
  zh: [
    "\u4ECA\u5929\u6700\u91CD\u8981\u7684\u4E00\u4EF6\u4E8B\u662F\u4EC0\u4E48\uFF1F",
    "\u6700\u8FD1\u6709\u4EC0\u4E48\u8BA9\u4F60\u4F1A\u5FC3\u4E00\u7B11\u7684\u77AC\u95F4\uFF1F",
    "\u73B0\u5728\u6700\u5360\u7528\u4F60\u5FC3\u529B\u7684\u4E8B\u662F\u4EC0\u4E48\uFF1F",
    "\u8FD9\u5468\u60F3\u5BF9\u81EA\u5DF1\u8BF4\u53E5\u4EC0\u4E48\u8BDD\uFF1F",
    "\u6709\u4EC0\u4E48\u4E00\u76F4\u60F3\u5F00\u59CB\u5374\u8FD8\u6CA1\u5F00\u59CB\u7684\u4E8B\uFF1F",
    "\u4ECA\u5929\u5B66\u5230\u4E86\u4EC0\u4E48\u65B0\u4E1C\u897F\uFF1F",
    "\u6700\u8FD1\u8C01\u5E2E\u52A9\u8FC7\u4F60\uFF1F\u60F3\u600E\u4E48\u611F\u8C22\uFF1F",
    "\u6B64\u523B\u6700\u8BA9\u4F60\u5B89\u5FC3\u7684\u662F\u4EC0\u4E48\uFF1F",
    "\u5982\u679C\u4ECA\u5929\u53EA\u505A\u4E00\u4EF6\u4E8B\uFF0C\u4F1A\u662F\u54EA\u4EF6\uFF1F",
    "\u6700\u8FD1\u6709\u4EC0\u4E48\u51B3\u5B9A\u4E00\u76F4\u5728\u62D6\u5EF6\uFF1F",
    "\u4ECA\u5929\u8EAB\u4F53\u611F\u89C9\u600E\u4E48\u6837\uFF1F",
    "\u6700\u8FD1\u5728\u8BFB/\u5728\u770B\u4EC0\u4E48\uFF1F\u503C\u5F97\u63A8\u8350\u5417\uFF1F",
    "\u6709\u4EC0\u4E48\u60F3\u6CD5\u6700\u8FD1\u4E00\u76F4\u5728\u8111\u5B50\u91CC\u8F6C\uFF1F",
    "\u8FD9\u4E2A\u6708\u60F3\u517B\u6210\u6216\u6212\u6389\u4EC0\u4E48\u4E60\u60EF\uFF1F",
    "\u73B0\u5728\u7684\u5DE5\u4F5C\u65B9\u5F0F\u91CC\uFF0C\u54EA\u4E00\u70B9\u6700\u60F3\u6539\u8FDB\uFF1F"
  ],
  en: [
    "What is the single most important thing today?",
    "What made you smile recently?",
    "What is occupying your mind the most right now?",
    "What would you tell yourself this week?",
    "What have you been meaning to start but haven\u2019t?",
    "What did you learn today?",
    "Who helped you recently, and how could you thank them?",
    "What gives you peace of mind right now?",
    "If you could do only one thing today, what would it be?",
    "Which decision have you been putting off?",
    "How does your body feel today?",
    "What are you reading or watching lately? Worth recommending?",
    "Which idea keeps circling in your head?",
    "What habit do you want to build or drop this month?",
    "What would you improve about how you work right now?"
  ]
};
var SEARCH_GROUPS = [
  {
    id: "web",
    zh: "\u591A\u7AD9\u641C\u7D22",
    en: "Search across sites",
    sites: [
      { id: "google", zh: "\u8C37\u6B4C", en: "Google", home: "https://www.google.com/", search: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}` },
      { id: "bing", zh: "\u5FC5\u5E94", en: "Bing", home: "https://www.bing.com/", search: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}` },
      { id: "duckduckgo", zh: "DuckDuckGo", en: "DuckDuckGo", home: "https://duckduckgo.com/", search: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}` },
      { id: "wikipedia", zh: "\u7EF4\u57FA\u767E\u79D1", en: "Wikipedia", home: "https://www.wikipedia.org/", search: (q) => `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(q)}` },
      { id: "baidu", zh: "\u767E\u5EA6", en: "Baidu", off: true, home: "https://www.baidu.com/", search: (q) => `https://www.baidu.com/s?wd=${encodeURIComponent(q)}` },
      { id: "brave", zh: "Brave", en: "Brave", off: true, home: "https://search.brave.com/", search: (q) => `https://search.brave.com/search?q=${encodeURIComponent(q)}` },
      { id: "github", zh: "GitHub", en: "GitHub", off: true, home: "https://github.com/", search: (q) => `https://github.com/search?q=${encodeURIComponent(q)}` },
      { id: "zhihu", zh: "\u77E5\u4E4E", en: "Zhihu", off: true, home: "https://www.zhihu.com/", search: (q) => `https://www.zhihu.com/search?type=content&q=${encodeURIComponent(q)}` }
    ]
  },
  {
    id: "books",
    zh: "\u627E\u7535\u5B50\u4E66",
    en: "Find books",
    sites: [
      { id: "openlibrary", zh: "Open Library", en: "Open Library", home: "https://openlibrary.org/", search: (q) => `https://openlibrary.org/search?q=${encodeURIComponent(q)}` },
      { id: "gutenberg", zh: "\u53E4\u817E\u5821\u8BA1\u5212", en: "Project Gutenberg", home: "https://www.gutenberg.org/", search: (q) => `https://www.gutenberg.org/ebooks/?query=${encodeURIComponent(q)}` },
      { id: "douban-book", zh: "\u8C46\u74E3\u8BFB\u4E66", en: "Douban Books", home: "https://book.douban.com/", search: (q) => `https://search.douban.com/book/subject_search?search_text=${encodeURIComponent(q)}` },
      { id: "google-books", zh: "Google \u56FE\u4E66", en: "Google Books", home: "https://books.google.com/", search: (q) => `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(q)}` }
    ]
  },
  {
    id: "video",
    zh: "\u627E\u89C6\u9891\u4E0E\u7535\u5F71",
    en: "Find video and film",
    sites: [
      { id: "youtube", zh: "YouTube", en: "YouTube", home: "https://www.youtube.com/", search: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}` },
      { id: "bilibili", zh: "\u54D4\u54E9\u54D4\u54E9", en: "Bilibili", home: "https://www.bilibili.com/", search: (q) => `https://search.bilibili.com/all?keyword=${encodeURIComponent(q)}` },
      { id: "imdb", zh: "IMDb", en: "IMDb", home: "https://www.imdb.com/", search: (q) => `https://www.imdb.com/find/?q=${encodeURIComponent(q)}` },
      { id: "douban-movie", zh: "\u8C46\u74E3\u7535\u5F71", en: "Douban Movies", home: "https://movie.douban.com/", search: (q) => `https://search.douban.com/movie/subject_search?search_text=${encodeURIComponent(q)}` },
      { id: "justwatch", zh: "JustWatch", en: "JustWatch", home: "https://www.justwatch.com/", search: (q) => `https://www.justwatch.com/us/search?q=${encodeURIComponent(q)}` }
    ]
  },
  {
    id: "music",
    zh: "Spotify \u641C\u7D22",
    en: "Search Spotify",
    sites: [
      { id: "spotify", zh: "Spotify", en: "Spotify", home: "https://open.spotify.com/", search: (q) => `https://open.spotify.com/search/${encodeURIComponent(q)}` }
    ]
  },
  {
    id: "ai",
    zh: "\u5B66 AI",
    en: "Learn AI",
    sites: [
      { id: "openai-academy", zh: "OpenAI Academy", en: "OpenAI Academy", home: "https://academy.openai.com/" },
      { id: "hf-learn", zh: "Hugging Face Learn", en: "Hugging Face Learn", home: "https://huggingface.co/learn" },
      { id: "deeplearning-ai", zh: "DeepLearning.AI", en: "DeepLearning.AI", home: "https://www.deeplearning.ai/short-courses/" },
      { id: "fast-ai", zh: "fast.ai", en: "fast.ai", home: "https://course.fast.ai/" }
    ]
  },
  {
    id: "papers",
    zh: "\u627E\u8BBA\u6587",
    en: "Find papers",
    sites: [
      { id: "arxiv", zh: "arXiv", en: "arXiv", home: "https://arxiv.org/", search: (q) => `https://arxiv.org/search/?query=${encodeURIComponent(q)}&searchtype=all` },
      { id: "crossref", zh: "Crossref", en: "Crossref", home: "https://search.crossref.org/", search: (q) => `https://search.crossref.org/?q=${encodeURIComponent(q)}` },
      { id: "semantic-scholar", zh: "Semantic Scholar", en: "Semantic Scholar", home: "https://www.semanticscholar.com/", search: (q) => `https://www.semanticscholar.org/search?q=${encodeURIComponent(q)}` },
      { id: "google-scholar", zh: "Google \u5B66\u672F", en: "Google Scholar", home: "https://scholar.google.com/", search: (q) => `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}` }
    ]
  },
  {
    id: "words",
    zh: "\u67E5\u8BCD",
    en: "Look up a word",
    sites: [
      { id: "cambridge", zh: "\u5251\u6865\u8BCD\u5178", en: "Cambridge Dictionary", home: "https://dictionary.cambridge.org/", search: (q) => `https://dictionary.cambridge.org/search/english/direct/?q=${encodeURIComponent(q)}` },
      { id: "wiktionary", zh: "\u7EF4\u57FA\u8BCD\u5178", en: "Wiktionary", home: "https://en.wiktionary.org/", search: (q) => `https://en.wiktionary.org/w/index.php?search=${encodeURIComponent(q)}` },
      { id: "youdao", zh: "\u6709\u9053\u8BCD\u5178", en: "Youdao", home: "https://dict.youdao.com/", search: (q) => `https://dict.youdao.com/result?word=${encodeURIComponent(q)}&lang=en` },
      { id: "merriam-webster", zh: "\u97E6\u6C0F\u8BCD\u5178", en: "Merriam-Webster", home: "https://www.merriam-webster.com/", search: (q) => `https://www.merriam-webster.com/dictionary/${encodeURIComponent(q)}` }
    ]
  },
  {
    id: "translate",
    zh: "\u7FFB\u8BD1",
    en: "Translate",
    sites: [
      { id: "google-translate", zh: "Google \u7FFB\u8BD1", en: "Google Translate", home: "https://translate.google.com/", search: (q) => `https://translate.google.com/?sl=auto&tl=${translateTarget(q)}&text=${encodeURIComponent(q)}&op=translate` },
      { id: "deepl", zh: "DeepL", en: "DeepL", home: "https://www.deepl.com/translator", search: (q) => `https://www.deepl.com/translator#auto/${translateTarget(q)}/${encodeURIComponent(q).replace(/%2F/gi, "%5C%2F")}` },
      { id: "bing-translate", zh: "\u5FC5\u5E94\u7FFB\u8BD1", en: "Bing Translator", home: "https://www.bing.com/translator", search: (q) => `https://www.bing.com/translator?from=auto-detect&to=${translateTarget(q) === "zh" ? "zh-Hans" : "en"}&text=${encodeURIComponent(q)}` }
    ]
  },
  {
    id: "dev",
    zh: "GitHub \u5F85\u529E",
    en: "GitHub inbox",
    sites: [
      { id: "github-search", zh: "\u641C\u7D22\u4ED3\u5E93", en: "Search repositories", home: "https://github.com/search", search: (q) => `https://github.com/search?q=${encodeURIComponent(q)}&type=repositories` },
      { id: "github-reviews", zh: "\u5F85\u6211\u5BA1\u9605", en: "Review requests", home: "https://github.com/pulls/review-requested" },
      { id: "github-pulls", zh: "\u6211\u7684 PR", en: "My pull requests", home: "https://github.com/pulls" },
      { id: "github-issues", zh: "\u5206\u914D\u7ED9\u6211", en: "Assigned issues", home: "https://github.com/issues/assigned" },
      { id: "github-notifications", zh: "\u901A\u77E5", en: "Notifications", home: "https://github.com/notifications" }
    ]
  }
];
function translateTarget(text) {
  return /[\u3400-\u9fff]/.test(text) ? "en" : "zh";
}
function discoveryUrl(site, query) {
  return query.trim() && site.search ? site.search(query.trim().slice(0, 300)) : site.home;
}
function groupSites(groupId, customSites = []) {
  const group = SEARCH_GROUPS.find((entry) => entry.id === groupId);
  if (!group) return [];
  return groupId === "web" ? [...group.sites, ...customSites] : group.sites;
}
function defaultSiteIds(groupId, customSites = []) {
  const sites = groupSites(groupId, customSites);
  const on = sites.filter((site) => !site.off);
  return (on.length ? on : sites.slice(0, 1)).map((site) => site.id);
}
function parseSearchTemplates(input) {
  const lines = String(input ?? "").split(/\r?\n/).filter((line) => line.trim()).slice(0, 8);
  const sites = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const separator = line.indexOf("|");
    const name = line.slice(0, separator).trim();
    const url = line.slice(separator + 1).trim();
    if (separator < 1 || !name || !url.includes("{query}")) {
      return { ok: false, error: { key: "multiSearch.templateLine", params: { line: index + 1 } } };
    }
    let parsed;
    try {
      parsed = new URL(url.replaceAll("{query}", "test"));
    } catch {
      return { ok: false, error: { key: "multiSearch.templateLine", params: { line: index + 1 } } };
    }
    if (parsed.origin !== new URL(url.replaceAll("{query}", "other")).origin) {
      return { ok: false, error: { key: "multiSearch.templateQuery", params: { line: index + 1 } } };
    }
    if (!["https:", "http:"].includes(parsed.protocol) || parsed.username || parsed.password) {
      return { ok: false, error: { key: "multiSearch.templateUrl", params: { line: index + 1 } } };
    }
    sites.push({
      id: `custom:${url}`,
      zh: name.slice(0, 60),
      en: name.slice(0, 60),
      home: new URL(url.replaceAll("{query}", "")).origin,
      search: (query) => url.replaceAll("{query}", encodeURIComponent(query))
    });
  }
  return { ok: true, sites };
}
function activityByDay(byId) {
  const counts = /* @__PURE__ */ new Map();
  for (const row of Object.values(byId ?? {})) {
    if (!row || row.blank || typeof row.updatedAt !== "number") continue;
    const key = dayKey(new Date(row.updatedAt));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}
function heatIntensity(count, max) {
  if (count <= 0 || max <= 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil(count / max * 4)));
}

// src/client/cards.jsx
var import_react2 = __toESM(require("react"), 1);

// src/client/icons.jsx
var import_react = __toESM(require("react"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
function makeIcon(paths, { filled = false } = {}) {
  function Icon({ size = 16, strokeWidth = 1.8, className }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: filled ? "currentColor" : "none",
        stroke: filled ? "none" : "currentColor",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        className,
        children: paths.map((d, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d }, index))
      }
    );
  }
  Icon.displayName = "QhIcon";
  return Icon;
}
var IconHome = makeIcon([
  "M3 10.5 12 3l9 7.5",
  "M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"
]);
var IconSearch = makeIcon(["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "m21 21-4.3-4.3"]);
var IconPlus = makeIcon(["M12 5v14", "M5 12h14"]);
var IconSettings = makeIcon([
  "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
  "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
]);
var IconFolder = makeIcon([
  "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
]);
var IconGlobe = makeIcon([
  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
  "M2 12h20"
]);
var IconCheck = makeIcon(["M20 6 9 17l-5-5"]);
var IconTrash = makeIcon([
  "M3 6h18",
  "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
  "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
]);
var IconPlay = makeIcon(["m6 4 14 8-14 8V4z"]);
var IconPause = makeIcon(["M8 4v16", "M16 4v16"]);
var IconRefresh = makeIcon([
  "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
  "M21 3v5h-5",
  "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
  "M3 21v-5h5"
]);
var IconList = makeIcon(["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"]);
var IconClock = makeIcon(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 6v6l4 2"]);
var IconQuote = makeIcon([
  "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",
  "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
]);
var IconSun = makeIcon([
  "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  "M12 2v2",
  "M12 20v2",
  "m4.93 4.93 1.41 1.41",
  "m17.66 17.66 1.41 1.41",
  "M2 12h2",
  "M20 12h2",
  "m6.34 17.66-1.41 1.41",
  "m19.07 4.93-1.41 1.41"
]);
var IconCloud = makeIcon(["M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"]);
var IconCloudSun = makeIcon([
  "M12 2v2",
  "m4.93 4.93 1.41 1.41",
  "M20 12h2",
  "m19.07 4.93-1.41 1.41",
  "M15.947 12.65a4 4 0 0 0-5.925-4.128",
  "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"
]);
var IconCloudRain = makeIcon([
  "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
  "M16 14v6",
  "M8 14v6",
  "M12 16v6"
]);
var IconCloudSnow = makeIcon([
  "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
  "M8 15h.01",
  "M8 19h.01",
  "M12 17h.01",
  "M12 21h.01",
  "M16 15h.01",
  "M16 19h.01"
]);
var IconCloudFog = makeIcon([
  "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
  "M6 19h12",
  "M8 22h8"
]);
var IconCloudLightning = makeIcon([
  "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973",
  "m13 12-3 5h4l-3 5"
]);
var IconExternal = makeIcon([
  "M15 3h6v6",
  "M10 14 21 3",
  "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
]);
var IconImage = makeIcon([
  "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z",
  "M8.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  "m21 15-5-5L5 21"
]);
var IconMessage = makeIcon(["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"]);
var IconClose = makeIcon(["M18 6 6 18", "m6 6 12 12"]);
var IconTimer = makeIcon([
  "M10 2h4",
  "M12 14v-4",
  "M4.93 4.93l2.83 2.83",
  "M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
]);
var IconGauge = makeIcon([
  "m12 14 4-4",
  "M3.34 19a10 10 0 1 1 17.32 0"
]);
var IconLink = makeIcon([
  "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
  "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
]);
var IconCalendar = makeIcon([
  "M8 2v4",
  "M16 2v4",
  "M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z",
  "M3 10h18"
]);
var IconFlame = makeIcon([
  "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
]);
var IconHourglass = makeIcon([
  "M5 22h14",
  "M5 2h14",
  "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
  "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"
]);
var IconGrid = makeIcon([
  "M3 3h7v7H3z",
  "M14 3h7v7h-7z",
  "M14 14h7v7h-7z",
  "M3 14h7v7H3z"
]);
var IconPen = makeIcon([
  "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
  "m15 5 4 4"
]);
var IconNotebook = makeIcon([
  "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
]);
var IconWaves = makeIcon([
  "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
  "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
  "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
]);
var IconHelpCircle = makeIcon([
  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
  "M12 17h.01"
]);
var IconCopy = makeIcon([
  "M9 9h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2Z",
  "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
]);
var IconTarget = makeIcon([
  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  "M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z",
  "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
]);
var IconZap = makeIcon(["M13 2 3 14h9l-1 8 10-12h-9l1-8z"]);
var IconMore = makeIcon(["M12 12h.01", "M19 12h.01", "M5 12h.01"]);
var IconGrip = makeIcon(["M9 5h.01", "M9 12h.01", "M9 19h.01", "M15 5h.01", "M15 12h.01", "M15 19h.01"]);
var IconArrowUp = makeIcon(["m5 12 7-7 7 7", "M12 19V5"]);
var IconArrowDown = makeIcon(["M12 5v14", "m19 12-7 7-7-7"]);
var IconArrowLeft = makeIcon(["m12 19-7-7 7-7", "M19 12H5"]);
var IconArrowRight = makeIcon(["M5 12h14", "m12 5 7 7-7 7"]);
var IconBriefcase = makeIcon(["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"]);
var IconBook = makeIcon(["M12 7v14", "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"]);
var IconCompass = makeIcon(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "m16.24 7.76-1.8 5.4a2 2 0 0 1-1.28 1.28l-5.4 1.8 1.8-5.4a2 2 0 0 1 1.28-1.28z"]);
var IconSquareDashed = makeIcon(["M5 3a2 2 0 0 0-2 2", "M19 3a2 2 0 0 1 2 2", "M21 19a2 2 0 0 1-2 2", "M5 21a2 2 0 0 1-2-2", "M9 3h1", "M9 21h1", "M14 3h1", "M14 21h1", "M3 9v1", "M21 9v1", "M3 14v1", "M21 14v1"]);
var IconMinusCircle = makeIcon(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M8 12h8"]);
var IconPanels = makeIcon(["M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z", "M3 9h18", "M9 21V9"]);
var IconSliders = makeIcon(["M4 21v-7", "M4 10V3", "M12 21v-9", "M12 8V3", "M20 21v-5", "M20 12V3", "M2 14h4", "M10 8h4", "M18 16h4"]);

// src/client/shortcuts.js
var DEFAULT_GROUP_ID = "home-shortcuts";
var FAVICON = "favicon";
var SHORTCUT_ICONS = ["link", "globe", "folder", "book", "home", "pen", "notebook", "target", "flame", "zap", "calendar", "sun"];
var MAX_IMPORT = 50;
var GROUP_ID_RE = /^[a-zA-Z0-9_-]{1,80}$/;
var groupCardId = (groupId) => groupId === DEFAULT_GROUP_ID ? "shortcuts" : `shortcut:${groupId}`;
var groupIdOf = (cardId) => {
  if (cardId === "shortcuts") return DEFAULT_GROUP_ID;
  return typeof cardId === "string" && cardId.startsWith("shortcut:") && GROUP_ID_RE.test(cardId.slice(9)) ? cardId.slice(9) : null;
};
var isGroupCard = (cardId) => groupIdOf(cardId) !== null;
var newId = (prefix) => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
var cleanIcon = (value) => value === FAVICON || SHORTCUT_ICONS.includes(value) ? value : FAVICON;
function cleanItem(raw) {
  if (!raw || typeof raw !== "object" || typeof raw.id !== "string" || !raw.id) return null;
  const url = normalizeUrl(raw.url);
  if (!url) return null;
  const label = typeof raw.label === "string" && raw.label.trim() ? raw.label.trim().slice(0, 120) : new URL(url).hostname;
  return { id: raw.id, kind: "url", url, label, icon: cleanIcon(raw.icon) };
}
function normalizeGroups(raw, legacyItems = []) {
  const groups = [];
  const seen = /* @__PURE__ */ new Set();
  for (const entry of Array.isArray(raw) ? raw : []) {
    if (!entry || typeof entry !== "object" || typeof entry.id !== "string" || !GROUP_ID_RE.test(entry.id) || seen.has(entry.id)) continue;
    seen.add(entry.id);
    const ids = /* @__PURE__ */ new Set();
    const items = (Array.isArray(entry.items) ? entry.items : []).map(cleanItem).filter((item) => item && !ids.has(item.id) && ids.add(item.id));
    groups.push({ id: entry.id, name: typeof entry.name === "string" ? entry.name.trim().slice(0, 40) : "", items });
  }
  if (!seen.has(DEFAULT_GROUP_ID)) {
    const items = (Array.isArray(legacyItems) ? legacyItems : []).map(cleanItem).filter(Boolean);
    groups.unshift({ id: DEFAULT_GROUP_ID, name: "", items });
  }
  return groups;
}
var patchGroup = (groups, id, fn) => {
  let changed = false;
  const next = groups.map((group) => {
    if (group.id !== id) return group;
    const updated = fn(group);
    if (updated !== group) changed = true;
    return updated;
  });
  return changed ? next : groups;
};
function addGroup(groups, name, items = []) {
  const trimmed = String(name ?? "").trim().slice(0, 40);
  if (!trimmed) return { groups, id: null };
  const id = newId("g");
  return { groups: [...groups, { id, name: trimmed, items }], id };
}
var renameGroup = (groups, id, name) => {
  const trimmed = String(name ?? "").trim().slice(0, 40);
  return trimmed ? patchGroup(groups, id, (group) => group.name === trimmed ? group : { ...group, name: trimmed }) : groups;
};
var removeGroup = (groups, id) => id === DEFAULT_GROUP_ID ? groups : groups.filter((group) => group.id !== id);
function addItem(groups, groupId, { label, url, icon = FAVICON }) {
  const href = normalizeUrl(url);
  if (!href || !groups.some((group) => group.id === groupId)) return null;
  const item = { id: newId("u"), kind: "url", url: href, label: String(label ?? "").trim().slice(0, 120) || new URL(href).hostname, icon: cleanIcon(icon) };
  return { groups: patchGroup(groups, groupId, (group) => ({ ...group, items: [...group.items, item] })), id: item.id };
}
function updateItem(groups, groupId, itemId, { label, url, icon }) {
  const href = normalizeUrl(url);
  if (!href) return null;
  return patchGroup(groups, groupId, (group) => ({
    ...group,
    items: group.items.map((item) => item.id === itemId ? { ...item, url: href, label: String(label ?? "").trim().slice(0, 120) || new URL(href).hostname, icon: cleanIcon(icon) } : item)
  }));
}
var removeItem = (groups, groupId, itemId) => patchGroup(groups, groupId, (group) => group.items.some((item) => item.id === itemId) ? { ...group, items: group.items.filter((item) => item.id !== itemId) } : group);
function moveItem(groups, groupId, itemId, delta) {
  return patchGroup(groups, groupId, (group) => {
    const from = group.items.findIndex((item) => item.id === itemId);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= group.items.length) return group;
    const items = [...group.items];
    items.splice(to, 0, items.splice(from, 1)[0]);
    return { ...group, items };
  });
}
function reorderItem(groups, groupId, itemId, beforeId, after = false) {
  return patchGroup(groups, groupId, (group) => {
    if (itemId === beforeId || !group.items.some((item) => item.id === itemId) || !group.items.some((item) => item.id === beforeId)) return group;
    const moving = group.items.find((item) => item.id === itemId);
    const items = group.items.filter((item) => item.id !== itemId);
    items.splice(items.findIndex((item) => item.id === beforeId) + (after ? 1 : 0), 0, moving);
    return { ...group, items };
  });
}
var ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function decodeEntities(text) {
  return String(text).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, code) => {
    if (code[0] === "#") {
      const value = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : Number(code.slice(1));
      return Number.isFinite(value) && value > 0 && value < 1114112 ? String.fromCodePoint(value) : whole;
    }
    return ENTITIES[code.toLowerCase()] ?? whole;
  });
}
function parseBookmarks(html, limit = MAX_IMPORT) {
  const found = [];
  const seen = /* @__PURE__ */ new Set();
  const text = String(html);
  const lower = text.toLowerCase();
  const open = /<a\b([^>]{0,4000})>/gi;
  let nextClose = -2;
  let match;
  while (found.length < limit && (match = open.exec(text))) {
    const href = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(match[1]);
    const url = normalizeUrl(decodeEntities(href?.[1] ?? href?.[2] ?? href?.[3] ?? ""));
    if (!url || seen.has(url)) continue;
    seen.add(url);
    const bodyStart = match.index + match[0].length;
    if (nextClose !== -1 && (nextClose === -2 || nextClose < bodyStart)) nextClose = lower.indexOf("</a>", bodyStart);
    const inner = nextClose < 0 || nextClose - bodyStart > 2e3 ? "" : text.slice(bodyStart, nextClose);
    const name = decodeEntities(inner.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim().slice(0, 120);
    found.push({ name: name || new URL(url).hostname, url });
  }
  return found;
}
function bookmarkItems(bookmarks) {
  return bookmarks.map((bookmark, index) => ({ id: newId(`b${index}`), kind: "url", url: bookmark.url, label: bookmark.name, icon: FAVICON }));
}

// src/client/layout.js
var CATEGORIES = ["plan", "notes", "dsh", "links", "focus", "time", "discover"];
var CARD_CATALOG = [
  { id: "dailyFocus", category: "plan" },
  { id: "todo", category: "plan", limit: { def: 6, max: 6 } },
  { id: "recent", category: "dsh", limit: { def: 5, max: 6 } },
  { id: "shortcuts", category: "links" },
  { id: "quickNote", category: "notes", limit: { def: 6, max: 6 } },
  { id: "scratchpad", category: "notes" },
  { id: "dailyQuestion", category: "notes" },
  { id: "heatmap", category: "dsh" },
  { id: "focus", category: "focus" },
  { id: "habit", category: "focus" },
  { id: "ambient", category: "focus" },
  { id: "progress", category: "time" },
  { id: "worldclock", category: "time" },
  { id: "quote", category: "discover" },
  { id: "multiSearch", category: "discover", options: ["openAll"] },
  { id: "weather", category: "discover" },
  { id: "countdown", category: "time" }
].map((card) => ({ ...card, titleKey: `card.${card.id}`, descKey: `card.${card.id}.desc` }));
var CARD_BY_ID = new Map(CARD_CATALOG.map((card) => [card.id, card]));
var CARD_IDS = new Set(CARD_BY_ID.keys());
var isKnownCard = (id) => CARD_IDS.has(id) || isGroupCard(id);
var cardMeta = (id) => CARD_BY_ID.get(id);
function cardTitle(id, t, groups = []) {
  const groupId = groupIdOf(id);
  if (groupId) return groups.find((group) => group.id === groupId)?.name || t("card.shortcuts");
  return t(`card.${id}`);
}
var hasCardSettings = (id) => Boolean(CARD_BY_ID.get(id)?.limit || CARD_BY_ID.get(id)?.options?.length);
var PAGE_TEMPLATES = [
  { id: "home", icon: "home", cards: ["dailyFocus", "todo", "recent", "shortcuts"] },
  { id: "work", icon: "briefcase", cards: ["dailyFocus", "todo", "recent", "focus", "quickNote"] },
  { id: "focus", icon: "timer", cards: ["focus", "habit", "ambient", "progress", "worldclock"] },
  { id: "notes", icon: "pen", cards: ["quickNote", "scratchpad", "dailyQuestion", "heatmap"] },
  { id: "reading", icon: "book", cards: ["quote", "multiSearch", "scratchpad", "dailyQuestion"] },
  { id: "rhythm", icon: "flame", cards: ["habit", "countdown", "progress", "heatmap"] },
  { id: "explore", icon: "compass", cards: ["quote", "multiSearch", "weather", "countdown"] }
];
function defaultTabs() {
  return [
    { id: "home", labelKey: "tabs.home", cards: ["dailyFocus", "todo", "recent", "shortcuts"], options: {} },
    { id: "notes", labelKey: "tabs.notes", cards: ["quickNote", "scratchpad", "dailyQuestion", "heatmap"], options: {} },
    { id: "focus", labelKey: "tabs.focus", cards: ["focus", "habit", "ambient", "progress", "worldclock"], options: {} },
    { id: "explore", labelKey: "tabs.explore", cards: ["quote", "multiSearch", "weather", "countdown"], options: {} }
  ];
}
var clampInt = (value, min, max, fallback) => {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
};
function cleanOptions(raw, cards) {
  const out = {};
  if (!raw || typeof raw !== "object") return out;
  for (const id of cards) {
    const source = raw[id];
    const meta = CARD_BY_ID.get(id);
    if (!source || typeof source !== "object" || !meta) continue;
    const next = {};
    if (meta.limit && source.limit !== void 0) next.limit = clampInt(source.limit, 1, meta.limit.max, meta.limit.def);
    if (meta.options?.includes("openAll") && typeof source.openAll === "boolean") next.openAll = source.openAll;
    if (Object.keys(next).length) out[id] = next;
  }
  return out;
}
function normalizeTabs(rawTabs, legacyHidden = {}) {
  const defaults = defaultTabs();
  if (!Array.isArray(rawTabs)) {
    return defaults.map((tab) => ({ ...tab, cards: tab.cards.filter((id) => !legacyHidden?.[id]) }));
  }
  const seen = /* @__PURE__ */ new Set();
  const tabs = [];
  for (const raw of rawTabs) {
    if (!raw || typeof raw !== "object" || typeof raw.id !== "string" || seen.has(raw.id)) continue;
    if (!/^[a-zA-Z0-9_-]{1,80}$/.test(raw.id)) continue;
    seen.add(raw.id);
    const fallback = defaults.find((tab) => tab.id === raw.id);
    const name = typeof raw.name === "string" ? raw.name.trim().slice(0, 30) : "";
    const cards = Array.isArray(raw.cards) ? [...new Set(raw.cards.filter(isKnownCard))] : [];
    tabs.push({
      id: raw.id,
      ...name ? { name } : fallback ? { labelKey: fallback.labelKey } : { name: raw.id },
      cards,
      options: cleanOptions(raw.options, cards)
    });
  }
  if (!seen.has("home")) tabs.unshift(defaults[0]);
  else {
    const at = tabs.findIndex((tab) => tab.id === "home");
    if (at > 0) tabs.unshift(...tabs.splice(at, 1));
  }
  return tabs;
}
function patchTab(tabs, id, fn) {
  let changed = false;
  const next = tabs.map((tab) => {
    if (tab.id !== id) return tab;
    const updated = fn(tab);
    if (updated !== tab) changed = true;
    return updated;
  });
  return changed ? next : tabs;
}
var newTabId = () => `tab_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
var trimName = (name) => String(name ?? "").trim().slice(0, 30);
function addTab(tabs, name, cards = [], options = {}) {
  const trimmed = trimName(name);
  if (!trimmed) return { tabs, id: null };
  const id = newTabId();
  const list = [...new Set(cards.filter(isKnownCard))];
  return { tabs: [...tabs, { id, name: trimmed, cards: list, options: cleanOptions(options, list) }], id };
}
function duplicateTab(tabs, id, name) {
  const source = tabs.find((tab) => tab.id === id);
  const trimmed = trimName(name);
  if (!source || !trimmed) return { tabs, id: null };
  const copy = { id: newTabId(), name: trimmed, cards: [...source.cards], options: cleanOptions(structuredClone(source.options ?? {}), source.cards) };
  const next = [...tabs];
  next.splice(tabs.indexOf(source) + 1, 0, copy);
  return { tabs: next, id: copy.id };
}
function addTemplateTab(tabs, templateId, name) {
  const template = PAGE_TEMPLATES.find((entry) => entry.id === templateId);
  return addTab(tabs, name, template ? template.cards : []);
}
function renameTab(tabs, id, name) {
  const trimmed = trimName(name);
  if (!trimmed) return tabs;
  return tabs.map((tab) => tab.id === id ? { ...tab, name: trimmed, labelKey: void 0 } : tab);
}
function removeTab(tabs, id) {
  return id === "home" ? tabs : tabs.filter((tab) => tab.id !== id);
}
function moveTab(tabs, id, delta) {
  const from = tabs.findIndex((tab) => tab.id === id);
  const to = from + delta;
  if (from < 1 || to < 1 || to >= tabs.length) return tabs;
  const next = [...tabs];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}
function reorderTab(tabs, id, beforeId, after = false) {
  if (id === beforeId || id === "home") return tabs;
  const moving = tabs.find((tab) => tab.id === id);
  const target = tabs.findIndex((tab) => tab.id === beforeId);
  if (!moving || target < 0) return tabs;
  if (beforeId === "home") after = true;
  const rest = tabs.filter((tab) => tab.id !== id);
  rest.splice(rest.findIndex((tab) => tab.id === beforeId) + (after ? 1 : 0), 0, moving);
  return rest;
}
function addCard(tabs, tabId, cardId) {
  if (!isKnownCard(cardId)) return tabs;
  return patchTab(tabs, tabId, (tab) => tab.cards.includes(cardId) ? tab : { ...tab, cards: [...tab.cards, cardId] });
}
function removeCard(tabs, tabId, cardId) {
  return patchTab(tabs, tabId, (tab) => {
    if (!tab.cards.includes(cardId)) return tab;
    const { [cardId]: _dropped, ...options } = tab.options ?? {};
    return { ...tab, cards: tab.cards.filter((id) => id !== cardId), options };
  });
}
function moveCard(tabs, tabId, cardId, delta) {
  return patchTab(tabs, tabId, (tab) => {
    const from = tab.cards.indexOf(cardId);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= tab.cards.length) return tab;
    const cards = [...tab.cards];
    cards.splice(to, 0, cards.splice(from, 1)[0]);
    return { ...tab, cards };
  });
}
function reorderCard(tabs, tabId, cardId, beforeId, after = false) {
  return patchTab(tabs, tabId, (tab) => {
    if (cardId === beforeId || !tab.cards.includes(cardId) || !tab.cards.includes(beforeId)) return tab;
    const cards = tab.cards.filter((id) => id !== cardId);
    cards.splice(cards.indexOf(beforeId) + (after ? 1 : 0), 0, cardId);
    return { ...tab, cards };
  });
}
function moveCardToTab(tabs, fromId, toId, cardId) {
  const from = tabs.find((tab) => tab.id === fromId);
  const to = tabs.find((tab) => tab.id === toId);
  if (!from || !to || fromId === toId || !from.cards.includes(cardId) || to.cards.includes(cardId)) return tabs;
  return tabs.map((tab) => {
    if (tab.id === fromId) {
      const { [cardId]: _moved, ...options } = tab.options ?? {};
      return { ...tab, cards: tab.cards.filter((id) => id !== cardId), options };
    }
    if (tab.id === toId) {
      const carried = from.options?.[cardId];
      return { ...tab, cards: [...tab.cards, cardId], options: carried ? { ...tab.options, [cardId]: carried } : tab.options };
    }
    return tab;
  });
}
function cardOptions(tab, cardId) {
  const meta = CARD_BY_ID.get(cardId);
  const saved = tab?.options?.[cardId] ?? {};
  return {
    ...meta?.limit ? { limit: clampInt(saved.limit, 1, meta.limit.max, meta.limit.def) } : {},
    ...meta?.options?.includes("openAll") ? { openAll: saved.openAll !== false } : {}
  };
}
function setCardOptions(tabs, tabId, cardId, patch) {
  if (!isKnownCard(cardId)) return tabs;
  return patchTab(tabs, tabId, (tab) => {
    if (!tab.cards.includes(cardId)) return tab;
    const merged = { ...tab.options?.[cardId] ?? {}, ...patch };
    return { ...tab, options: { ...tab.options, ...cleanOptions({ [cardId]: merged }, [cardId]) } };
  });
}
function resetTab(tabs, id) {
  const fallback = defaultTabs().find((tab) => tab.id === id);
  if (!fallback) return tabs;
  return tabs.map((tab) => tab.id === id ? { ...tab, cards: [...fallback.cards], options: {} } : tab);
}
function dropAfter(axis, rect, point) {
  return axis === "x" ? point.clientX > rect.left + rect.width / 2 : point.clientY > rect.top + rect.height / 2;
}
function edgeScrollSpeed(y, top, bottom) {
  if (y < top || y > bottom) return 0;
  const zone = Math.min(48, (bottom - top) / 4);
  if (y < top + zone) return -Math.ceil(12 * (1 - (y - top) / zone));
  if (y > bottom - zone) return Math.ceil(12 * (1 - (bottom - y) / zone));
  return 0;
}
var tabName = (tab, t) => tab.name || t(tab.labelKey);

// src/client/cards.jsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var { useEffect, useMemo, useRef, useState } = import_react2.default;
function useNow(intervalMs = 3e4) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);
  return now;
}
var CardChromeContext = import_react2.default.createContext(null);
function Card({ icon: Icon, title, count, actions, children }) {
  const chrome = import_react2.default.useContext(CardChromeContext);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "qh-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "qh-card-head", children: [
      chrome?.handle,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { size: 15 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-card-title", children: title }),
      count ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-card-count", children: count }) : null,
      actions,
      chrome?.menu
    ] }),
    children
  ] });
}
function TodoCard({ t, state, setState, limit = 6 }) {
  const [draft, setDraft] = useState("");
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef(null);
  const todos = state.todos;
  const open = todos.filter((todo) => !todo.done).length;
  const submit = () => {
    const next = addTodo(todos, draft);
    if (next === todos) return;
    setState({ todos: next });
    setShowAll(true);
    setDraft("");
    inputRef.current?.focus();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { icon: IconList, title: t("card.todo"), count: open > 0 ? t("todo.remaining", { count: open }) : "", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "form",
      {
        className: "qh-todo-form",
        onSubmit: (event) => {
          event.preventDefault();
          submit();
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "input",
            {
              ref: inputRef,
              className: "qh-todo-input",
              value: draft,
              placeholder: t("todo.placeholder"),
              maxLength: 200,
              onChange: (event) => setDraft(event.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", className: "qh-todo-add", "aria-label": t("shortcuts.confirm"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlus, { size: 15 }) })
        ]
      }
    ),
    todos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("todo.empty") }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-todo-list", children: (showAll ? todos : todos.slice(0, limit)).map((todo) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `qh-todo-item${todo.done ? " qh-done" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "qh-todo-check",
          "aria-pressed": todo.done,
          onClick: () => setState({ todos: toggleTodo(todos, todo.id) }),
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconCheck, { size: 11, strokeWidth: 2.6 })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-todo-text", children: todo.text }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "qh-todo-del",
          "aria-label": t("action.remove", { name: todo.text }),
          onClick: () => setState({ todos: removeTodo(todos, todo.id) }),
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, { size: 12 })
        }
      )
    ] }, todo.id)) }),
    todos.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("footer", { className: "qh-card-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: open === 0 ? t("todo.allDone") : t("todo.remaining", { count: open }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { flex: 1 } }),
      todos.length > limit ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", "aria-expanded": showAll, onClick: () => setShowAll((value) => !value), children: showAll ? t("quickNote.showLess") : t("quickNote.showAll", { count: todos.length }) }) : null,
      todos.some((todo) => todo.done) ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", onClick: () => setState({ todos: clearDoneTodos(todos) }), children: t("todo.clearDone") }) : null
    ] }) : null
  ] });
}
function timeLabel(t, updatedAt, now) {
  const { unit, n } = relativeTime(updatedAt, now);
  if (unit === "justNow") return t("recent.justNow");
  if (unit === "minutes") return t("recent.minutes", { n });
  if (unit === "hours") return t("recent.hours", { n });
  if (unit === "days") return t("recent.days", { n });
  const date = new Date(updatedAt);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}
function recentSessions(list, archived = [], limit = 5) {
  if (!list?.ids) return [];
  const archivedSet = new Set(archived);
  return list.ids.map((id) => list.byId[id]).filter((row) => row && !row.blank && !archivedSet.has(row.id)).sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)).slice(0, limit);
}
function RecentCard({ t, services, limit = 5 }) {
  const now = useNow(3e4);
  const listSource = services.sessions?.list;
  const list = useExternalStore(
    listSource ? (fn) => listSource.subscribe(fn) : null,
    listSource ? () => listSource.getSnapshot() : () => null
  );
  const archived = services.workspaces?.list?.getSnapshot?.().archivedSessionIds ?? [];
  const items = useMemo(() => recentSessions(list, archived, limit), [list, archived, limit]);
  const open = (id) => services.uiWorkspace?.openSession?.(id);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { icon: IconMessage, title: t("card.recent"), children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("recent.empty") }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-btn qh-accent", onClick: () => services.uiWorkspace?.startSession?.(), children: t("recent.new") }) })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: items.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "qh-session-row", onClick: () => open(row.id), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconMessage, { size: 14 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-session-title", children: row.title?.trim() || t("recent.untitled") }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-session-time", children: timeLabel(t, row.updatedAt ?? 0, now) })
  ] }, row.id)) }) });
}
function useExternalStore(subscribe, getSnapshot) {
  return import_react2.default.useSyncExternalStore(
    subscribe ?? (() => () => {
    }),
    getSnapshot,
    getSnapshot
  );
}
var TILE_ICONS = {
  link: IconLink,
  globe: IconGlobe,
  folder: IconFolder,
  book: IconBook,
  home: IconHome,
  pen: IconPen,
  notebook: IconNotebook,
  target: IconTarget,
  flame: IconFlame,
  zap: IconZap,
  calendar: IconCalendar,
  sun: IconSun
};
function TileIcon({ item }) {
  const [failed, setFailed] = useState(false);
  if (item.kind === "session") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlus, { size: 18 });
  if (item.kind === "workspace") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconFolder, { size: 18 });
  const Custom = item.icon && item.icon !== FAVICON ? TILE_ICONS[item.icon] : null;
  if (Custom) return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Custom, { size: 18 });
  const icon = !failed && item.url ? faviconUrl(item.url) : null;
  if (icon) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: icon, alt: "", loading: "lazy", onError: () => setFailed(true) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconGlobe, { size: 18 });
}
function ShortcutGroupCard({ t, state, setState, services, groupId = DEFAULT_GROUP_ID }) {
  const chrome = import_react2.default.useContext(CardChromeContext);
  const group = state.shortcutGroups.find((entry) => entry.id === groupId);
  const dragging = useRef(null);
  const [marker, setMarker] = useState(null);
  if (!group) return null;
  const builtins = groupId === DEFAULT_GROUP_ID ? [
    { id: "__new", kind: "session", label: t("shortcuts.newSession"), run: () => services.uiWorkspace?.startSession?.() },
    {
      id: "__workspace",
      kind: "workspace",
      label: t("shortcuts.openWorkspace"),
      run: async () => {
        const path = await services.uiWorkspace?.pickDirectory?.();
        if (!path) return;
        try {
          const workspace = await services.workspaces?.create?.({ path });
          if (workspace?.workspaceId) await services.uiWorkspace?.openWorkspace?.(workspace.workspaceId);
        } catch {
        }
      }
    }
  ] : [];
  const custom = group.items.map((item) => ({ ...item, run: () => globalThis.open(item.url, "_blank", "noopener") }));
  const update = (groups) => setState({ shortcutGroups: groups });
  const itemMenu = (event, item) => {
    const index = group.items.findIndex((entry) => entry.id === item.id);
    chrome?.openMenu?.(event, [
      { label: t("shortcuts.edit"), icon: IconPen, onSelect: () => chrome.openDialog({ type: "shortcut", groupId, itemId: item.id }) },
      { label: t("layout.earlier"), icon: IconArrowLeft, disabled: index === 0, onSelect: () => update(moveItem(state.shortcutGroups, groupId, item.id, -1)) },
      { label: t("layout.later"), icon: IconArrowRight, disabled: index === group.items.length - 1, onSelect: () => update(moveItem(state.shortcutGroups, groupId, item.id, 1)) },
      { separator: true },
      { label: t("layout.remove"), icon: IconTrash, danger: true, onSelect: () => chrome.commit({ shortcutGroups: removeItem(state.shortcutGroups, groupId, item.id) }, t("toast.removed", { name: item.label })) }
    ]);
  };
  const dragProps = (item) => chrome?.editing ? {
    draggable: true,
    onDragStart: (event) => {
      dragging.current = item.id;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-qiaomu-home-shortcut", item.id);
    },
    onDragEnd: () => {
      dragging.current = null;
      setMarker(null);
    },
    onDragOver: (event) => {
      if (!dragging.current || dragging.current === item.id) return;
      event.preventDefault();
      const side = dropAfter("x", event.currentTarget.getBoundingClientRect(), event) ? "after" : "before";
      setMarker((current) => current?.id === item.id && current.side === side ? current : { id: item.id, side });
    },
    onDragLeave: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setMarker((current) => current?.id === item.id ? null : current);
    },
    onDrop: (event) => {
      if (!dragging.current || dragging.current === item.id) return;
      event.preventDefault();
      event.stopPropagation();
      const after = dropAfter("x", event.currentTarget.getBoundingClientRect(), event);
      const from = dragging.current;
      dragging.current = null;
      setMarker(null);
      update(reorderItem(state.shortcutGroups, groupId, from, item.id, after));
    }
  } : {};
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    Card,
    {
      icon: IconLink,
      title: group.name || t("card.shortcuts"),
      actions: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-icon-btn", style: { width: 24, height: 24 }, "aria-label": t("shortcuts.add"), onClick: () => chrome?.openDialog?.({ type: "shortcut", groupId }), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlus, { size: 13 }) }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-tiles", children: [...builtins, ...custom].map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "span",
          {
            className: "qh-tile-wrap",
            ...item.kind === "url" ? dragProps(item) : {},
            ...marker?.id === item.id ? { "data-drop-marker": "", "data-drop-axis": "x", "data-drop-side": marker.side } : {},
            onContextMenu: item.kind === "url" ? (event) => {
              event.preventDefault();
              itemMenu(event, item);
            } : void 0,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "qh-tile", onClick: item.run, title: item.url || item.label, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-tile-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TileIcon, { item }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-tile-label", children: item.label })
              ] }),
              item.kind === "url" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-tile-more", "aria-label": t("shortcuts.menuFor", { name: item.label }), "aria-haspopup": "menu", onClick: (event) => itemMenu(event, item), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconMore, { size: 12 }) }) : null
            ]
          },
          item.id
        )) }),
        !custom.length ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("shortcuts.empty") }) : null
      ]
    }
  );
}
var FOCUS_PRESETS = [15, 25, 45, 60];
var DIAL_R = 52;
var DIAL_C = 2 * Math.PI * DIAL_R;
function FocusCard({ t, state, setState }) {
  const now = useNow(500);
  const focus = state.focus;
  const running = focus.endAt > now;
  const remainingMs = running ? focus.endAt - now : focus.remainingMs;
  const totalMs = focus.minutes * 6e4;
  const fraction = totalMs > 0 ? Math.min(1, Math.max(0, remainingMs / totalMs)) : 0;
  const mm = Math.floor(Math.max(0, remainingMs) / 6e4);
  const ss = String(Math.floor(Math.max(0, remainingMs) % 6e4 / 1e3)).padStart(2, "0");
  useEffect(() => {
    if (focus.endAt > 0 && focus.endAt <= now && focus.remainingMs !== 0) {
      setState({ focus: { ...focus, endAt: 0, remainingMs: 0 } });
    }
  }, [now, focus, setState]);
  const pick = (minutes) => {
    if (running) return;
    setState({ focus: { minutes, endAt: 0, remainingMs: minutes * 6e4 } });
  };
  const start = () => setState({ focus: { ...focus, endAt: Date.now() + (focus.remainingMs || totalMs), remainingMs: focus.remainingMs || totalMs } });
  const pause = () => setState({ focus: { ...focus, endAt: 0, remainingMs: Math.max(0, focus.endAt - Date.now()) } });
  const reset = () => setState({ focus: { minutes: focus.minutes, endAt: 0, remainingMs: focus.minutes * 6e4 } });
  const status = running ? t("focus.running") : focus.remainingMs === 0 ? t("focus.done") : focus.remainingMs < totalMs ? t("focus.paused") : t("focus.idle");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { icon: IconTimer, title: t("card.focus"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-focus", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-focus-dial", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { width: "128", height: "128", viewBox: "0 0 120 120", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "qh-focus-track", cx: "60", cy: "60", r: DIAL_R }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "circle",
          {
            className: "qh-focus-arc",
            cx: "60",
            cy: "60",
            r: DIAL_R,
            transform: "rotate(-90 60 60)",
            strokeDasharray: DIAL_C,
            strokeDashoffset: DIAL_C * (1 - fraction)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-focus-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-focus-clock", children: `${mm}:${ss}` }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-focus-status", children: status })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-focus-presets", role: "group", children: FOCUS_PRESETS.map((minutes) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        type: "button",
        className: `qh-chip${focus.minutes === minutes ? " qh-active" : ""}`,
        "aria-pressed": focus.minutes === minutes,
        disabled: running,
        onClick: () => pick(minutes),
        children: t("focus.minutes", { minutes })
      },
      minutes
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-focus-controls", children: [
      running ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "qh-btn", onClick: pause, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPause, { size: 12 }),
        " ",
        t("focus.pause")
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "qh-btn qh-accent", onClick: start, disabled: focus.remainingMs === 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlay, { size: 12 }),
        " ",
        focus.remainingMs < totalMs && focus.remainingMs > 0 ? t("focus.resume") : t("focus.start")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "qh-btn", onClick: reset, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconRefresh, { size: 12 }),
        " ",
        t("focus.reset")
      ] })
    ] })
  ] }) });
}
function ProgressCard({ t }) {
  const now = useNow(6e4);
  const progress = timeProgress(new Date(now));
  const rows = [
    ["progress.today", progress.day],
    ["progress.week", progress.week],
    ["progress.month", progress.month],
    ["progress.year", progress.year]
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { icon: IconGauge, title: t("card.progress"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-progress-rows", children: rows.map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-progress-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-progress-label", children: t(key) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-progress-bar", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-progress-fill", style: { width: `${(value * 100).toFixed(1)}%` } }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-progress-value", children: `${Math.floor(value * 100)}%` })
  ] }, key)) }) });
}
function WorldClockCard({ t, lang }) {
  const now = useNow(3e4);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { icon: IconClock, title: t("card.worldclock"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-clock-rows", children: DEFAULT_ZONES.map((city) => {
    let value;
    try {
      value = zonedTime(new Date(now), city.zone);
    } catch {
      return null;
    }
    const offset = value.offset > 0 ? t("worldclock.tomorrow") : value.offset < 0 ? t("worldclock.yesterday") : "";
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-clock-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-clock-city", children: lang === "zh" ? city.label : city.labelEn }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-clock-offset", children: offset }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-clock-time", children: value.time })
    ] }, city.zone);
  }) }) });
}
function QuoteCard({ t, lang, state, setState }) {
  const quotes = BUILTIN_QUOTES[lang] ?? BUILTIN_QUOTES.en;
  const index = dailyIndex(dayKey(), quotes.length, state.quoteShift);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    Card,
    {
      icon: IconQuote,
      title: t("card.quote"),
      actions: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "qh-icon-btn",
          style: { width: 24, height: 24 },
          "aria-label": t("quote.another"),
          title: t("quote.another"),
          onClick: () => setState({ quoteShift: (state.quoteShift + 1) % quotes.length }),
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconRefresh, { size: 12 })
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "qh-quote-text", children: quotes[index] })
    }
  );
}
var WEATHER_ICONS = {
  sun: IconSun,
  "cloud-sun": IconCloudSun,
  cloud: IconCloud,
  "cloud-fog": IconCloudFog,
  "cloud-drizzle": IconCloudRain,
  "cloud-rain": IconCloudRain,
  "cloud-snow": IconCloudSnow,
  "cloud-lightning": IconCloudLightning
};
function WeatherCard({ t, lang, state, setState }) {
  const place = state.weatherPlace ?? null;
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle");
  const [nonce, setNonce] = useState(0);
  const [picking, setPicking] = useState(false);
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState(null);
  const seqRef = useRef(0);
  useEffect(() => {
    if (!place) {
      setWeather(null);
      setStatus("idle");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    fetch(weatherUrl(place)).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    }).then((json) => {
      if (cancelled) return;
      setWeather(parseWeather(json));
      setStatus("ready");
    }).catch(() => {
      if (!cancelled) setStatus("error");
    });
    return () => {
      cancelled = true;
    };
  }, [place?.latitude, place?.longitude, nonce]);
  useEffect(() => {
    const value = query.trim();
    if (!picking || !value) {
      setPlaces(null);
      return;
    }
    const seq = ++seqRef.current;
    setPlaces("loading");
    const timer = setTimeout(() => {
      searchWeatherPlaces(value, lang).then((found) => {
        if (seqRef.current === seq) setPlaces(found);
      }).catch(() => {
        if (seqRef.current === seq) setPlaces("error");
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, picking, lang]);
  const pick = (entry) => {
    setState({ weatherPlace: entry });
    setPicking(false);
    setQuery("");
    setPlaces(null);
    setNonce((n) => n + 1);
  };
  const dayLabels = [t("weather.today"), t("weather.tomorrow"), t("weather.afterTomorrow")];
  const searchBox = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-weather-search", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "input",
      {
        className: "qh-todo-input",
        value: query,
        placeholder: t("weather.search"),
        "aria-label": t("weather.search"),
        onChange: (event) => setQuery(event.target.value),
        onKeyDown: (event) => {
          if (event.key === "Escape") setPicking(false);
          if (event.key === "Enter" && Array.isArray(places) && places.length) {
            event.preventDefault();
            pick(places[0]);
          }
        },
        autoFocus: picking && !place
      }
    ),
    places === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("weather.searching") }) : null,
    places === "error" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("weather.searchError") }) : null,
    Array.isArray(places) && places.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("weather.noResults") }) : null,
    Array.isArray(places) && places.length ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-weather-places", role: "listbox", "aria-label": t("weather.search"), children: places.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", role: "option", "aria-selected": "false", className: "qh-weather-place", onClick: () => pick(entry), children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-weather-place-name", children: entry.name }),
      entry.detail ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-weather-place-detail", children: entry.detail }) : null
    ] }, `${entry.name}:${entry.latitude.toFixed(3)}:${entry.longitude.toFixed(3)}`)) }) : null
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    Card,
    {
      icon: IconSun,
      title: t("card.weather"),
      actions: place ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", onClick: () => setPicking((value) => !value), children: t("weather.change") }) : null,
      children: [
        place ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-weather-city", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: place.name }),
          place.detail ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-weather-place-detail", children: place.detail }) : null
        ] }) : null,
        picking || !place ? searchBox : null,
        !place && !picking ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("weather.choose") }) : null,
        place && status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("weather.loading") }) : null,
        place && status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", onClick: () => setNonce((n) => n + 1), children: t("weather.error") }) : null,
        place && status === "ready" && weather ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-weather-now", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-weather-icon", children: import_react2.default.createElement(WEATHER_ICONS[weatherKind(weather.current.code).icon] ?? IconCloud, { size: 30 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-weather-temp", children: `${Math.round(weather.current.temperature)}\xB0` }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "qh-weather-meta", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-weather-cond", children: lang === "zh" ? weatherKind(weather.current.code).zh : weatherKind(weather.current.code).en }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-weather-feels", children: t("weather.feels", { value: Math.round(weather.current.feels) }) })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-weather-days", children: weather.days.map((day, index) => {
            const kind = weatherKind(day.code);
            const DayIcon = WEATHER_ICONS[kind.icon] ?? IconCloud;
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-weather-day", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-weather-day-label", children: dayLabels[index] ?? day.day }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DayIcon, { size: 15 }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-weather-day-temp", children: `${Math.round(day.min)}\xB0 / ${Math.round(day.max)}\xB0` })
            ] }, day.day);
          }) })
        ] }) : null
      ]
    }
  );
}
function DailyFocusCard({ t, state, setState }) {
  const [draft, setDraft] = useState("");
  const today = dayKey();
  const focus = ensureDailyFocus(state.dailyFocus, today);
  useEffect(() => {
    if (state.dailyFocus?.date !== today) setState({ dailyFocus: focus });
  }, [today]);
  const items = focus.items;
  const submit = () => {
    const next = addFocusItem(focus, draft);
    if (next === focus) return;
    setState({ dailyFocus: next });
    setDraft("");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { icon: IconTarget, title: t("card.dailyFocus"), count: `${items.filter((i) => i.done).length}/${items.length || 3}`, children: [
    items.length < 3 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "form",
      {
        className: "qh-todo-form",
        onSubmit: (event) => {
          event.preventDefault();
          submit();
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "input",
            {
              className: "qh-todo-input",
              value: draft,
              placeholder: t("dailyFocus.placeholder"),
              maxLength: 120,
              onChange: (event) => setDraft(event.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", className: "qh-todo-add", "aria-label": t("shortcuts.confirm"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlus, { size: 15 }) })
        ]
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("dailyFocus.full") }),
    items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("dailyFocus.empty") }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-todo-list", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `qh-todo-item${item.done ? " qh-done" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "qh-todo-check",
          "aria-pressed": item.done,
          onClick: () => setState({
            dailyFocus: { ...focus, items: items.map((entry) => entry.id === item.id ? { ...entry, done: !entry.done } : entry) }
          }),
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconCheck, { size: 11, strokeWidth: 2.6 })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-todo-text", children: item.text }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "qh-todo-del",
          "aria-label": t("action.remove", { name: item.text }),
          onClick: () => setState({ dailyFocus: { ...focus, items: items.filter((entry) => entry.id !== item.id) } }),
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, { size: 12 })
        }
      )
    ] }, item.id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("footer", { className: "qh-card-foot", children: t("dailyFocus.hint") })
  ] });
}
function QuickNoteCard({ t, state, setState, limit = 6 }) {
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const notes = state.quickNotes;
  const submit = () => {
    const next = addQuickNote(notes, draft);
    if (next === notes) return;
    setState({ quickNotes: next });
    setDraft("");
  };
  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(quickNotesMarkdown(notes));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    Card,
    {
      icon: IconZap,
      title: t("card.quickNote"),
      count: notes.length > 0 ? String(notes.length) : "",
      actions: notes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-icon-btn", style: { width: 24, height: 24 }, "aria-label": t("quickNote.copy"), title: t("quickNote.copy"), onClick: copyAll, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconCopy, { size: 12 }) }) : null,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "form",
          {
            className: "qh-todo-form",
            onSubmit: (event) => {
              event.preventDefault();
              submit();
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "input",
                {
                  className: "qh-todo-input",
                  value: draft,
                  placeholder: t("quickNote.placeholder"),
                  maxLength: 500,
                  onChange: (event) => setDraft(event.target.value)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", className: "qh-todo-add", "aria-label": t("shortcuts.confirm"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlus, { size: 15 }) })
            ]
          }
        ),
        notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("quickNote.empty") }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-note-list", children: (expanded ? notes : notes.slice(0, limit)).map((note) => {
          const date = new Date(note.time);
          const stamp = `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-note-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-note-time", children: stamp }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-note-text", children: note.text }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "qh-todo-del",
                "aria-label": t("action.remove", { name: note.text }),
                onClick: () => setState({ quickNotes: notes.filter((entry) => entry.id !== note.id) }),
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, { size: 12 })
              }
            )
          ] }, note.id);
        }) }),
        notes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("footer", { className: "qh-card-foot", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: copied ? t("quickNote.copied") : "" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { flex: 1 } }),
          notes.length > limit ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", onClick: () => setExpanded((value) => !value), children: expanded ? t("quickNote.showLess") : t("quickNote.showAll", { count: notes.length }) }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", onClick: () => setState({ quickNotes: [] }), children: t("quickNote.clear") })
        ] }) : null
      ]
    }
  );
}
function ScratchpadCard({ t, state, setState }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { icon: IconNotebook, title: t("card.scratchpad"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "textarea",
    {
      className: "qh-scratchpad",
      value: state.scratchpad,
      placeholder: t("scratchpad.placeholder"),
      rows: 6,
      onChange: (event) => setState({ scratchpad: event.target.value })
    }
  ) });
}
function HabitCard({ t, state, setState }) {
  const [draft, setDraft] = useState("");
  const today = dayKey();
  const days = lastNDays(7);
  const habits = state.habits;
  const log = state.habitLog;
  const submit = () => {
    const next = addHabit(habits, draft);
    if (next === habits) return;
    setState({ habits: next });
    setDraft("");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { icon: IconFlame, title: t("card.habit"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "form",
      {
        className: "qh-todo-form",
        onSubmit: (event) => {
          event.preventDefault();
          submit();
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { className: "qh-todo-input", value: draft, placeholder: t("habit.add"), maxLength: 32, onChange: (event) => setDraft(event.target.value) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", className: "qh-todo-add", "aria-label": t("shortcuts.confirm"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlus, { size: 15 }) })
        ]
      }
    ),
    habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("habit.empty") }) : null,
    habits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-habit-grid-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", {}),
        days.map((day) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `qh-habit-day${day === today ? " qh-today" : ""}`, children: Number(day.slice(8)) }, day)),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", {})
      ] }),
      habits.map((habit) => {
        const count = log[habit.id]?.[today] ?? 0;
        const reached = count >= habit.target;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-habit-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-habit-name", title: habit.name, children: habit.name }),
          days.map((day) => {
            const value = log[habit.id]?.[day] ?? 0;
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `qh-habit-dot${value >= habit.target ? " qh-full" : value > 0 ? " qh-part" : ""}` }, day);
          }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "qh-habit-actions", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: `qh-habit-check${reached ? " qh-done" : ""}`,
                title: t("habit.today", { count, target: habit.target }),
                onClick: () => setState({
                  habitLog: reached ? uncheckHabit(log, habit.id, today) : checkinHabit(log, habit.id, today, habit.target)
                }),
                children: reached ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconCheck, { size: 10, strokeWidth: 2.6 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlus, { size: 10, strokeWidth: 2.4 })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "qh-todo-del",
                "aria-label": t("action.remove", { name: habit.name }),
                onClick: () => setState({ habits: habits.filter((entry) => entry.id !== habit.id) }),
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, { size: 11 })
              }
            )
          ] })
        ] }, habit.id);
      })
    ] }) : null
  ] });
}
function CountdownCard({ t, state, setState }) {
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("");
  const configured = /^\d{4}-\d{2}-\d{2}$/.test(state.countdown.date);
  const diff = configured ? daysBetween(state.countdown.date, dayKey()) : null;
  const save = () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    setState({ countdown: { date, label: label.trim().slice(0, 30) } });
    setEditing(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    Card,
    {
      icon: IconHourglass,
      title: t("card.countdown"),
      actions: configured && !editing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-icon-btn", style: { width: 24, height: 24 }, "aria-label": t("countdown.edit"), onClick: () => {
        setDate(state.countdown.date);
        setLabel(state.countdown.label);
        setEditing(true);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPen, { size: 12 }) }) : null,
      children: [
        !configured && !editing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("countdown.unset") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-btn qh-accent", onClick: () => {
            setDate("");
            setLabel("");
            setEditing(true);
          }, children: t("countdown.set") }) })
        ] }) : null,
        editing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "form",
          {
            className: "qh-shortcut-form",
            onSubmit: (event) => {
              event.preventDefault();
              save();
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "date", value: date, onChange: (event) => setDate(event.target.value), "aria-label": t("countdown.set") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { value: label, placeholder: t("countdown.label"), maxLength: 30, onChange: (event) => setLabel(event.target.value) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-btn", onClick: () => setEditing(false), children: t("shortcuts.cancel") }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", className: "qh-btn qh-accent", children: t("shortcuts.confirm") })
              ] })
            ]
          }
        ) : null,
        configured && !editing && diff !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-countdown", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-countdown-number", children: [
            diff === 0 ? t("countdown.today") : Math.abs(diff),
            diff !== 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-countdown-unit", children: t("countdown.days") }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-countdown-label", children: [
            state.countdown.label || state.countdown.date,
            " \xB7 ",
            diff === 0 ? state.countdown.date : diff > 0 ? t("countdown.left", { n: diff }) : t("countdown.passed", { n: -diff })
          ] })
        ] }) : null
      ]
    }
  );
}
function DailyQuestionCard({ t, lang, state, setState }) {
  const questions = DAILY_QUESTIONS[lang] ?? DAILY_QUESTIONS.en;
  const today = dayKey();
  const question = questions[dailyIndex(today, questions.length)];
  const answer = state.answers[today] ?? "";
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef(0);
  const onChange = (value) => {
    setState({ answers: { ...state.answers, [today]: value } });
    setSaved(false);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaved(true), 600);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { icon: IconHelpCircle, title: t("card.dailyQuestion"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "qh-quote-text", children: question }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "textarea",
      {
        className: "qh-scratchpad",
        value: answer,
        placeholder: t("dailyQuestion.placeholder"),
        rows: 3,
        onChange: (event) => onChange(event.target.value)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("footer", { className: "qh-card-foot", children: saved && answer.trim() ? t("dailyQuestion.saved") : "" })
  ] });
}
function MultiSearchCard({ t, lang, state, setState, openAll = true }) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [templateError, setTemplateError] = useState(null);
  const custom = parseSearchTemplates(state.searchTemplates ?? "");
  const customSites = custom.ok ? custom.sites : [];
  const groupId = SEARCH_GROUPS.some((entry) => entry.id === state.searchGroup) ? state.searchGroup : SEARCH_GROUPS[0].id;
  const sites = groupSites(groupId, customSites);
  const siteIds = new Set(sites.map((entry) => entry.id));
  const saved = (state.searchEnginesByGroup ?? {})[groupId];
  const knownSaved = Array.isArray(saved) ? saved.filter((id) => siteIds.has(id)) : [];
  const legacy = groupId === SEARCH_GROUPS[0].id ? (Array.isArray(state.searchEngines) ? state.searchEngines : []).filter((id) => siteIds.has(id)) : [];
  const selected = knownSaved.length ? knownSaved : legacy.length ? legacy : defaultSiteIds(groupId, customSites);
  const active = sites.filter((entry) => selected.includes(entry.id));
  const selectGroup = (id) => {
    if (id !== groupId) setState({ searchGroup: id });
  };
  const toggle = (id) => {
    const next = selected.includes(id) ? selected.filter((entry) => entry !== id) : [...selected, id];
    if (!next.length) return;
    setState({ searchEnginesByGroup: { ...state.searchEnginesByGroup ?? {}, [groupId]: next } });
  };
  const search = () => {
    const value = query.trim();
    if (!value || !active.length) return;
    for (const site of openAll ? active : active.slice(0, 1)) globalThis.open(discoveryUrl(site, value), "_blank", "noopener");
  };
  const saveTemplates = () => {
    const parsed = parseSearchTemplates(draft);
    if (!parsed.ok) {
      setTemplateError(t(parsed.error.key, parsed.error.params));
      return parsed;
    }
    setState({ searchTemplates: draft.trim() });
    setTemplateError(null);
    setEditing(false);
    setDraft("");
    return parsed;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { icon: IconSearch, title: t("card.multiSearch"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-focus-presets", role: "group", "aria-label": t("multiSearch.groups"), children: SEARCH_GROUPS.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        type: "button",
        className: `qh-chip${entry.id === groupId ? " qh-active" : ""}`,
        "aria-pressed": entry.id === groupId,
        onClick: () => selectGroup(entry.id),
        children: lang === "zh" ? entry.zh : entry.en
      },
      entry.id
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-focus-presets", role: "group", "aria-label": t("multiSearch.sites"), children: sites.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        type: "button",
        className: `qh-chip${selected.includes(entry.id) ? " qh-active" : ""}`,
        "aria-pressed": selected.includes(entry.id),
        onClick: () => toggle(entry.id),
        children: lang === "zh" ? entry.zh : entry.en
      },
      entry.id
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "form",
      {
        className: "qh-todo-form",
        onSubmit: (event) => {
          event.preventDefault();
          search();
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { className: "qh-todo-input", value: query, placeholder: t("multiSearch.placeholder"), onChange: (event) => setQuery(event.target.value) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", className: "qh-todo-add", "aria-label": t("multiSearch.open"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconSearch, { size: 14 }) })
        ]
      }
    ),
    editing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-templates", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "textarea",
        {
          className: "qh-templates-input",
          value: draft,
          rows: 3,
          placeholder: t("multiSearch.templatePlaceholder"),
          "aria-label": t("multiSearch.templates"),
          onChange: (event) => setDraft(event.target.value)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-card-foot", children: [
        templateError ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: templateError }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", onClick: saveTemplates, children: t("shortcuts.confirm") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", onClick: () => {
          setEditing(false);
          setDraft("");
          setTemplateError(null);
        }, children: t("shortcuts.cancel") })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-card-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: openAll && active.length > 1 ? t("multiSearch.openAllHint", { count: active.length }) : t("multiSearch.openFirstHint", { name: lang === "zh" ? active[0].zh : active[0].en }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", onClick: () => {
        setDraft(state.searchTemplates ?? "");
        setEditing(true);
      }, children: t("multiSearch.templates") })
    ] })
  ] });
}
function HeatmapCard({ t, services }) {
  const listSource = services.sessions?.list;
  const list = useExternalStore(
    listSource ? (fn) => listSource.subscribe(fn) : null,
    listSource ? () => listSource.getSnapshot() : () => null
  );
  const { days, counts, max } = useMemo(() => {
    const days2 = lastNDays(70);
    const counts2 = activityByDay(list?.byId);
    let max2 = 0;
    for (const value of counts2.values()) max2 = Math.max(max2, value);
    return { days: days2, counts: counts2, max: max2 };
  }, [list]);
  const today = dayKey();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { icon: IconGrid, title: t("card.heatmap"), children: max === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("heatmap.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-heatmap", role: "img", "aria-label": t("card.heatmap"), children: days.map((day) => {
      const count = counts.get(day) ?? 0;
      const level = heatIntensity(count, max);
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `qh-heat qh-heat-${level}${day === today ? " qh-today" : ""}`, title: `${day} \xB7 ${count}` }, day);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("footer", { className: "qh-card-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("heatmap.less") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-heat qh-heat-1" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-heat qh-heat-2" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-heat qh-heat-3" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-heat qh-heat-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("heatmap.more") })
    ] })
  ] }) });
}
var NOISE_KINDS = ["white", "pink", "brown"];
function createNoiseBuffer(audio, kind) {
  const seconds = 2;
  const buffer = audio.createBuffer(1, audio.sampleRate * seconds, audio.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let last = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    if (kind === "white") {
      data[i] = white * 0.5;
    } else if (kind === "pink") {
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.963 * b1 + white * 0.2965164;
      b2 = 0.57 * b2 + white * 1.0526913;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.25;
    } else {
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  }
  return buffer;
}
function AmbientCard({ t }) {
  const [kind, setKind] = useState("brown");
  const [playing, setPlaying] = useState(false);
  const chainRef = useRef(null);
  const stop = () => {
    const chain = chainRef.current;
    chainRef.current = null;
    setPlaying(false);
    if (!chain) return;
    try {
      chain.source.stop();
    } catch {
    }
    chain.audio.close().catch(() => {
    });
  };
  const play = (nextKind) => {
    stop();
    const AudioContext = globalThis.AudioContext ?? globalThis.webkitAudioContext;
    if (!AudioContext) return;
    const audio = new AudioContext();
    const source = audio.createBufferSource();
    source.buffer = createNoiseBuffer(audio, nextKind);
    source.loop = true;
    const gain = audio.createGain();
    gain.gain.value = 0.16;
    source.connect(gain).connect(audio.destination);
    source.start();
    chainRef.current = { audio, source };
    setPlaying(true);
  };
  useEffect(() => () => stop(), []);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { icon: IconWaves, title: t("card.ambient"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-focus-presets", role: "group", children: NOISE_KINDS.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        type: "button",
        className: `qh-chip${entry === kind ? " qh-active" : ""}`,
        "aria-pressed": entry === kind,
        onClick: () => {
          setKind(entry);
          if (playing) play(entry);
        },
        children: t(`ambient.${entry}`)
      },
      entry.id ?? entry
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-focus-controls", style: { justifyContent: "center" }, children: playing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "qh-btn", onClick: stop, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPause, { size: 12 }),
      " ",
      t("ambient.stop")
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "qh-btn qh-accent", onClick: () => play(kind), children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlay, { size: 12 }),
      " ",
      t("ambient.play")
    ] }) })
  ] });
}

// src/client/dialogs.jsx
var import_react4 = __toESM(require("react"), 1);

// src/client/ui.jsx
var import_react3 = __toESM(require("react"), 1);
var import_jsx_runtime3 = require("react/jsx-runtime");
var { useCallback, useEffect: useEffect2, useLayoutEffect, useRef: useRef2, useState: useState2 } = import_react3.default;
var FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Modal({ title, onClose, children, wide = false, label }) {
  const ref = useRef2(null);
  const titleId = import_react3.default.useId();
  useLayoutEffect(() => {
    const previous = document.activeElement;
    const root = ref.current;
    const first = root?.querySelector("[data-autofocus]") ?? root?.querySelector(FOCUSABLE);
    (first ?? root)?.focus();
    return () => {
      if (previous && typeof previous.focus === "function" && previous.isConnected) previous.focus();
    };
  }, []);
  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const nodes = Array.from(ref.current?.querySelectorAll(FOCUSABLE) ?? []).filter((node) => node.offsetParent !== null || node === document.activeElement);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-overlay", onMouseDown: (event) => {
    if (event.target === event.currentTarget) onClose();
  }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      ref,
      className: `qh-modal${wide ? " qh-modal-wide" : ""}`,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": label,
      "aria-labelledby": label ? void 0 : titleId,
      tabIndex: -1,
      onKeyDown,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("header", { className: "qh-modal-head", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { id: titleId, children: title }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-modal-body", children })
      ]
    }
  ) });
}
function MenuList({ anchor, items, onClose, trigger }) {
  const ref = useRef2(null);
  const [pos, setPos] = useState2(null);
  useLayoutEffect(() => {
    const menu = ref.current;
    if (!menu) return;
    const root = menu.offsetParent?.getBoundingClientRect() ?? { left: 0, top: 0, width: innerWidth, height: innerHeight };
    const rect = anchor.rect;
    const width = menu.offsetWidth;
    const height = menu.offsetHeight;
    let left = rect.right - root.left - width;
    let top = rect.bottom - root.top + 6;
    if (left < 8) left = Math.min(rect.left - root.left, root.width - width - 8);
    if (left < 8) left = 8;
    if (top + height > root.height - 8) top = Math.max(8, rect.top - root.top - height - 6);
    setPos({ left, top });
    menu.querySelector('[role="menuitem"]:not([aria-disabled="true"])')?.focus();
  }, [anchor]);
  useEffect2(() => {
    const down = (event) => {
      if (ref.current?.contains(event.target) || trigger?.current?.contains(event.target)) return;
      onClose();
    };
    document.addEventListener("pointerdown", down, true);
    return () => document.removeEventListener("pointerdown", down, true);
  }, [onClose, trigger]);
  const onKeyDown = (event) => {
    const nodes = Array.from(ref.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])') ?? []);
    const index = nodes.indexOf(document.activeElement);
    const go = (next) => {
      event.preventDefault();
      nodes[(next + nodes.length) % nodes.length]?.focus();
    };
    if (event.key === "ArrowDown") go(index + 1);
    else if (event.key === "ArrowUp") go(index < 0 ? nodes.length - 1 : index - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(nodes.length - 1);
    else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
    } else if (event.key === "Tab") onClose();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ref, className: "qh-menu", role: "menu", style: pos ? { left: pos.left, top: pos.top } : { opacity: 0, pointerEvents: "none" }, onKeyDown, children: items.map((item, index) => item.separator ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-menu-sep", role: "separator" }, `sep-${index}`) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "button",
    {
      type: "button",
      role: "menuitem",
      className: `qh-menu-item${item.danger ? " qh-danger" : ""}`,
      "aria-disabled": item.disabled ? "true" : void 0,
      tabIndex: -1,
      onClick: () => {
        if (item.disabled) return;
        onClose();
        item.onSelect();
      },
      children: [
        item.icon ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(item.icon, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "qh-menu-gap" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: item.label })
      ]
    },
    item.key ?? item.label
  )) });
}
function useMenu() {
  const [state, setState] = useState2(null);
  const trigger = useRef2(null);
  const isOpen = useRef2(false);
  const close = useCallback(() => {
    isOpen.current = false;
    setState(null);
    const node = trigger.current;
    trigger.current = null;
    if (node?.isConnected) node.focus();
  }, []);
  const serial = useRef2(0);
  const open = useCallback((source, items) => {
    const element = source?.currentTarget instanceof HTMLElement ? source.currentTarget : source instanceof HTMLElement ? source : null;
    const pointer = source?.type === "contextmenu" || !element;
    if (!pointer && isOpen.current && trigger.current === element) {
      close();
      return;
    }
    trigger.current = element;
    isOpen.current = true;
    const rect = pointer ? { left: source.clientX ?? 0, right: source.clientX ?? 0, top: source.clientY ?? 0, bottom: source.clientY ?? 0 } : element.getBoundingClientRect();
    serial.current += 1;
    setState({ anchor: { rect }, items, serial: serial.current });
  }, [close]);
  const menu = state ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(MenuList, { anchor: state.anchor, items: state.items, onClose: close, trigger }, state.serial) : null;
  return { menu, open, close };
}
function useToasts() {
  const [toasts, setToasts] = useState2([]);
  const timers = useRef2(/* @__PURE__ */ new Map());
  const dismiss = useCallback((id) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);
  const push = useCallback((message, action) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((list) => [...list.slice(-2), { id, message, action }]);
    timers.current.set(id, setTimeout(() => dismiss(id), action ? 7e3 : 3500));
    return id;
  }, [dismiss]);
  useEffect2(() => () => {
    for (const timer of timers.current.values()) clearTimeout(timer);
  }, []);
  return { toasts, push, dismiss };
}
function ToastHost({ toasts, dismiss }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-toasts", role: "status", "aria-live": "polite", children: toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-toast", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: toast.message }),
    toast.action ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "qh-toast-action", onClick: () => {
      dismiss(toast.id);
      toast.action.run();
    }, children: toast.action.label }) : null
  ] }, toast.id)) });
}

// src/client/dialogs.jsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var { useRef: useRef3, useState: useState3 } = import_react4.default;
var TEMPLATE_ICONS = { home: IconHome, work: IconBriefcase, timer: IconTimer, pen: IconPen, book: IconBook, flame: IconFlame, compass: IconCompass };
TEMPLATE_ICONS.notes = IconNotebook;
function NewTabDialog({ t, onCreate, onClose }) {
  const [template, setTemplate] = useState3(null);
  const [name, setName] = useState3("");
  const [touched, setTouched] = useState3(false);
  const [busy, setBusy] = useState3(false);
  const templateName = (id) => id ? t(`template.${id}`) : "";
  const choose = (id) => {
    setTemplate(id);
    if (!touched || !name.trim() || name === templateName(template)) {
      setName(templateName(id));
      setTouched(false);
    }
  };
  const submit = () => {
    const value = name.trim();
    if (!value || busy) return;
    setBusy(true);
    onCreate(value, template);
  };
  const choices = [
    { id: null, Icon: IconSquareDashed, name: t("settings.blankTab"), desc: t("template.blank.desc") },
    ...PAGE_TEMPLATES.map((entry) => ({ id: entry.id, Icon: TEMPLATE_ICONS[entry.icon] ?? IconHome, name: t(`template.${entry.id}`), desc: t(`template.${entry.id}.desc`) }))
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Modal, { title: t("pages.add"), onClose, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("form", { onSubmit: (event) => {
    event.preventDefault();
    submit();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "qh-hint", children: t("template.hint") }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "qh-template-grid", role: "radiogroup", "aria-label": t("settings.tabTemplate"), children: choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": choice.id === template,
        className: "qh-template-option",
        onClick: () => choose(choice.id),
        onKeyDown: (event) => {
          if (event.key !== "ArrowRight" && event.key !== "ArrowDown" && event.key !== "ArrowLeft" && event.key !== "ArrowUp") return;
          event.preventDefault();
          const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
          const nodes = Array.from(event.currentTarget.parentElement.querySelectorAll('[role="radio"]'));
          const next = nodes[(nodes.indexOf(event.currentTarget) + step + nodes.length) % nodes.length];
          next.focus();
          next.click();
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(choice.Icon, { size: 18 }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "qh-template-text", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "qh-template-name", children: choice.name }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "qh-template-desc", children: choice.desc })
          ] })
        ]
      },
      choice.id ?? "blank"
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: "qh-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("settings.tabName") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "text",
          "data-autofocus": true,
          value: name,
          maxLength: 30,
          placeholder: t("pages.example"),
          onChange: (event) => {
            setName(event.target.value);
            setTouched(true);
          }
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("footer", { className: "qh-modal-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-btn", onClick: onClose, children: t("dialog.cancel") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { type: "submit", className: "qh-btn qh-accent", disabled: !name.trim() || busy, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(IconPlus, { size: 13 }),
        t("pages.add")
      ] })
    ] })
  ] }) });
}
function PromptDialog({ title, label, initial, submitText, t, onSubmit, onClose }) {
  const [value, setValue] = useState3(initial);
  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Modal, { title, onClose, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("form", { onSubmit: (event) => {
    event.preventDefault();
    submit();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: "qh-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "text",
          "data-autofocus": true,
          value,
          maxLength: 30,
          onFocus: (event) => event.target.select(),
          onChange: (event) => setValue(event.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("footer", { className: "qh-modal-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-btn", onClick: onClose, children: t("dialog.cancel") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "submit", className: "qh-btn qh-accent", disabled: !value.trim(), children: submitText })
    ] })
  ] }) });
}
function ConfirmDialog({ title, message, confirmText, t, danger = true, onConfirm, onClose }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Modal, { title, onClose, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "qh-confirm-text", children: message }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("footer", { className: "qh-modal-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-btn", "data-autofocus": true, onClick: onClose, children: t("dialog.cancel") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: `qh-btn${danger ? " qh-danger-btn" : " qh-accent"}`, onClick: onConfirm, children: confirmText })
    ] })
  ] });
}
function CardSettingsDialog({ t, tab, cardId, onChange, onClose }) {
  const meta = cardMeta(cardId);
  const options = cardOptions(tab, cardId);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Modal, { title: t("cardSettings.title", { name: t(`card.${cardId}`) }), onClose, children: [
    meta?.limit ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: "qh-field qh-field-inline", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("cardSettings.count") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("select", { "data-autofocus": true, value: options.limit, onChange: (event) => onChange({ limit: Number(event.target.value) }), children: Array.from({ length: meta.limit.max }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: index + 1, children: index + 1 }, index + 1)) })
    ] }) : null,
    meta?.options?.includes("openAll") ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: "qh-field qh-field-inline", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("cardSettings.onEnter") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("select", { "data-autofocus": meta.limit ? void 0 : true, value: options.openAll ? "all" : "first", onChange: (event) => onChange({ openAll: event.target.value === "all" }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "all", children: t("cardSettings.openAll") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "first", children: t("cardSettings.openFirst") })
      ] })
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "qh-hint", children: t("cardSettings.note") }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("footer", { className: "qh-modal-foot", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { type: "button", className: "qh-btn qh-accent", onClick: onClose, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(IconCheck, { size: 13 }),
      t("settings.close")
    ] }) })
  ] });
}
function MoveCardDialog({ t, tabs, fromId, cardId, cardName, tabName: tabName2, onMove, onClose }) {
  const targets = tabs.filter((tab) => tab.id !== fromId);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Modal, { title: t("layout.moveTitle", { name: cardName ?? t(`card.${cardId}`) }), onClose, children: [
    !targets.length ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "qh-hint", children: t("layout.singlePage") }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "qh-move-list", children: targets.map((tab, index) => {
      const exists = tab.cards.includes(cardId);
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "qh-move-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: tabName2(tab, t) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-btn", "data-autofocus": index === 0 ? true : void 0, disabled: exists, onClick: () => onMove(tab.id), children: exists ? t("library.added") : t("layout.move") })
      ] }, tab.id);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("footer", { className: "qh-modal-foot", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-btn", onClick: onClose, children: t("dialog.cancel") }) })
  ] });
}
function AppearanceDialog({ t, state, setState, onReset, onClose }) {
  const modes = ["daily", "open", "gradient"];
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Modal, { title: t("settings.appearance"), onClose, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "qh-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("settings.wallpaper") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "qh-radio-row", role: "group", "aria-label": t("settings.wallpaper"), children: modes.map((mode, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          "data-autofocus": index === 0 ? true : void 0,
          className: `qh-chip${state.wallpaperMode === mode ? " qh-active" : ""}`,
          "aria-pressed": state.wallpaperMode === mode,
          onClick: () => setState({ wallpaperMode: mode }),
          children: t(`settings.wallpaper.${mode}`)
        },
        mode
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: "qh-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("settings.headline") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "text",
          value: state.headline,
          maxLength: 60,
          placeholder: t("settings.headline.placeholder"),
          onChange: (event) => setState({ headline: event.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("footer", { className: "qh-modal-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-btn qh-danger-btn", onClick: onReset, children: t("settings.reset") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { style: { flex: 1 } }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { type: "button", className: "qh-btn qh-accent", onClick: onClose, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(IconCheck, { size: 13 }),
        t("settings.close")
      ] })
    ] })
  ] });
}
function ShortcutDialog({ t, item, onSubmit, onClose }) {
  const [label, setLabel] = useState3(item?.label ?? "");
  const [url, setUrl] = useState3(item?.url ?? "");
  const [icon, setIcon] = useState3(item?.icon ?? FAVICON);
  const [error, setError] = useState3("");
  const href = normalizeUrl(url);
  const submit = () => {
    if (!href) {
      setError(t("shortcuts.invalid"));
      return;
    }
    onSubmit({ label, url: href, icon });
  };
  const host = href ? new URL(href).hostname : "";
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Modal, { title: item ? t("shortcuts.editTitle") : t("shortcuts.addTitle"), onClose, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("form", { onSubmit: (event) => {
    event.preventDefault();
    submit();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: "qh-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("shortcuts.urlLabel") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "text",
          "data-autofocus": true,
          inputMode: "url",
          value: url,
          placeholder: t("shortcuts.urlPlaceholder"),
          "aria-invalid": error ? "true" : void 0,
          onChange: (event) => {
            setUrl(event.target.value);
            setError("");
          }
        }
      ),
      error ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "qh-form-error", role: "alert", children: error }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: "qh-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("shortcuts.nameLabel") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "text",
          value: label,
          maxLength: 120,
          placeholder: host || t("shortcuts.namePlaceholder"),
          onChange: (event) => setLabel(event.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "qh-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("shortcuts.iconLabel") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "qh-icon-choices", role: "group", "aria-label": t("shortcuts.iconLabel"), children: [FAVICON, ...SHORTCUT_ICONS].map((name) => {
        const Icon = TILE_ICONS[name];
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-icon-choice", "aria-pressed": icon === name, "aria-label": t(name === FAVICON ? "shortcuts.siteIcon" : `shortcuts.icon.${name}`), title: t(name === FAVICON ? "shortcuts.siteIcon" : `shortcuts.icon.${name}`), onClick: () => setIcon(name), children: Icon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TILE_ICONS.globe, { size: 16 }) }, name);
      }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("footer", { className: "qh-modal-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-btn", onClick: onClose, children: t("dialog.cancel") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "submit", className: "qh-btn qh-accent", children: item ? t("shortcuts.save") : t("shortcuts.confirm") })
    ] })
  ] }) });
}
function ImportBookmarksDialog({ t, onImport, onClose }) {
  const [bookmarks, setBookmarks] = useState3([]);
  const [status, setStatus] = useState3("");
  const token = useRef3(0);
  const choose = (event) => {
    const file = event.target.files?.[0];
    const current = ++token.current;
    setBookmarks([]);
    setStatus("");
    if (!file) return;
    if (file.size > 2e6) {
      setStatus(t("import.tooLarge"));
      return;
    }
    file.text().then((text) => {
      if (current !== token.current) return;
      const found = parseBookmarks(text);
      setBookmarks(found);
      setStatus(found.length ? "" : t("import.none"));
    }).catch(() => {
      if (current === token.current) setStatus(t("import.failed"));
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Modal, { title: t("import.title"), onClose, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "qh-hint", children: t("import.hint", { max: MAX_IMPORT }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: "qh-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("import.file") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { type: "file", "data-autofocus": true, accept: ".html,.htm,text/html", onChange: choose })
    ] }),
    status ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "qh-form-error", role: "alert", children: status }) : null,
    bookmarks.length ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "qh-import-preview", "aria-live": "polite", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "qh-hint", children: t("import.count", { count: bookmarks.length }) }),
      bookmarks.slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "qh-import-line", children: [
        item.name,
        " \xB7 ",
        new URL(item.url).hostname
      ] }, item.url)),
      bookmarks.length > 8 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "qh-import-line qh-dim", children: t("import.more", { count: bookmarks.length - 8 }) }) : null
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("footer", { className: "qh-modal-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-btn", onClick: onClose, children: t("dialog.cancel") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "qh-btn qh-accent", disabled: !bookmarks.length, onClick: () => onImport(bookmarks), children: t("import.confirm") })
    ] })
  ] });
}

// src/client/library.jsx
var import_react5 = __toESM(require("react"), 1);
var import_jsx_runtime5 = require("react/jsx-runtime");
var { useMemo: useMemo2, useRef: useRef4, useState: useState4 } = import_react5.default;
var CARD_ICONS = {
  dailyFocus: IconTarget,
  todo: IconList,
  recent: IconMessage,
  shortcuts: IconLink,
  quickNote: IconPen,
  scratchpad: IconNotebook,
  dailyQuestion: IconHelpCircle,
  heatmap: IconCalendar,
  focus: IconTimer,
  habit: IconFlame,
  ambient: IconWaves,
  progress: IconGauge,
  worldclock: IconClock,
  quote: IconQuote,
  multiSearch: IconSearch,
  weather: IconSun,
  countdown: IconHourglass
};
var CATEGORY_ICONS = { plan: IconTarget, notes: IconPen, dsh: IconMessage, links: IconLink, focus: IconTimer, time: IconClock, discover: IconCompass };
var remembered = { category: "all", onlyNew: false };
var take = (list, n = 3) => list.filter(Boolean).map((text) => String(text).trim()).filter(Boolean).slice(0, n);
function previewLines(id, { state, services }) {
  switch (id) {
    case "todo":
      return take(state.todos.filter((todo) => !todo.done).map((todo) => todo.text));
    case "recent":
      return take(recentSessions(services?.sessions?.list?.getSnapshot?.(), services?.workspaces?.list?.getSnapshot?.()?.archivedSessionIds ?? [], 3).map((row) => row.title));
    case "quickNote":
      return take(state.quickNotes.map((note) => note.text.split("\n")[0]));
    case "scratchpad":
      return take(state.scratchpad.split("\n"), 2);
    case "dailyFocus":
      return take(state.dailyFocus.items.map((item) => item.text));
    case "habit":
      return take(state.habits.map((habit) => habit.name));
    case "countdown":
      return take([state.countdown.label]);
    default:
      return [];
  }
}
function LibraryDialog({ t, state, services, tabId, onLayout, onCommand, onClose, tabName: tabName2 }) {
  const [targetId, setTargetId] = useState4(tabId);
  const [query, setQuery] = useState4("");
  const [category, setCategoryState] = useState4(remembered.category);
  const [onlyNew, setOnlyNewState] = useState4(remembered.onlyNew);
  const chips = useRef4(null);
  const setCategory = (id) => {
    remembered.category = id;
    setCategoryState(id);
  };
  const setOnlyNew = (value) => {
    remembered.onlyNew = value;
    setOnlyNewState(value);
  };
  const target = state.tabs.find((tab) => tab.id === targetId) ?? state.tabs[0];
  const needle = query.trim().toLocaleLowerCase();
  const modules = useMemo2(() => {
    const place = (id) => ({
      added: target.cards.includes(id),
      elsewhere: state.tabs.filter((tab) => tab.id !== target.id && tab.cards.includes(id)).map((tab) => tabName2(tab, t))
    });
    const catalog = CARD_CATALOG.filter((card) => card.id !== "shortcuts").map((card) => ({
      ...card,
      title: t(card.titleKey),
      description: t(card.descKey),
      ...place(card.id),
      preview: previewLines(card.id, { state, services })
    }));
    const groups = state.shortcutGroups.map((group) => {
      const id = groupCardId(group.id);
      return { id, category: "links", title: group.name || t("card.shortcuts"), description: t("shortcuts.groupDesc"), ...place(id), preview: take(group.items.map((item) => item.label)), icon: IconLink };
    });
    const actions = [
      { id: "__newGroup", action: "newGroup", category: "links", title: t("shortcuts.newGroup"), description: t("shortcuts.newGroupDesc"), icon: IconPlus, elsewhere: [], preview: [] },
      { id: "__import", action: "import", category: "links", title: t("import.title"), description: t("import.desc"), icon: IconFolder, elsewhere: [], preview: [] }
    ];
    return [...catalog, ...groups, ...actions];
  }, [state, services, target, t, tabName2]);
  const searched = modules.filter((card) => (!onlyNew || !card.added) && `${card.title} ${card.description} ${card.preview.join(" ")} ${t(`settings.category.${card.category}`)}`.toLocaleLowerCase().includes(needle));
  const shown = searched.filter((card) => category === "all" || card.category === category);
  const grouped = category === "all" && !needle;
  const chipList = [{ id: "all", count: searched.length }, ...CATEGORIES.map((id) => ({ id, count: searched.filter((card) => card.category === id).length })).filter((chip) => chip.count || chip.id === category)];
  const onChipKey = (event, index) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const nodes = Array.from(chips.current.querySelectorAll("[data-chip]"));
    nodes[(index + (event.key === "ArrowRight" ? 1 : -1) + nodes.length) % nodes.length]?.focus();
  };
  const runAction = (card) => {
    onClose();
    onCommand?.(card.action, target.id);
  };
  const toggle = (card) => onLayout(card.added ? removeCard(state.tabs, target.id, card.id) : addCard(state.tabs, target.id, card.id), card.added ? "remove" : "add", card);
  const renderTile = (card) => {
    const Icon = card.icon ?? CARD_ICONS[card.id] ?? IconGrid;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `qh-lib-tile${card.added ? " qh-added" : ""}`, "data-card": card.id, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "qh-lib-tile-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "qh-lib-tile-title", children: card.title }),
        card.added ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "qh-lib-badge", children: t("library.added") }) : null
      ] }),
      card.elsewhere.length ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "qh-lib-meta", children: t("library.elsewhere", { tabs: card.elsewhere.join("\u3001") }) }) : null,
      card.preview.length ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "qh-lib-preview", children: card.preview.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "qh-lib-preview-line", children: line }, index)) }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "qh-lib-desc", children: card.description }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "qh-lib-actions", children: card.action ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { type: "button", className: "qh-btn qh-accent", "aria-label": card.title, onClick: () => runAction(card), children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconPlus, { size: 13 }),
        t(card.action === "import" ? "import.open" : "shortcuts.newShort")
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "button",
        {
          type: "button",
          className: `qh-btn${card.added ? "" : " qh-accent"}`,
          "aria-label": t(card.added ? "library.removeAria" : "library.addAria", { name: card.title }),
          onClick: () => toggle(card),
          children: [
            card.added ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconMinusCircle, { size: 13 }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconPlus, { size: 13 }),
            t(card.added ? "library.remove" : "library.add")
          ]
        }
      ) })
    ] }, card.id);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Modal, { title: t("library.title"), onClose, wide: true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "qh-lib-context", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("library.target", { name: "" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("select", { value: target.id, "aria-label": t("library.targetAria"), onChange: (event) => setTargetId(event.target.value), children: state.tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: tab.id, children: tabName2(tab, t) }, tab.id)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "input",
      {
        type: "search",
        className: "qh-lib-search",
        "data-autofocus": true,
        value: query,
        placeholder: t("library.searchHint"),
        "aria-label": t("library.search"),
        onChange: (event) => setQuery(event.target.value)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "qh-lib-filters", role: "toolbar", "aria-label": t("library.filterAria"), ref: chips, children: [
      chipList.map((chip, index) => {
        const Icon = CATEGORY_ICONS[chip.id];
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "button",
          {
            type: "button",
            "data-chip": chip.id,
            className: `qh-chip${category === chip.id ? " qh-active" : ""}`,
            "aria-pressed": category === chip.id,
            onClick: () => setCategory(chip.id),
            onKeyDown: (event) => onChipKey(event, index),
            children: [
              Icon ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { size: 13 }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t(`settings.category.${chip.id}`) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "qh-lib-count", children: chip.count })
            ]
          },
          chip.id
        );
      }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "qh-lib-only-new", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "checkbox", checked: onlyNew, onChange: (event) => setOnlyNew(event.target.checked) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("settings.onlyNew") })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "qh-lib-list", children: [
      !shown.length ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "qh-lib-empty", children: t("settings.noCards") }) : null,
      grouped ? CATEGORIES.map((id) => {
        const items = shown.filter((card) => card.category === id);
        if (!items.length) return null;
        const Icon = CATEGORY_ICONS[id];
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h3", { className: "qh-lib-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { size: 15 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t(`settings.category.${id}`) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "qh-lib-count", children: items.length })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "qh-lib-grid", children: items.map(renderTile) })
        ] }, id);
      }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "qh-lib-grid", children: shown.map(renderTile) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("footer", { className: "qh-modal-foot", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { type: "button", className: "qh-btn qh-accent", onClick: onClose, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconCheck, { size: 13 }),
      t("settings.close")
    ] }) })
  ] });
}

// src/client/masonry.js
var GAP = 14;
var ROW = 1;
function masonrySpan(height) {
  const value = Number(height);
  if (!Number.isFinite(value) || value <= 0) return 1;
  return Math.max(1, Math.ceil((value + GAP) / (ROW + GAP)));
}
function attachMasonry(grid) {
  if (!grid || typeof ResizeObserver === "undefined") return () => {
  };
  grid.classList.add("qh-masonry");
  const sized = /* @__PURE__ */ new Set();
  const place = (node) => {
    const height = node.getBoundingClientRect().height;
    node.style.gridRowEnd = `span ${masonrySpan(height)}`;
  };
  const sync = () => {
    const slots = new Set(grid.querySelectorAll(":scope > .qh-slot"));
    for (const node of sized) {
      if (!slots.has(node)) {
        observer.unobserve(node);
        sized.delete(node);
        node.style.gridRowEnd = "";
      }
    }
    for (const node of slots) {
      if (!sized.has(node)) {
        sized.add(node);
        observer.observe(node);
        place(node);
      }
    }
  };
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) place(entry.target);
  });
  const mutations = new MutationObserver(sync);
  mutations.observe(grid, { childList: true, subtree: false });
  sync();
  return () => {
    observer.disconnect();
    mutations.disconnect();
    grid.classList.remove("qh-masonry");
    for (const node of sized) node.style.gridRowEnd = "";
    sized.clear();
  };
}

// src/client/store.js
var STORAGE_KEY = "dsh-qiaomu-home:v1";
var KNOWN_SITE_IDS = new Set(SEARCH_GROUPS.flatMap((group) => group.sites.map((site) => site.id)));
function weatherPlaceFrom(parsed) {
  const raw = parsed.weatherPlace;
  if (raw && typeof raw === "object" && !Array.isArray(raw) && typeof raw.name === "string" && raw.name.trim() && Number.isFinite(raw.latitude) && Number.isFinite(raw.longitude)) {
    return {
      name: raw.name.trim().slice(0, 80),
      detail: typeof raw.detail === "string" ? raw.detail.slice(0, 120) : "",
      latitude: raw.latitude,
      longitude: raw.longitude
    };
  }
  const legacy = WEATHER_CITIES.find((entry) => entry.id === parsed.weatherCity);
  return legacy ? { name: legacy.label, detail: legacy.labelEn, latitude: legacy.latitude, longitude: legacy.longitude } : null;
}
function defaultState() {
  return {
    tab: "home",
    tabs: defaultTabs(),
    hidden: {},
    wallpaperMode: "daily",
    // daily | open | gradient
    wallpaperShift: 0,
    headline: "",
    todos: [],
    shortcuts: [],
    shortcutGroups: normalizeGroups([], []),
    weatherCity: "",
    weatherPlace: null,
    quoteShift: 0,
    focus: { minutes: 25, endAt: 0, remainingMs: 25 * 6e4 },
    quickNotes: [],
    scratchpad: "",
    dailyFocus: { date: "", items: [] },
    habits: [],
    habitLog: {},
    countdown: { date: "", label: "" },
    answers: {},
    searchEngine: "google",
    searchEngines: ["google"],
    searchGroup: "web",
    searchEnginesByGroup: {},
    searchTemplates: ""
  };
}
function defaultPreferences() {
  return { tab: "home", tabs: defaultTabs(), hidden: {}, wallpaperMode: "daily", wallpaperShift: 0, headline: "" };
}
function loadState(storage = globalThis.localStorage) {
  const base = defaultState();
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return base;
    const tabs = normalizeTabs(parsed.tabs, parsed.hidden);
    return {
      ...base,
      ...parsed,
      tab: tabs.some((entry) => entry.id === parsed.tab) ? parsed.tab : "home",
      tabs,
      hidden: parsed.hidden && typeof parsed.hidden === "object" ? parsed.hidden : {},
      todos: Array.isArray(parsed.todos) ? parsed.todos : [],
      shortcuts: [],
      shortcutGroups: normalizeGroups(parsed.shortcutGroups, parsed.shortcuts),
      focus: parsed.focus && typeof parsed.focus === "object" ? { ...base.focus, ...parsed.focus } : base.focus,
      quickNotes: Array.isArray(parsed.quickNotes) ? parsed.quickNotes : [],
      scratchpad: typeof parsed.scratchpad === "string" ? parsed.scratchpad : "",
      dailyFocus: parsed.dailyFocus && typeof parsed.dailyFocus === "object" ? {
        date: typeof parsed.dailyFocus.date === "string" ? parsed.dailyFocus.date : "",
        items: Array.isArray(parsed.dailyFocus.items) ? parsed.dailyFocus.items : []
      } : base.dailyFocus,
      habits: Array.isArray(parsed.habits) ? parsed.habits : [],
      habitLog: parsed.habitLog && typeof parsed.habitLog === "object" && !Array.isArray(parsed.habitLog) ? parsed.habitLog : {},
      countdown: parsed.countdown && typeof parsed.countdown === "object" ? {
        date: typeof parsed.countdown.date === "string" ? parsed.countdown.date : "",
        label: typeof parsed.countdown.label === "string" ? parsed.countdown.label : ""
      } : base.countdown,
      searchEngines: Array.isArray(parsed.searchEngines) ? parsed.searchEngines.filter((id) => typeof id === "string" && KNOWN_SITE_IDS.has(id)) : [typeof parsed.searchEngine === "string" && KNOWN_SITE_IDS.has(parsed.searchEngine) ? parsed.searchEngine : "google"],
      weatherPlace: weatherPlaceFrom(parsed),
      searchGroup: typeof parsed.searchGroup === "string" ? parsed.searchGroup : "web",
      searchEnginesByGroup: parsed.searchEnginesByGroup && typeof parsed.searchEnginesByGroup === "object" && !Array.isArray(parsed.searchEnginesByGroup) ? Object.fromEntries(Object.entries(parsed.searchEnginesByGroup).filter(([, value]) => Array.isArray(value))) : {},
      searchTemplates: typeof parsed.searchTemplates === "string" ? parsed.searchTemplates : "",
      answers: parsed.answers && typeof parsed.answers === "object" && !Array.isArray(parsed.answers) ? parsed.answers : {}
    };
  } catch {
    return base;
  }
}
function createHomeStore(storage = globalThis.localStorage) {
  let state = loadState(storage);
  const listeners = /* @__PURE__ */ new Set();
  let writeTimer = 0;
  const flush = () => {
    writeTimer = 0;
    try {
      storage?.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
    }
  };
  const persist = () => {
    if (writeTimer) return;
    writeTimer = setTimeout(flush, 300);
  };
  return {
    getSnapshot: () => state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    /** 浅合并补丁并持久化（300ms 防抖）。 */
    set(patch) {
      state = { ...state, ...patch };
      persist();
      for (const fn of listeners) fn();
    },
    /** 立即写盘（关闭页面前调用）。 */
    flush() {
      if (writeTimer) {
        clearTimeout(writeTimer);
        flush();
      }
    },
    /** 回到默认状态。 */
    reset() {
      state = defaultState();
      persist();
      for (const fn of listeners) fn();
    }
  };
}

// src/client/page.jsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var { useEffect: useEffect3, useMemo: useMemo3, useRef: useRef5, useState: useState5 } = import_react6.default;
function useStore(store) {
  return import_react6.default.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
function langOf(t) {
  return t("date.weekdays").includes("\u4E00") ? "zh" : "en";
}
function greetingKey(hour) {
  if (hour < 12) return "hero.greeting.morning";
  if (hour < 18) return "hero.greeting.afternoon";
  return "hero.greeting.evening";
}
function ClockLine({ t, now }) {
  const date = new Date(now);
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const weekdays = t("date.weekdays").split(" ").filter(Boolean);
  const weekday = weekdays[(date.getDay() + 6) % 7] ?? "";
  const formatted = t("date.format", { month: date.getMonth() + 1, day: date.getDate(), weekday }).replace(/\{(\w+)\}/g, "");
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-clock", children: `${hh}:${mm} \xB7 ${formatted} \xB7 ${t(greetingKey(date.getHours()))}` });
}
function pickDaily(state, photos) {
  return photos[dailyIndex(dayKey(), photos.length, state.wallpaperShift)];
}
function pickRandom(photos, exceptId) {
  const pool = photos.filter((entry) => entry.id !== exceptId);
  return pool[Math.floor(Math.random() * pool.length)] ?? photos[0];
}
function Wallpaper({ state, setState, t }) {
  const photos = useMemo3(() => curatedPhotos(), []);
  const useGradient = state.wallpaperMode === "gradient";
  const [override, setOverride] = useState5(() => state.wallpaperMode === "open" ? pickRandom(photos, null) : null);
  const [failedAll, setFailedAll] = useState5(false);
  const failedIds = useRef5(/* @__PURE__ */ new Set());
  const photo = useGradient || failedAll ? null : override ?? pickDaily(state, photos);
  const [loaded, setLoaded] = useState5(false);
  useEffect3(() => {
    failedIds.current.clear();
    setFailedAll(false);
    if (state.wallpaperMode === "open") setOverride((current) => current ?? pickRandom(photos, null));
    else setOverride(null);
  }, [state.wallpaperMode, photos]);
  useEffect3(() => {
    if (useGradient || !photo) {
      setLoaded(false);
      return;
    }
    let cancelled = false;
    setLoaded(false);
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.onerror = () => {
      if (cancelled) return;
      failedIds.current.add(photo.id);
      const at = photos.findIndex((entry) => entry.id === photo?.id);
      const next = [...photos.slice(at + 1), ...photos.slice(0, at)].find((entry) => !failedIds.current.has(entry.id));
      if (next) setOverride(next);
      else setFailedAll(true);
    };
    img.src = sizedUrl(photo, targetWidth(globalThis.innerWidth || 1600, globalThis.devicePixelRatio || 1));
    return () => {
      cancelled = true;
    };
  }, [photo, useGradient, photos]);
  const nextPhoto = () => {
    failedIds.current.clear();
    setFailedAll(false);
    if (state.wallpaperMode === "daily") {
      setState({ wallpaperShift: (state.wallpaperShift + 1) % photos.length });
      setOverride(null);
    } else {
      setOverride((current) => pickRandom(photos, current?.id ?? photo?.id));
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "qh-bg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-bg-gradient", style: photo?.color ? { backgroundColor: photo.color } : void 0 }),
      !useGradient && photo && loaded ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", { className: "qh-bg-img qh-loaded", src: sizedUrl(photo, targetWidth(globalThis.innerWidth || 1600, globalThis.devicePixelRatio || 1)), alt: "" }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-bg-scrim" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "qh-credit", children: [
      !useGradient && photo ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("a", { href: photo.page, target: "_blank", rel: "noreferrer noopener", children: `${photo.author} / Unsplash` }) : null,
      !useGradient ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "qh-icon-btn", "aria-label": t("wallpaper.next"), title: t("wallpaper.next"), onClick: nextPhoto, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconImage, { size: 14 }) }) : null
    ] })
  ] });
}
function SessionSearch({ t, services }) {
  const [query, setQuery] = useState5("");
  const [results, setResults] = useState5(null);
  const [active, setActive] = useState5(0);
  const seqRef = useRef5(0);
  useEffect3(() => {
    const value = query.trim();
    if (!value || !services.sessions?.search) {
      setResults(null);
      return;
    }
    const seq = ++seqRef.current;
    setResults("loading");
    setActive(0);
    const controller = new AbortController();
    const timer = setTimeout(() => {
      services.sessions.search(value, controller.signal).then((result) => {
        if (seqRef.current !== seq || controller.signal.aborted) return;
        setResults(result?.ok ? { items: (result.value?.items ?? []).slice(0, 8) } : "error");
      }).catch(() => {
        if (seqRef.current === seq && !controller.signal.aborted) setResults("error");
      });
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, services.sessions]);
  const items = results && results !== "loading" && results !== "error" ? results.items : [];
  const open = (item) => {
    if (!item) return;
    services.uiWorkspace?.openSession?.(item.sessionId);
    setQuery("");
    setResults(null);
  };
  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setQuery("");
      setResults(null);
      return;
    }
    if (items.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => (value + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => (value - 1 + items.length) % items.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      open(items[active] ?? items[0]);
    }
  };
  const titleOf = (item) => {
    const row = services.sessions?.list?.getSnapshot?.().byId?.[item.sessionId];
    return row?.title?.trim() || item.snippet?.slice(0, 40) || t("recent.untitled");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "qh-searchbox", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconSearch, { size: 15 }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "input",
      {
        className: "qh-search-input",
        value: query,
        placeholder: t("search.placeholder"),
        onChange: (event) => setQuery(event.target.value),
        onKeyDown,
        "aria-label": t("search.placeholder")
      }
    ),
    results !== null ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "qh-results", role: "listbox", children: [
      results === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-results-status", children: t("search.loading") }) : null,
      results === "error" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-results-status", children: t("search.error") }) : null,
      results !== "loading" && results !== "error" && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-results-status", children: t("search.empty") }) : null,
      items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": index === active,
          className: `qh-results-row${index === active ? " qh-active" : ""}`,
          onMouseEnter: () => setActive(index),
          onClick: () => open(item),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "qh-results-title", children: titleOf(item) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "qh-results-snippet", children: item.snippet })
          ]
        },
        `${item.sessionId}-${index}`
      ))
    ] }) : null
  ] });
}
var CARD_RENDERERS = {
  todo: TodoCard,
  recent: RecentCard,
  shortcuts: ShortcutGroupCard,
  focus: FocusCard,
  progress: ProgressCard,
  worldclock: WorldClockCard,
  quote: QuoteCard,
  weather: WeatherCard,
  dailyFocus: DailyFocusCard,
  quickNote: QuickNoteCard,
  scratchpad: ScratchpadCard,
  habit: HabitCard,
  countdown: CountdownCard,
  dailyQuestion: DailyQuestionCard,
  multiSearch: MultiSearchCard,
  heatmap: HeatmapCard,
  ambient: AmbientCard
};
function HomePage({ t, store, services }) {
  const state = useStore(store);
  const setState = (patch) => store.set(patch);
  const now = useNow(3e4);
  const lang = langOf(t);
  const [editing, setEditing] = useState5(false);
  const [dialog, setDialog] = useState5(null);
  const [marker, setMarker] = useState5(null);
  const [announce, setAnnounce] = useState5("");
  const { menu, open: openMenu } = useMenu();
  const { toasts, push, dismiss } = useToasts();
  const drag = useRef5(null);
  const scrollRef = useRef5(null);
  const revealRef = useRef5(null);
  const scrollTimer = useRef5({ frame: 0, speed: 0 });
  const tabs = state.tabs;
  const tab = tabs.find((entry) => entry.id === state.tab) ?? tabs[0];
  const revealAddedCard = () => {
    const pending = revealRef.current;
    revealRef.current = null;
    if (!pending || pending.tabId !== state.tab) return;
    const scroll = scrollRef.current;
    const node = gridRef.current?.querySelector(`[data-card="${pending.cardId}"]`);
    if (!scroll || !node) return;
    const top = node.getBoundingClientRect().top - scroll.getBoundingClientRect().top + scroll.scrollTop - Math.max(24, scroll.clientHeight * 0.2);
    scroll.scrollTo({ top, behavior: "smooth" });
  };
  const closeDialog = () => {
    setDialog(null);
    if (revealRef.current) setTimeout(revealAddedCard, 180);
  };
  const commit = (patch, message) => {
    const keys = /* @__PURE__ */ new Set(["tabs", "tab", ...Object.keys(patch)]);
    const before = Object.fromEntries([...keys].map((key) => [key, state[key]]));
    setState(patch);
    if (!message) return;
    const after = store.getSnapshot();
    push(message, {
      label: t("toast.undo"),
      run: () => {
        const now2 = store.getSnapshot();
        if ([...keys].some((key) => key !== "tab" && now2[key] !== after[key])) push(t("toast.undoStale"));
        else setState(before);
      }
    });
  };
  const select = (id, focus = false) => {
    setState({ tab: id });
    if (focus) requestAnimationFrame(() => scrollRef.current?.parentElement?.querySelector('[role="tab"][aria-selected="true"]')?.focus());
  };
  const createTab = (name, templateId) => {
    const created = templateId ? addTemplateTab(tabs, templateId, name) : addTab(tabs, name);
    if (!created.id) return;
    setState({ tabs: created.tabs, tab: created.id });
    setDialog(templateId ? null : { type: "library", tabId: created.id });
  };
  const tabMenu = (event, id) => {
    event.preventDefault();
    const entry = tabs.find((item) => item.id === id);
    if (!entry) return;
    const name = tabName(entry, t);
    const index = tabs.indexOf(entry);
    const builtin = defaultTabs().some((entry2) => entry2.id === id);
    openMenu(event, [
      { label: t("library.title"), icon: IconGrid, onSelect: () => setDialog({ type: "library", tabId: id }) },
      { label: t("pages.rename"), icon: IconPen, onSelect: () => setDialog({ type: "rename", tabId: id }) },
      { label: t("pages.duplicate"), icon: IconCopy, onSelect: () => setDialog({ type: "duplicate", tabId: id }) },
      { separator: true },
      { label: t("layout.earlier"), icon: IconArrowLeft, disabled: index <= 1, onSelect: () => setState({ tabs: moveTab(tabs, id, -1) }) },
      { label: t("layout.later"), icon: IconArrowRight, disabled: index < 1 || index === tabs.length - 1, onSelect: () => setState({ tabs: moveTab(tabs, id, 1) }) },
      ...builtin ? [{ separator: true }, { label: t("settings.resetTab"), icon: IconRefresh, onSelect: () => commit({ tabs: resetTab(tabs, id) }, t("toast.reset", { name })) }] : [],
      { separator: true },
      { label: t("pages.delete"), icon: IconTrash, danger: true, disabled: id === "home", onSelect: () => setDialog({ type: "delete", tabId: id }) }
    ]);
  };
  const onTabKey = (event, index) => {
    const last = tabs.length - 1;
    let next;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    select(tabs[next].id, true);
  };
  const cardName = (id) => cardTitle(id, t, state.shortcutGroups);
  const shift = (id, delta) => {
    const from = tab.cards.indexOf(id);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= tab.cards.length) return;
    setState({ tabs: moveCard(tabs, tab.id, id, delta) });
    setAnnounce(t("layout.movedAnnounce", { name: cardName(id), position: to + 1, total: tab.cards.length }));
  };
  const altMove = (event, id) => {
    if (!event.altKey || event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    shift(id, event.key === "ArrowUp" ? -1 : 1);
  };
  const cardMenu = (event, id) => {
    const index = tab.cards.indexOf(id);
    openMenu(event, [
      ...hasCardSettings(id) ? [{ label: t("cardSettings.open"), icon: IconSliders, onSelect: () => setDialog({ type: "cardSettings", cardId: id }) }] : [],
      { label: t("layout.move"), icon: IconPanels, onSelect: () => setDialog({ type: "moveCard", cardId: id }) },
      ...groupIdOf(id) ? [{ label: t("shortcuts.renameGroup"), icon: IconPen, onSelect: () => setDialog({ type: "renameGroup", groupId: groupIdOf(id) }) }] : [],
      { separator: true },
      { label: t("layout.earlier"), icon: IconArrowUp, disabled: index === 0, onSelect: () => shift(id, -1) },
      { label: t("layout.later"), icon: IconArrowDown, disabled: index === tab.cards.length - 1, onSelect: () => shift(id, 1) },
      { separator: true },
      { label: t("layout.remove"), icon: IconMinusCircle, danger: true, onSelect: () => commit({ tabs: removeCard(tabs, tab.id, id) }, t("toast.removed", { name: cardName(id) })) },
      ...groupIdOf(id) && groupIdOf(id) !== DEFAULT_GROUP_ID ? [{ label: t("shortcuts.deleteGroup"), icon: IconTrash, danger: true, onSelect: () => setDialog({ type: "deleteGroup", groupId: groupIdOf(id) }) }] : []
    ]);
  };
  const stopScroll = () => {
    scrollTimer.current.speed = 0;
    cancelAnimationFrame(scrollTimer.current.frame);
    scrollTimer.current.frame = 0;
  };
  const endDrag = () => {
    drag.current = null;
    setMarker(null);
    stopScroll();
  };
  const autoScroll = (event) => {
    const box = scrollRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    scrollTimer.current.speed = edgeScrollSpeed(event.clientY, rect.top, rect.bottom);
    if (scrollTimer.current.frame || !scrollTimer.current.speed) return;
    const step = () => {
      scrollTimer.current.frame = 0;
      if (!scrollTimer.current.speed || !box.isConnected) return;
      box.scrollTop += scrollTimer.current.speed;
      scrollTimer.current.frame = requestAnimationFrame(step);
    };
    scrollTimer.current.frame = requestAnimationFrame(step);
  };
  const dragSource = (kind, id, preview) => ({
    draggable: true,
    onDragStart: (event) => {
      drag.current = { kind, id };
      event.dataTransfer.setData("application/x-qiaomu-home-layout", id);
      event.dataTransfer.effectAllowed = "move";
      const node = preview?.(event.currentTarget);
      if (node) event.dataTransfer.setDragImage(node, 16, 16);
    },
    onDragEnd: endDrag
  });
  const dropTarget = (kind, id, axis) => ({
    onDragOver: (event) => {
      const from = drag.current;
      if (!from || from.kind !== kind || from.id === id) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      const side = dropAfter(axis, event.currentTarget.getBoundingClientRect(), event) ? "after" : "before";
      setMarker((current) => current && current.id === id && current.side === side && current.kind === kind ? current : { kind, id, side, axis });
      autoScroll(event);
    },
    onDragLeave: (event) => {
      if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) return;
      if (!event.relatedTarget || !scrollRef.current?.contains(event.relatedTarget)) stopScroll();
      setMarker((current) => current?.id === id ? null : current);
    },
    onDrop: (event) => {
      const from = drag.current;
      if (!from || from.kind !== kind || from.id === id) return;
      event.preventDefault();
      event.stopPropagation();
      const after = dropAfter(axis, event.currentTarget.getBoundingClientRect(), event);
      endDrag();
      setState({ tabs: kind === "tab" ? reorderTab(tabs, from.id, id, after) : reorderCard(tabs, tab.id, from.id, id, after) });
    }
  });
  const markerProps = (kind, id) => marker && marker.kind === kind && marker.id === id ? { "data-drop-marker": "", "data-drop-axis": marker.axis, "data-drop-side": marker.side } : {};
  const cardProps = { t, lang, state, setState, services };
  const renderCard = (id) => {
    const groupId = groupIdOf(id);
    const Component = groupId ? ShortcutGroupCard : CARD_RENDERERS[id];
    if (!Component) return null;
    const name = cardName(id);
    const menuButton = /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "button",
      {
        type: "button",
        className: "qh-card-menu-btn",
        "aria-label": t("layout.menuFor", { name }),
        "aria-haspopup": "menu",
        onClick: (event) => cardMenu(event, id),
        onKeyDown: (event) => altMove(event, id),
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconMore, { size: 15 })
      }
    );
    const handle = editing ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "button",
      {
        type: "button",
        className: "qh-drag-handle",
        "aria-label": t("layout.dragFor", { name }),
        title: t("layout.dragHint"),
        ...dragSource("card", id, (node) => node.closest(".qh-slot")),
        onClick: (event) => cardMenu(event, id),
        onKeyDown: (event) => altMove(event, id),
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconGrip, { size: 15 })
      }
    ) : null;
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-slot", "data-card": id, ...editing ? dropTarget("card", id, "y") : {}, ...markerProps("card", id), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CardChromeContext.Provider, { value: { handle, menu: menuButton, editing, openMenu, openDialog: setDialog, commit }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Component, { ...cardProps, ...cardOptions(tab, id), ...groupId ? { groupId } : {} }) }) }, id);
  };
  useEffect3(() => () => store.flush(), [store]);
  useEffect3(() => () => stopScroll(), []);
  const gridRef = useRef5(null);
  useEffect3(() => attachMasonry(gridRef.current), []);
  useEffect3(() => {
    document.getElementById(`qh-tab-${tab.id}`)?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
  }, [tab.id]);
  useEffect3(() => {
    if (state.tab !== tab.id) setState({ tab: tab.id });
  }, [state.tab, tab.id]);
  const applyLibraryLayout = (nextTabs) => {
    let changed = null;
    let added = [];
    let removed = [];
    for (const next of nextTabs) {
      const previous = tabs.find((entry) => entry.id === next.id);
      const before = new Set(previous?.cards ?? []);
      const after = new Set(next.cards);
      const plus = next.cards.filter((id) => !before.has(id));
      const minus = (previous?.cards ?? []).filter((id) => !after.has(id));
      if (plus.length || minus.length) {
        changed = next;
        added = plus;
        removed = minus;
        break;
      }
    }
    if (added.length) {
      const name = cardName(added[0]);
      if (changed.id === state.tab) revealRef.current = { tabId: changed.id, cardId: added[0] };
      commit({ tabs: nextTabs }, t("toast.addedToTab", { name, tab: tabName(changed, t) }));
      return;
    }
    if (removed.length) {
      commit({ tabs: nextTabs }, t("toast.removedFromTab", { name: cardName(removed[0]), tab: tabName(changed, t) }));
      return;
    }
    setState({ tabs: nextTabs });
  };
  const dialogTab = dialog?.tabId ? tabs.find((entry) => entry.id === dialog.tabId) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: `qh-root${editing ? " qh-editing" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Wallpaper, { state, setState, t }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-scroll", ref: scrollRef, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "qh-main", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "qh-hero", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ClockLine, { t, now }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { className: "qh-headline", children: state.headline.trim() || t("hero.headline") }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "qh-search-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SessionSearch, { t, services }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { type: "button", className: "qh-action-btn qh-primary", onClick: () => services.uiWorkspace?.startSession?.(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconPlus, { size: 14 }),
            t("search.newSession")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "button",
            {
              type: "button",
              className: "qh-action-btn",
              onClick: async () => {
                const path = await services.uiWorkspace?.pickDirectory?.();
                if (!path) return;
                try {
                  const workspace = await services.workspaces?.create?.({ path });
                  if (workspace?.workspaceId) await services.uiWorkspace?.openWorkspace?.(workspace.workspaceId);
                } catch {
                }
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconFolder, { size: 14 }),
                t("search.openWorkspace")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-search-hint", children: t("search.hint") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "qh-tabs-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-tabs-list", role: "tablist", "aria-label": t("pages.label"), children: tabs.map((entry, index) => {
          const selected = entry.id === tab.id;
          return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "button",
            {
              id: `qh-tab-${entry.id}`,
              type: "button",
              role: "tab",
              "aria-selected": selected,
              "aria-controls": "qh-panel",
              tabIndex: selected ? 0 : -1,
              className: `qh-tab${selected ? " qh-active" : ""}`,
              onClick: () => select(entry.id),
              onContextMenu: (event) => tabMenu(event, entry.id),
              onKeyDown: (event) => onTabKey(event, index),
              ...editing && entry.id !== "home" ? dragSource("tab", entry.id) : {},
              ...editing ? dropTarget("tab", entry.id, "x") : {},
              ...markerProps("tab", entry.id),
              children: tabName(entry, t)
            },
            entry.id
          );
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "qh-icon-btn", "aria-label": t("pages.add"), title: t("pages.add"), onClick: () => setDialog({ type: "newTab" }), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconPlus, { size: 14 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "qh-icon-btn", "aria-label": t("pages.menu"), title: t("pages.menu"), "aria-haspopup": "menu", onClick: (event) => tabMenu(event, tab.id), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconMore, { size: 14 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "qh-tabs-spacer" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "qh-icon-btn", "aria-label": t("library.title"), title: t("library.title"), onClick: () => setDialog({ type: "library", tabId: tab.id }), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconGrid, { size: 14 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "qh-icon-btn", "aria-label": t("settings.appearance"), title: t("settings.appearance"), onClick: () => setDialog({ type: "appearance" }), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconImage, { size: 14 }) }),
        editing ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { type: "button", className: "qh-action-btn qh-primary qh-done-btn", "aria-pressed": "true", onClick: () => {
          endDrag();
          setEditing(false);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconCheck, { size: 14 }),
          t("layout.done")
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "qh-icon-btn", "aria-label": t("layout.customize"), title: t("layout.customize"), "aria-pressed": "false", onClick: () => setEditing(true), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconSettings, { size: 14 }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-grid", id: "qh-panel", ref: gridRef, role: "tabpanel", "aria-labelledby": `qh-tab-${tab.id}`, children: tab.cards.length ? tab.cards.map(renderCard) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "qh-empty-tab", onClick: () => setDialog({ type: "library", tabId: tab.id }), children: t("settings.emptyTab") }) }),
      editing ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "qh-edit-hint", children: t("layout.editHint") }) : null
    ] }) }),
    menu,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "qh-sr-only", "aria-live": "polite", children: announce }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToastHost, { toasts, dismiss }),
    dialog?.type === "newTab" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NewTabDialog, { t, onCreate: createTab, onClose: closeDialog }) : null,
    dialog?.type === "library" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      LibraryDialog,
      {
        t,
        state,
        services,
        tabId: dialog.tabId,
        tabName,
        onLayout: applyLibraryLayout,
        onCommand: (command, tabId) => setDialog({ type: command === "import" ? "import" : "newGroup", tabId }),
        onClose: closeDialog
      }
    ) : null,
    dialog?.type === "rename" && dialogTab ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      PromptDialog,
      {
        t,
        title: t("pages.rename"),
        label: t("settings.tabName"),
        initial: tabName(dialogTab, t),
        submitText: t("pages.rename"),
        onClose: closeDialog,
        onSubmit: (name) => {
          setState({ tabs: renameTab(tabs, dialog.tabId, name) });
          closeDialog();
        }
      }
    ) : null,
    dialog?.type === "duplicate" && dialogTab ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      PromptDialog,
      {
        t,
        title: t("pages.duplicate"),
        label: t("settings.tabName"),
        initial: t("pages.copyName", { name: tabName(dialogTab, t) }),
        submitText: t("pages.duplicate"),
        onClose: closeDialog,
        onSubmit: (name) => {
          const copy = duplicateTab(tabs, dialog.tabId, name);
          if (copy.id) setState({ tabs: copy.tabs, tab: copy.id });
          closeDialog();
        }
      }
    ) : null,
    dialog?.type === "delete" && dialogTab ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ConfirmDialog,
      {
        t,
        title: t("pages.delete"),
        message: t("pages.deleteConfirm", { name: tabName(dialogTab, t) }),
        confirmText: t("pages.delete"),
        onClose: closeDialog,
        onConfirm: () => {
          const at = tabs.findIndex((entry) => entry.id === dialog.tabId);
          commit(
            { tabs: removeTab(tabs, dialog.tabId), tab: state.tab === dialog.tabId ? tabs[Math.max(0, at - 1)].id : state.tab },
            t("toast.deleted", { name: tabName(dialogTab, t) })
          );
          closeDialog();
        }
      }
    ) : null,
    dialog?.type === "cardSettings" && tab.cards.includes(dialog.cardId) ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      CardSettingsDialog,
      {
        t,
        tab,
        cardId: dialog.cardId,
        onClose: closeDialog,
        onChange: (patch) => setState({ tabs: setCardOptions(tabs, tab.id, dialog.cardId, patch) })
      }
    ) : null,
    dialog?.type === "moveCard" && tab.cards.includes(dialog.cardId) ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      MoveCardDialog,
      {
        t,
        tabs,
        fromId: tab.id,
        cardId: dialog.cardId,
        cardName: cardName(dialog.cardId),
        tabName,
        onClose: closeDialog,
        onMove: (toId) => {
          const target = tabs.find((entry) => entry.id === toId);
          commit({ tabs: moveCardToTab(tabs, tab.id, toId, dialog.cardId) }, t("toast.moved", { name: cardName(dialog.cardId), tab: tabName(target, t) }));
          closeDialog();
        }
      }
    ) : null,
    dialog?.type === "shortcut" && state.shortcutGroups.some((entry) => entry.id === dialog.groupId) ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ShortcutDialog,
      {
        t,
        item: dialog.itemId ? state.shortcutGroups.find((entry) => entry.id === dialog.groupId).items.find((entry) => entry.id === dialog.itemId) : null,
        onClose: closeDialog,
        onSubmit: (value) => {
          if (dialog.itemId) {
            const next = updateItem(state.shortcutGroups, dialog.groupId, dialog.itemId, value);
            if (next) setState({ shortcutGroups: next });
          } else {
            const added = addItem(state.shortcutGroups, dialog.groupId, value);
            if (added) setState({ shortcutGroups: added.groups });
          }
          closeDialog();
        }
      }
    ) : null,
    dialog?.type === "newGroup" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      PromptDialog,
      {
        t,
        title: t("shortcuts.newGroup"),
        label: t("shortcuts.groupName"),
        initial: "",
        submitText: t("shortcuts.newGroup"),
        onClose: closeDialog,
        onSubmit: (name) => {
          const created = addGroup(state.shortcutGroups, name);
          if (created.id) setState({ shortcutGroups: created.groups, tabs: addCard(tabs, dialog.tabId ?? tab.id, groupCardId(created.id)) });
          closeDialog();
        }
      }
    ) : null,
    dialog?.type === "renameGroup" && state.shortcutGroups.some((entry) => entry.id === dialog.groupId) ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      PromptDialog,
      {
        t,
        title: t("shortcuts.renameGroup"),
        label: t("shortcuts.groupName"),
        initial: state.shortcutGroups.find((entry) => entry.id === dialog.groupId).name || t("card.shortcuts"),
        submitText: t("pages.rename"),
        onClose: closeDialog,
        onSubmit: (name) => {
          setState({ shortcutGroups: renameGroup(state.shortcutGroups, dialog.groupId, name) });
          closeDialog();
        }
      }
    ) : null,
    dialog?.type === "deleteGroup" && state.shortcutGroups.some((entry) => entry.id === dialog.groupId) ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ConfirmDialog,
      {
        t,
        title: t("shortcuts.deleteGroup"),
        message: t("shortcuts.deleteGroupConfirm", { name: cardTitle(groupCardId(dialog.groupId), t, state.shortcutGroups) }),
        confirmText: t("shortcuts.deleteGroup"),
        onClose: closeDialog,
        onConfirm: () => {
          const cardId = groupCardId(dialog.groupId);
          const name = cardTitle(cardId, t, state.shortcutGroups);
          commit(
            { shortcutGroups: removeGroup(state.shortcutGroups, dialog.groupId), tabs: tabs.reduce((acc, entry) => removeCard(acc, entry.id, cardId), tabs) },
            t("toast.deleted", { name })
          );
          closeDialog();
        }
      }
    ) : null,
    dialog?.type === "import" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ImportBookmarksDialog,
      {
        t,
        onClose: closeDialog,
        onImport: (bookmarks) => {
          const created = addGroup(state.shortcutGroups, t("import.groupName"), bookmarkItems(bookmarks));
          if (created.id) setState({ shortcutGroups: created.groups, tabs: addCard(tabs, dialog.tabId ?? tab.id, groupCardId(created.id)) });
          closeDialog();
        }
      }
    ) : null,
    dialog?.type === "appearance" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      AppearanceDialog,
      {
        t,
        state,
        setState,
        onClose: closeDialog,
        onReset: () => {
          commit(defaultPreferences(), t("toast.resetAll"));
          closeDialog();
        }
      }
    ) : null
  ] });
}

// src/client/styles.js
var CSS = `
.qh-root {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  color: #f2f4f3;
  background: #14201a;
  font-size: 14px;
  line-height: 1.55;
  --qh-card: rgba(18, 24, 21, 0.62);
  --qh-card-border: rgba(255, 255, 255, 0.09);
  --qh-text: #f2f4f3;
  --qh-text-2: rgba(242, 244, 243, 0.72);
  --qh-text-3: rgba(242, 244, 243, 0.48);
  --qh-accent: #9fd3ae;
  --qh-radius: 16px;
}
.qh-root * { box-sizing: border-box; }
.qh-root button { font: inherit; color: inherit; }
.qh-root :is(button, a):focus-visible {
  outline: 2px solid var(--qh-accent);
  outline-offset: 2px;
}
.qh-root :is(input, select, textarea):focus-visible {
  outline: none;
  border-color: rgba(159, 211, 174, 0.55);
}

.qh-scroll {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  container-type: inline-size;
}

.qh-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.qh-bg-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.9s ease;
}
.qh-bg-img.qh-loaded { opacity: 1; }
.qh-bg-gradient {
  position: absolute; inset: 0;
  background:
    radial-gradient(120% 90% at 20% 0%, rgba(38, 64, 89, 0.9) 0%, transparent 60%),
    radial-gradient(100% 80% at 85% 15%, rgba(12, 64, 64, 0.85) 0%, transparent 55%),
    linear-gradient(160deg, #16211c 0%, #101816 45%, #0d1412 100%);
}
.qh-bg-scrim {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(8, 12, 10, 0.42) 0%, rgba(8, 12, 10, 0.30) 30%, rgba(8, 12, 10, 0.55) 100%);
}

.qh-credit {
  position: absolute; top: 14px; right: 16px; z-index: 2;
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; color: var(--qh-text-3);
  pointer-events: auto;
}
.qh-credit a { color: inherit; text-decoration: none; }
.qh-credit a:hover { color: var(--qh-text-2); text-decoration: underline; }
.qh-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; padding: 0;
  border: none; border-radius: 8px;
  background: rgba(20, 28, 24, 0.5); color: var(--qh-text-2);
  cursor: pointer; backdrop-filter: blur(8px);
  transition: background 0.15s ease, color 0.15s ease;
}
.qh-icon-btn:hover { background: rgba(32, 44, 38, 0.75); color: var(--qh-text); }

.qh-main {
  position: relative; z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: clamp(48px, 9vh, 110px) 28px 64px;
  display: flex; flex-direction: column;
  min-height: 100%;
}

/* ---- Hero ---- */
.qh-hero { text-align: center; margin-bottom: 30px; }
.qh-clock {
  font-size: 15px; font-weight: 500;
  color: var(--qh-text-2);
  letter-spacing: 0.04em;
  margin-bottom: 10px;
}
.qh-headline {
  margin: 0;
  font-size: clamp(26px, 4.2vw, 40px);
  font-weight: 650;
  letter-spacing: 0.01em;
  color: var(--qh-text);
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
}

/* ---- Search ---- */
.qh-search-row {
  display: flex; gap: 10px; align-items: stretch;
  max-width: 640px; margin: 26px auto 0;
}
.qh-searchbox {
  position: relative; flex: 1;
  display: flex; align-items: center;
  background: rgba(16, 22, 19, 0.72);
  border: 1px solid var(--qh-card-border);
  border-radius: 14px;
  backdrop-filter: blur(12px);
  transition: border-color 0.15s ease;
}
.qh-searchbox:focus-within { border-color: rgba(159, 211, 174, 0.45); }
.qh-searchbox > svg { margin-left: 14px; color: var(--qh-text-3); flex: none; }
.qh-search-input {
  flex: 1; min-width: 0;
  background: transparent; border: none; outline: none;
  padding: 12px 14px;
  color: var(--qh-text);
  font-size: 14px;
}
.qh-search-input::placeholder { color: var(--qh-text-3); }
.qh-search-input:focus-visible { border-color: transparent; }
.qh-action-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 0 16px;
  border: 1px solid var(--qh-card-border);
  border-radius: 14px;
  background: rgba(16, 22, 19, 0.72);
  color: var(--qh-text-2);
  cursor: pointer; white-space: nowrap;
  backdrop-filter: blur(12px);
  transition: background 0.15s ease, color 0.15s ease;
}
.qh-action-btn:hover { background: rgba(34, 46, 40, 0.8); color: var(--qh-text); }
.qh-action-btn.qh-primary { color: var(--qh-accent); }

.qh-search-hint { margin-top: 8px; font-size: 11.5px; color: var(--qh-text-3); }

.qh-results {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 5;
  background: rgba(14, 19, 17, 0.96);
  border: 1px solid var(--qh-card-border);
  border-radius: 14px;
  backdrop-filter: blur(16px);
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
  text-align: left;
}
.qh-results-row {
  display: flex; flex-direction: column; gap: 2px;
  width: 100%; padding: 9px 14px;
  background: none; border: none; cursor: pointer;
  text-align: left;
}
.qh-results-row:hover, .qh-results-row.qh-active { background: rgba(255, 255, 255, 0.07); }
.qh-results-title {
  font-size: 13.5px; color: var(--qh-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.qh-results-snippet {
  font-size: 12px; color: var(--qh-text-3);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.qh-results-status { padding: 12px 14px; font-size: 12.5px; color: var(--qh-text-3); }

/* ---- Tabs ---- */
.qh-tabs-row {
  display: flex; align-items: center; gap: 4px;
  margin: 18px 0 18px;
}
.qh-tabs-list { display: flex; align-items: center; gap: 4px; min-width: 0; overflow-x: auto; scrollbar-width: thin; }
.qh-tab {
  flex: none; white-space: nowrap;
  padding: 6px 14px;
  border: none; border-radius: 10px;
  background: transparent;
  color: var(--qh-text-3);
  font-size: 14px; cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.qh-tab:hover { color: var(--qh-text-2); }
.qh-tab.qh-active {
  background: rgba(255, 255, 255, 0.10);
  color: var(--qh-text);
  backdrop-filter: blur(8px);
}
.qh-tabs-spacer { flex: 1; }

/* ---- Cards ---- */
.qh-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-items: start;
}
/* Masonry\uFF1A\u884C\u9AD8 1px\uFF0C\u5361\u7247\u6309\u81EA\u8EAB\u9AD8\u5EA6\u8DE8\u884C\uFF0C\u843D\u5165\u66F4\u77ED\u7684\u5217\uFF08\u89C1 masonry.js\uFF09\u3002 */
.qh-grid.qh-masonry { grid-auto-rows: 1px; }
.qh-grid.qh-masonry .qh-slot { overflow: visible; }
@container (max-width: 780px) {
  .qh-grid { grid-template-columns: 1fr; }
  .qh-main { padding: 40px 20px 48px; }
  .qh-search-row { flex-wrap: wrap; }
  .qh-searchbox { flex-basis: 100%; min-height: 42px; }
  .qh-action-btn { min-height: 40px; }
}
.qh-card {
  background: var(--qh-card);
  border: 1px solid var(--qh-card-border);
  border-radius: var(--qh-radius);
  backdrop-filter: blur(14px);
  padding: 14px 16px 14px;
  display: flex; flex-direction: column; gap: 10px;
  min-height: 0;
}
.qh-card-head { display: flex; align-items: center; gap: 8px; color: var(--qh-text-2); }
.qh-card-head svg { color: var(--qh-text-3); }
.qh-card-title { font-size: 13.5px; font-weight: 600; color: var(--qh-text-2); flex: 1; }
.qh-card-count { font-size: 11.5px; color: var(--qh-text-3); }
.qh-card-empty { font-size: 12.5px; color: var(--qh-text-3); padding: 4px 0 6px; }
.qh-card-foot { display: flex; align-items: center; gap: 10px; font-size: 11.5px; color: var(--qh-text-3); }
.qh-link-btn {
  background: none; border: none; padding: 0;
  color: var(--qh-text-3); font-size: 11.5px; cursor: pointer;
}
.qh-link-btn:hover { color: var(--qh-text-2); text-decoration: underline; }

/* ---- Todo ---- */
.qh-todo-form { display: flex; gap: 8px; }
.qh-todo-input {
  flex: 1; min-width: 0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 8px 12px;
  color: var(--qh-text); font-size: 13px; outline: none;
  transition: border-color 0.15s ease;
}
.qh-todo-input:focus { border-color: rgba(159, 211, 174, 0.4); }
.qh-todo-input::placeholder { color: var(--qh-text-3); }
.qh-todo-add {
  width: 34px; flex: none;
  border: none; border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--qh-text-2); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
}
.qh-todo-add:hover { background: rgba(255, 255, 255, 0.14); color: var(--qh-text); }
.qh-todo-list { display: flex; flex-direction: column; gap: 2px; }
.qh-todo-item {
  display: flex; align-items: center; gap: 10px;
  padding: 6px 4px; border-radius: 8px;
}
.qh-todo-item:hover { background: rgba(255, 255, 255, 0.05); }
.qh-todo-check {
  width: 16px; height: 16px; flex: none;
  border: 1.5px solid var(--qh-text-3);
  border-radius: 5px;
  background: transparent; cursor: pointer; padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  color: transparent;
  transition: all 0.15s ease;
}
.qh-todo-check:hover { border-color: var(--qh-text-2); }
.qh-todo-item.qh-done .qh-todo-check {
  background: var(--qh-accent); border-color: var(--qh-accent); color: #10241a;
}
.qh-todo-text {
  flex: 1; min-width: 0; font-size: 13.5px; color: var(--qh-text);
  overflow-wrap: break-word;
}
.qh-todo-item.qh-done .qh-todo-text { color: var(--qh-text-3); text-decoration: line-through; }
.qh-todo-del {
  flex: none; width: 28px; height: 28px;
  border: none; border-radius: 6px; background: none;
  color: var(--qh-text-3); cursor: pointer; padding: 0;
  visibility: hidden; display: inline-flex; align-items: center; justify-content: center;
}
.qh-todo-item:hover .qh-todo-del, .qh-todo-item:focus-within .qh-todo-del { visibility: visible; }
.qh-todo-del:hover { color: var(--qh-text); background: rgba(255, 255, 255, 0.08); }

/* ---- Recent ---- */
.qh-session-row {
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 7px 8px;
  border: none; border-radius: 9px;
  background: none; cursor: pointer; text-align: left;
}
.qh-session-row:hover { background: rgba(255, 255, 255, 0.06); }
.qh-session-row svg { flex: none; color: var(--qh-text-3); }
.qh-session-title {
  flex: 1; min-width: 0;
  font-size: 13.5px; color: var(--qh-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.qh-session-time { flex: none; font-size: 11.5px; color: var(--qh-text-3); }

/* ---- Shortcuts ---- */
.qh-tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.qh-tile-wrap { position: relative; min-width: 0; }
@container (max-width: 460px) { .qh-tiles { grid-template-columns: repeat(3, 1fr); } }
.qh-tile {
  position: relative;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  width: 100%; height: 100%; padding: 14px 6px 12px;
  border: 1px solid transparent; border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.qh-tile:hover { background: rgba(255, 255, 255, 0.10); }
.qh-tile-icon {
  width: 30px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  color: var(--qh-text-2);
}
.qh-tile-icon img { width: 22px; height: 22px; border-radius: 5px; }
.qh-tile-label {
  max-width: 100%;
  font-size: 11.5px; color: var(--qh-text-2);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
@media (hover: none) {
  .qh-todo-del { visibility: visible; }
}
.qh-shortcut-form { display: flex; flex-direction: column; gap: 8px; }
.qh-shortcut-form input {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 10px;
  padding: 8px 12px; color: var(--qh-text); font-size: 13px; outline: none;
}
.qh-shortcut-form input:focus { border-color: rgba(159, 211, 174, 0.4); }
.qh-shortcut-form .qh-row { display: flex; gap: 8px; justify-content: flex-end; }
.qh-btn {
  padding: 7px 14px; border: none; border-radius: 9px;
  background: rgba(255, 255, 255, 0.10); color: var(--qh-text);
  font-size: 12.5px; cursor: pointer;
}
.qh-btn:hover { background: rgba(255, 255, 255, 0.16); }
.qh-root button:disabled { opacity: 0.48; cursor: not-allowed; }
.qh-root button:disabled:hover { background: rgba(255, 255, 255, 0.10); }
.qh-btn.qh-accent { background: rgba(159, 211, 174, 0.2); color: var(--qh-accent); }
.qh-btn.qh-accent:hover { background: rgba(159, 211, 174, 0.3); }
.qh-form-error { font-size: 12px; color: #e8a0a0; }

/* ---- Focus timer ---- */
.qh-focus { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 4px 0; }
.qh-focus-dial { position: relative; width: 128px; height: 128px; }
.qh-focus-dial svg { display: block; }
.qh-focus-track { fill: none; stroke: rgba(255, 255, 255, 0.10); stroke-width: 5; }
.qh-focus-arc {
  fill: none; stroke: var(--qh-accent); stroke-width: 5; stroke-linecap: round;
  transition: stroke-dashoffset 0.5s linear;
}
.qh-focus-center {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
}
.qh-focus-clock { font-size: 26px; font-weight: 600; font-variant-numeric: tabular-nums; color: var(--qh-text); }
.qh-focus-status { font-size: 11px; color: var(--qh-text-3); }
.qh-focus-presets { display: flex; gap: 6px; }
.qh-chip {
  padding: 4px 10px; border: none; border-radius: 999px;
  background: rgba(255, 255, 255, 0.07); color: var(--qh-text-2);
  font-size: 12px; cursor: pointer;
}
.qh-chip:hover { background: rgba(255, 255, 255, 0.13); }
.qh-chip.qh-active { background: rgba(159, 211, 174, 0.22); color: var(--qh-accent); }
.qh-focus-controls { display: flex; gap: 8px; }

/* ---- Progress ---- */
.qh-progress-rows { display: flex; flex-direction: column; gap: 9px; }
.qh-progress-row { display: flex; align-items: center; gap: 10px; }
.qh-progress-label { width: 34px; flex: none; font-size: 12px; color: var(--qh-text-3); }
.qh-progress-bar {
  flex: 1; height: 5px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.08); overflow: hidden;
}
.qh-progress-fill {
  height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, rgba(159, 211, 174, 0.55), var(--qh-accent));
  transition: width 0.6s ease;
}
.qh-progress-value { width: 42px; flex: none; text-align: right; font-size: 11.5px; color: var(--qh-text-3); font-variant-numeric: tabular-nums; }

/* ---- World clock ---- */
.qh-clock-rows { display: flex; flex-direction: column; gap: 6px; }
.qh-clock-row { display: flex; align-items: baseline; gap: 10px; }
.qh-clock-city { flex: 1; font-size: 13px; color: var(--qh-text-2); }
.qh-clock-offset { font-size: 11px; color: var(--qh-text-3); }
.qh-clock-time { font-size: 15px; font-weight: 600; color: var(--qh-text); font-variant-numeric: tabular-nums; }

/* ---- Quote ---- */
.qh-quote-text { font-size: 13.5px; line-height: 1.8; color: var(--qh-text); }

/* ---- Weather ---- */
.qh-weather-now { display: flex; align-items: center; gap: 12px; }
.qh-weather-icon { color: var(--qh-accent); }
.qh-weather-temp { font-size: 28px; font-weight: 650; color: var(--qh-text); font-variant-numeric: tabular-nums; }
.qh-weather-meta { display: flex; flex-direction: column; }
.qh-weather-cond { font-size: 13px; color: var(--qh-text-2); }
.qh-weather-feels { font-size: 11.5px; color: var(--qh-text-3); }
.qh-weather-days { display: flex; gap: 8px; }
.qh-weather-day {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 8px 4px; border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
}
.qh-weather-day-label { font-size: 11px; color: var(--qh-text-3); }
.qh-weather-day-temp { font-size: 11.5px; color: var(--qh-text-2); font-variant-numeric: tabular-nums; }
.qh-weather-city { display: flex; align-items: baseline; gap: 8px; font-size: 12.5px; color: var(--qh-text); }
.qh-weather-city .qh-weather-place-detail { font-size: 11px; }
.qh-weather-place-detail { font-size: 11.5px; color: var(--qh-text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.qh-weather-places { display: flex; flex-direction: column; gap: 2px; max-height: 168px; overflow-y: auto; }
.qh-weather-place {
  display: flex; align-items: baseline; gap: 8px; text-align: left;
  background: none; border: none; padding: 6px 8px; border-radius: 8px;
  color: var(--qh-text); font-size: 12.5px; cursor: pointer;
}
.qh-weather-place:hover { background: rgba(255, 255, 255, 0.08); }
.qh-templates { display: flex; flex-direction: column; gap: 6px; }
.qh-templates-input {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 9px;
  padding: 8px 10px; color: var(--qh-text); font-size: 12px; line-height: 1.6;
  resize: vertical; min-height: 54px; outline: none;
  font-family: inherit;
}
.qh-templates-input:focus { border-color: var(--qh-accent); }

/* ---- Shortcut tiles: per-item menu, markers, icon picker, import ---- */
.qh-tile-more {
  position: absolute; top: 2px; right: 2px; width: 22px; height: 22px; padding: 0; display: inline-flex; align-items: center; justify-content: center;
  border: 0; border-radius: 6px; background: rgba(0, 0, 0, .35); color: var(--qh-text-2); cursor: pointer; opacity: 0;
}
.qh-tile-wrap:hover .qh-tile-more, .qh-tile-wrap:focus-within .qh-tile-more, .qh-editing .qh-tile-more { opacity: 1; }
@media (hover: none) { .qh-tile-more { opacity: .8; } }
.qh-tile-more:hover { background: rgba(255, 255, 255, .2); color: var(--qh-text); }
.qh-editing .qh-tile-wrap[draggable='true'] { cursor: grab; }
.qh-tile-wrap[data-drop-marker]::after { content: ''; position: absolute; top: 4px; bottom: 4px; width: 3px; border-radius: 2px; background: var(--qh-accent); pointer-events: none; }
.qh-tile-wrap[data-drop-side='before']::after { left: -6px; }
.qh-tile-wrap[data-drop-side='after']::after { right: -6px; }
.qh-icon-choices { display: flex; flex-wrap: wrap; gap: 6px; }
.qh-icon-choice { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--qh-card-border); border-radius: 9px; background: transparent; color: var(--qh-text-2); cursor: pointer; }
.qh-icon-choice img { width: 18px; height: 18px; border-radius: 4px; }
.qh-icon-choice:hover { background: rgba(255, 255, 255, .07); }
.qh-icon-choice[aria-pressed='true'] { border-color: var(--qh-accent); background: rgba(159, 211, 174, .14); color: var(--qh-accent); }
.qh-import-preview { padding: 8px 12px; border-radius: 10px; background: rgba(0, 0, 0, .22); display: flex; flex-direction: column; gap: 2px; }
.qh-import-line { font-size: 12px; color: var(--qh-text-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.qh-dim { color: var(--qh-text-3); }
.qh-modal input[type='file'] { font-size: 12.5px; color: var(--qh-text-2); }

/* ---- Layout editing: slots, handles, drop markers ---- */
.qh-sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.qh-empty-tab { grid-column: 1 / -1; min-height: 120px; border: 1px dashed var(--qh-card-border); border-radius: var(--qh-radius); background: var(--qh-card); color: var(--qh-text-2); cursor: pointer; }
.qh-slot { position: relative; min-width: 0; }
.qh-focus-presets { flex-wrap: wrap; }
.qh-chip { white-space: nowrap; }
.qh-headline { text-wrap: balance; }
.qh-slot > .qh-card { height: 100%; }
.qh-card-menu-btn, .qh-drag-handle {
  flex: none; display: inline-flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; padding: 0; border: 0; border-radius: 7px; background: transparent; color: var(--qh-text-3); cursor: pointer;
}
.qh-card-menu-btn { opacity: 0; transition: opacity .12s ease, background .12s ease; }
.qh-card:hover .qh-card-menu-btn, .qh-card:focus-within .qh-card-menu-btn, .qh-editing .qh-card-menu-btn { opacity: 1; }
@media (hover: none) { .qh-card-menu-btn { opacity: .7; } }
.qh-card-menu-btn:hover, .qh-drag-handle:hover { background: rgba(255, 255, 255, .1); color: var(--qh-text); }
.qh-drag-handle { cursor: grab; margin-left: -6px; }
.qh-drag-handle:active { cursor: grabbing; }
.qh-editing .qh-card { border-style: dashed; border-color: rgba(159, 211, 174, .35); }
.qh-editing .qh-tab[draggable='true'] { cursor: grab; }
.qh-slot[draggable], .qh-slot.qh-dragging { opacity: 1; }
.qh-slot[data-drop-marker]::after, .qh-tab[data-drop-marker]::after {
  content: ''; position: absolute; background: var(--qh-accent); border-radius: 2px; pointer-events: none; z-index: 3;
}
.qh-slot[data-drop-axis='y']::after { left: 0; right: 0; height: 3px; }
.qh-slot[data-drop-axis='y'][data-drop-side='before']::after { top: -8px; }
.qh-slot[data-drop-axis='y'][data-drop-side='after']::after { bottom: -8px; }
.qh-tab { position: relative; }
.qh-tab[data-drop-axis='x']::after { top: 4px; bottom: 4px; width: 3px; }
.qh-tab[data-drop-axis='x'][data-drop-side='before']::after { left: -3px; }
.qh-tab[data-drop-axis='x'][data-drop-side='after']::after { right: -3px; }
.qh-edit-hint { margin: 14px 2px 0; font-size: 12px; color: var(--qh-text-3); text-align: center; }
.qh-done-btn { min-height: 28px; padding: 3px 12px; }
.qh-tabs-row { flex-wrap: nowrap; }
.qh-tabs-list { flex: 0 1 auto; min-width: 0; }
.qh-tabs-row > * { flex-shrink: 0; }
.qh-tabs-row > .qh-tabs-list { flex-shrink: 1; }
.qh-tabs-row > .qh-tabs-spacer { flex: 1 1 0; min-width: 0; flex-shrink: 1; }

/* ---- Overlay, modal, menu, toast ---- */
.qh-overlay {
  position: absolute; inset: 0; z-index: 20; display: flex; align-items: center; justify-content: center; padding: 20px;
  background: rgba(6, 10, 8, .62); backdrop-filter: blur(3px);
}
.qh-modal {
  width: min(460px, 100%); max-height: min(720px, 100%); display: flex; flex-direction: column; overflow: hidden;
  background: rgba(16, 22, 19, .98); border: 1px solid var(--qh-card-border); border-radius: 14px; box-shadow: 0 24px 64px rgba(0, 0, 0, .55);
  color: var(--qh-text);
}
.qh-modal:focus { outline: none; }
.qh-modal-wide { width: min(860px, 100%); height: min(720px, 100%); }
.qh-modal-head { padding: 16px 20px 6px; }
.qh-modal-head h2 { margin: 0; font-size: 15px; font-weight: 650; }
.qh-modal-body { padding: 8px 20px 4px; overflow-y: auto; min-height: 0; flex: 1; display: flex; flex-direction: column; gap: 12px; }
.qh-modal form { display: contents; }
.qh-modal-foot { position: sticky; bottom: 0; z-index: 3; display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 12px 0 14px; margin-top: auto; background: rgba(16, 22, 19, .98); border-top: 1px solid var(--qh-card-border); }
.qh-hint, .qh-confirm-text { margin: 0; font-size: 12.5px; color: var(--qh-text-2); line-height: 1.6; }
.qh-field { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--qh-text-3); }
.qh-field-inline { flex-direction: row; align-items: center; justify-content: space-between; font-size: 13px; color: var(--qh-text-2); }
.qh-field input[type='text'], .qh-modal input[type='search'], .qh-field select, .qh-lib-context select {
  width: 100%; padding: 8px 11px; border: 1px solid transparent; border-radius: 9px; background: rgba(255, 255, 255, .07);
  color: var(--qh-text); font-size: 13px; outline: none;
}
.qh-field-inline select { width: auto; min-width: 84px; }
.qh-field select, .qh-lib-context select { background: #25312a; }
.qh-field input:focus, .qh-modal input[type='search']:focus, .qh-field select:focus { border-color: rgba(159, 211, 174, .5); }
.qh-radio-row { display: flex; gap: 6px; flex-wrap: wrap; }
.qh-danger-btn { color: #f0a7a0; }
.qh-danger-btn:hover { background: rgba(240, 120, 110, .18); }
.qh-btn:disabled { opacity: .4; cursor: default; }

.qh-menu {
  position: absolute; z-index: 30; min-width: 190px; padding: 5px; display: flex; flex-direction: column; gap: 1px;
  background: rgba(16, 22, 19, .98); border: 1px solid var(--qh-card-border); border-radius: 11px; box-shadow: 0 16px 40px rgba(0, 0, 0, .5);
}
.qh-menu-item {
  display: flex; align-items: center; gap: 9px; width: 100%; min-height: 32px; padding: 5px 10px; border: 0; border-radius: 7px;
  background: transparent; color: var(--qh-text-2); font-size: 13px; text-align: left; cursor: pointer;
}
.qh-menu-item:hover, .qh-menu-item:focus-visible { background: rgba(255, 255, 255, .09); color: var(--qh-text); outline: none; }
.qh-menu-item[aria-disabled='true'] { opacity: .38; cursor: default; }
.qh-menu-item[aria-disabled='true']:hover { background: transparent; }
.qh-menu-item.qh-danger { color: #f0a7a0; }
.qh-menu-gap { width: 14px; }
.qh-menu-sep { height: 1px; margin: 4px 6px; background: var(--qh-card-border); }

.qh-toasts { position: absolute; left: 50%; bottom: 22px; z-index: 40; transform: translateX(-50%); display: flex; flex-direction: column; gap: 8px; align-items: center; pointer-events: none; }
.qh-toast {
  pointer-events: auto; display: flex; align-items: center; gap: 14px; padding: 9px 14px; border-radius: 11px;
  background: rgba(16, 22, 19, .98); border: 1px solid var(--qh-card-border); box-shadow: 0 10px 30px rgba(0, 0, 0, .45); font-size: 13px; color: var(--qh-text);
}
.qh-toast-action { border: 0; background: transparent; color: var(--qh-accent); font-weight: 600; cursor: pointer; padding: 2px 4px; border-radius: 5px; }
.qh-toast-action:hover { background: rgba(159, 211, 174, .16); }

/* ---- Templates ---- */
.qh-template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 8px; }
.qh-template-option {
  display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border: 1px solid var(--qh-card-border); border-radius: 10px;
  background: transparent; color: var(--qh-text-2); text-align: left; cursor: pointer;
}
.qh-template-option svg { flex: none; margin-top: 2px; color: var(--qh-text-3); }
.qh-template-option:hover { background: rgba(255, 255, 255, .05); }
.qh-template-option[aria-checked='true'] { border-color: var(--qh-accent); background: rgba(159, 211, 174, .1); color: var(--qh-text); }
.qh-template-option[aria-checked='true'] svg { color: var(--qh-accent); }
.qh-template-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.qh-template-name { font-weight: 600; font-size: 13px; }
.qh-template-desc { font-size: 11.5px; color: var(--qh-text-3); line-height: 1.45; }

/* ---- Library ---- */
.qh-lib-context { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--qh-text-3); }
.qh-lib-context select { width: auto; padding: 4px 9px; }
.qh-lib-filters { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; position: sticky; top: 0; z-index: 2; padding: 6px 0; background: rgba(16, 22, 19, .98); }
.qh-lib-filters .qh-chip { display: inline-flex; align-items: center; gap: 5px; }
.qh-lib-count { color: var(--qh-text-3); font-size: 11px; font-variant-numeric: tabular-nums; }
.qh-lib-only-new { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; font-size: 12px; color: var(--qh-text-2); cursor: pointer; }
.qh-lib-only-new input { accent-color: #9fd3ae; }
.qh-lib-list { display: flex; flex-direction: column; gap: 6px; }
.qh-lib-group { display: flex; align-items: center; gap: 8px; margin: 14px 0 8px; font-size: 13px; font-weight: 600; color: var(--qh-text-2); }
.qh-lib-group svg { color: var(--qh-text-3); }
.qh-lib-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.qh-lib-tile { display: flex; flex-direction: column; gap: 8px; padding: 12px 14px; border: 1px solid var(--qh-card-border); border-radius: 12px; background: rgba(255, 255, 255, .03); }
.qh-lib-tile.qh-added { background: rgba(159, 211, 174, .07); border-color: rgba(159, 211, 174, .22); }
.qh-lib-tile-head { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 13.5px; }
.qh-lib-tile-head svg { flex: none; color: var(--qh-text-3); }
.qh-lib-tile-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.qh-lib-badge { flex: none; padding: 1px 8px; border-radius: 999px; background: rgba(159, 211, 174, .18); color: var(--qh-accent); font-size: 11px; font-weight: 500; }
.qh-lib-meta { font-size: 11px; color: var(--qh-text-3); }
.qh-lib-preview { padding: 5px 10px; border-radius: 8px; background: rgba(0, 0, 0, .22); }
.qh-lib-preview-line { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; line-height: 24px; color: var(--qh-text-2); }
.qh-lib-desc { font-size: 12px; line-height: 1.5; color: var(--qh-text-3); }
.qh-lib-actions { margin-top: auto; display: flex; gap: 8px; }
.qh-lib-empty { padding: 28px; text-align: center; color: var(--qh-text-3); font-size: 13px; }
.qh-move-list { display: flex; flex-direction: column; gap: 6px; }
.qh-move-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 6px 4px; font-size: 13px; color: var(--qh-text-2); }
.qh-modal :is(button, input, select):focus-visible { outline: 2px solid var(--qh-accent); outline-offset: 2px; }
@media (max-width: 560px) { .qh-overlay { padding: 10px; } .qh-modal-wide { height: 100%; } }
@media (prefers-reduced-motion: reduce) { .qh-card-menu-btn { transition: none; } }
`;
var CSS_EXTRA = `
/* ---- Quick note / scratchpad ---- */
.qh-note-list { display: flex; flex-direction: column; gap: 2px; }
.qh-note-row {
  display: flex; align-items: baseline; gap: 8px;
  padding: 5px 4px; border-radius: 8px;
}
.qh-note-row:hover { background: rgba(255, 255, 255, 0.05); }
.qh-note-row .qh-todo-del { visibility: visible; opacity: 0.65; }
.qh-note-row:hover .qh-todo-del, .qh-note-row:focus-within .qh-todo-del { opacity: 1; }
.qh-note-time { flex: none; font-size: 11px; color: var(--qh-text-3); font-variant-numeric: tabular-nums; }
.qh-note-text { flex: 1; min-width: 0; font-size: 13px; color: var(--qh-text); overflow-wrap: break-word; }
.qh-scratchpad {
  width: 100%; resize: vertical; min-height: 72px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent; border-radius: 10px;
  padding: 9px 12px; color: var(--qh-text);
  font: inherit; font-size: 13px; line-height: 1.7; outline: none;
  transition: border-color 0.15s ease;
}
.qh-scratchpad:focus { border-color: rgba(159, 211, 174, 0.4); }
.qh-scratchpad::placeholder { color: var(--qh-text-3); }

/* ---- Habits ---- */
.qh-habit-grid-head, .qh-habit-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(7, 18px) auto;
  align-items: center; gap: 4px;
}
.qh-habit-day {
  font-size: 10px; color: var(--qh-text-3); text-align: center;
  font-variant-numeric: tabular-nums;
}
.qh-habit-day.qh-today { color: var(--qh-accent); font-weight: 600; }
.qh-habit-name {
  font-size: 13px; color: var(--qh-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.qh-habit-dot {
  width: 12px; height: 12px; border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  justify-self: center;
}
.qh-habit-dot.qh-part { background: rgba(159, 211, 174, 0.4); }
.qh-habit-dot.qh-full { background: var(--qh-accent); }
.qh-habit-actions { display: flex; align-items: center; gap: 4px; }
.qh-habit-check {
  width: 20px; height: 20px; border: 1.5px solid var(--qh-text-3); border-radius: 6px;
  background: transparent; color: var(--qh-text-3); cursor: pointer; padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
}
.qh-habit-check:hover { border-color: var(--qh-text-2); color: var(--qh-text-2); }
.qh-habit-check.qh-done { background: var(--qh-accent); border-color: var(--qh-accent); color: #10241a; }
.qh-habit-row .qh-todo-del { visibility: hidden; }
.qh-habit-row:hover .qh-todo-del, .qh-habit-row:focus-within .qh-todo-del { visibility: visible; }
@media (hover: none) { .qh-habit-row .qh-todo-del { visibility: visible; } }

/* ---- Countdown ---- */
.qh-countdown { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 0 4px; }
.qh-countdown-number {
  font-size: 40px; font-weight: 700; color: var(--qh-text);
  font-variant-numeric: tabular-nums; line-height: 1.1;
}
.qh-countdown-unit { font-size: 15px; font-weight: 500; color: var(--qh-text-3); margin-left: 6px; }
.qh-countdown-label { font-size: 12px; color: var(--qh-text-3); }
.qh-shortcut-form input[type='date'] {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 10px;
  padding: 8px 12px; color: var(--qh-text); font-size: 13px; outline: none;
  color-scheme: dark;
}

/* ---- Heatmap ---- */
.qh-heatmap {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  justify-content: start;
}
.qh-heat {
  width: 11px; height: 11px; border-radius: 3px;
  background: rgba(255, 255, 255, 0.07);
}
.qh-heat-1 { background: rgba(159, 211, 174, 0.25); }
.qh-heat-2 { background: rgba(159, 211, 174, 0.45); }
.qh-heat-3 { background: rgba(159, 211, 174, 0.7); }
.qh-heat-4 { background: var(--qh-accent); }
.qh-heat.qh-today { outline: 1px solid rgba(255, 255, 255, 0.55); outline-offset: 1px; }
.qh-card-foot .qh-heat { width: 9px; height: 9px; }
`;

// src/client/locale.js
var zh = {
  "panel.title": "\u4E3B\u9875",
  "hero.headline": "\u4ECA\u5929\uFF0C\u4ECE\u4E00\u4EF6\u5C0F\u4E8B\u5F00\u59CB\u3002",
  "hero.greeting.morning": "\u65E9\u4E0A\u597D",
  "hero.greeting.afternoon": "\u4E0B\u5348\u597D",
  "hero.greeting.evening": "\u665A\u4E0A\u597D",
  "search.placeholder": "\u641C\u7D22\u4F1A\u8BDD\u2026",
  "search.hint": "Enter \u6253\u5F00\u7B2C\u4E00\u4E2A\u7ED3\u679C \xB7 Esc \u6E05\u7A7A",
  "search.loading": "\u6B63\u5728\u641C\u7D22\u2026",
  "search.empty": "\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",
  "search.error": "\u641C\u7D22\u6682\u65F6\u4E0D\u53EF\u7528",
  "search.newSession": "\u65B0\u4F1A\u8BDD",
  "search.openWorkspace": "\u6253\u5F00\u5DE5\u4F5C\u533A",
  "tabs.home": "\u4E3B\u9875",
  "tabs.focus": "\u4E13\u6CE8",
  "tabs.explore": "\u63A2\u7D22",
  "card.todo": "\u4ECA\u65E5\u5F85\u529E",
  "card.recent": "\u6700\u8FD1\u4F1A\u8BDD",
  "card.shortcuts": "\u5E38\u7528\u5165\u53E3",
  "card.focus": "\u4E13\u6CE8\u8BA1\u65F6",
  "card.progress": "\u65F6\u95F4\u8FDB\u5EA6",
  "card.worldclock": "\u4E16\u754C\u65F6\u949F",
  "card.quote": "\u6BCF\u65E5\u4E00\u53E5",
  "card.weather": "\u5929\u6C14",
  "todo.placeholder": "\u6DFB\u52A0\u5F85\u529E\uFF0C\u56DE\u8F66\u4FDD\u5B58",
  "todo.empty": "\u8FD8\u6CA1\u6709\u5F85\u529E\uFF0C\u5199\u4E0B\u4E00\u4EF6\u5C0F\u4E8B\u3002",
  "todo.remaining": "{count} \u5F85\u5B8C\u6210",
  "todo.clearDone": "\u6E05\u9664\u5DF2\u5B8C\u6210",
  "todo.allDone": "\u5168\u90E8\u5B8C\u6210\u4E86\uFF0C\u771F\u597D\u3002",
  "recent.empty": "\u8FD8\u6CA1\u6709\u4F1A\u8BDD\uFF0C\u5F00\u59CB\u4E00\u4E2A\u65B0\u7684\u5427\u3002",
  "recent.new": "\u65B0\u4F1A\u8BDD",
  "recent.untitled": "\u672A\u547D\u540D\u4F1A\u8BDD",
  "recent.justNow": "\u521A\u521A",
  "recent.minutes": "{n} \u5206\u949F\u524D",
  "recent.hours": "{n} \u5C0F\u65F6\u524D",
  "recent.days": "{n} \u5929\u524D",
  "shortcuts.newSession": "\u65B0\u4F1A\u8BDD",
  "shortcuts.openWorkspace": "\u6253\u5F00\u5DE5\u4F5C\u533A",
  "shortcuts.add": "\u6DFB\u52A0\u7F51\u5740",
  "shortcuts.namePlaceholder": "\u540D\u79F0",
  "shortcuts.urlPlaceholder": "https://\u2026",
  "shortcuts.confirm": "\u6DFB\u52A0",
  "shortcuts.cancel": "\u53D6\u6D88",
  "shortcuts.invalid": "\u8BF7\u8F93\u5165\u5B8C\u6574\u7684 http(s) \u7F51\u5740",
  "settings.category.links": "\u5FEB\u6377\u5165\u53E3",
  "shortcuts.edit": "\u7F16\u8F91",
  "shortcuts.menuFor": "{name}\u9009\u9879",
  "shortcuts.empty": "\u70B9\u51FB\u53F3\u4E0A\u89D2 + \u6DFB\u52A0\u7F51\u5740\uFF0C\u6216\u5728\u7EC4\u4EF6\u5E93\u5BFC\u5165\u6D4F\u89C8\u5668\u4E66\u7B7E\u3002",
  "shortcuts.addTitle": "\u6DFB\u52A0\u5FEB\u6377\u5165\u53E3",
  "shortcuts.editTitle": "\u7F16\u8F91\u5FEB\u6377\u5165\u53E3",
  "shortcuts.urlLabel": "\u7F51\u5740",
  "shortcuts.nameLabel": "\u663E\u793A\u540D\u79F0\uFF08\u53EF\u7559\u7A7A\uFF0C\u9ED8\u8BA4\u7528\u57DF\u540D\uFF09",
  "shortcuts.iconLabel": "\u56FE\u6807",
  "shortcuts.siteIcon": "\u7F51\u7AD9\u56FE\u6807",
  "shortcuts.save": "\u4FDD\u5B58",
  "shortcuts.renameGroup": "\u91CD\u547D\u540D\u5165\u53E3\u7EC4",
  "shortcuts.groupName": "\u5165\u53E3\u7EC4\u540D\u79F0",
  "shortcuts.newGroup": "\u65B0\u5EFA\u5165\u53E3\u7EC4",
  "shortcuts.newGroupDesc": "\u518D\u5EFA\u4E00\u7EC4\u81EA\u5DF1\u7684\u7F51\u5740\u5165\u53E3\uFF0C\u6BD4\u5982\u300C\u5B66\u4E60\u300D\u300C\u5DE5\u5177\u300D\u3002",
  "shortcuts.newShort": "\u65B0\u5EFA",
  "shortcuts.deleteGroup": "\u5220\u9664\u5165\u53E3\u7EC4",
  "shortcuts.deleteGroupConfirm": "\u6C38\u4E45\u5220\u9664\u300C{name}\u300D\u53CA\u5176\u5168\u90E8\u5165\u53E3\uFF1F\u6B64\u64CD\u4F5C\u53EF\u5728\u63D0\u793A\u6761\u91CC\u64A4\u9500\u3002",
  "shortcuts.groupDesc": "\u5DF2\u6DFB\u52A0\u7684\u5FEB\u6377\u5165\u53E3",
  "import.title": "\u5BFC\u5165\u6D4F\u89C8\u5668\u4E66\u7B7E",
  "import.desc": "\u9009\u62E9\u6D4F\u89C8\u5668\u5BFC\u51FA\u7684 HTML\uFF0C\u9884\u89C8\u540E\u5BFC\u5165\u4E3A\u4E00\u4E2A\u5165\u53E3\u7EC4\u3002",
  "import.hint": "\u9009\u62E9\u6D4F\u89C8\u5668\u5BFC\u51FA\u7684\u4E66\u7B7E HTML \u6587\u4EF6\uFF0C\u9884\u89C8\u540E\u5BFC\u5165\u4E3A\u4E00\u4E2A\u5165\u53E3\u7EC4\u3002\u6700\u591A\u5BFC\u5165\u524D {max} \u4E2A\u4E0D\u540C\u7684\u7F51\u5740\u3002",
  "import.file": "\u4E66\u7B7E HTML \u6587\u4EF6",
  "import.tooLarge": "\u6587\u4EF6\u9700\u5C0F\u4E8E 2 MB",
  "import.none": "\u6CA1\u6709\u627E\u5230\u53EF\u5BFC\u5165\u7684 http(s) \u7F51\u5740",
  "import.failed": "\u8BFB\u53D6\u5931\u8D25",
  "import.count": "\u5C06\u5BFC\u5165 {count} \u4E2A\u7F51\u5740",
  "import.more": "\u2026\u8FD8\u6709 {count} \u4E2A",
  "import.confirm": "\u5BFC\u5165",
  "import.open": "\u5BFC\u5165",
  "import.groupName": "\u5BFC\u5165\u7684\u4E66\u7B7E",
  "shortcuts.icon.link": "\u94FE\u63A5",
  "shortcuts.icon.globe": "\u7F51\u9875",
  "shortcuts.icon.folder": "\u6587\u4EF6\u5939",
  "shortcuts.icon.book": "\u9605\u8BFB",
  "shortcuts.icon.home": "\u4E3B\u9875",
  "shortcuts.icon.pen": "\u5199\u4F5C",
  "shortcuts.icon.notebook": "\u7B14\u8BB0",
  "shortcuts.icon.target": "\u76EE\u6807",
  "shortcuts.icon.flame": "\u706B\u7130",
  "shortcuts.icon.zap": "\u95EA\u7535",
  "shortcuts.icon.calendar": "\u65E5\u5386",
  "shortcuts.icon.sun": "\u592A\u9633",
  "focus.start": "\u5F00\u59CB",
  "focus.pause": "\u6682\u505C",
  "focus.paused": "\u5DF2\u6682\u505C",
  "focus.resume": "\u7EE7\u7EED",
  "focus.reset": "\u91CD\u7F6E",
  "focus.done": "\u5B8C\u6210\u4E86\uFF0C\u4F11\u606F\u4E00\u4E0B\u3002",
  "focus.running": "\u4E13\u6CE8\u4E2D",
  "focus.idle": "\u9009\u62E9\u65F6\u957F\u5F00\u59CB\u4E13\u6CE8",
  "focus.minutes": "{minutes} \u5206",
  "progress.today": "\u4ECA\u5929",
  "progress.week": "\u672C\u5468",
  "progress.month": "\u672C\u6708",
  "progress.year": "\u4ECA\u5E74",
  "worldclock.today": "",
  "worldclock.tomorrow": "\u660E\u5929",
  "worldclock.yesterday": "\u6628\u5929",
  "quote.another": "\u6362\u4E00\u53E5",
  "weather.choose": "\u9009\u62E9\u57CE\u5E02",
  "weather.change": "\u66F4\u6362\u5730\u70B9",
  "weather.search": "\u641C\u7D22\u57CE\u5E02\uFF0C\u5982\uFF1A\u676D\u5DDE\u3001Tokyo\u2026",
  "weather.searching": "\u6B63\u5728\u641C\u7D22\u5730\u70B9\u2026",
  "weather.searchError": "\u5730\u70B9\u641C\u7D22\u6682\u65F6\u4E0D\u53EF\u7528",
  "weather.noResults": "\u6CA1\u6709\u5339\u914D\u7684\u5730\u70B9",
  "weather.loading": "\u6B63\u5728\u67E5\u8BE2\u5929\u6C14\u2026",
  "weather.error": "\u6682\u65F6\u65E0\u6CD5\u83B7\u53D6\u5929\u6C14\uFF0C\u70B9\u51FB\u91CD\u8BD5",
  "weather.retry": "\u91CD\u8BD5",
  "weather.feels": "\u4F53\u611F {value}\xB0",
  "weather.today": "\u4ECA\u5929",
  "weather.tomorrow": "\u660E\u5929",
  "weather.afterTomorrow": "\u540E\u5929",
  "settings.title": "\u5E03\u7F6E\u4E3B\u9875",
  "settings.cards": "\u5361\u7247",
  "settings.wallpaper": "\u58C1\u7EB8",
  "settings.wallpaper.daily": "\u6BCF\u65E5\u4E00\u6362",
  "settings.wallpaper.open": "\u6BCF\u6B21\u6253\u5F00\u66F4\u6362",
  "settings.wallpaper.gradient": "\u4EC5\u7528\u6E10\u53D8",
  "settings.headline": "\u9876\u90E8\u6587\u5B57",
  "settings.headline.placeholder": "\u7559\u7A7A\u663E\u793A\u9ED8\u8BA4\u95EE\u5019",
  "settings.reset": "\u91CD\u7F6E\u5168\u90E8\u8BBE\u7F6E",
  "settings.close": "\u5B8C\u6210",
  "settings.section.library": "\u7EC4\u4EF6\u5E93",
  "settings.section.tabs": "Tab \u7BA1\u7406",
  "settings.section.appearance": "\u5916\u89C2",
  "settings.forTab": "\u6DFB\u52A0\u5230\u300C{name}\u300D",
  "settings.searchCards": "\u641C\u7D22\u7EC4\u4EF6\u2026",
  "settings.onlyNew": "\u53EA\u770B\u672A\u6DFB\u52A0",
  "settings.installed": "\u5DF2\u6DFB\u52A0 \xB7 \u53EF\u6392\u5E8F",
  "settings.available": "\u53EF\u6DFB\u52A0",
  "settings.noCards": "\u6CA1\u6709\u5339\u914D\u7684\u7EC4\u4EF6",
  "settings.emptyTab": "\u6B64\u9875\u8FD8\u6CA1\u6709\u7EC4\u4EF6\uFF0C\u70B9\u51FB\u6DFB\u52A0",
  "settings.addCard": "\u6DFB\u52A0{name}",
  "settings.removeCard": "\u79FB\u9664{name}",
  "settings.moveUp": "\u4E0A\u79FB{name}",
  "settings.moveDown": "\u4E0B\u79FB{name}",
  "settings.tabName": "Tab \u540D\u79F0",
  "settings.newTab": "\u65B0\u5EFA Tab",
  "settings.tabTemplate": "Tab \u6A21\u677F",
  "settings.blankTab": "\u7A7A\u767D\u9875",
  "library.title": "\u7EC4\u4EF6\u5E93",
  "library.target": "\u6DFB\u52A0\u5230",
  "library.targetAria": "\u76EE\u6807 Tab",
  "library.search": "\u641C\u7D22\u7EC4\u4EF6",
  "library.searchHint": "\u6309\u540D\u79F0\u3001\u8BF4\u660E\u6216\u5185\u5BB9\u641C\u7D22\u2026",
  "library.filterAria": "\u6309\u5206\u7C7B\u7B5B\u9009",
  "library.added": "\u5DF2\u6DFB\u52A0",
  "library.add": "\u6DFB\u52A0",
  "library.remove": "\u4ECE\u6B64\u9875\u79FB\u9664",
  "library.addAria": "\u6DFB\u52A0{name}",
  "library.removeAria": "\u4ECE\u6B64\u9875\u79FB\u9664{name}",
  "library.elsewhere": "\u4E5F\u5728\uFF1A{tabs}",
  "settings.appearance": "\u5916\u89C2",
  "pages.add": "\u65B0\u5EFA Tab",
  "pages.example": "\u4F8B\u5982\uFF1A\u5DE5\u4F5C",
  "pages.menu": "Tab \u9009\u9879",
  "pages.label": "\u9875\u9762\u6807\u7B7E",
  "pages.rename": "\u91CD\u547D\u540D",
  "pages.duplicate": "\u590D\u5236 Tab",
  "pages.copyName": "{name} \u526F\u672C",
  "pages.delete": "\u5220\u9664 Tab",
  "pages.deleteConfirm": "\u786E\u5B9A\u5220\u9664\u300C{name}\u300D\u5417\uFF1F\u5F85\u529E\u3001\u8BB0\u5F55\u7B49\u5185\u5BB9\u4E0D\u4F1A\u4E22\u5931\uFF0C\u7EC4\u4EF6\u53EF\u5728\u7EC4\u4EF6\u5E93\u91CD\u65B0\u6DFB\u52A0\u3002",
  "dialog.cancel": "\u53D6\u6D88",
  "template.hint": "\u4ECE\u6A21\u677F\u5F00\u59CB\uFF0C\u7EC4\u4EF6\u5DF2\u7ECF\u653E\u597D\uFF1B\u4E5F\u53EF\u4EE5\u7559\u7A7A\u81EA\u5DF1\u5E03\u7F6E\u3002",
  "template.blank.desc": "\u81EA\u5DF1\u6DFB\u52A0\u7EC4\u4EF6",
  "template.home": "\u4E3B\u9875",
  "template.home.desc": "\u4ECA\u65E5\u91CD\u70B9\u3001\u5F85\u529E\u3001\u6700\u8FD1\u4F1A\u8BDD\u548C\u5E38\u7528\u5165\u53E3",
  "template.work": "\u5DE5\u4F5C\u53F0",
  "template.work.desc": "\u91CD\u70B9\u3001\u5F85\u529E\u3001\u6700\u8FD1\u4F1A\u8BDD\u3001\u4E13\u6CE8\u8BA1\u65F6\u4E0E\u5FEB\u901F\u8BB0\u5F55",
  "template.focus": "\u4E13\u6CE8",
  "template.focus.desc": "\u8BA1\u65F6\u3001\u4E60\u60EF\u3001\u767D\u566A\u97F3\u3001\u65F6\u95F4\u8FDB\u5EA6\u548C\u4E16\u754C\u65F6\u949F",
  "template.notes": "\u8BB0\u5F55",
  "template.notes.desc": "\u5FEB\u901F\u8BB0\u5F55\u3001\u4FBF\u7B7E\u3001\u6BCF\u65E5\u4E00\u95EE\u548C\u4F1A\u8BDD\u6D3B\u52A8",
  "template.reading": "\u9605\u8BFB",
  "template.reading.desc": "\u6BCF\u65E5\u4E00\u53E5\u3001\u591A\u7AD9\u641C\u7D22\u3001\u4FBF\u7B7E\u548C\u6BCF\u65E5\u4E00\u95EE",
  "template.rhythm": "\u8282\u594F",
  "template.rhythm.desc": "\u4E60\u60EF\u6253\u5361\u3001\u5012\u8BA1\u65F6\u3001\u65F6\u95F4\u8FDB\u5EA6\u548C\u4F1A\u8BDD\u6D3B\u52A8",
  "template.explore": "\u63A2\u7D22",
  "template.explore.desc": "\u6BCF\u65E5\u4E00\u53E5\u3001\u591A\u7AD9\u641C\u7D22\u3001\u5929\u6C14\u548C\u5012\u8BA1\u65F6",
  "cardSettings.open": "\u7EC4\u4EF6\u8BBE\u7F6E",
  "cardSettings.title": "{name}\u8BBE\u7F6E",
  "cardSettings.count": "\u663E\u793A\u6570\u91CF",
  "cardSettings.onEnter": "\u56DE\u8F66\u65F6",
  "cardSettings.openAll": "\u6253\u5F00\u6240\u6709\u70B9\u4EAE\u7684\u7AD9\u70B9",
  "cardSettings.openFirst": "\u53EA\u6253\u5F00\u7B2C\u4E00\u4E2A\u70B9\u4EAE\u7684\u7AD9\u70B9",
  "cardSettings.note": "\u66F4\u6539\u7ACB\u5373\u4FDD\u5B58\uFF0C\u53EA\u4F5C\u7528\u4E8E\u5F53\u524D Tab\u3002",
  "layout.move": "\u79FB\u5230\u5176\u4ED6 Tab\u2026",
  "layout.moveTitle": "\u79FB\u52A8\u300C{name}\u300D",
  "layout.singlePage": "\u76EE\u524D\u53EA\u6709\u4E00\u4E2A Tab\uFF0C\u5148\u65B0\u5EFA\u4E00\u4E2A\u624D\u80FD\u79FB\u52A8\u3002",
  "layout.earlier": "\u5F80\u524D\u79FB",
  "layout.later": "\u5F80\u540E\u79FB",
  "layout.remove": "\u4ECE\u6B64\u9875\u79FB\u9664",
  "layout.menuFor": "{name}\u83DC\u5355",
  "layout.dragFor": "{name}\uFF1A\u62D6\u52A8\u6392\u5E8F\uFF0CEnter \u6253\u5F00\u83DC\u5355\uFF0CAlt+\u2191/\u2193 \u8C03\u6574\u987A\u5E8F",
  "layout.dragHint": "\u62D6\u52A8\u6392\u5E8F\uFF0C\u70B9\u51FB\u6253\u5F00\u83DC\u5355",
  "layout.done": "\u5B8C\u6210",
  "layout.customize": "\u5E03\u7F6E\u4E3B\u9875",
  "layout.editHint": "\u62D6\u52A8\u5361\u7247\u6216\u6807\u7B7E\u8C03\u6574\u987A\u5E8F\uFF1B\u70B9\u51FB\u624B\u67C4\u6253\u5F00\u83DC\u5355\uFF1B\u952E\u76D8\u53EF\u7528 Alt+\u2191/\u2193\u3002",
  "layout.movedAnnounce": "{name} \u5DF2\u79FB\u5230\u7B2C {position}/{total} \u4F4D",
  "toast.undo": "\u64A4\u9500",
  "toast.undoStale": "\u4E4B\u540E\u53C8\u6709\u4FEE\u6539\uFF0C\u65E0\u6CD5\u64A4\u9500",
  "toast.reset": "\u5DF2\u6062\u590D\u300C{name}\u300D\u7684\u9ED8\u8BA4\u5E03\u5C40",
  "toast.removed": "\u5DF2\u79FB\u9664\u300C{name}\u300D",
  "toast.addedToTab": "\u5DF2\u6DFB\u52A0\u300C{name}\u300D\u5230\u300C{tab}\u300D",
  "toast.removedFromTab": "\u5DF2\u4ECE\u300C{tab}\u300D\u79FB\u9664\u300C{name}\u300D",
  "toast.moved": "\u5DF2\u5C06\u300C{name}\u300D\u79FB\u5230\u300C{tab}\u300D",
  "toast.deleted": "\u5DF2\u5220\u9664\u300C{name}\u300D",
  "toast.resetAll": "\u5DF2\u91CD\u7F6E\u5916\u89C2\u4E0E\u5E03\u5C40",
  "multiSearch.sites": "\u641C\u7D22\u7AD9\u70B9",
  "multiSearch.groups": "\u7AD9\u70B9\u5206\u7EC4",
  "multiSearch.templates": "\u81EA\u5B9A\u4E49\u7AD9\u70B9",
  "multiSearch.templatePlaceholder": "\u6BCF\u884C\u4E00\u4E2A\uFF1A\u540D\u79F0 | https://example.com/?q={query}",
  "multiSearch.templateLine": "\u7B2C {line} \u884C\u9700\u8981\uFF1A\u540D\u79F0 | \u542B {query} \u7684\u7F51\u5740",
  "multiSearch.templateQuery": "\u7B2C {line} \u884C\u7684 {query} \u53EA\u80FD\u653E\u5728\u8DEF\u5F84\u6216\u67E5\u8BE2\u53C2\u6570\u4E2D",
  "multiSearch.templateUrl": "\u7B2C {line} \u884C\u7684\u7F51\u5740\u65E0\u6548",
  "multiSearch.openAllHint": "\u56DE\u8F66\u540C\u65F6\u641C\u7D22 {count} \u4E2A\u7AD9\u70B9",
  "multiSearch.openFirstHint": "\u56DE\u8F66\u53EA\u641C\u7D22 {name}",
  "card.dailyFocus.desc": "\u6700\u591A\u4E09\u4EF6\u4ECA\u65E5\u91CD\u70B9\uFF0C\u672A\u5B8C\u6210\u7684\u4F1A\u7ED3\u8F6C\u5230\u660E\u5929",
  "card.todo.desc": "\u8BB0\u5F55\u5F85\u529E\uFF0C\u52FE\u9009\u5B8C\u6210",
  "card.recent.desc": "\u5FEB\u901F\u56DE\u5230\u6700\u8FD1\u7684 DSH \u4F1A\u8BDD",
  "card.shortcuts.desc": "\u81EA\u5B9A\u4E49\u5E38\u7528\u7F51\u5740\u4E0E\u5165\u53E3",
  "card.quickNote.desc": "\u968F\u624B\u8BB0\u5F55\u5E76\u590D\u5236\u4E3A Markdown",
  "card.scratchpad.desc": "\u81EA\u52A8\u4FDD\u5B58\u7684\u957F\u6587\u672C\u4FBF\u7B7E",
  "card.dailyQuestion.desc": "\u6BCF\u5929\u4E00\u4E2A\u95EE\u9898\uFF0C\u5199\u4E0B\u4F60\u7684\u56DE\u7B54",
  "card.heatmap.desc": "\u6309\u5929\u67E5\u770B\u4F1A\u8BDD\u6D3B\u8DC3\u5EA6",
  "card.focus.desc": "15\u201360 \u5206\u949F\u4E13\u6CE8\u8BA1\u65F6",
  "card.habit.desc": "\u6BCF\u65E5\u4E60\u60EF\u6253\u5361\u4E0E\u8FDE\u7EED\u5929\u6570",
  "card.ambient.desc": "\u672C\u5730\u751F\u6210\u7684\u767D/\u7C89/\u68D5\u566A\u97F3",
  "card.progress.desc": "\u4ECA\u5929\u3001\u672C\u5468\u3001\u672C\u6708\u3001\u4ECA\u5E74\u7684\u8FDB\u5EA6",
  "card.worldclock.desc": "\u591A\u4E2A\u65F6\u533A\u7684\u5F53\u524D\u65F6\u95F4",
  "card.quote.desc": "\u6BCF\u5929\u4E00\u53E5\u503C\u5F97\u8BB0\u4F4F\u7684\u8BDD",
  "card.multiSearch.desc": "\u5728\u591A\u4E2A\u641C\u7D22\u7AD9\u70B9\u95F4\u5207\u6362\u67E5\u8BE2",
  "card.weather.desc": "\u9009\u62E9\u57CE\u5E02\u67E5\u770B\u5929\u6C14",
  "card.countdown.desc": "\u8DDD\u79BB\u91CD\u8981\u65E5\u671F\u8FD8\u6709\u51E0\u5929",
  "settings.resetTab": "\u6062\u590D\u9ED8\u8BA4\u5E03\u5C40",
  "settings.copyTab": "\u590D\u5236\u300C{name}\u300D\u7684\u5E03\u5C40",
  "settings.addTab": "\u65B0\u5EFA Tab",
  "settings.rename": "\u91CD\u547D\u540D",
  "settings.renameTab": "\u91CD\u547D\u540D{name}",
  "settings.deleteTab": "\u5220\u9664{name}",
  "settings.homeFixed": "\u56FA\u5B9A",
  "settings.category.all": "\u5168\u90E8",
  "settings.category.plan": "\u8BA1\u5212",
  "settings.category.notes": "\u8BB0\u5F55",
  "settings.category.dsh": "DSH",
  "settings.category.focus": "\u4E13\u6CE8",
  "settings.category.time": "\u65F6\u95F4",
  "settings.category.discover": "\u63A2\u7D22",
  "wallpaper.next": "\u6362\u4E00\u5F20",
  "tabs.notes": "\u8BB0\u5F55",
  "card.dailyFocus": "\u4ECA\u65E5\u91CD\u70B9",
  "card.quickNote": "\u5FEB\u901F\u8BB0\u5F55",
  "card.scratchpad": "\u4FBF\u7B7E",
  "card.habit": "\u4E60\u60EF\u6253\u5361",
  "card.countdown": "\u5012\u8BA1\u65F6",
  "card.dailyQuestion": "\u6BCF\u65E5\u4E00\u95EE",
  "card.multiSearch": "\u591A\u7AD9\u641C\u7D22",
  "card.heatmap": "\u4F1A\u8BDD\u6D3B\u52A8",
  "card.ambient": "\u4E13\u6CE8\u767D\u566A\u97F3",
  "dailyFocus.placeholder": "\u4ECA\u5929\u6700\u91CD\u8981\u7684\u4E8B\uFF0C\u56DE\u8F66\u6DFB\u52A0",
  "dailyFocus.hint": "\u6700\u591A\u4E09\u4EF6\uFF0C\u6CA1\u5B8C\u6210\u7684\u660E\u5929\u8FD8\u5728",
  "dailyFocus.full": "\u4ECA\u5929\u6700\u591A\u4E13\u6CE8\u4E09\u4EF6\u4E8B",
  "dailyFocus.empty": "\u7ED9\u4ECA\u5929\u5B9A\u4E00\u4E2A\u91CD\u70B9\u3002",
  "quickNote.placeholder": "\u8BB0\u4E00\u7B14\uFF0C\u56DE\u8F66\u4FDD\u5B58",
  "quickNote.empty": "\u8FD8\u6CA1\u6709\u8BB0\u5F55\u3002",
  "quickNote.copy": "\u590D\u5236\u5168\u90E8",
  "quickNote.copied": "\u5DF2\u590D\u5236",
  "quickNote.clear": "\u6E05\u7A7A",
  "quickNote.showAll": "\u67E5\u770B\u5168\u90E8 {count} \u6761",
  "quickNote.showLess": "\u6536\u8D77",
  "action.remove": "\u5220\u9664 {name}",
  "scratchpad.placeholder": "\u968F\u624B\u5199\u70B9\u4EC0\u4E48\uFF0C\u81EA\u52A8\u4FDD\u5B58\u2026",
  "habit.add": "\u6DFB\u52A0\u4E60\u60EF\uFF0C\u5982\u300C\u559D\u6C34:8\u300D",
  "habit.empty": "\u6DFB\u52A0\u4E00\u4E2A\u60F3\u517B\u6210\u7684\u4E60\u60EF\u3002",
  "habit.today": "{count}/{target}",
  "habit.done": "\u5DF2\u8FBE\u6210",
  "countdown.set": "\u8BBE\u7F6E\u76EE\u6807\u65E5\u671F",
  "countdown.label": "\u540D\u79F0\uFF08\u53EF\u9009\uFF09",
  "countdown.days": "\u5929",
  "countdown.today": "\u5C31\u662F\u4ECA\u5929",
  "countdown.passed": "\u5DF2\u8FC7 {n} \u5929",
  "countdown.left": "\u8FD8\u6709 {n} \u5929",
  "countdown.edit": "\u4FEE\u6539",
  "countdown.unset": "\u8FD8\u6CA1\u6709\u5012\u8BA1\u65F6\uFF0C\u8BBE\u7F6E\u4E00\u4E2A\u76EE\u6807\u65E5\u671F\u3002",
  "dailyQuestion.placeholder": "\u5199\u4E0B\u4ECA\u5929\u7684\u56DE\u7B54\u2026",
  "dailyQuestion.saved": "\u5DF2\u4FDD\u5B58",
  "multiSearch.placeholder": "\u8F93\u5165\u5173\u952E\u8BCD\uFF0C\u56DE\u8F66\u641C\u7D22",
  "multiSearch.open": "\u641C\u7D22",
  "heatmap.empty": "\u8FD8\u6CA1\u6709\u4F1A\u8BDD\u6D3B\u52A8\u3002",
  "heatmap.less": "\u5C11",
  "heatmap.more": "\u591A",
  "ambient.white": "\u767D\u566A\u97F3",
  "ambient.pink": "\u7C89\u566A\u97F3",
  "ambient.brown": "\u68D5\u566A\u97F3",
  "ambient.play": "\u64AD\u653E",
  "ambient.stop": "\u505C\u6B62",
  "date.format": "{month}\u6708{day}\u65E5 \u5468{weekday}",
  "date.weekdays": "\u4E00 \u4E8C \u4E09 \u56DB \u4E94 \u516D \u65E5"
};
var en = {
  "panel.title": "Home",
  "hero.headline": "Start with one small thing.",
  "hero.greeting.morning": "Good morning",
  "hero.greeting.afternoon": "Good afternoon",
  "hero.greeting.evening": "Good evening",
  "search.placeholder": "Search sessions\u2026",
  "search.hint": "Enter opens the first result \xB7 Esc clears",
  "search.loading": "Searching\u2026",
  "search.empty": "No matching sessions",
  "search.error": "Search is unavailable right now",
  "search.newSession": "New session",
  "search.openWorkspace": "Open workspace",
  "tabs.home": "Home",
  "tabs.focus": "Focus",
  "tabs.explore": "Explore",
  "card.todo": "Today's todos",
  "card.recent": "Recent sessions",
  "card.shortcuts": "Shortcuts",
  "card.focus": "Focus timer",
  "card.progress": "Time progress",
  "card.worldclock": "World clock",
  "card.quote": "Quote of the day",
  "card.weather": "Weather",
  "todo.placeholder": "Add a todo, press Enter",
  "todo.empty": "Nothing yet. Write down one small thing.",
  "todo.remaining": "{count} to go",
  "todo.clearDone": "Clear done",
  "todo.allDone": "All done. Nice.",
  "recent.empty": "No sessions yet. Start a new one.",
  "recent.new": "New session",
  "recent.untitled": "Untitled session",
  "recent.justNow": "just now",
  "recent.minutes": "{n}m ago",
  "recent.hours": "{n}h ago",
  "recent.days": "{n}d ago",
  "shortcuts.newSession": "New session",
  "shortcuts.openWorkspace": "Open workspace",
  "shortcuts.add": "Add website",
  "shortcuts.namePlaceholder": "Name",
  "shortcuts.urlPlaceholder": "https://\u2026",
  "shortcuts.confirm": "Add",
  "shortcuts.cancel": "Cancel",
  "shortcuts.invalid": "Enter a full http(s) URL",
  "settings.category.links": "Shortcuts",
  "shortcuts.edit": "Edit",
  "shortcuts.menuFor": "{name} options",
  "shortcuts.empty": "Use + above to add a website, or import browser bookmarks from the library.",
  "shortcuts.addTitle": "Add shortcut",
  "shortcuts.editTitle": "Edit shortcut",
  "shortcuts.urlLabel": "Website",
  "shortcuts.nameLabel": "Display name (optional; defaults to the domain)",
  "shortcuts.iconLabel": "Icon",
  "shortcuts.siteIcon": "Site icon",
  "shortcuts.save": "Save",
  "shortcuts.renameGroup": "Rename group",
  "shortcuts.groupName": "Group name",
  "shortcuts.newGroup": "New shortcut group",
  "shortcuts.newGroupDesc": "Make another group of your own links, such as Study or Tools.",
  "shortcuts.newShort": "Create",
  "shortcuts.deleteGroup": "Delete group",
  "shortcuts.deleteGroupConfirm": "Permanently delete \u201C{name}\u201D and all its shortcuts? You can undo from the toast.",
  "shortcuts.groupDesc": "Your saved shortcuts",
  "import.title": "Import browser bookmarks",
  "import.desc": "Choose an exported HTML file, preview it, and import it as a group.",
  "import.hint": "Choose a bookmark HTML file exported from your browser. Preview it, then import up to {max} unique websites as one group.",
  "import.file": "Bookmark HTML file",
  "import.tooLarge": "File must be smaller than 2 MB",
  "import.none": "No importable http(s) links found",
  "import.failed": "Could not read the file",
  "import.count": "{count} websites to import",
  "import.more": "\u2026and {count} more",
  "import.confirm": "Import",
  "import.open": "Import",
  "import.groupName": "Imported bookmarks",
  "shortcuts.icon.link": "Link",
  "shortcuts.icon.globe": "Web",
  "shortcuts.icon.folder": "Folder",
  "shortcuts.icon.book": "Reading",
  "shortcuts.icon.home": "Home",
  "shortcuts.icon.pen": "Writing",
  "shortcuts.icon.notebook": "Notes",
  "shortcuts.icon.target": "Target",
  "shortcuts.icon.flame": "Flame",
  "shortcuts.icon.zap": "Bolt",
  "shortcuts.icon.calendar": "Calendar",
  "shortcuts.icon.sun": "Sun",
  "focus.start": "Start",
  "focus.pause": "Pause",
  "focus.paused": "Paused",
  "focus.resume": "Resume",
  "focus.reset": "Reset",
  "focus.done": "Done. Take a break.",
  "focus.running": "Focusing",
  "focus.idle": "Pick a length to focus",
  "focus.minutes": "{minutes}m",
  "progress.today": "Today",
  "progress.week": "Week",
  "progress.month": "Month",
  "progress.year": "Year",
  "worldclock.today": "",
  "worldclock.tomorrow": "Tomorrow",
  "worldclock.yesterday": "Yesterday",
  "quote.another": "Another",
  "weather.choose": "Choose city",
  "weather.change": "Change location",
  "weather.search": "Search a city, e.g. Hangzhou, Tokyo\u2026",
  "weather.searching": "Searching places\u2026",
  "weather.searchError": "Location search unavailable",
  "weather.noResults": "No matching places",
  "weather.loading": "Loading weather\u2026",
  "weather.error": "Weather unavailable. Tap to retry",
  "weather.retry": "Retry",
  "weather.feels": "Feels {value}\xB0",
  "weather.today": "Today",
  "weather.tomorrow": "Tomorrow",
  "weather.afterTomorrow": "Day after",
  "settings.title": "Arrange Home",
  "settings.cards": "Cards",
  "settings.wallpaper": "Wallpaper",
  "settings.wallpaper.daily": "Daily rotation",
  "settings.wallpaper.open": "Rotate every visit",
  "settings.wallpaper.gradient": "Gradient only",
  "settings.headline": "Headline",
  "settings.headline.placeholder": "Empty shows the default greeting",
  "settings.reset": "Reset everything",
  "settings.close": "Done",
  "settings.section.library": "Widgets",
  "settings.section.tabs": "Tabs",
  "settings.section.appearance": "Appearance",
  "settings.forTab": "Add to {name}",
  "settings.searchCards": "Search widgets\u2026",
  "settings.onlyNew": "Not added only",
  "settings.installed": "Added \xB7 reorder",
  "settings.available": "Available",
  "settings.noCards": "No matching widgets",
  "settings.emptyTab": "No widgets here yet. Add one",
  "settings.addCard": "Add {name}",
  "settings.removeCard": "Remove {name}",
  "settings.moveUp": "Move {name} up",
  "settings.moveDown": "Move {name} down",
  "settings.tabName": "Tab name",
  "settings.newTab": "New tab",
  "settings.tabTemplate": "Tab template",
  "settings.blankTab": "Blank tab",
  "library.title": "Widget library",
  "library.target": "Add to",
  "library.targetAria": "Target tab",
  "library.search": "Search widgets",
  "library.searchHint": "Search by name, description or content\u2026",
  "library.filterAria": "Filter by category",
  "library.added": "Added",
  "library.add": "Add",
  "library.remove": "Remove from tab",
  "library.addAria": "Add {name}",
  "library.removeAria": "Remove {name} from this tab",
  "library.elsewhere": "Also on: {tabs}",
  "settings.appearance": "Appearance",
  "pages.add": "New tab",
  "pages.example": "e.g. Work",
  "pages.menu": "Tab options",
  "pages.label": "Pages",
  "pages.rename": "Rename",
  "pages.duplicate": "Duplicate tab",
  "pages.copyName": "{name} copy",
  "pages.delete": "Delete tab",
  "pages.deleteConfirm": "Delete \u201C{name}\u201D? Todos, notes and other content are kept; widgets can be added again from the library.",
  "dialog.cancel": "Cancel",
  "template.hint": "Start from a template with widgets in place, or start blank.",
  "template.blank.desc": "Add widgets yourself",
  "template.home": "Home",
  "template.home.desc": "Focus, todos, recent sessions and shortcuts",
  "template.work": "Workbench",
  "template.work.desc": "Priorities, todos, recent sessions, timer and quick capture",
  "template.focus": "Focus",
  "template.focus.desc": "Timer, habits, ambient noise, progress and world clock",
  "template.notes": "Notes",
  "template.notes.desc": "Quick capture, scratchpad, daily question and activity",
  "template.reading": "Reading",
  "template.reading.desc": "Quote, web search, scratchpad and daily question",
  "template.rhythm": "Rhythm",
  "template.rhythm.desc": "Habits, countdown, progress and session activity",
  "template.explore": "Explore",
  "template.explore.desc": "Quote, web search, weather and countdown",
  "cardSettings.open": "Widget settings",
  "cardSettings.title": "{name} settings",
  "cardSettings.count": "Items shown",
  "cardSettings.onEnter": "On Enter",
  "cardSettings.openAll": "Open every highlighted site",
  "cardSettings.openFirst": "Open only the first highlighted site",
  "cardSettings.note": "Changes save immediately and apply to this tab only.",
  "layout.move": "Move to another tab\u2026",
  "layout.moveTitle": "Move \u201C{name}\u201D",
  "layout.singlePage": "There is only one tab. Create another to move widgets.",
  "layout.earlier": "Move earlier",
  "layout.later": "Move later",
  "layout.remove": "Remove from tab",
  "layout.menuFor": "{name} menu",
  "layout.dragFor": "{name}: drag to reorder, Enter for the menu, Alt+\u2191/\u2193 to move",
  "layout.dragHint": "Drag to reorder, click for menu",
  "layout.done": "Done",
  "layout.customize": "Customize Home",
  "layout.editHint": "Drag widgets or tabs to reorder. Click a handle for its menu; Alt+\u2191/\u2193 works from the keyboard.",
  "layout.movedAnnounce": "{name} moved to position {position} of {total}",
  "toast.undo": "Undo",
  "toast.undoStale": "Things changed since; cannot undo",
  "toast.reset": "Restored the default layout of \u201C{name}\u201D",
  "toast.removed": "Removed \u201C{name}\u201D",
  "toast.addedToTab": "Added \u201C{name}\u201D to \u201C{tab}\u201D",
  "toast.removedFromTab": "Removed \u201C{name}\u201D from \u201C{tab}\u201D",
  "toast.moved": "Moved \u201C{name}\u201D to \u201C{tab}\u201D",
  "toast.deleted": "Deleted \u201C{name}\u201D",
  "toast.resetAll": "Appearance and layout reset",
  "multiSearch.sites": "Search sites",
  "multiSearch.groups": "Site groups",
  "multiSearch.templates": "Custom sites",
  "multiSearch.templatePlaceholder": "One per line: Name | https://example.com/?q={query}",
  "multiSearch.templateLine": "Line {line} needs: Name | a URL containing {query}",
  "multiSearch.templateQuery": "Line {line}: {query} can only appear in the path or query string",
  "multiSearch.templateUrl": "Line {line}: invalid URL",
  "multiSearch.openAllHint": "Enter searches {count} sites at once",
  "multiSearch.openFirstHint": "Enter searches {name} only",
  "card.dailyFocus.desc": "Up to three priorities; unfinished ones carry over",
  "card.todo.desc": "Keep a checklist and tick things off",
  "card.recent.desc": "Jump back into recent DSH sessions",
  "card.shortcuts.desc": "Your own links and entry points",
  "card.quickNote.desc": "Capture a thought, copy as Markdown",
  "card.scratchpad.desc": "Autosaved long-form scratch text",
  "card.dailyQuestion.desc": "One question a day to answer in writing",
  "card.heatmap.desc": "Session activity by day",
  "card.focus.desc": "15\u201360 minute focus timer",
  "card.habit.desc": "Daily habits with streaks",
  "card.ambient.desc": "White, pink, or brown noise made locally",
  "card.progress.desc": "Progress through day, week, month, year",
  "card.worldclock.desc": "Current time in several time zones",
  "card.quote.desc": "A line worth remembering each day",
  "card.multiSearch.desc": "Switch between search sites",
  "card.weather.desc": "Weather for a chosen city",
  "card.countdown.desc": "Days until important dates",
  "settings.resetTab": "Restore default layout",
  "settings.copyTab": "Copy layout from {name}",
  "settings.addTab": "New tab",
  "settings.rename": "Rename",
  "settings.renameTab": "Rename {name}",
  "settings.deleteTab": "Delete {name}",
  "settings.homeFixed": "Fixed",
  "settings.category.all": "All",
  "settings.category.plan": "Planning",
  "settings.category.notes": "Notes",
  "settings.category.dsh": "DSH",
  "settings.category.focus": "Focus",
  "settings.category.time": "Time",
  "settings.category.discover": "Explore",
  "wallpaper.next": "Next photo",
  "tabs.notes": "Notes",
  "card.dailyFocus": "Today's focus",
  "card.quickNote": "Quick capture",
  "card.scratchpad": "Scratchpad",
  "card.habit": "Habits",
  "card.countdown": "Countdown",
  "card.dailyQuestion": "Daily question",
  "card.multiSearch": "Web search",
  "card.heatmap": "Session activity",
  "card.ambient": "Ambient noise",
  "dailyFocus.placeholder": "Today's most important thing",
  "dailyFocus.hint": "Up to three; unfinished carries over",
  "dailyFocus.full": "Focus on at most three things",
  "dailyFocus.empty": "Set a focus for today.",
  "quickNote.placeholder": "Capture a thought, press Enter",
  "quickNote.empty": "Nothing captured yet.",
  "quickNote.copy": "Copy all",
  "quickNote.copied": "Copied",
  "quickNote.clear": "Clear",
  "quickNote.showAll": "Show all {count}",
  "quickNote.showLess": "Show less",
  "action.remove": "Remove {name}",
  "scratchpad.placeholder": "Jot anything down. Saves automatically\u2026",
  "habit.add": 'Add a habit, e.g. "Water:8"',
  "habit.empty": "Add a habit to build.",
  "habit.today": "{count}/{target}",
  "habit.done": "Done",
  "countdown.set": "Set target date",
  "countdown.label": "Label (optional)",
  "countdown.days": "days",
  "countdown.today": "Today is the day",
  "countdown.passed": "{n} days ago",
  "countdown.left": "{n} days left",
  "countdown.edit": "Edit",
  "countdown.unset": "No countdown yet. Set a target date.",
  "dailyQuestion.placeholder": "Write today's answer\u2026",
  "dailyQuestion.saved": "Saved",
  "multiSearch.placeholder": "Keywords, Enter to search",
  "multiSearch.open": "Search",
  "heatmap.empty": "No session activity yet.",
  "heatmap.less": "Less",
  "heatmap.more": "More",
  "ambient.white": "White noise",
  "ambient.pink": "Pink noise",
  "ambient.brown": "Brown noise",
  "ambient.play": "Play",
  "ambient.stop": "Stop",
  "date.format": "{weekday}, {month}/{day}",
  "date.weekdays": "Mon Tue Wed Thu Fri Sat Sun"
};

// src/client/index.jsx
var PANEL_ID = "qiaomu-home";
var NS = "qiaomuHome";
var inject = ["slots", "locale", "sessions", "workspaces", "uiWorkspace"];
function injectStyles() {
  const tagId = "qiaomu-home-dsh/page.css";
  if (typeof document === "undefined") return;
  const content = CSS + CSS_EXTRA;
  const existing = document.querySelector(`style[data-plugin-css=${JSON.stringify(tagId)}]`);
  if (existing !== null) {
    if (existing.textContent !== content) existing.textContent = content;
    return;
  }
  const tag = document.createElement("style");
  tag.dataset.plugin = "qiaomu-home-dsh";
  tag.dataset.pluginCss = tagId;
  tag.textContent = content;
  document.head.appendChild(tag);
}
function PanelIcon({ size }) {
  return import_react7.default.createElement(IconHome, { size: size ?? 18 });
}
PanelIcon.displayName = "QiaomuHomePanelIcon";
function apply(ctx) {
  injectStyles();
  ctx.effect(() => {
    if (typeof ctx.locale?.register !== "function") return () => {
    };
    return ctx.locale.register(NS, { zh, en });
  }, "qiaomu-home: \u5B57\u5178");
  const store = createHomeStore();
  const services = {
    sessions: ctx.get?.("sessions") ?? ctx.sessions,
    workspaces: ctx.get?.("workspaces") ?? ctx.workspaces,
    uiWorkspace: ctx.get?.("uiWorkspace") ?? ctx.uiWorkspace
  };
  ctx.effect(
    () => ctx.slots.inject(
      "main",
      () => ctx.slots.register(
        {
          name: "main",
          key: PANEL_ID,
          locale: NS,
          inject: () => ({ store, services })
        },
        HomePage
      )
    ),
    "qiaomu-home: \u8D77\u70B9\u9875"
  );
  ctx.effect(
    () => ctx.slots.inject(
      "sidebar.panellist",
      () => ctx.slots.register(
        {
          name: "sidebar.panellist",
          id: PANEL_ID,
          order: -20,
          locale: NS,
          label: () => {
            try {
              return ctx.locale.bind(NS)("panel.title");
            } catch {
              return "Home";
            }
          }
        },
        PanelIcon
      )
    ),
    "qiaomu-home: \u4FA7\u680F\u5165\u53E3"
  );
}

    })(module, exports, require);
    return module.exports;
  },
});
