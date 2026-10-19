/**
 * 纯逻辑单测：node --test。
 * 覆盖：每日一选稳定性、时间进度、待办操作、网址规范化、天气解析、时区时钟、持久化。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zh, en } from '../src/client/locale.js';
import {
  DEFAULT_GROUP_ID, addGroup, addItem, bookmarkItems, decodeEntities, groupCardId, groupIdOf, moveItem, normalizeGroups, parseBookmarks, removeGroup,
  removeItem, renameGroup, reorderItem, updateItem,
} from '../src/client/shortcuts.js';
import { cardTitle } from '../src/client/layout.js';
import { masonrySpan } from '../src/client/masonry.js';

import {
  DAILY_QUESTIONS,
  SEARCH_GROUPS,
  activityByDay,
  addFocusItem,
  addHabit,
  addQuickNote,
  addTodo,
  checkinHabit,
  daysBetween,
  defaultSiteIds,
  discoveryUrl,
  ensureDailyFocus,
  groupSites,
  heatIntensity,
  lastNDays,
  parseGeocoding,
  parseHabitInput,
  parseSearchTemplates,
  quickNotesMarkdown,
  searchWeatherPlaces,
  translateTarget,
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
  weatherQueryVariants,
  zonedTime,
} from '../src/client/data.js';
import { createHomeStore, defaultPreferences, defaultState, loadState } from '../src/client/store.js';
import {
  CARD_CATALOG, PAGE_TEMPLATES, addCard, addTab, addTemplateTab, cardOptions, defaultTabs, dropAfter, duplicateTab, edgeScrollSpeed, hasCardSettings,
  moveCard, moveCardToTab, moveTab, normalizeTabs, removeCard, removeTab, renameTab, reorderCard, reorderTab, resetTab, setCardOptions,
} from '../src/client/layout.js';

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

test('旧版天气城市与搜索引擎迁移；新搜索状态有默认值', () => {
  const storage = memoryStorage();
  storage.setItem('dsh-qiaomu-home:v1', JSON.stringify({ weatherCity: 'hangzhou', searchEngines: ['bing', 'gone'], searchEnginesByGroup: { web: ['bing'] } }));
  const state = loadState(storage);
  assert.deepEqual(state.weatherPlace, { name: '杭州', detail: 'Hangzhou', latitude: 30.2741, longitude: 120.1551 });
  assert.deepEqual(state.searchEngines, ['bing']);
  assert.deepEqual(state.searchEnginesByGroup.web, ['bing']);
  assert.equal(state.searchGroup, 'web');
  assert.equal(state.searchTemplates, '');
  // 坏的地点对象被丢弃。
  storage.setItem('dsh-qiaomu-home:v1', JSON.stringify({ weatherPlace: { name: '' } }));
  assert.equal(loadState(storage).weatherPlace, null);
});

test('重置页面布置保留用户内容', () => {
  const store = createHomeStore(memoryStorage());
  store.set({ todos: addTodo([], '保留待办'), quickNotes: addQuickNote([], '保留笔记'), hidden: { todo: true }, headline: '自定义' });
  store.set(defaultPreferences());
  const state = store.getSnapshot();
  assert.equal(state.todos[0].text, '保留待办');
  assert.equal(state.quickNotes[0].text, '保留笔记');
  assert.deepEqual(state.hidden, {});
  assert.equal(state.headline, '');
});

test('旧版隐藏状态迁移为按 Tab 编排，保留内容与选中页', () => {
  const storage = memoryStorage();
  storage.setItem('dsh-qiaomu-home:v1', JSON.stringify({ tab: 'notes', hidden: { todo: true, quickNote: true }, todos: [{ id: 'x', text: '保留', done: false }] }));
  const state = loadState(storage);
  assert.equal(state.tab, 'notes');
  assert.ok(!state.tabs.find((tab) => tab.id === 'home').cards.includes('todo'));
  assert.ok(!state.tabs.find((tab) => tab.id === 'notes').cards.includes('quickNote'));
  assert.equal(state.todos[0].text, '保留');
});

test('组件库按页添加、移除与排序，Tab 可管理且主页保留', () => {
  assert.equal(CARD_CATALOG.length, 17);
  const initial = defaultState().tabs;
  let tabs = addCard(initial, 'home', 'weather');
  tabs = addCard(tabs, 'home', 'weather');
  assert.equal(tabs[0].cards.filter((id) => id === 'weather').length, 1);
  assert.ok(tabs.find((tab) => tab.id === 'explore').cards.includes('weather'), '同一组件可出现在不同 Tab');
  tabs = moveCard(tabs, 'home', 'weather', -1);
  assert.equal(tabs[0].cards.at(-2), 'weather');
  tabs = removeCard(tabs, 'home', 'weather');
  assert.ok(!tabs[0].cards.includes('weather'));

  const created = addTab(tabs, ' 自定义 ');
  tabs = renameTab(created.tabs, created.id, '工作');
  assert.equal(tabs.at(-1).name, '工作');
  tabs = moveTab(tabs, created.id, -1);
  assert.equal(tabs.at(-2).id, created.id);
  assert.equal(moveTab(tabs, created.id, -10), tabs);
  assert.equal(removeTab(tabs, 'home'), tabs);
  tabs = removeTab(tabs, created.id);
  assert.ok(!tabs.some((tab) => tab.id === created.id));
});

test('自定义布局重载后保留，非法组件与重复 ID 被清理', () => {
  const storage = memoryStorage();
  storage.setItem('dsh-qiaomu-home:v1', JSON.stringify({ tab: 'work', tabs: [
    { id: 'home', cards: ['todo', 'todo', 'unknown'] },
    { id: 'work', name: '工作', cards: ['recent', 'weather'] },
    { id: 'work', name: '重复', cards: [] },
  ] }));
  const state = loadState(storage);
  assert.equal(state.tab, 'work');
  assert.deepEqual(state.tabs[0].cards, ['todo']);
  assert.equal(state.tabs.length, 2);
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

test('每日一问与搜索分组数据', () => {
  assert.ok(DAILY_QUESTIONS.zh.length >= 10);
  assert.equal(DAILY_QUESTIONS.zh.length, DAILY_QUESTIONS.en.length);
  const idx = dailyIndex('2026-09-30', DAILY_QUESTIONS.zh.length);
  assert.ok(DAILY_QUESTIONS.zh[idx].length > 0);
  // 分组目录完整性：id 唯一、站点模板合法、每组默认有选中站点。
  const groupIds = new Set();
  for (const group of SEARCH_GROUPS) {
    assert.ok(!groupIds.has(group.id), group.id);
    groupIds.add(group.id);
    assert.ok(group.sites.length, group.id);
    const ids = new Set();
    for (const site of group.sites) {
      assert.ok(!ids.has(site.id), `${group.id}/${site.id}`);
      ids.add(site.id);
      assert.match(site.home, /^https:\/\//);
      if (site.search) assert.equal(site.search('a b').includes('a%20b'), true, `${group.id}/${site.id}`);
    }
    assert.ok(defaultSiteIds(group.id).length, `${group.id} 默认站点`);
  }
  assert.equal(translateTarget('你好'), 'en');
  assert.equal(translateTarget('hello'), 'zh');
  // 发现类地址：有查询拼查询串，无查询或无模板时打开首页。
  const home = discoveryUrl(SEARCH_GROUPS.find((g) => g.id === 'ai').sites[0], 'deep learning');
  assert.equal(home, 'https://academy.openai.com/');
  const searched = discoveryUrl(SEARCH_GROUPS.find((g) => g.id === 'web').sites[0], '乔木');
  assert.match(searched, /^https:\/\/www\.google\.com\/search\?q=/);
});

test('自定义搜索模板：解析、校验与上限', () => {
  const ok = parseSearchTemplates('阮一峰 | https://www.ruanyifeng.com/blog.html?q={query}\n少数派 | https://sspai.com/search?q={query}');
  assert.equal(ok.ok, true);
  assert.equal(ok.sites.length, 2);
  assert.equal(ok.sites[0].home, 'https://www.ruanyifeng.com');
  assert.equal(ok.sites[0].search('ai'), 'https://www.ruanyifeng.com/blog.html?q=ai');
  assert.equal(parseSearchTemplates('没有分隔符 https://a.com/?q={query}').ok, false);
  assert.equal(parseSearchTemplates('缺模板 | https://a.com/').ok, false);
  assert.equal(parseSearchTemplates('主机不同 | https://{query}.example.com/?q=x').ok, false, '{query} 不能出现在主机名里');
  const multiline = parseSearchTemplates(Array.from({ length: 10 }, (_, i) => `站${i} | https://a.com/?q={query}`).join('\n'));
  assert.equal(multiline.ok, true);
  assert.equal(multiline.sites.length, 8, '最多 8 行');
  // 自定义站点并入「多站搜索」组。
  assert.equal(groupSites('web', ok.sites).length, SEARCH_GROUPS[0].sites.length + 2);
  assert.equal(groupSites('books', ok.sites).length, SEARCH_GROUPS[1].sites.length);
});

test('天气地点：中文变体、geocoding 解析与组合搜索', async () => {
  assert.deepEqual(weatherQueryVariants('杭州'), ['杭州', '杭州市', '杭州县', '杭州区']);
  assert.deepEqual(weatherQueryVariants('杭州市'), ['杭州市', '杭州', '杭州市', '杭州县', '杭州区'].filter((v, i, a) => a.indexOf(v) === i));
  assert.deepEqual(weatherQueryVariants('Tokyo'), ['Tokyo']);
  assert.deepEqual(weatherQueryVariants('  '), []);
  const json = {
    results: [
      { name: '杭州', latitude: 30.25, longitude: 120.17, admin1: '浙江', country: '中国', country_code: 'CN' },
      { name: '坏数据', latitude: 999, longitude: 0 },
      { name: '其余', latitude: 1, longitude: 1 },
    ],
  };
  const places = parseGeocoding(json);
  assert.equal(places.length, 2);
  assert.equal(places[0].detail, '浙江 · 中国');
  assert.equal(parseGeocoding({}).length, 0);
  // 并行查变体并去重：两个变体返回同一坐标只留一条；全部失败时抛错。
  const fetchOk = async () => ({ ok: true, json: async () => json });
  const merged = await searchWeatherPlaces('杭州', 'zh', fetchOk);
  assert.equal(merged.length, 2);
  await assert.rejects(() => searchWeatherPlaces('杭州', 'zh', async () => ({ ok: false, json: async () => ({}) })));
});

test('模板只含目录内组件；内置 Tab 可恢复默认，自定义 Tab 不受影响', () => {
  const ids = new Set(CARD_CATALOG.map((card) => card.id));
  for (const template of PAGE_TEMPLATES) assert.ok(template.cards.length && template.cards.every((id) => ids.has(id)), template.id);
  const trimmed = removeCard(defaultTabs(), 'home', 'todo');
  assert.ok(!trimmed.find((tab) => tab.id === 'home').cards.includes('todo'));
  assert.ok(resetTab(trimmed, 'home').find((tab) => tab.id === 'home').cards.includes('todo'));
  const created = addTab(trimmed, '自定义', ['quote']);
  assert.equal(resetTab(created.tabs, created.id), created.tabs);
  const fromTemplate = addTemplateTab(defaultTabs(), 'work', '我的工作');
  assert.deepEqual(fromTemplate.tabs.at(-1).cards, PAGE_TEMPLATES.find((entry) => entry.id === 'work').cards);
});

test('每个组件与模板在中英文字典中都有标题与说明', () => {
  for (const card of CARD_CATALOG) for (const dict of [zh, en]) {
    assert.ok(dict[card.titleKey], card.titleKey);
    assert.ok(dict[card.descKey], card.descKey);
  }
  for (const template of PAGE_TEMPLATES) for (const dict of [zh, en]) assert.ok(dict[`template.${template.id}`] && dict[`template.${template.id}.desc`], template.id);
  assert.deepEqual(Object.keys(zh).sort(), Object.keys(en).sort());
});

test('显示数量选项：默认值、夹取范围、随组件移除或跨页移动', () => {
  let tabs = defaultTabs();
  assert.equal(cardOptions(tabs[0], 'recent').limit, 5);
  assert.equal(cardOptions(tabs[0], 'todo').limit, 6);
  tabs = setCardOptions(tabs, 'home', 'recent', { limit: 2 });
  assert.equal(cardOptions(tabs[0], 'recent').limit, 2);
  tabs = setCardOptions(tabs, 'home', 'recent', { limit: 99 });
  assert.equal(cardOptions(tabs[0], 'recent').limit, 6);
  tabs = setCardOptions(tabs, 'home', 'recent', { limit: 3 });
  assert.equal(setCardOptions(tabs, 'home', 'weather', { limit: 3 }), tabs, '不在此页的组件不写选项');
  assert.equal(hasCardSettings('weather'), false);
  assert.equal(hasCardSettings('multiSearch'), true);
  const moved = moveCardToTab(tabs, 'home', 'focus', 'recent');
  assert.equal(cardOptions(moved.find((tab) => tab.id === 'focus'), 'recent').limit, 3, '选项随组件迁移');
  assert.ok(!moved.find((tab) => tab.id === 'home').cards.includes('recent'));
  assert.equal(moveCardToTab(moved, 'home', 'focus', 'todo').find((tab) => tab.id === 'focus').cards.filter((id) => id === 'todo').length, 1);
  assert.equal(moveCardToTab(tabs, 'home', 'explore', 'quote'), tabs, '源页没有该组件时不动');
  const explore = moveCardToTab(tabs, 'explore', 'home', 'quote');
  assert.ok(explore.find((tab) => tab.id === 'home').cards.includes('quote'));
  assert.equal(removeCard(tabs, 'home', 'recent')[0].options.recent, undefined);
  assert.equal(cardOptions(normalizeTabs([{ id: 'home', cards: ['recent'], options: { recent: { limit: -5 }, bogus: { limit: 1 } } }])[0], 'recent').limit, 1);
  assert.equal(normalizeTabs([{ id: 'home', cards: ['recent'], options: { recent: { limit: 'x' } } }])[0].options.recent?.limit, 5);
});

test('拖拽重排：组件前后落点、Tab 重排、主页固定在首位', () => {
  let tabs = defaultTabs();
  const order = () => tabs[0].cards.join(',');
  tabs = reorderCard(tabs, 'home', 'shortcuts', 'dailyFocus', false);
  assert.equal(order(), 'shortcuts,dailyFocus,todo,recent');
  tabs = reorderCard(tabs, 'home', 'shortcuts', 'recent', true);
  assert.equal(order(), 'dailyFocus,todo,recent,shortcuts');
  assert.equal(reorderCard(tabs, 'home', 'todo', 'todo'), tabs);
  assert.equal(reorderCard(tabs, 'home', 'todo', 'weather')[0].cards.join(','), order());
  const created = addTab(tabs, 'A');
  tabs = created.tabs;
  const ids = () => tabs.map((tab) => tab.id);
  tabs = reorderTab(tabs, created.id, 'notes', false);
  assert.deepEqual(ids().slice(0, 3), ['home', created.id, 'notes']);
  tabs = reorderTab(tabs, created.id, 'home', false);
  assert.equal(ids()[0], 'home', '不能放到主页之前');
  assert.equal(ids()[1], created.id, '落在主页前缘时贴到主页之后');
  assert.equal(reorderTab(tabs, 'home', 'notes', true), tabs, '主页不可被拖走');
  assert.equal(moveTab(tabs, 'home', 1), tabs);
  assert.deepEqual(normalizeTabs([{ id: 'x', name: 'X', cards: [] }, { id: 'home', cards: [] }]).map((tab) => tab.id), ['home', 'x']);
});

test('复制 Tab 保留布局与选项并紧随原页；空名称不创建', () => {
  let tabs = setCardOptions(defaultTabs(), 'home', 'recent', { limit: 2 });
  const copy = duplicateTab(tabs, 'home', ' 主页 副本 ');
  assert.equal(copy.tabs[1].id, copy.id);
  assert.equal(copy.tabs[1].name, '主页 副本');
  assert.deepEqual(copy.tabs[1].cards, tabs[0].cards);
  assert.equal(cardOptions(copy.tabs[1], 'recent').limit, 2);
  copy.tabs[1].options.recent.limit = 4;
  assert.equal(cardOptions(tabs[0], 'recent').limit, 2, '副本与原页互不影响');
  assert.equal(duplicateTab(tabs, 'home', '  ').id, null);
  assert.equal(duplicateTab(tabs, 'missing', 'x').id, null);
});

test('拖拽几何：落点前后与边缘自动滚动', () => {
  const rect = { left: 0, top: 100, width: 200, height: 100 };
  assert.equal(dropAfter('y', rect, { clientX: 10, clientY: 120 }), false);
  assert.equal(dropAfter('y', rect, { clientX: 10, clientY: 180 }), true);
  assert.equal(dropAfter('x', rect, { clientX: 150, clientY: 0 }), true);
  assert.equal(dropAfter('x', rect, { clientX: 50, clientY: 0 }), false);
  assert.ok(edgeScrollSpeed(105, 100, 500) < 0);
  assert.ok(edgeScrollSpeed(495, 100, 500) > 0);
  assert.equal(edgeScrollSpeed(300, 100, 500), 0);
  assert.equal(edgeScrollSpeed(50, 100, 500), 0);
});

test('快捷入口分组：旧数据迁移、默认组保底、卡片 ID 互转', () => {
  const groups = normalizeGroups(undefined, [{ id: 'u1', kind: 'url', url: 'https://a.com/', label: 'A' }, { id: 'bad', url: 'javascript:alert(1)' }]);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].id, DEFAULT_GROUP_ID);
  assert.deepEqual(groups[0].items.map((item) => item.url), ['https://a.com/']);
  assert.equal(groupCardId(DEFAULT_GROUP_ID), 'shortcuts');
  assert.equal(groupCardId('g1'), 'shortcut:g1');
  assert.equal(groupIdOf('shortcuts'), DEFAULT_GROUP_ID);
  assert.equal(groupIdOf('shortcut:g1'), 'g1');
  assert.equal(groupIdOf('shortcut:../x'), null);
  assert.equal(groupIdOf('todo'), null);
  const cleaned = normalizeGroups([{ id: 'g1', name: '  学习  ', items: [{ id: 'x', kind: 'url', url: 'ftp://x', label: 'n' }, { id: 'y', url: 'https://b.com', label: '', icon: 'nonsense' }, { id: 'y', url: 'https://c.com' }] }, { id: 'g1' }, { id: 'bad id' }]);
  assert.deepEqual(cleaned.map((group) => group.id), ['home-shortcuts', 'g1']);
  assert.equal(cleaned[1].name, '学习');
  assert.equal(cleaned[1].items.length, 1, '非法协议与重复 ID 被剔除');
  assert.equal(cleaned[1].items[0].label, 'b.com', '空名称回退到域名');
  assert.equal(cleaned[1].items[0].icon, 'favicon', '非法图标回退');
  assert.equal(cardTitle('shortcut:g1', (key) => key, cleaned), '学习');
  assert.equal(cardTitle('shortcuts', (key) => key, cleaned), 'card.shortcuts');
  assert.equal(cardTitle('todo', (key) => key, cleaned), 'card.todo');
});

test('快捷入口增删改排序：非法网址被拒，默认组不可删，无变化返回原数组', () => {
  let groups = normalizeGroups([], []);
  assert.equal(addItem(groups, DEFAULT_GROUP_ID, { label: 'x', url: 'not a url' }), null);
  assert.equal(addItem(groups, 'missing', { label: 'x', url: 'https://a.com' }), null);
  const a = addItem(groups, DEFAULT_GROUP_ID, { label: ' A ', url: 'https://a.com', icon: 'book' }); groups = a.groups;
  const b = addItem(groups, DEFAULT_GROUP_ID, { label: '', url: 'https://b.com' }); groups = b.groups;
  const c = addItem(groups, DEFAULT_GROUP_ID, { label: 'C', url: 'https://c.com' }); groups = c.groups;
  const names = () => groups[0].items.map((item) => item.label).join(',');
  assert.equal(names(), 'A,b.com,C');
  groups = moveItem(groups, DEFAULT_GROUP_ID, c.id, -1);
  assert.equal(names(), 'A,C,b.com');
  assert.equal(moveItem(groups, DEFAULT_GROUP_ID, a.id, -1), groups);
  groups = reorderItem(groups, DEFAULT_GROUP_ID, a.id, b.id, true);
  assert.equal(names(), 'C,b.com,A');
  assert.equal(reorderItem(groups, DEFAULT_GROUP_ID, a.id, a.id), groups);
  assert.equal(updateItem(groups, DEFAULT_GROUP_ID, a.id, { label: 'Z', url: '???' }), null);
  groups = updateItem(groups, DEFAULT_GROUP_ID, a.id, { label: 'Z', url: 'https://z.com', icon: 'zap' });
  assert.equal(groups[0].items.find((item) => item.id === a.id).icon, 'zap');
  groups = removeItem(groups, DEFAULT_GROUP_ID, a.id);
  assert.equal(names(), 'C,b.com');
  assert.equal(removeItem(groups, DEFAULT_GROUP_ID, 'nope'), groups);
  const created = addGroup(groups, '  学习  ');
  assert.equal(created.groups.at(-1).name, '学习');
  assert.equal(addGroup(groups, '   ').id, null);
  assert.equal(renameGroup(created.groups, created.id, '工具').at(-1).name, '工具');
  assert.equal(renameGroup(created.groups, created.id, ' '), created.groups);
  assert.equal(removeGroup(created.groups, DEFAULT_GROUP_ID), created.groups);
  assert.equal(removeGroup(created.groups, created.id).length, 1);
});

test('书签解析：只取 http(s)、去重、解码实体、上限 50，不执行脚本链接', () => {
  const html = `<!DOCTYPE NETSCAPE-Bookmark-file-1><DL><p>
    <DT><A HREF="https://example.com/a?x=1&amp;y=2" ADD_DATE="1">Example &amp; <b>Co</b></A>
    <DT><A HREF='https://example.com/a?x=1&y=2'>duplicate</A>
    <DT><a href=https://bare.org/ >  Bare   Name </a>
    <DT><A HREF="javascript:alert(1)">evil</A>
    <DT><A HREF="file:///etc/passwd">local</A>
    <DT><A HREF="https://user:pw@secret.com/">creds</A>
    <DT><A HREF="https://emoji.dev/">&#x1F600; &#128512;</A>
    <DT><A HREF="https://blank.dev/"></A></DL>`;
  const found = parseBookmarks(html);
  assert.deepEqual(found.map((item) => item.url), ['https://example.com/a?x=1&y=2', 'https://bare.org/', 'https://emoji.dev/', 'https://blank.dev/']);
  assert.equal(found[0].name, 'Example & Co');
  assert.equal(found[1].name, 'Bare Name');
  assert.equal(found[2].name, '😀 😀');
  assert.equal(found[3].name, 'blank.dev');
  const many = Array.from({ length: 80 }, (_, i) => `<A HREF="https://site${i}.com/">s${i}</A>`).join('');
  assert.equal(parseBookmarks(many).length, 50);
  assert.equal(decodeEntities('&amp;lt; &unknown; &#0; &#x110000;'), '&lt; &unknown; &#0; &#x110000;');
  const items = bookmarkItems(found);
  assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  assert.ok(items.every((item) => item.kind === 'url' && item.icon === 'favicon'));
});

test('分组卡片可进入布局：新增、模板外的 shortcut:<id> 被接受，非法 ID 被丢弃，可跨页移动', () => {
  let tabs = addCard(defaultTabs(), 'notes', 'shortcut:study');
  assert.ok(tabs.find((tab) => tab.id === 'notes').cards.includes('shortcut:study'));
  assert.equal(addCard(tabs, 'notes', 'shortcut:../x'), tabs);
  const moved = moveCardToTab(tabs, 'notes', 'home', 'shortcut:study');
  assert.ok(moved.find((tab) => tab.id === 'home').cards.includes('shortcut:study'));
  const normalized = normalizeTabs([{ id: 'home', cards: ['shortcut:ok', 'shortcut:a b', 'shortcuts'] }]);
  assert.deepEqual(normalized[0].cards, ['shortcut:ok', 'shortcuts']);
});

test('书签解析对未闭合标签保持线性：2 MB 病态输入在合理时间内返回', () => {
  const evil = '<a href=x>'.repeat(200_000);
  const started = performance.now();
  assert.deepEqual(parseBookmarks(evil), []);
  assert.ok(performance.now() - started < 4000, '不应出现平方级耗时');
  const longName = `<a href="https://slow.dev/">${'x'.repeat(5000)}</a>`;
  assert.equal(parseBookmarks(longName)[0].name, 'slow.dev', '超长标题回退到域名');
  assert.equal(parseBookmarks('<A HREF="https://nested.dev/"><b>Bold</b> text</A>')[0].name, 'Bold text');
});

test('masonry 行数按行高+间距换算，不能直接把卡片高度当行数', () => {
  const ROW = 1;
  const GAP = 14;
  const rendered = (span) => span * ROW + (span - 1) * GAP;
  assert.equal(masonrySpan(0), 1);
  assert.equal(masonrySpan(-5), 1);
  // 176px 高的卡片应跨 13 行（13 + 12*14 = 181px），而不是 191 行（约 2851px）。
  assert.equal(masonrySpan(176), 13);
  for (const height of [1, 24, 100, 148, 176, 500, 1200]) {
    const span = masonrySpan(height);
    assert.ok(rendered(span) >= height, `${height}px 必须放得下（${span} 行 = ${rendered(span)}px）`);
    if (span > 1) assert.ok(rendered(span - 1) < height, `${span} 行应是容纳 ${height}px 的最小行数`);
  }
});
