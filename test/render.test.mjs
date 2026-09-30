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

test('有待办和网址时渲染内容', () => {
  const store = createHomeStore(memoryStorage());
  store.set({
    todos: [{ id: 'a', text: '读完一章书', done: false, createdAt: 1 }],
    shortcuts: [{ id: 'u1', kind: 'url', url: 'https://example.com/', label: 'Example' }],
  });
  const state = store.getSnapshot();
  const setState = (patch) => store.set(patch);
  const todoHtml = renderToString(React.createElement(TodoCard, { t, lang: 'zh', state, setState, services }));
  assert.match(todoHtml, /读完一章书/);
  const shortcutHtml = renderToString(React.createElement(ShortcutsCard, { t, lang: 'zh', state, setState, services }));
  assert.match(shortcutHtml, /Example/);
  assert.match(shortcutHtml, /icons\.duckduckgo\.com/);
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
