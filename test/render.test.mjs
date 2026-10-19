/**
 * 渲染冒烟测试：用 react-dom/server 把主页面和每张卡片渲染成字符串，
 * 捕捉渲染期崩溃（未定义组件、hook 误用、props 形状错误）。
 * 需要 devDependencies 里的 react / react-dom。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { HomePage } from '../src/client/page.jsx';
import { LibraryDialog, previewLines } from '../src/client/library.jsx';
import { AppearanceDialog, CardSettingsDialog, ConfirmDialog, ImportBookmarksDialog, MoveCardDialog, NewTabDialog, ShortcutDialog } from '../src/client/dialogs.jsx';
import { ShortcutGroupCard } from '../src/client/cards.jsx';
import { tabName } from '../src/client/layout.js';
import {
  AmbientCard,
  CountdownCard,
  DailyFocusCard,
  DailyQuestionCard,
  FocusCard,
  HabitCard,
  HeatmapCard,
  MultiSearchCard,
  QuickNoteCard,
  ScratchpadCard,
  ProgressCard,
  QuoteCard,
  RecentCard,
  ShortcutsCard,
  TodoCard,
  WeatherCard,
  WorldClockCard,
} from '../src/client/cards.jsx';
import { createHomeStore } from '../src/client/store.js';
import { zh, en } from '../src/client/locale.js';

/** 简单 t 函数：支持 {key} 插值。 */
const t = (key, vars) => {
  let text = zh[key] ?? key;
  for (const [name, value] of Object.entries(vars ?? {})) text = text.replaceAll(`{${name}}`, String(value));
  return text;
};

function memoryStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
  };
}

const services = {
  sessions: {
    list: {
      getSnapshot: () => ({ ids: [], byId: {}, projectionsBySession: {} }),
      subscribe: () => () => {},
    },
  },
  workspaces: { list: { getSnapshot: () => ({ items: [], archivedSessionIds: [] }) } },
  uiWorkspace: {},
};

test('主页面整体渲染不崩', () => {
  const store = createHomeStore(memoryStorage());
  const html = renderToString(React.createElement(HomePage, { t, store, services }));
  assert.match(html, /qh-root/);
  assert.match(html, /qh-grid/);
  assert.match(html, /今天，从一件小事开始。/);
  assert.match(html, /今日待办/);
});

test('自定义 Tab 只渲染其已添加组件，空 Tab 给出添加入口', () => {
  const store = createHomeStore(memoryStorage());
  store.set({ tabs: [{ id: 'home', name: '主页', cards: ['todo'] }, { id: 'custom', name: '我的工作', cards: ['weather'] }], tab: 'custom' });
  const html = renderToString(React.createElement(HomePage, { t, store, services }));
  assert.match(html, /我的工作/);
  assert.match(html, /天气/);
  assert.doesNotMatch(html, /今日待办/);
  store.set({ tabs: [{ id: 'home', name: '主页', cards: [] }] , tab: 'home' });
  const empty = renderToString(React.createElement(HomePage, { t, store, services }));
  assert.match(empty, /此页还没有组件/);
});

test('组件库对话框：分类芯片带数量，已添加与未添加各有按钮，预览只展示真实内容', () => {
  const store = createHomeStore(memoryStorage());
  store.set({ todos: [{ id: 'a', text: '读完一章书', done: false, createdAt: 1 }] });
  const state = store.getSnapshot();
  const html = renderToString(React.createElement(LibraryDialog, { t, state, services, tabId: 'home', tabName, onLayout: () => {}, onClose: () => {} }));
  assert.match(html, /role="dialog"/);
  assert.match(html, /组件库/);
  assert.match(html, /只看未添加/);
  assert.match(html, /qh-lib-count/);
  assert.match(html, /aria-label="添加天气"/);
  assert.match(html, /aria-label="从此页移除今日待办"/);
  assert.match(html, /读完一章书/);
  assert.match(html, /也在：/);
  assert.deepEqual(previewLines('weather', { state, services }), []);
});

