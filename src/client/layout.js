import { groupIdOf, isGroupCard } from './shortcuts.js';

/**
 * DSH 小组件目录与按页布局。组件数据由 store 共享；布局只保存组件 ID 与每页的组件选项。
 * 交互模型对标 Obsidian 版乔木 Home：每页独立编排、单组件数量选项、拖拽/菜单排序、
 * 跨页移动、复制页、模板页。所有函数纯净：返回新数组，不改入参。
 */

/** 分类顺序即组件库分组顺序。 */
export const CATEGORIES = ['plan', 'notes', 'dsh', 'links', 'focus', 'time', 'discover'];

/** limit: 支持「显示数量」的组件（与 Obsidian 版的 1–6 选项一致）。 */
export const CARD_CATALOG = [
  { id: 'dailyFocus', category: 'plan' },
  { id: 'todo', category: 'plan', limit: { def: 6, max: 6 } },
  { id: 'recent', category: 'dsh', limit: { def: 5, max: 6 } },
  { id: 'shortcuts', category: 'links' },
  { id: 'quickNote', category: 'notes', limit: { def: 6, max: 6 } },
  { id: 'scratchpad', category: 'notes' },
  { id: 'dailyQuestion', category: 'notes' },
  { id: 'heatmap', category: 'dsh' },
  { id: 'focus', category: 'focus' },
  { id: 'habit', category: 'focus' },
  { id: 'ambient', category: 'focus' },
  { id: 'progress', category: 'time' },
  { id: 'worldclock', category: 'time' },
  { id: 'quote', category: 'discover' },
  { id: 'multiSearch', category: 'discover', options: ['openAll'] },
  { id: 'weather', category: 'discover' },
  { id: 'countdown', category: 'time' },
].map((card) => ({ ...card, titleKey: `card.${card.id}`, descKey: `card.${card.id}.desc` }));

const CARD_BY_ID = new Map(CARD_CATALOG.map((card) => [card.id, card]));
const CARD_IDS = new Set(CARD_BY_ID.keys());
/** 目录组件，或快捷入口分组卡片（shortcut:<id>）。 */
const isKnownCard = (id) => CARD_IDS.has(id) || isGroupCard(id);

export const cardMeta = (id) => CARD_BY_ID.get(id);

/** 组件显示名：快捷入口分组用自己的名字，其余取字典。 */
export function cardTitle(id, t, groups = []) {
  const groupId = groupIdOf(id);
  if (groupId) return groups.find((group) => group.id === groupId)?.name || t('card.shortcuts');
  return t(`card.${id}`);
}
/** 组件是否有可设置项（显示数量或专属选项）。 */
export const hasCardSettings = (id) => Boolean(CARD_BY_ID.get(id)?.limit || CARD_BY_ID.get(id)?.options?.length);

/** 新建页时可选的模板；名称/说明取自字典 template.<id> / template.<id>.desc。 */
export const PAGE_TEMPLATES = [
  { id: 'home', icon: 'home', cards: ['dailyFocus', 'todo', 'recent', 'shortcuts'] },
  { id: 'work', icon: 'briefcase', cards: ['dailyFocus', 'todo', 'recent', 'focus', 'quickNote'] },
  { id: 'focus', icon: 'timer', cards: ['focus', 'habit', 'ambient', 'progress', 'worldclock'] },
  { id: 'notes', icon: 'pen', cards: ['quickNote', 'scratchpad', 'dailyQuestion', 'heatmap'] },
  { id: 'reading', icon: 'book', cards: ['quote', 'multiSearch', 'scratchpad', 'dailyQuestion'] },
  { id: 'rhythm', icon: 'flame', cards: ['habit', 'countdown', 'progress', 'heatmap'] },
  { id: 'explore', icon: 'compass', cards: ['quote', 'multiSearch', 'weather', 'countdown'] },
];

export function defaultTabs() {
  return [
    { id: 'home', labelKey: 'tabs.home', cards: ['dailyFocus', 'todo', 'recent', 'shortcuts'], options: {} },
    { id: 'notes', labelKey: 'tabs.notes', cards: ['quickNote', 'scratchpad', 'dailyQuestion', 'heatmap'], options: {} },
    { id: 'focus', labelKey: 'tabs.focus', cards: ['focus', 'habit', 'ambient', 'progress', 'worldclock'], options: {} },
    { id: 'explore', labelKey: 'tabs.explore', cards: ['quote', 'multiSearch', 'weather', 'countdown'], options: {} },
  ];
}

