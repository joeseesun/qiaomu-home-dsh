/**
 * 起点页的持久化状态容器：localStorage 里一份 JSON，内存里一份快照，
 * 订阅/通知模型与 DSH 的 ObservableSnapshot 一致（getSnapshot / subscribe）。
 */
import { defaultTabs, normalizeTabs } from './layout.js';
import { normalizeGroups } from './shortcuts.js';
import { SEARCH_GROUPS, WEATHER_CITIES } from './data.js';

export const STORAGE_KEY = 'dsh-qiaomu-home:v1';

/** 目录里真实存在的站点 id；旧数据里已下线的站点在迁移时丢弃。 */
const KNOWN_SITE_IDS = new Set(SEARCH_GROUPS.flatMap((group) => group.sites.map((site) => site.id)));

/** 旧版城市 id / 新版地点对象 → weatherPlace。 */
function weatherPlaceFrom(parsed) {
  const raw = parsed.weatherPlace;
  if (raw && typeof raw === 'object' && !Array.isArray(raw)
    && typeof raw.name === 'string' && raw.name.trim()
    && Number.isFinite(raw.latitude) && Number.isFinite(raw.longitude)) {
    return {
      name: raw.name.trim().slice(0, 80),
      detail: typeof raw.detail === 'string' ? raw.detail.slice(0, 120) : '',
      latitude: raw.latitude,
      longitude: raw.longitude,
    };
  }
  const legacy = WEATHER_CITIES.find((entry) => entry.id === parsed.weatherCity);
  return legacy ? { name: legacy.label, detail: legacy.labelEn, latitude: legacy.latitude, longitude: legacy.longitude } : null;
}

/** 默认状态。 */
export function defaultState() {
  return {
    tab: 'home',
    tabs: defaultTabs(),
    hidden: {},
    wallpaperMode: 'daily', // daily | open | gradient
    wallpaperShift: 0,
    headline: '',
    todos: [],
    shortcuts: [],
    shortcutGroups: normalizeGroups([], []),
    weatherCity: '',
    weatherPlace: null,
    quoteShift: 0,
    focus: { minutes: 25, endAt: 0, remainingMs: 25 * 60000 },
    quickNotes: [],
    scratchpad: '',
    dailyFocus: { date: '', items: [] },
    habits: [],
    habitLog: {},
    countdown: { date: '', label: '' },
    answers: {},
    searchEngine: 'google',
    searchEngines: ['google'],
    searchGroup: 'web',
    searchEnginesByGroup: {},
    searchTemplates: '',
  };
}

/** 只重置页面布置，保留用户写下的内容。 */
export function defaultPreferences() {
  return { tab: 'home', tabs: defaultTabs(), hidden: {}, wallpaperMode: 'daily', wallpaperShift: 0, headline: '' };
}

/** 读出并合并默认值；坏数据回到默认。 */
export function loadState(storage = globalThis.localStorage) {
  const base = defaultState();
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return base;
    const tabs = normalizeTabs(parsed.tabs, parsed.hidden);
    return {
      ...base,
      ...parsed,
      tab: tabs.some((entry) => entry.id === parsed.tab) ? parsed.tab : 'home',
      tabs,
      hidden: parsed.hidden && typeof parsed.hidden === 'object' ? parsed.hidden : {},
      todos: Array.isArray(parsed.todos) ? parsed.todos : [],
      shortcuts: [],
      shortcutGroups: normalizeGroups(parsed.shortcutGroups, parsed.shortcuts),
      focus: parsed.focus && typeof parsed.focus === 'object' ? { ...base.focus, ...parsed.focus } : base.focus,
      quickNotes: Array.isArray(parsed.quickNotes) ? parsed.quickNotes : [],
      scratchpad: typeof parsed.scratchpad === 'string' ? parsed.scratchpad : '',
      dailyFocus:
        parsed.dailyFocus && typeof parsed.dailyFocus === 'object'
          ? {
              date: typeof parsed.dailyFocus.date === 'string' ? parsed.dailyFocus.date : '',
              items: Array.isArray(parsed.dailyFocus.items) ? parsed.dailyFocus.items : [],
            }
          : base.dailyFocus,
      habits: Array.isArray(parsed.habits) ? parsed.habits : [],
      habitLog: parsed.habitLog && typeof parsed.habitLog === 'object' && !Array.isArray(parsed.habitLog) ? parsed.habitLog : {},
      countdown:
        parsed.countdown && typeof parsed.countdown === 'object'
          ? {
              date: typeof parsed.countdown.date === 'string' ? parsed.countdown.date : '',
              label: typeof parsed.countdown.label === 'string' ? parsed.countdown.label : '',
            }
          : base.countdown,
      searchEngines: Array.isArray(parsed.searchEngines) ? parsed.searchEngines.filter((id) => typeof id === 'string' && KNOWN_SITE_IDS.has(id)) : [typeof parsed.searchEngine === 'string' && KNOWN_SITE_IDS.has(parsed.searchEngine) ? parsed.searchEngine : 'google'],
      weatherPlace: weatherPlaceFrom(parsed),
      searchGroup: typeof parsed.searchGroup === 'string' ? parsed.searchGroup : 'web',
      searchEnginesByGroup:
        parsed.searchEnginesByGroup && typeof parsed.searchEnginesByGroup === 'object' && !Array.isArray(parsed.searchEnginesByGroup)
          ? Object.fromEntries(Object.entries(parsed.searchEnginesByGroup).filter(([, value]) => Array.isArray(value)))
          : {},
      searchTemplates: typeof parsed.searchTemplates === 'string' ? parsed.searchTemplates : '',
      answers: parsed.answers && typeof parsed.answers === 'object' && !Array.isArray(parsed.answers) ? parsed.answers : {},
    };
  } catch {
    return base;
  }
}

/**
 * 创建状态容器。
 * @param {object} storage - localStorage 兼容对象（测试可传内存桩）。
 */
export function createHomeStore(storage = globalThis.localStorage) {
  let state = loadState(storage);
  const listeners = new Set();
  let writeTimer = 0;

  const flush = () => {
    writeTimer = 0;
    try {
      storage?.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* 存储不可用时静默：页面依然可用，只是不持久。 */
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
    },
  };
}