test('新建 Tab 对话框提供空白与全部模板；其他对话框可渲染', () => {
  const html = renderToString(React.createElement(NewTabDialog, { t, onCreate: () => {}, onClose: () => {} }));
  assert.match(html, /role="radiogroup"/);
  for (const name of ['空白页', '主页', '工作台', '专注', '记录', '阅读', '节奏', '探索']) assert.ok(html.includes(name), name);
  const store = createHomeStore(memoryStorage());
  const state = store.getSnapshot();
  const tab = state.tabs.find((entry) => entry.id === 'home');
  const settings = renderToString(React.createElement(CardSettingsDialog, { t, tab, cardId: 'todo', onChange: () => {}, onClose: () => {} }));
  assert.match(settings, /显示数量/);
  const search = renderToString(React.createElement(CardSettingsDialog, { t, tab, cardId: 'multiSearch', onChange: () => {}, onClose: () => {} }));
  assert.match(search, /回车时/);
  assert.match(renderToString(React.createElement(MoveCardDialog, { t, tabs: state.tabs, fromId: 'home', cardId: 'todo', tabName, onMove: () => {}, onClose: () => {} })), /记录/);
  assert.match(renderToString(React.createElement(ConfirmDialog, { t, title: '删除 Tab', message: 'x', confirmText: '删除', onConfirm: () => {}, onClose: () => {} })), /删除/);
  assert.match(renderToString(React.createElement(AppearanceDialog, { t, state, setState: () => {}, onReset: () => {}, onClose: () => {} })), /外观/);
});

test('主页面带标签页语义、组件菜单按钮与布置入口', () => {
  const store = createHomeStore(memoryStorage());
  const html = renderToString(React.createElement(HomePage, { t, store, services }));
  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tab"[^>]*aria-selected="true"/);
  assert.match(html, /role="tabpanel"/);
  assert.match(html, /aria-label="今日待办菜单"/);
  assert.match(html, /aria-label="布置主页"/);
  assert.match(html, /aria-label="组件库"/);
});

test('每张卡片单独渲染不崩', () => {
  const store = createHomeStore(memoryStorage());
  const state = store.getSnapshot();
  const setState = (patch) => store.set(patch);
  const props = { t, lang: 'zh', state, setState, services };
  const cards = [
    ['todo', TodoCard],
    ['dailyFocus', DailyFocusCard],
    ['quickNote', QuickNoteCard],
    ['scratchpad', ScratchpadCard],
    ['habit', HabitCard],
    ['countdown', CountdownCard],
    ['dailyQuestion', DailyQuestionCard],
    ['multiSearch', MultiSearchCard],
    ['heatmap', HeatmapCard],
    ['ambient', AmbientCard],
    ['recent', RecentCard],
    ['shortcuts', ShortcutsCard],
    ['focus', FocusCard],
    ['progress', ProgressCard],
    ['worldclock', WorldClockCard],
    ['quote', QuoteCard],
    ['weather', WeatherCard],
  ];
  for (const [id, Component] of cards) {
    const html = renderToString(React.createElement(Component, props));
    assert.ok(html.includes('qh-card'), `${id} 卡片没有渲染出卡片骨架`);
  }
});

test('多站搜索分组与自定义站点编辑；天气地点搜索界面', () => {
  const store = createHomeStore(memoryStorage());
  const setState = (patch) => store.set(patch);
  const searchHtml = renderToString(React.createElement(MultiSearchCard, { t, lang: 'zh', state: store.getSnapshot(), setState }));
  assert.match(searchHtml, /找电子书/);
  assert.match(searchHtml, /GitHub 待办/);
  assert.match(searchHtml, /自定义站点/);
  // 切到书籍组后站点换成目录站点；模板编辑器带占位示例。
  store.set({ searchGroup: 'books' });
  const books = renderToString(React.createElement(MultiSearchCard, { t, lang: 'zh', state: store.getSnapshot(), setState }));
  assert.match(books, /豆瓣读书/);
  assert.match(books, /Google 图书/);
  // 天气：未选地点显示搜索框；选中后显示地名与「更换地点」。
  const empty = renderToString(React.createElement(WeatherCard, { t, lang: 'zh', state: store.getSnapshot(), setState }));
  assert.match(empty, /搜索城市/);
  store.set({ weatherPlace: { name: '杭州', detail: '浙江 · 中国', latitude: 30.2741, longitude: 120.1551 } });
  const picked = renderToString(React.createElement(WeatherCard, { t, lang: 'zh', state: store.getSnapshot(), setState }));
  assert.match(picked, /杭州/);
  assert.match(picked, /更换地点/);
});

