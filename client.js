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
var import_react4 = __toESM(require("react"), 1);

// src/client/page.jsx
var import_react3 = __toESM(require("react"), 1);

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
var SEARCH_ENGINES = [
  { id: "google", zh: "\u8C37\u6B4C", en: "Google", url: "https://www.google.com/search?q=" },
  { id: "bing", zh: "\u5FC5\u5E94", en: "Bing", url: "https://www.bing.com/search?q=" },
  { id: "baidu", zh: "\u767E\u5EA6", en: "Baidu", url: "https://www.baidu.com/s?wd=" },
  { id: "duckduckgo", zh: "DuckDuckGo", en: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
  { id: "github", zh: "GitHub", en: "GitHub", url: "https://github.com/search?q=" },
  { id: "zhihu", zh: "\u77E5\u4E4E", en: "Zhihu", url: "https://www.zhihu.com/search?type=content&q=" }
];
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
function Card({ icon: Icon, title, count, actions, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "qh-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "qh-card-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { size: 15 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-card-title", children: title }),
      count ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-card-count", children: count }) : null,
      actions
    ] }),
    children
  ] });
}
function TodoCard({ t, state, setState }) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef(null);
  const todos = state.todos;
  const open = todos.filter((todo) => !todo.done).length;
  const submit = () => {
    const next = addTodo(todos, draft);
    if (next === todos) return;
    setState({ todos: next });
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
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-todo-list", children: todos.map((todo) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `qh-todo-item${todo.done ? " qh-done" : ""}`, children: [
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
          "aria-label": t("todo.clearDone"),
          onClick: () => setState({ todos: removeTodo(todos, todo.id) }),
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, { size: 12 })
        }
      )
    ] }, todo.id)) }),
    todos.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("footer", { className: "qh-card-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: open === 0 ? t("todo.allDone") : t("todo.remaining", { count: open }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { flex: 1 } }),
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
function RecentCard({ t, services }) {
  const now = useNow(3e4);
  const listSource = services.sessions?.list;
  const list = useExternalStore(
    listSource ? (fn) => listSource.subscribe(fn) : null,
    listSource ? () => listSource.getSnapshot() : () => null
  );
  const archived = services.workspaces?.list?.getSnapshot?.().archivedSessionIds ?? [];
  const items = useMemo(() => {
    if (!list?.ids) return [];
    const archivedSet = new Set(archived);
    return list.ids.map((id) => list.byId[id]).filter((row) => row && !row.blank && !archivedSet.has(row.id)).sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)).slice(0, 5);
  }, [list, archived]);
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
function TileIcon({ item }) {
  const [failed, setFailed] = useState(false);
  if (item.kind === "session") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlus, { size: 18 });
  if (item.kind === "workspace") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconFolder, { size: 18 });
  const icon = !failed && item.url ? faviconUrl(item.url) : null;
  if (icon) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: icon, alt: "", loading: "lazy", onError: () => setFailed(true) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconGlobe, { size: 18 });
}
function ShortcutsCard({ t, state, setState, services }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const builtins = [
    {
      id: "__new",
      kind: "session",
      label: t("shortcuts.newSession"),
      run: () => services.uiWorkspace?.startSession?.()
    },
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
  ];
  const custom = state.shortcuts.map((item) => ({
    ...item,
    run: () => globalThis.open(item.url, "_blank", "noopener")
  }));
  const add = () => {
    const href = normalizeUrl(url);
    if (!href) {
      setError(t("shortcuts.invalid"));
      return;
    }
    const label = name.trim() || new URL(href).hostname;
    setState({
      shortcuts: [...state.shortcuts, { id: `u${Date.now().toString(36)}`, kind: "url", url: href, label }]
    });
    setAdding(false);
    setName("");
    setUrl("");
    setError("");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    Card,
    {
      icon: IconLink,
      title: t("card.shortcuts"),
      actions: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-icon-btn", style: { width: 24, height: 24 }, "aria-label": t("shortcuts.add"), onClick: () => setAdding((v) => !v), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconPlus, { size: 13 }) }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-tiles", children: [...builtins, ...custom].map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "qh-tile", onClick: item.run, title: item.url || item.label, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-tile-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TileIcon, { item }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "qh-tile-label", children: item.label }),
          item.kind === "url" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "span",
            {
              className: "qh-tile-del",
              role: "button",
              "aria-label": "remove",
              onClick: (event) => {
                event.stopPropagation();
                setState({ shortcuts: state.shortcuts.filter((entry) => entry.id !== item.id) });
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, { size: 10 })
            }
          ) : null
        ] }, item.id)) }),
        adding ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "form",
          {
            className: "qh-shortcut-form",
            onSubmit: (event) => {
              event.preventDefault();
              add();
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { value: name, placeholder: t("shortcuts.namePlaceholder"), maxLength: 40, onChange: (e) => setName(e.target.value) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { value: url, placeholder: t("shortcuts.urlPlaceholder"), inputMode: "url", onChange: (e) => {
                setUrl(e.target.value);
                setError("");
              } }),
              error ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-form-error", children: error }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "qh-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-btn", onClick: () => setAdding(false), children: t("shortcuts.cancel") }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", className: "qh-btn qh-accent", children: t("shortcuts.confirm") })
              ] })
            ]
          }
        ) : null
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
        className: `qh-chip${focus.minutes === minutes && !running && focus.remainingMs === totalMs ? " qh-active" : ""}`,
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
  const city = WEATHER_CITIES.find((entry) => entry.id === state.weatherCity) ?? null;
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle");
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (!city) {
      setWeather(null);
      setStatus("idle");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    fetch(weatherUrl(city)).then((response) => {
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
  }, [city?.id, nonce]);
  const dayLabels = [t("weather.today"), t("weather.tomorrow"), t("weather.afterTomorrow")];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { icon: IconSun, title: t("card.weather"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "select",
      {
        className: "qh-city-select",
        value: city?.id ?? "",
        onChange: (event) => setState({ weatherCity: event.target.value }),
        "aria-label": t("weather.choose"),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", children: t("weather.choose") }),
          WEATHER_CITIES.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: entry.id, children: lang === "zh" ? entry.label : entry.labelEn }, entry.id))
        ]
      }
    ) }),
    !city ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("weather.choose") }) : null,
    city && status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-card-empty", children: t("weather.loading") }) : null,
    city && status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "qh-link-btn", onClick: () => setNonce((n) => n + 1), children: t("weather.error") }) : null,
    city && status === "ready" && weather ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
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
  ] });
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
          "aria-label": "remove",
          onClick: () => setState({ dailyFocus: { ...focus, items: items.filter((entry) => entry.id !== item.id) } }),
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, { size: 12 })
        }
      )
    ] }, item.id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("footer", { className: "qh-card-foot", children: t("dailyFocus.hint") })
  ] });
}
function QuickNoteCard({ t, state, setState }) {
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
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
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-note-list", children: notes.slice(0, 6).map((note) => {
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
                "aria-label": "remove",
                onClick: () => setState({ quickNotes: notes.filter((entry) => entry.id !== note.id) }),
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, { size: 12 })
              }
            )
          ] }, note.id);
        }) }),
        notes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("footer", { className: "qh-card-foot", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: copied ? t("quickNote.copied") : "" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { flex: 1 } }),
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
                "aria-label": "remove",
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
function MultiSearchCard({ t, lang, state, setState }) {
  const [query, setQuery] = useState("");
  const engine = SEARCH_ENGINES.find((entry) => entry.id === state.searchEngine) ?? SEARCH_ENGINES[0];
  const search = () => {
    const value = query.trim();
    if (!value) return;
    globalThis.open(`${engine.url}${encodeURIComponent(value)}`, "_blank", "noopener");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { icon: IconSearch, title: t("card.multiSearch"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "qh-focus-presets", role: "group", children: SEARCH_ENGINES.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        type: "button",
        className: `qh-chip${entry.id === engine.id ? " qh-active" : ""}`,
        onClick: () => setState({ searchEngine: entry.id }),
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
    )
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

// src/client/page.jsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var { useEffect: useEffect2, useMemo: useMemo2, useRef: useRef2, useState: useState2 } = import_react3.default;
var TABS = [
  { id: "home", labelKey: "tabs.home", cards: ["dailyFocus", "todo", "recent", "shortcuts"] },
  { id: "notes", labelKey: "tabs.notes", cards: ["quickNote", "scratchpad", "dailyQuestion", "heatmap"] },
  { id: "focus", labelKey: "tabs.focus", cards: ["focus", "habit", "ambient", "progress", "worldclock"] },
  { id: "explore", labelKey: "tabs.explore", cards: ["quote", "multiSearch", "weather", "countdown"] }
];
var CARD_META = {
  todo: { titleKey: "card.todo" },
  recent: { titleKey: "card.recent" },
  shortcuts: { titleKey: "card.shortcuts" },
  focus: { titleKey: "card.focus" },
  progress: { titleKey: "card.progress" },
  worldclock: { titleKey: "card.worldclock" },
  quote: { titleKey: "card.quote" },
  weather: { titleKey: "card.weather" },
  dailyFocus: { titleKey: "card.dailyFocus" },
  quickNote: { titleKey: "card.quickNote" },
  scratchpad: { titleKey: "card.scratchpad" },
  habit: { titleKey: "card.habit" },
  countdown: { titleKey: "card.countdown" },
  dailyQuestion: { titleKey: "card.dailyQuestion" },
  multiSearch: { titleKey: "card.multiSearch" },
  heatmap: { titleKey: "card.heatmap" },
  ambient: { titleKey: "card.ambient" }
};
function useStore(store) {
  return import_react3.default.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-clock", children: `${hh}:${mm} \xB7 ${formatted} \xB7 ${t(greetingKey(date.getHours()))}` });
}
function pickDaily(state, photos) {
  return photos[dailyIndex(dayKey(), photos.length, state.wallpaperShift)];
}
function pickRandom(photos, exceptId) {
  const pool = photos.filter((entry) => entry.id !== exceptId);
  return pool[Math.floor(Math.random() * pool.length)] ?? photos[0];
}
function Wallpaper({ state, setState, t }) {
  const photos = useMemo2(() => curatedPhotos(), []);
  const useGradient = state.wallpaperMode === "gradient";
  const [override, setOverride] = useState2(() => state.wallpaperMode === "open" ? pickRandom(photos, null) : null);
  const photo = useGradient ? null : override ?? pickDaily(state, photos);
  const [loaded, setLoaded] = useState2(false);
  useEffect2(() => {
    if (state.wallpaperMode === "open") setOverride((current) => current ?? pickRandom(photos, null));
    else setOverride(null);
  }, [state.wallpaperMode, photos]);
  useEffect2(() => {
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
      const at = photos.findIndex((entry) => entry.id === photo?.id);
      setOverride(photos[(at + 1 + photos.length) % photos.length]);
    };
    img.src = sizedUrl(photo, targetWidth(globalThis.innerWidth || 1600, globalThis.devicePixelRatio || 1));
    return () => {
      cancelled = true;
    };
  }, [photo, useGradient, photos]);
  const nextPhoto = () => {
    if (state.wallpaperMode === "daily") {
      setState({ wallpaperShift: (state.wallpaperShift + 1) % photos.length });
      setOverride(null);
    } else {
      setOverride((current) => pickRandom(photos, current?.id ?? photo?.id));
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-bg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-bg-gradient", style: photo?.color ? { backgroundColor: photo.color } : void 0 }),
      !useGradient && photo && loaded ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { className: "qh-bg-img qh-loaded", src: sizedUrl(photo, targetWidth(globalThis.innerWidth || 1600, globalThis.devicePixelRatio || 1)), alt: "" }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-bg-scrim" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-credit", children: [
      !useGradient && photo ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: photo.page, target: "_blank", rel: "noreferrer noopener", children: `${photo.author} / Unsplash` }) : null,
      !useGradient ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "qh-icon-btn", "aria-label": t("wallpaper.next"), title: t("wallpaper.next"), onClick: nextPhoto, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconImage, { size: 14 }) }) : null
    ] })
  ] });
}
function SessionSearch({ t, services }) {
  const [query, setQuery] = useState2("");
  const [results, setResults] = useState2(null);
  const [active, setActive] = useState2(0);
  const seqRef = useRef2(0);
  useEffect2(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-searchbox", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconSearch, { size: 15 }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    results !== null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-results", role: "listbox", children: [
      results === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-results-status", children: t("search.loading") }) : null,
      results === "error" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-results-status", children: t("search.error") }) : null,
      results !== "loading" && results !== "error" && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-results-status", children: t("search.empty") }) : null,
      items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": index === active,
          className: `qh-results-row${index === active ? " qh-active" : ""}`,
          onMouseEnter: () => setActive(index),
          onClick: () => open(item),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "qh-results-title", children: titleOf(item) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "qh-results-snippet", children: item.snippet })
          ]
        },
        `${item.sessionId}-${index}`
      ))
    ] }) : null
  ] });
}
function SettingsPopover({ t, state, setState, reset, tab, onClose }) {
  const ref = useRef2(null);
  useEffect2(() => {
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClose();
    };
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  const hidden = state.hidden;
  const toggleCard = (id) => setState({ hidden: { ...hidden, [id]: !hidden[id] } });
  const wallpaperModes = ["daily", "open", "gradient"];
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-popover", ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: t("settings.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-popover-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "qh-popover-label", children: t("settings.cards") }),
      tab.cards.map((id) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "qh-check-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "checkbox", checked: !hidden[id], onChange: () => toggleCard(id) }),
        t(CARD_META[id].titleKey)
      ] }, id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-popover-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "qh-popover-label", children: t("settings.wallpaper") }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-radio-row", children: wallpaperModes.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "button",
          className: `qh-chip${state.wallpaperMode === mode ? " qh-active" : ""}`,
          onClick: () => setState({ wallpaperMode: mode }),
          children: t(`settings.wallpaper.${mode}`)
        },
        mode
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-popover-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "qh-popover-label", children: t("settings.headline") }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-popover-section", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "qh-link-btn", onClick: reset, children: t("settings.reset") }) })
  ] });
}
function HomePage({ t, store, services }) {
  const state = useStore(store);
  const setState = (patch) => store.set(patch);
  const now = useNow(3e4);
  const lang = langOf(t);
  const [settingsOpen, setSettingsOpen] = useState2(false);
  const tab = TABS.find((entry) => entry.id === state.tab) ?? TABS[0];
  const visibleCards = tab.cards.filter((id) => !state.hidden[id]);
  const cardProps = { t, lang, state, setState, services };
  const renderCard = (id) => {
    switch (id) {
      case "todo":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TodoCard, { ...cardProps }, id);
      case "recent":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RecentCard, { ...cardProps }, id);
      case "shortcuts":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ShortcutsCard, { ...cardProps }, id);
      case "focus":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FocusCard, { ...cardProps }, id);
      case "progress":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ProgressCard, { ...cardProps }, id);
      case "worldclock":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(WorldClockCard, { ...cardProps }, id);
      case "quote":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(QuoteCard, { ...cardProps }, id);
      case "weather":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(WeatherCard, { ...cardProps }, id);
      case "dailyFocus":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DailyFocusCard, { ...cardProps }, id);
      case "quickNote":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(QuickNoteCard, { ...cardProps }, id);
      case "scratchpad":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ScratchpadCard, { ...cardProps }, id);
      case "habit":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabitCard, { ...cardProps }, id);
      case "countdown":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CountdownCard, { ...cardProps }, id);
      case "dailyQuestion":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DailyQuestionCard, { ...cardProps }, id);
      case "multiSearch":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(MultiSearchCard, { ...cardProps }, id);
      case "heatmap":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HeatmapCard, { ...cardProps }, id);
      case "ambient":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AmbientCard, { ...cardProps }, id);
      default:
        return null;
    }
  };
  useEffect2(() => () => store.flush(), [store]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-root", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Wallpaper, { state, setState, t }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-scroll", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-main", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-hero", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ClockLine, { t, now }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", { className: "qh-headline", children: state.headline.trim() || t("hero.headline") }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-search-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SessionSearch, { t, services }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { type: "button", className: "qh-action-btn qh-primary", onClick: () => services.uiWorkspace?.startSession?.(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconPlus, { size: 14 }),
            t("search.newSession")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconFolder, { size: 14 }),
                t("search.openWorkspace")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-search-hint", children: t("search.hint") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "qh-tabs-row", children: [
        TABS.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            type: "button",
            className: `qh-tab${entry.id === tab.id ? " qh-active" : ""}`,
            onClick: () => setState({ tab: entry.id }),
            children: t(entry.labelKey)
          },
          entry.id
        )),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "qh-tabs-spacer" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "qh-gear-wrap", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              className: "qh-icon-btn",
              "aria-label": t("settings.title"),
              "aria-expanded": settingsOpen,
              onClick: () => setSettingsOpen((value) => !value),
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconSettings, { size: 14 })
            }
          ),
          settingsOpen ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            SettingsPopover,
            {
              t,
              state,
              setState,
              reset: () => store.reset(),
              tab,
              onClose: () => setSettingsOpen(false)
            }
          ) : null
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "qh-grid", children: visibleCards.map(renderCard) })
    ] }) })
  ] });
}

