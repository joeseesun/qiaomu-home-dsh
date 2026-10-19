/**
 * 快捷入口分组：对标 Obsidian 版 shortcuts.ts。
 * 每个分组是一张独立的卡片（布局里的卡片 ID 为 `shortcut:<组 ID>`，默认组沿用旧 ID `shortcuts`），
 * 组内条目可增删改、排序；书签 HTML 可导入成新组。全部是纯函数，返回新数组。
 */
import { faviconUrl, normalizeUrl } from './data.js';

export const DEFAULT_GROUP_ID = 'home-shortcuts';
export const FAVICON = 'favicon';
/** 条目可选的图标（名称对应 icons.jsx）；favicon 表示使用站点自己的图标。 */
export const SHORTCUT_ICONS = ['link', 'globe', 'folder', 'book', 'home', 'pen', 'notebook', 'target', 'flame', 'zap', 'calendar', 'sun'];
export const MAX_IMPORT = 50;
const GROUP_ID_RE = /^[a-zA-Z0-9_-]{1,80}$/;

/** 布局里的卡片 ID ↔ 分组 ID。 */
export const groupCardId = (groupId) => (groupId === DEFAULT_GROUP_ID ? 'shortcuts' : `shortcut:${groupId}`);
export const groupIdOf = (cardId) => {
  if (cardId === 'shortcuts') return DEFAULT_GROUP_ID;
  return typeof cardId === 'string' && cardId.startsWith('shortcut:') && GROUP_ID_RE.test(cardId.slice(9)) ? cardId.slice(9) : null;
};
export const isGroupCard = (cardId) => groupIdOf(cardId) !== null;

const newId = (prefix) => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
const cleanIcon = (value) => (value === FAVICON || SHORTCUT_ICONS.includes(value) ? value : FAVICON);

function cleanItem(raw) {
  if (!raw || typeof raw !== 'object' || typeof raw.id !== 'string' || !raw.id) return null;
  const url = normalizeUrl(raw.url);
  if (!url) return null;
  const label = typeof raw.label === 'string' && raw.label.trim() ? raw.label.trim().slice(0, 120) : new URL(url).hostname;
  return { id: raw.id, kind: 'url', url, label, icon: cleanIcon(raw.icon) };
}

/** 读取并清洗分组；旧版 `shortcuts` 数组迁入默认组；默认组始终存在。 */
export function normalizeGroups(raw, legacyItems = []) {
  const groups = [];
  const seen = new Set();
  for (const entry of Array.isArray(raw) ? raw : []) {
    if (!entry || typeof entry !== 'object' || typeof entry.id !== 'string' || !GROUP_ID_RE.test(entry.id) || seen.has(entry.id)) continue;
    seen.add(entry.id);
    const ids = new Set();
    const items = (Array.isArray(entry.items) ? entry.items : []).map(cleanItem).filter((item) => item && !ids.has(item.id) && ids.add(item.id));
    groups.push({ id: entry.id, name: typeof entry.name === 'string' ? entry.name.trim().slice(0, 40) : '', items });
  }
  if (!seen.has(DEFAULT_GROUP_ID)) {
    const items = (Array.isArray(legacyItems) ? legacyItems : []).map(cleanItem).filter(Boolean);
    groups.unshift({ id: DEFAULT_GROUP_ID, name: '', items });
  }
  return groups;
}

const patchGroup = (groups, id, fn) => {
  let changed = false;
  const next = groups.map((group) => {
    if (group.id !== id) return group;
    const updated = fn(group);
    if (updated !== group) changed = true;
    return updated;
  });
  return changed ? next : groups;
};

export function addGroup(groups, name, items = []) {
  const trimmed = String(name ?? '').trim().slice(0, 40);
  if (!trimmed) return { groups, id: null };
  const id = newId('g');
  return { groups: [...groups, { id, name: trimmed, items }], id };
}

export const renameGroup = (groups, id, name) => {
  const trimmed = String(name ?? '').trim().slice(0, 40);
  return trimmed ? patchGroup(groups, id, (group) => (group.name === trimmed ? group : { ...group, name: trimmed })) : groups;
};

/** 默认组不可删除。 */
export const removeGroup = (groups, id) => (id === DEFAULT_GROUP_ID ? groups : groups.filter((group) => group.id !== id));