test('有待办和网址时渲染内容', () => {
  const store = createHomeStore(memoryStorage());
  store.set({
    todos: [{ id: 'a', text: '读完一章书', done: false, createdAt: 1 }],
    shortcutGroups: [{ id: 'home-shortcuts', name: '', items: [{ id: 'u1', kind: 'url', url: 'https://example.com/', label: 'Example', icon: 'favicon' }] }],
  });
  const state = store.getSnapshot();
  const setState = (patch) => store.set(patch);
  const todoHtml = renderToString(React.createElement(TodoCard, { t, lang: 'zh', state, setState, services }));
  assert.match(todoHtml, /读完一章书/);
  const shortcutHtml = renderToString(React.createElement(ShortcutsCard, { t, lang: 'zh', state, setState, services }));
  assert.match(shortcutHtml, /Example/);
  assert.match(shortcutHtml, /icons\.duckduckgo\.com/);
  assert.match(shortcutHtml, /<button[^>]+class="qh-tile-more"[^>]+aria-label="Example选项"/);
  assert.doesNotMatch(shortcutHtml, /<button[^>]+class="qh-tile"[\s\S]*?<button[^>]+class="qh-tile-more"[\s\S]*?<\/button><\/button>/, '菜单按钮不嵌套在入口按钮里');
});

test('快速记录超过六条时可展开查看', () => {
  const store = createHomeStore(memoryStorage());
  store.set({ quickNotes: Array.from({ length: 7 }, (_, index) => ({ id: String(index), time: Date.now(), text: `记录${index}` })) });
  const state = store.getSnapshot();
  const html = renderToString(React.createElement(QuickNoteCard, { t, state, setState: (patch) => store.set(patch) }));
  assert.match(html, /查看全部 7 条/);
  assert.doesNotMatch(html, /记录6/);
});

test('时钟行不出现 undefined（星期字典回归）', () => {
  // 中英文星期表都必须恰好 7 项，空格分隔——这是上次 undefined 的根源。
  for (const dict of [zh, en]) {
    assert.equal(dict['date.weekdays'].split(' ').filter(Boolean).length, 7, dict['date.weekdays']);
  }
  const store = createHomeStore(memoryStorage());
  const html = renderToString(React.createElement(HomePage, { t, store, services }));
  assert.ok(!html.includes('undefined'), '页面 HTML 里不该出现 undefined');
  assert.doesNotMatch(html, /\{(\w+)\}/, '页面 HTML 里不该残留插值占位符');
});

test('快捷入口：分组卡片渲染条目与菜单按钮；添加/导入对话框可渲染；组件库列出分组与动作', () => {
  const store = createHomeStore(memoryStorage());
  store.set({ shortcutGroups: [
    { id: 'home-shortcuts', name: '', items: [{ id: 'u1', kind: 'url', url: 'https://example.com/', label: 'Example', icon: 'favicon' }] },
    { id: 'study', name: '学习', items: [{ id: 'u2', kind: 'url', url: 'https://arxiv.org/', label: 'arXiv', icon: 'book' }] },
  ] });
  const state = store.getSnapshot();
  const props = { t, lang: 'zh', state, setState: () => {}, services };
  const home = renderToString(React.createElement(ShortcutGroupCard, { ...props, groupId: 'home-shortcuts' }));
  assert.match(home, /Example/);
  assert.match(home, /新会话/);
  assert.match(home, /aria-label="Example选项"/);
  const study = renderToString(React.createElement(ShortcutGroupCard, { ...props, groupId: 'study' }));
  assert.match(study, /学习/);
  assert.match(study, /arXiv/);
  assert.doesNotMatch(study, /新会话/, '内置入口只在默认组');
  assert.equal(renderToString(React.createElement(ShortcutGroupCard, { ...props, groupId: 'missing' })), '');
  assert.match(renderToString(React.createElement(ShortcutDialog, { t, onSubmit: () => {}, onClose: () => {} })), /网站图标/);
  assert.match(renderToString(React.createElement(ShortcutDialog, { t, item: state.shortcutGroups[1].items[0], onSubmit: () => {}, onClose: () => {} })), /编辑快捷入口/);
  assert.match(renderToString(React.createElement(ImportBookmarksDialog, { t, onImport: () => {}, onClose: () => {} })), /导入浏览器书签/);
  const lib = renderToString(React.createElement(LibraryDialog, { t, state, services, tabId: 'home', tabName, onLayout: () => {}, onCommand: () => {}, onClose: () => {} }));
  assert.match(lib, /data-card="shortcut:study"/);
  assert.match(lib, /aria-label="添加学习"/);
  assert.match(lib, /aria-label="新建入口组"/);
  assert.match(lib, /aria-label="导入浏览器书签"/);
  assert.match(lib, /arXiv/);
});
