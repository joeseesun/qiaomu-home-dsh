/**
 * 浏览器测试页入口：用真实 React 与同一份源码渲染 HomePage，桩掉 DSH 服务。
 * 只用于本地交互验证（见 scripts/harness.mjs），不进入发布产物。
 * ?w=420 可把页面固定为窄宽度，用来检查容器查询与窄窗排版。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from '../../src/client/page.jsx';
import { createHomeStore } from '../../src/client/store.js';
import { CSS, CSS_EXTRA } from '../../src/client/styles.js';
import { zh } from '../../src/client/locale.js';

const style = document.createElement('style');
style.textContent = CSS + CSS_EXTRA;
document.head.appendChild(style);

const t = (key, vars) => {
  let text = zh[key] ?? key;
  for (const [name, value] of Object.entries(vars ?? {})) text = text.replaceAll(`{${name}}`, String(value));
  return text;
};
const now = Date.now();
const titles = [['a', '修复登录'], ['b', '写周报'], ['c', '重构 cards'], ['d', '读论文']];
const snapshot = {
  ids: titles.map(([id]) => id),
  byId: Object.fromEntries(titles.map(([id, title], index) => [id, { id, title, updatedAt: now - index * 3600e3 }])),
  projectionsBySession: {},
};
const services = {
  sessions: { list: { getSnapshot: () => snapshot, subscribe: () => () => {} } },
  workspaces: { list: { getSnapshot: () => ({ items: [], archivedSessionIds: [] }) } },
  uiWorkspace: {},
};
const store = createHomeStore(localStorage);
window.__store = store;
const width = Number(new URLSearchParams(location.search).get('w')) || undefined;
createRoot(document.getElementById('app')).render(
  <div style={{ height: '100vh', width }}>
    <HomePage t={t} store={store} services={services} />
  </div>,
);