/** 新增条目；网址不合法返回 null 以便界面提示。 */
export function addItem(groups, groupId, { label, url, icon = FAVICON }) {
  const href = normalizeUrl(url);
  if (!href || !groups.some((group) => group.id === groupId)) return null;
  const item = { id: newId('u'), kind: 'url', url: href, label: String(label ?? '').trim().slice(0, 120) || new URL(href).hostname, icon: cleanIcon(icon) };
  return { groups: patchGroup(groups, groupId, (group) => ({ ...group, items: [...group.items, item] })), id: item.id };
}

export function updateItem(groups, groupId, itemId, { label, url, icon }) {
  const href = normalizeUrl(url);
  if (!href) return null;
  return patchGroup(groups, groupId, (group) => ({
    ...group,
    items: group.items.map((item) => (item.id === itemId
      ? { ...item, url: href, label: String(label ?? '').trim().slice(0, 120) || new URL(href).hostname, icon: cleanIcon(icon) }
      : item)),
  }));
}

export const removeItem = (groups, groupId, itemId) => patchGroup(groups, groupId, (group) => (group.items.some((item) => item.id === itemId)
  ? { ...group, items: group.items.filter((item) => item.id !== itemId) } : group));

export function moveItem(groups, groupId, itemId, delta) {
  return patchGroup(groups, groupId, (group) => {
    const from = group.items.findIndex((item) => item.id === itemId);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= group.items.length) return group;
    const items = [...group.items];
    items.splice(to, 0, items.splice(from, 1)[0]);
    return { ...group, items };
  });
}

export function reorderItem(groups, groupId, itemId, beforeId, after = false) {
  return patchGroup(groups, groupId, (group) => {
    if (itemId === beforeId || !group.items.some((item) => item.id === itemId) || !group.items.some((item) => item.id === beforeId)) return group;
    const moving = group.items.find((item) => item.id === itemId);
    const items = group.items.filter((item) => item.id !== itemId);
    items.splice(items.findIndex((item) => item.id === beforeId) + (after ? 1 : 0), 0, moving);
    return { ...group, items };
  });
}

/* ---- 书签导入 ---- */

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
export function decodeEntities(text) {
  return String(text).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, code) => {
    if (code[0] === '#') {
      const value = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : Number(code.slice(1));
      return Number.isFinite(value) && value > 0 && value < 0x110000 ? String.fromCodePoint(value) : whole;
    }
    return ENTITIES[code.toLowerCase()] ?? whole;
  });
}

/** 从浏览器导出的书签 HTML 里取 http(s) 链接，去重，最多 MAX_IMPORT 个。不依赖 DOM，便于测试。 */
export function parseBookmarks(html, limit = MAX_IMPORT) {
  const found = [];
  const seen = new Set();
  // 线性扫描：</a> 的位置只会单调向后，所以缓存「下一个 </a>」；找不到之后就不再找。
  // 只有链接有效时才取标题，标题最多看 2000 个字符，未闭合的标签不会拖成平方时间。
  const text = String(html);
  const lower = text.toLowerCase();
  const open = /<a\b([^>]{0,4000})>/gi;
  let nextClose = -2; // -2 尚未查找，-1 之后再无 </a>
  let match;
  while (found.length < limit && (match = open.exec(text))) {
    const href = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(match[1]);
    const url = normalizeUrl(decodeEntities(href?.[1] ?? href?.[2] ?? href?.[3] ?? ''));
    if (!url || seen.has(url)) continue;
    seen.add(url);
    const bodyStart = match.index + match[0].length;
    if (nextClose !== -1 && (nextClose === -2 || nextClose < bodyStart)) nextClose = lower.indexOf('</a>', bodyStart);
    const inner = nextClose < 0 || nextClose - bodyStart > 2000 ? '' : text.slice(bodyStart, nextClose);
    const name = decodeEntities(inner.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim().slice(0, 120);
    found.push({ name: name || new URL(url).hostname, url });
  }
  return found;
}

export function bookmarkItems(bookmarks) {
  return bookmarks.map((bookmark, index) => ({ id: newId(`b${index}`), kind: 'url', url: bookmark.url, label: bookmark.name, icon: FAVICON }));
}

export { faviconUrl };