const clampInt = (value, min, max, fallback) => {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
};

/** 只保留目录里存在、且类型合法的选项，避免脏数据进入渲染。 */
function cleanOptions(raw, cards) {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const id of cards) {
    const source = raw[id];
    const meta = CARD_BY_ID.get(id);
    if (!source || typeof source !== 'object' || !meta) continue;
    const next = {};
    if (meta.limit && source.limit !== undefined) next.limit = clampInt(source.limit, 1, meta.limit.max, meta.limit.def);
    if (meta.options?.includes('openAll') && typeof source.openAll === 'boolean') next.openAll = source.openAll;
    if (Object.keys(next).length) out[id] = next;
  }
  return out;
}

/** 旧版全局 hidden 只在迁移时生效；之后每个 Tab 独立编排。 */
export function normalizeTabs(rawTabs, legacyHidden = {}) {
  const defaults = defaultTabs();
  if (!Array.isArray(rawTabs)) {
    return defaults.map((tab) => ({ ...tab, cards: tab.cards.filter((id) => !legacyHidden?.[id]) }));
  }
  const seen = new Set();
  const tabs = [];
  for (const raw of rawTabs) {
    if (!raw || typeof raw !== 'object' || typeof raw.id !== 'string' || seen.has(raw.id)) continue;
    if (!/^[a-zA-Z0-9_-]{1,80}$/.test(raw.id)) continue;
    seen.add(raw.id);
    const fallback = defaults.find((tab) => tab.id === raw.id);
    const name = typeof raw.name === 'string' ? raw.name.trim().slice(0, 30) : '';
    const cards = Array.isArray(raw.cards) ? [...new Set(raw.cards.filter(isKnownCard))] : [];
    tabs.push({
      id: raw.id,
      ...(name ? { name } : fallback ? { labelKey: fallback.labelKey } : { name: raw.id }),
      cards,
      options: cleanOptions(raw.options, cards),
    });
  }
  if (!seen.has('home')) tabs.unshift(defaults[0]);
  else {
    // 主页固定在最前。
    const at = tabs.findIndex((tab) => tab.id === 'home');
    if (at > 0) tabs.unshift(...tabs.splice(at, 1));
  }
  return tabs;
}

/** 只改一页；回调返回原对象时整体返回原数组，避免无意义的写入与重渲染。 */
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

