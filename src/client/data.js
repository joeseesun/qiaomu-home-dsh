/**
 * 纯数据与纯逻辑：壁纸、每日一句、城市、日期进度与稳定的「每日一选」。
 * 不 import DOM / React，可在 Node 里直接单测。
 */

/**
 * 内置壁纸，来自 Unsplash（https://unsplash.com/license），为白字对比挑选。
 * 与 Obsidian 版乔木 Home 同源（src/wallpaper/curated.ts），热链 images.unsplash.com 并在页面上署名。
 * 行：[photo id, images.unsplash.com 路径, 摄影师, Unsplash 用户名, 主色].
 */
export const CURATED = [
  ['Q1p7bh3SHj8', 'photo-1451187580459-43490279c0fa', 'NASA', 'nasa', '#0c2626'],
  ['phIFdC6lA4E', 'photo-1519681393784-d120267933ba', 'Benjamin Voros', 'vorosbenisop', '#0c2659'],
  ['sO-JmQj95ec', 'photo-1492724724894-7464c27d0ceb', 'Kevin Lanceplaine', 'lanceplaine', '#262640'],
  ['c9MFM8rSMsQ', 'photo-1541599468348-e96984315921', 'Michelle Spollen', 'micki', '#264059'],
  ['oUTmhg97gzY', 'photo-1615390265246-72d3198a48b7', 'Ása Steinarsdóttir', 'asast', '#0c4040'],
  ['NRQV-hBF10M', 'photo-1506744038136-46273834b3fb', 'Bailey Zindel', 'baileyzindel', '#405949'],
  ['1Z2niiBPg5A', 'photo-1470071459604-3b5ec3a7fe05', 'v2osk', 'v2osk', '#404040'],
  ['JgOeRuGD_Y4', 'photo-1477346611705-65d1883cee1e', 'JOHN TOWNER', 'heytowner', '#260c26'],
  ['DlkF4-dbCOU', 'photo-1493246507139-91e8fad9978e', 'garrett parker', 'garrettpsystems', '#262626'],
  ['6KQETG8J-zI', 'photo-1581610186406-5f6e9f9edbc1', 'Daniel Olah', 'danesduet', '#0c2640'],
  ['hvrpOmuMrAI', 'photo-1500673922987-e212871fec22', 'Johannes Plenio', 'jplenio', '#262626'],
  ['RwHv7LgeC7s', 'photo-1523712999610-f77fbcfc3843', 'Johannes Plenio', 'jplenio', '#59260c'],
  ['_RBcxo9AU-U', 'photo-1472214103451-9374bd1c798e', 'Robert Lukeman', 'robertlukeman', '#40590c'],
  ['17_tB-oI0ao', 'photo-1551309292-e185c0b6e22a', 'Alessio Soggetti', 'asoggetti', '#0c2626'],
  ['2Hzmz15wGik', 'photo-1511884642898-4c92249e20b6', 'pine watt', 'pinewatt', '#262626'],
  ['7BjhtdogU3A', 'photo-1475070929565-c985b496cb9f', 'Karsten Würth', 'karsten_wuerth', '#262626'],
  ['GA09PKfRIQY', 'photo-1559310589-2673bfe16970', 'Adam Vradenburg', 'vradenburg', '#0c2626'],
  ['z_f2JrBRbOg', 'photo-1603979649806-5299879db16b', 'Ansgar Scheffold', 'ansgarscheffold', '#26260c'],
  ['sGptUDSrMVU', 'photo-1623423415485-1d36867376b6', 'Annegret Kammer', 'anneeaway', '#0c2626'],
  ['KMn4VEeEPR8', 'photo-1507525428034-b723cf961d3e', 'Sean Oulashin', 'oulashin', '#4c6259'],
];

const UTM = 'utm_source=qiaomu_home_dsh&utm_medium=referral';

