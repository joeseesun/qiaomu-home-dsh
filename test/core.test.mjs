/**
 * 纯逻辑单测：node --test。
 * 覆盖：每日一选稳定性、时间进度、待办操作、网址规范化、天气解析、时区时钟、持久化。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  DAILY_QUESTIONS,
  SEARCH_ENGINES,
  activityByDay,
  addFocusItem,
  addHabit,
  addQuickNote,
  addTodo,
  checkinHabit,
  daysBetween,
  ensureDailyFocus,
  heatIntensity,
  lastNDays,
  parseHabitInput,
  quickNotesMarkdown,
  uncheckHabit,
  clearDoneTodos,
  curatedPhotos,
  dailyIndex,
  dayKey,
  faviconUrl,
  normalizeUrl,
  parseWeather,
  removeTodo,
  sizedUrl,
  targetWidth,
  timeProgress,
  toggleTodo,
  weatherKind,
  zonedTime,
} from '../src/client/data.js';
import { createHomeStore, defaultState, loadState } from '../src/client/store.js';

test('dailyIndex 稳定且落在范围内', () => {
  const a = dailyIndex('2026-09-29', 20);
  const b = dailyIndex('2026-09-29', 20);
  assert.equal(a, b);
  assert.ok(a >= 0 && a < 20);
  assert.equal(dailyIndex('2026-09-29', 0), -1);
  const shifted = dailyIndex('2026-09-29', 20, 1);
  assert.equal(shifted, (a + 1) % 20);
});

test('壁纸表完整且图片地址带参数', () => {
  const photos = curatedPhotos();
  assert.ok(photos.length >= 15);
  for (const photo of photos) {
    assert.match(photo.url, /^https:\/\/images\.unsplash\.com\//);
    assert.match(photo.page, /utm_source=qiaomu_home_dsh/);
    assert.ok(photo.author.length > 0);
    assert.match(photo.color, /^#[0-9a-f]{6}$/);
  }
  const sized = sizedUrl(photos[0], 1920);
  assert.match(sized, /w=1920/);
  assert.match(sized, /q=80/);
  assert.equal(targetWidth(1280, 1), 1280);
  assert.equal(targetWidth(3000, 2), 2560);
});

test('待办增删改清', () => {
  let todos = [];
  todos = addTodo(todos, '  第一件事  ');
  todos = addTodo(todos, '第二件事');
  assert.equal(todos.length, 2);
  assert.equal(todos[0].text, '第一件事');
  assert.equal(todos[0].done, false);
  assert.equal(addTodo(todos, '   '), todos, '空白输入不该新增');
  todos = toggleTodo(todos, todos[0].id);
  assert.equal(todos[0].done, true);
  todos = clearDoneTodos(todos);
  assert.equal(todos.length, 1);
  todos = removeTodo(todos, todos[0].id);
  assert.equal(todos.length, 0);
});

test('网址规范化与图标地址', () => {
  assert.equal(normalizeUrl(' https://example.com/a?b=1 '), 'https://example.com/a?b=1');
  assert.equal(normalizeUrl('not a url'), null);
  assert.equal(normalizeUrl('ftp://example.com'), null);
  assert.equal(normalizeUrl('https://user:pass@example.com'), null);
  assert.equal(faviconUrl('https://sub.example.com/x'), 'https://icons.duckduckgo.com/ip3/sub.example.com.ico');
  assert.equal(faviconUrl('nope'), null);
});

test('时间进度在 0..1 且有序', () => {
  const now = new Date(2026, 5, 15, 12, 0, 0);
  const p = timeProgress(now);
  for (const key of ['day', 'week', 'month', 'year']) {
    assert.ok(p[key] >= 0 && p[key] <= 1, key);
  }
  assert.ok(Math.abs(p.day - 0.5) < 0.01);
  assert.ok(Math.abs(p.month - 0.5) < 0.05);
});

test('天气码映射与响应解析', () => {
  assert.equal(weatherKind(0).zh, '晴');
  assert.equal(weatherKind(95).icon, 'cloud-lightning');
  assert.equal(weatherKind(9999).en, 'Unknown');
  const parsed = parseWeather({
    current: { temperature_2m: 21.4, apparent_temperature: 20.1, weather_code: 1 },
    daily: {
      time: ['2026-09-29', '2026-09-30', '2026-10-01', '2026-10-02'],
      weather_code: [1, 3, 61, 80],
      temperature_2m_max: [25, 24, 20, 22],
      temperature_2m_min: [15, 14, 12, 13],
    },
  });
  assert.equal(parsed.current.temperature, 21.4);
  assert.equal(parsed.days.length, 3, '最多取三天');
  assert.throws(() => parseWeather({ current: {} }), /Invalid forecast/);
});

test('时区时钟给出 HH:MM 与日期差', () => {
  const now = new Date(2026, 8, 29, 23, 30);
  const shanghai = zonedTime(now, 'Asia/Shanghai');
  assert.match(shanghai.time, /^\d{2}:\d{2}$/);
  const london = zonedTime(now, 'Europe/London');
  assert.match(london.time, /^\d{2}:\d{2}$/);
});

test('dayKey 本地日期格式', () => {
  assert.equal(dayKey(new Date(2026, 0, 5)), '2026-01-05');
});

function memoryStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
  };
}

test('持久化容器：写入、读回、重置', async () => {
  const storage = memoryStorage();
  const store = createHomeStore(storage);
  assert.deepEqual(store.getSnapshot().todos, []);
  store.set({ todos: addTodo([], '写测试') });
  store.flush();
  const again = loadState(storage);
  assert.equal(again.todos.length, 1);
  assert.equal(again.todos[0].text, '写测试');
  // 订阅通知
  let notified = 0;
  const off = store.subscribe(() => {
    notified += 1;
  });
  store.set({ tab: 'focus' });
  assert.equal(notified, 1);
  off();
  store.reset();
  assert.deepEqual(store.getSnapshot().tab, defaultState().tab);
});

test('坏数据回到默认', () => {
  const storage = memoryStorage();
  storage.setItem('dsh-qiaomu-home:v1', '{oops');
  assert.deepEqual(loadState(storage), defaultState());
  storage.setItem('dsh-qiaomu-home:v1', '[1,2]');
  assert.deepEqual(loadState(storage), defaultState());
});

test('习惯解析与打卡', () => {
  assert.deepEqual(parseHabitInput('喝水:8'), { name: '喝水', target: 8 });
  assert.deepEqual(parseHabitInput('喝水：8'), { name: '喝水', target: 8 });
  assert.deepEqual(parseHabitInput('早起'), { name: '早起', target: 1 });
  assert.equal(parseHabitInput('  '), null);
  let habits = [];
  habits = addHabit(habits, '喝水:3');
  assert.equal(habits.length, 1);
  assert.equal(addHabit(habits, '喝水:3'), habits, '同名习惯不重复');
  const today = '2026-09-30';
  let log = {};
  log = checkinHabit(log, habits[0].id, today, 3);
  log = checkinHabit(log, habits[0].id, today, 3);
  log = checkinHabit(log, habits[0].id, today, 3);
  log = checkinHabit(log, habits[0].id, today, 3);
  assert.equal(log[habits[0].id][today], 3, '打卡计数封顶 target');
  log = uncheckHabit(log, habits[0].id, today);
  assert.equal(log[habits[0].id][today], 2);
  log = uncheckHabit(log, habits[0].id, today);
  log = uncheckHabit(log, habits[0].id, today);
  assert.equal(log[habits[0].id][today], undefined, '减到 0 删除记录');
});

test('今日重点跨天结转未完成', () => {
  const yesterday = { date: '2026-09-29', items: [
    { id: 'a', text: '做完了', done: true },
    { id: 'b', text: '没做完', done: false },
  ] };
  const today = ensureDailyFocus(yesterday, '2026-09-30');
  assert.equal(today.date, '2026-09-30');
  assert.deepEqual(today.items.map((i) => i.text), ['没做完']);
  assert.equal(ensureDailyFocus(today, '2026-09-30'), today, '当天幂等');
  let focus = { date: '2026-09-30', items: [] };
  focus = addFocusItem(focus, '一');
  focus = addFocusItem(focus, '二');
  focus = addFocusItem(focus, '三');
  assert.equal(addFocusItem(focus, '四'), focus, '最多三件');
});

test('倒计时天数计算', () => {
  assert.equal(daysBetween('2026-10-01', '2026-09-30'), 1);
  assert.equal(daysBetween('2026-09-28', '2026-09-30'), -2);
  assert.equal(daysBetween('bad', '2026-09-30'), null);
});

test('快速记录新增与导出', () => {
  let notes = [];
  notes = addQuickNote(notes, '第一条', new Date(2026, 8, 30, 9, 5).getTime());
  notes = addQuickNote(notes, '第二条', new Date(2026, 8, 30, 10, 40).getTime());
  assert.equal(notes.length, 2);
  assert.equal(notes[0].text, '第二条', '新的在前面');
  const md = quickNotesMarkdown(notes);
  assert.match(md, /## 2026-09-30/);
  assert.match(md, /- 09:05 第一条/);
  assert.match(md, /- 10:40 第二条/);
  assert.equal(addQuickNote(notes, '  '), notes);
});

test('会话活动热力图分档', () => {
  const day = dayKey(new Date(2026, 8, 30, 12, 0));
  const counts = activityByDay({
    a: { id: 'a', blank: false, updatedAt: new Date(2026, 8, 30, 9, 0).getTime() },
    b: { id: 'b', blank: false, updatedAt: new Date(2026, 8, 30, 18, 0).getTime() },
    c: { id: 'c', blank: true, updatedAt: new Date(2026, 8, 30, 20, 0).getTime() },
  });
  assert.equal(counts.get(day), 2, 'blank 会话不计入');
  assert.equal(heatIntensity(0, 5), 0);
  assert.equal(heatIntensity(5, 5), 4);
  assert.equal(heatIntensity(1, 4), 1);
  assert.equal(heatIntensity(100, 5), 4);
  assert.equal(lastNDays(7).length, 7);
});

test('每日一问与搜索引擎数据', () => {
  assert.ok(DAILY_QUESTIONS.zh.length >= 10);
  assert.equal(DAILY_QUESTIONS.zh.length, DAILY_QUESTIONS.en.length);
  const idx = dailyIndex('2026-09-30', DAILY_QUESTIONS.zh.length);
  assert.ok(DAILY_QUESTIONS.zh[idx].length > 0);
  for (const engine of SEARCH_ENGINES) {
    assert.match(engine.url, /^https:\/\//);
  }
});