const newTabId = () => `tab_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
const trimName = (name) => String(name ?? '').trim().slice(0, 30);

export function addTab(tabs, name, cards = [], options = {}) {
  const trimmed = trimName(name);
  if (!trimmed) return { tabs, id: null };
  const id = newTabId();
  const list = [...new Set(cards.filter(isKnownCard))];
  return { tabs: [...tabs, { id, name: trimmed, cards: list, options: cleanOptions(options, list) }], id };
}

/** 复制一页（含组件选项），紧跟在原页之后。 */
export function duplicateTab(tabs, id, name) {
  const source = tabs.find((tab) => tab.id === id);
  const trimmed = trimName(name);
  if (!source || !trimmed) return { tabs, id: null };
  const copy = { id: newTabId(), name: trimmed, cards: [...source.cards], options: cleanOptions(structuredClone(source.options ?? {}), source.cards) };
  const next = [...tabs];
  next.splice(tabs.indexOf(source) + 1, 0, copy);
  return { tabs: next, id: copy.id };
}

/** 用模板创建一页；名称留空时由调用方传入模板的本地化名称。 */
export function addTemplateTab(tabs, templateId, name) {
  const template = PAGE_TEMPLATES.find((entry) => entry.id === templateId);
  return addTab(tabs, name, template ? template.cards : []);
}

export function renameTab(tabs, id, name) {
  const trimmed = trimName(name);
  if (!trimmed) return tabs;
  return tabs.map((tab) => tab.id === id ? { ...tab, name: trimmed, labelKey: undefined } : tab);
}

export function removeTab(tabs, id) {
  return id === 'home' ? tabs : tabs.filter((tab) => tab.id !== id);
}

/** 主页固定在第一位，其余页可上下移动。 */
export function moveTab(tabs, id, delta) {
  const from = tabs.findIndex((tab) => tab.id === id);
  const to = from + delta;
  if (from < 1 || to < 1 || to >= tabs.length) return tabs;
  const next = [...tabs];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}

/** 拖拽重排 Tab：放到 before 之前或之后；主页不能被移动，也不能被挤到它前面。 */
export function reorderTab(tabs, id, beforeId, after = false) {
  if (id === beforeId || id === 'home') return tabs;
  const moving = tabs.find((tab) => tab.id === id);
  const target = tabs.findIndex((tab) => tab.id === beforeId);
  if (!moving || target < 0) return tabs;
  if (beforeId === 'home') after = true;
  const rest = tabs.filter((tab) => tab.id !== id);
  rest.splice(rest.findIndex((tab) => tab.id === beforeId) + (after ? 1 : 0), 0, moving);
  return rest;
}

export function addCard(tabs, tabId, cardId) {
  if (!isKnownCard(cardId)) return tabs;
  return patchTab(tabs, tabId, (tab) => tab.cards.includes(cardId) ? tab : { ...tab, cards: [...tab.cards, cardId] });
}

export function removeCard(tabs, tabId, cardId) {
  return patchTab(tabs, tabId, (tab) => {
    if (!tab.cards.includes(cardId)) return tab;
    const { [cardId]: _dropped, ...options } = tab.options ?? {};
    return { ...tab, cards: tab.cards.filter((id) => id !== cardId), options };
  });
}

export function moveCard(tabs, tabId, cardId, delta) {
  return patchTab(tabs, tabId, (tab) => {
    const from = tab.cards.indexOf(cardId);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= tab.cards.length) return tab;
    const cards = [...tab.cards];
    cards.splice(to, 0, cards.splice(from, 1)[0]);
    return { ...tab, cards };
  });
}

/** 拖拽重排组件：放到 beforeId 之前或之后。 */
export function reorderCard(tabs, tabId, cardId, beforeId, after = false) {
  return patchTab(tabs, tabId, (tab) => {
    if (cardId === beforeId || !tab.cards.includes(cardId) || !tab.cards.includes(beforeId)) return tab;
    const cards = tab.cards.filter((id) => id !== cardId);
    cards.splice(cards.indexOf(beforeId) + (after ? 1 : 0), 0, cardId);
    return { ...tab, cards };
  });
}

/** 把组件从一页移到另一页（带走选项）；目标页已有同一组件时不动。 */
export function moveCardToTab(tabs, fromId, toId, cardId) {
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

/** 读取组件在某页的生效选项（补默认值）。 */
export function cardOptions(tab, cardId) {
  const meta = CARD_BY_ID.get(cardId);
  const saved = tab?.options?.[cardId] ?? {};
  return {
    ...(meta?.limit ? { limit: clampInt(saved.limit, 1, meta.limit.max, meta.limit.def) } : {}),
    ...(meta?.options?.includes('openAll') ? { openAll: saved.openAll !== false } : {}),
  };
}

export function setCardOptions(tabs, tabId, cardId, patch) {
  if (!isKnownCard(cardId)) return tabs;
  return patchTab(tabs, tabId, (tab) => {
    if (!tab.cards.includes(cardId)) return tab;
    const merged = { ...(tab.options?.[cardId] ?? {}), ...patch };
    return { ...tab, options: { ...tab.options, ...cleanOptions({ [cardId]: merged }, [cardId]) } };
  });
}

/** 内置 Tab 恢复出厂布局与选项；自定义 Tab 没有默认值，原样返回。 */
export function resetTab(tabs, id) {
  const fallback = defaultTabs().find((tab) => tab.id === id);
  if (!fallback) return tabs;
  return tabs.map((tab) => tab.id === id ? { ...tab, cards: [...fallback.cards], options: {} } : tab);
}

/* ---- 拖拽几何：与 Obsidian 版 drag-feedback 相同的约定 ---- */

/** 指针位于目标的后半（y 轴为下半，x 轴为右半）时，放置位置在目标之后。 */
export function dropAfter(axis, rect, point) {
  return axis === 'x' ? point.clientX > rect.left + rect.width / 2 : point.clientY > rect.top + rect.height / 2;
}

/** 指针靠近滚动容器上/下沿时的自动滚动速度（像素/帧，负数向上）。 */
export function edgeScrollSpeed(y, top, bottom) {
  if (y < top || y > bottom) return 0;
  const zone = Math.min(48, (bottom - top) / 4);
  if (y < top + zone) return -Math.ceil(12 * (1 - (y - top) / zone));
  if (y > bottom - zone) return Math.ceil(12 * (1 - (bottom - y) / zone));
  return 0;
}

/** Tab 显示名：自定义名称优先，内置页取字典。 */
export const tabName = (tab, t) => tab.name || t(tab.labelKey);