/** 展开成页面使用的照片对象。 */
export function curatedPhotos() {
  return CURATED.map(([id, path, author, username, color]) => ({
    id: `curated:${id}`,
    url: `https://images.unsplash.com/${path}`,
    author,
    authorUrl: `https://unsplash.com/@${username}?${UTM}`,
    page: `https://unsplash.com/photos/${id}?${UTM}`,
    color,
  }));
}

/** 请求宽度：按屏幕像素取 640 的倍数，缓存键稳定。 */
export function targetWidth(screenWidth, pixelRatio) {
  const needed = Math.min(2560, Math.max(1280, screenWidth * Math.min(pixelRatio || 1, 2)));
  return Math.ceil(needed / 640) * 640;
}

/** 带尺寸与质量参数的图片地址。 */
export function sizedUrl(photo, width) {
  return `${photo.url}?w=${width}&q=80&fm=jpg&fit=crop&crop=entropy`;
}

/** 与 Obsidian 版一致的稳定「每日一选」：同一天所有标签页看到同一张。 */
export function dailyIndex(day, length, offset = 0) {
  if (length <= 0) return -1;
  let hash = 2166136261;
  for (const char of day) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (((hash >>> 0) + offset) % length + length) % length;
}

/** 本地日期 YYYY-MM-DD。 */
export function dayKey(date = new Date()) {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

/** 每日一句（与 Obsidian 版同源）。 */
export const BUILTIN_QUOTES = {
  zh: [
    '学而不思则罔，思而不学则殆。——《论语》',
    '千里之行，始于足下。——《老子》',
    '知之者不如好之者，好之者不如乐之者。——《论语》',
    '不积跬步，无以至千里。——《荀子》',
    '吾生也有涯，而知也无涯。——《庄子》',
    '博学之，审问之，慎思之，明辨之，笃行之。——《中庸》',
    '业精于勤，荒于嬉；行成于思，毁于随。——韩愈',
    '纸上得来终觉浅，绝知此事要躬行。——陆游',
    '问渠那得清如许？为有源头活水来。——朱熹',
    '天下难事，必作于易；天下大事，必作于细。——《老子》',
  ],
  en: [
    'Well done is better than well said. — Benjamin Franklin',
    'Our life is frittered away by detail. Simplify, simplify. — Henry David Thoreau',
    'The only person you are destined to become is the person you decide to be. — Ralph Waldo Emerson',
    'Tell me and I forget. Teach me and I remember. Involve me and I learn. — Proverb',
    'What we achieve inwardly will change outer reality. — Plutarch',
    'It is not that we have a short time to live, but that we waste a lot of it. — Seneca',
    'Knowing is not enough; we must apply. — Johann Wolfgang von Goethe',
    'The secret of getting ahead is getting started. — Proverb',
  ],
};

/** 世界时钟的默认城市。 */
export const DEFAULT_ZONES = [
  { label: '北京', labelEn: 'Beijing', zone: 'Asia/Shanghai' },
  { label: '纽约', labelEn: 'New York', zone: 'America/New_York' },
  { label: '伦敦', labelEn: 'London', zone: 'Europe/London' },
];

/** 天气卡片的可选城市（Open-Meteo 坐标）。 */
export const WEATHER_CITIES = [
  { id: 'beijing', label: '北京', labelEn: 'Beijing', latitude: 39.9042, longitude: 116.4074 },
  { id: 'shanghai', label: '上海', labelEn: 'Shanghai', latitude: 31.2304, longitude: 121.4737 },
  { id: 'shenzhen', label: '深圳', labelEn: 'Shenzhen', latitude: 22.5431, longitude: 114.0579 },
  { id: 'hangzhou', label: '杭州', labelEn: 'Hangzhou', latitude: 30.2741, longitude: 120.1551 },
  { id: 'chengdu', label: '成都', labelEn: 'Chengdu', latitude: 30.5728, longitude: 104.0668 },
  { id: 'tokyo', label: '东京', labelEn: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  { id: 'singapore', label: '新加坡', labelEn: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  { id: 'newyork', label: '纽约', labelEn: 'New York', latitude: 40.7128, longitude: -74.006 },
  { id: 'london', label: '伦敦', labelEn: 'London', latitude: 51.5072, longitude: -0.1276 },
  { id: 'berlin', label: '柏林', labelEn: 'Berlin', latitude: 52.52, longitude: 13.405 },
];

/** Open-Meteo 当前+三日预报地址。 */
export function weatherUrl(city) {
  const params = new URLSearchParams({
    latitude: city.latitude.toFixed(4),
    longitude: city.longitude.toFixed(4),
    current: 'temperature_2m,apparent_temperature,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '3',
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

const WEATHER_KINDS = [
  [[0], ['晴', 'Clear'], 'sun'],
  [[1, 2], ['多云间晴', 'Partly cloudy'], 'cloud-sun'],
  [[3], ['阴', 'Overcast'], 'cloud'],
  [[45, 48], ['雾', 'Fog'], 'cloud-fog'],
  [[51, 53, 55, 56, 57], ['毛毛雨', 'Drizzle'], 'cloud-drizzle'],
  [[61, 63, 65, 66, 67], ['雨', 'Rain'], 'cloud-rain'],
  [[71, 73, 75, 77], ['雪', 'Snow'], 'cloud-snow'],
  [[80, 81, 82], ['阵雨', 'Showers'], 'cloud-rain'],
  [[85, 86], ['阵雪', 'Snow showers'], 'cloud-snow'],
  [[95, 96, 99], ['雷雨', 'Thunderstorm'], 'cloud-lightning'],
];

/** WMO 天气码 → 文案与图标名。 */
export function weatherKind(code) {
  const found = WEATHER_KINDS.find(([codes]) => codes.includes(code));
  if (!found) return { zh: '未知', en: 'Unknown', icon: 'cloud' };
  return { zh: found[1][0], en: found[1][1], icon: found[2] };
}

/** 解析 Open-Meteo 响应为页面需要的形状；字段非法时抛错。 */
export function parseWeather(json) {
  const num = (value) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('Invalid forecast');
    return value;
  };
  const current = {
    temperature: num(json?.current?.temperature_2m),
    feels: num(json?.current?.apparent_temperature),
    code: num(json?.current?.weather_code),
  };
  const daily = json?.daily ?? {};
  const days = (daily.time ?? []).slice(0, 3).map((day, index) => ({
    day: String(day),
    code: num(daily.weather_code?.[index]),
    max: num(daily.temperature_2m_max?.[index]),
    min: num(daily.temperature_2m_min?.[index]),
  }));
  return { current, days };
}

/** 某时刻在某时区的「HH:MM 与相对本地日期差」。 */
export function zonedTime(now, zone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((part) => [part.type, part.value]),
  );
  const there = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  const here = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return { time: `${parts.hour}:${parts.minute}`, offset: Math.round((there - here) / 864e5) };
}

/** 时间进度：今天 / 本周 / 本月 / 今年，0..1。 */
export function timeProgress(now = new Date()) {
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = (now - startOfDay) / 864e5;
  const weekStart = new Date(startOfDay);
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
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

/** 相对时间（会话列表用）：n 分钟/小时/天前。 */
export function relativeTime(updatedAt, now = Date.now()) {
  const diff = Math.max(0, now - updatedAt);
  if (diff < 60e3) return { unit: 'justNow', n: 0 };
  if (diff < 3600e3) return { unit: 'minutes', n: Math.floor(diff / 60e3) };
  if (diff < 86400e3) return { unit: 'hours', n: Math.floor(diff / 3600e3) };
  if (diff < 7 * 86400e3) return { unit: 'days', n: Math.floor(diff / 86400e3) };
  return { unit: 'date', n: updatedAt };
}

/** 待办：新增一条。 */
export function addTodo(todos, text) {
  const value = String(text ?? '').trim().replace(/[\r\n]+/g, ' ');
  if (!value) return todos;
  const id = `t${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
  return [...todos, { id, text: value.slice(0, 200), done: false, createdAt: Date.now() }];
}

/** 待办：勾选切换。 */
export function toggleTodo(todos, id) {
  return todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
}

/** 待办：删除一条。 */
export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

/** 待办：清除全部已完成。 */
export function clearDoneTodos(todos) {
  return todos.filter((todo) => !todo.done);
}

/** 校验一个 http(s) 网址；非法返回 null。 */
export function normalizeUrl(input) {
  try {
    const url = new URL(String(input ?? '').trim());
    if ((url.protocol === 'http:' || url.protocol === 'https:') && !url.username && !url.password) return url.href;
    return null;
  } catch {
    return null;
  }
}

/** 网站图标地址（只发送域名给 DuckDuckGo）。 */
export function faviconUrl(href) {
  try {
    const host = new URL(href).hostname;
    return host ? `https://icons.duckduckgo.com/ip3/${host}.ico` : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * 常用组件扩展：今日重点、快速记录、习惯、倒计时、每日一问、搜索、热力图
 * ------------------------------------------------------------------ */

/** 两个日期键（YYYY-MM-DD）相差的天数（target - base）。 */
export function daysBetween(target, base) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(target) || !/^\d{4}-\d{2}-\d{2}$/.test(base)) return null;
  return Math.round((Date.parse(`${target}T12:00:00Z`) - Date.parse(`${base}T12:00:00Z`)) / 864e5);
}

/** 解析习惯输入：「喝水:8」→ { name, target: 8 }；无数字目标为 1。 */
export function parseHabitInput(input) {
  const text = String(input ?? '').trim();
  if (!text) return null;
  const match = /^(.+?)\s*[:：]\s*(\d{1,2})\s*$/.exec(text);
  if (match) return { name: match[1].trim().slice(0, 30), target: Math.min(99, Math.max(1, Number(match[2]))) };
  return { name: text.slice(0, 30), target: 1 };
}

/** 新增习惯。 */
export function addHabit(habits, input) {
  const parsed = parseHabitInput(input);
  if (!parsed) return habits;
  if (habits.some((habit) => habit.name === parsed.name)) return habits;
  const id = `h${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
  return [...habits, { id, ...parsed, createdAt: Date.now() }];
}

/** 习惯打卡一次：当天计数 +1，封顶 target。 */
export function checkinHabit(log, habitId, date, target) {
  const day = { ...(log[habitId] ?? {}) };
  const current = typeof day[date] === 'number' ? day[date] : 0;
  day[date] = Math.min(target, current + 1);
  return { ...log, [habitId]: day };
}

/** 撤销一次打卡（计数 -1，到 0 删除）。 */
export function uncheckHabit(log, habitId, date) {
  const day = { ...(log[habitId] ?? {}) };
  const current = typeof day[date] === 'number' ? day[date] : 0;
  if (current <= 1) delete day[date];
  else day[date] = current - 1;
  return { ...log, [habitId]: day };
}

/** 最近 n 天的日期键，从旧到新。 */
export function lastNDays(n, from = new Date()) {
  const out = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    out.push(dayKey(new Date(from.getFullYear(), from.getMonth(), from.getDate() - i)));
  }
  return out;
}

/** 今日重点：跨天归一——未完成项带到今天，最多 max 件。 */
export function ensureDailyFocus(dailyFocus, today, max = 3) {
  if (dailyFocus?.date === today && Array.isArray(dailyFocus.items)) return dailyFocus;
  const carried = (dailyFocus?.items ?? []).filter((item) => !item.done).slice(0, max);
  return { date: today, items: carried };
}

/** 今日重点：新增一条（封顶 max）。 */
export function addFocusItem(dailyFocus, text, max = 3) {
  const value = String(text ?? '').trim().replace(/[\r\n]+/g, ' ');
  if (!value || dailyFocus.items.length >= max) return dailyFocus;
  const id = `f${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
  return { ...dailyFocus, items: [...dailyFocus.items, { id, text: value.slice(0, 120), done: false }] };
}

/** 快速记录：前面插入一条。 */
export function addQuickNote(notes, text, now = Date.now()) {
  const value = String(text ?? '').trim();
  if (!value) return notes;
  const id = `n${now.toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
  return [{ id, time: now, text: value.slice(0, 500) }, ...notes].slice(0, 200);
}

/** 快速记录导出为 Markdown 文本。 */
export function quickNotesMarkdown(notes) {
  const byDay = new Map();
  for (const note of [...notes].reverse()) {
    const key = dayKey(new Date(note.time));
    if (!byDay.has(key)) byDay.set(key, []);
    const date = new Date(note.time);
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    byDay.get(key).push(`- ${hh}:${mm} ${note.text}`);
  }
  const lines = [];
  for (const [day, items] of byDay) lines.push(`## ${day}`, '', ...items, '');
  return lines.join('\n').trim();
}

/** 每日一问（与 Obsidian 版同风格）。 */
export const DAILY_QUESTIONS = {
  zh: [
    '今天最重要的一件事是什么？',
    '最近有什么让你会心一笑的瞬间？',
    '现在最占用你心力的事是什么？',
    '这周想对自己说句什么话？',
    '有什么一直想开始却还没开始的事？',
    '今天学到了什么新东西？',
    '最近谁帮助过你？想怎么感谢？',
    '此刻最让你安心的是什么？',
    '如果今天只做一件事，会是哪件？',
    '最近有什么决定一直在拖延？',
    '今天身体感觉怎么样？',
    '最近在读/在看什么？值得推荐吗？',
    '有什么想法最近一直在脑子里转？',
    '这个月想养成或戒掉什么习惯？',
    '现在的工作方式里，哪一点最想改进？',
  ],
  en: [
    'What is the single most important thing today?',
    'What made you smile recently?',
    'What is occupying your mind the most right now?',
    'What would you tell yourself this week?',
    'What have you been meaning to start but haven’t?',
    'What did you learn today?',
    'Who helped you recently, and how could you thank them?',
    'What gives you peace of mind right now?',
    'If you could do only one thing today, what would it be?',
    'Which decision have you been putting off?',
    'How does your body feel today?',
    'What are you reading or watching lately? Worth recommending?',
    'Which idea keeps circling in your head?',
    'What habit do you want to build or drop this month?',
    'What would you improve about how you work right now?',
  ],
};

/** 多站搜索引擎。 */
export const SEARCH_ENGINES = [
  { id: 'google', zh: '谷歌', en: 'Google', url: 'https://www.google.com/search?q=' },
  { id: 'bing', zh: '必应', en: 'Bing', url: 'https://www.bing.com/search?q=' },
  { id: 'baidu', zh: '百度', en: 'Baidu', url: 'https://www.baidu.com/s?wd=' },
  { id: 'duckduckgo', zh: 'DuckDuckGo', en: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  { id: 'github', zh: 'GitHub', en: 'GitHub', url: 'https://github.com/search?q=' },
  { id: 'zhihu', zh: '知乎', en: 'Zhihu', url: 'https://www.zhihu.com/search?type=content&q=' },
];

/** 会话活动：dayKey → 当天活跃会话数。 */
export function activityByDay(byId) {
  const counts = new Map();
  for (const row of Object.values(byId ?? {})) {
    if (!row || row.blank || typeof row.updatedAt !== 'number') continue;
    const key = dayKey(new Date(row.updatedAt));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

/** 热力强度 0..4（与 Obsidian 版同一分档逻辑）。 */
export function heatIntensity(count, max) {
  if (count <= 0 || max <= 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil((count / max) * 4)));
}