// src/client/store.js
var STORAGE_KEY = "dsh-qiaomu-home:v1";
function defaultState() {
  return {
    tab: "home",
    hidden: {},
    wallpaperMode: "daily",
    // daily | open | gradient
    wallpaperShift: 0,
    headline: "",
    todos: [],
    shortcuts: [],
    weatherCity: "",
    quoteShift: 0,
    focus: { minutes: 25, endAt: 0, remainingMs: 25 * 6e4 },
    quickNotes: [],
    scratchpad: "",
    dailyFocus: { date: "", items: [] },
    habits: [],
    habitLog: {},
    countdown: { date: "", label: "" },
    answers: {},
    searchEngine: "google"
  };
}
function loadState(storage = globalThis.localStorage) {
  const base = defaultState();
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return base;
    return {
      ...base,
      ...parsed,
      hidden: parsed.hidden && typeof parsed.hidden === "object" ? parsed.hidden : {},
      todos: Array.isArray(parsed.todos) ? parsed.todos : [],
      shortcuts: Array.isArray(parsed.shortcuts) ? parsed.shortcuts : [],
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

.qh-scroll {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
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
.qh-tab {
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
@media (max-width: 720px) {
  .qh-grid { grid-template-columns: 1fr; }
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
  flex: none; width: 22px; height: 22px;
  border: none; border-radius: 6px; background: none;
  color: var(--qh-text-3); cursor: pointer; padding: 0;
  display: none; align-items: center; justify-content: center;
}
.qh-todo-item:hover .qh-todo-del { display: inline-flex; }
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
@media (max-width: 460px) { .qh-tiles { grid-template-columns: repeat(3, 1fr); } }
.qh-tile {
  position: relative;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 14px 6px 12px;
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
.qh-tile-del {
  position: absolute; top: 4px; right: 4px;
  width: 18px; height: 18px; border: none; border-radius: 50%;
  background: rgba(0, 0, 0, 0.45); color: var(--qh-text-2);
  display: none; align-items: center; justify-content: center;
  cursor: pointer; padding: 0;
}
.qh-tile:hover .qh-tile-del { display: inline-flex; }
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
.qh-city-select {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 9px;
  padding: 6px 8px; color: var(--qh-text); font-size: 12.5px; outline: none;
}
.qh-city-select option { color: #222; }

/* ---- Settings popover ---- */
.qh-popover {
  position: absolute; top: calc(100% + 8px); right: 0; z-index: 6;
  width: 260px;
  background: rgba(14, 19, 17, 0.97);
  border: 1px solid var(--qh-card-border);
  border-radius: 14px;
  backdrop-filter: blur(16px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  padding: 14px;
  display: flex; flex-direction: column; gap: 12px;
}
.qh-popover h3 { margin: 0; font-size: 13px; font-weight: 650; color: var(--qh-text); }
.qh-popover-section { display: flex; flex-direction: column; gap: 6px; }
.qh-popover-label { font-size: 11px; color: var(--qh-text-3); text-transform: none; }
.qh-check-row {
  display: flex; align-items: center; gap: 8px;
  font-size: 12.5px; color: var(--qh-text-2); cursor: pointer;
}
.qh-check-row input { accent-color: #9fd3ae; }
.qh-radio-row { display: flex; gap: 6px; flex-wrap: wrap; }
.qh-popover input[type='text'] {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 9px;
  padding: 7px 10px; color: var(--qh-text); font-size: 12.5px; outline: none; width: 100%;
}
.qh-popover input[type='text']:focus { border-color: rgba(159, 211, 174, 0.4); }
.qh-gear-wrap { position: relative; }
`;
var CSS_EXTRA = `
/* ---- Quick note / scratchpad ---- */
.qh-note-list { display: flex; flex-direction: column; gap: 2px; }
.qh-note-row {
  display: flex; align-items: baseline; gap: 8px;
  padding: 5px 4px; border-radius: 8px;
}
.qh-note-row:hover { background: rgba(255, 255, 255, 0.05); }
.qh-note-row:hover .qh-todo-del { display: inline-flex; }
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
.qh-habit-row .qh-todo-del { display: none; }
.qh-habit-row:hover .qh-todo-del { display: inline-flex; }

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
  return import_react4.default.createElement(IconHome, { size: size ?? 18 });
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
