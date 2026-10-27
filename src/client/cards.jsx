/**
 * 起点页的卡片：今日待办、最近会话、常用入口、专注计时、时间进度、世界时钟、
 * 每日一句、天气，以及今日重点、快速记录、便签、习惯打卡、倒计时、
 * 每日一问、多站搜索、会话活动热力图与专注白噪音。
 */
import React from 'react';
import {
  BUILTIN_QUOTES,
  DAILY_QUESTIONS,
  DEFAULT_ZONES,
  SEARCH_GROUPS,
  activityByDay,
  addFocusItem,
  addHabit,
  addQuickNote,
  addTodo,
  checkinHabit,
  clearDoneTodos,
  dailyIndex,
  dayKey,
  daysBetween,
  defaultSiteIds,
  discoveryUrl,
  ensureDailyFocus,
  faviconUrl,
  groupSites,
  heatIntensity,
  lastNDays,
  normalizeUrl,
  parseSearchTemplates,
  parseWeather,
  quickNotesMarkdown,
  relativeTime,
  removeTodo,
  searchWeatherPlaces,
  timeProgress,
  toggleTodo,
  uncheckHabit,
  weatherKind,
  weatherUrl,
  zonedTime,
} from './data.js';
import {
  IconArrowLeft,
  IconArrowRight,
  IconBook,
  IconCalendar,
  IconCheck,
  IconClock,
  IconClose,
  IconCloud,
  IconCloudFog,
  IconCloudLightning,
  IconCloudRain,
  IconCloudSnow,
  IconCloudSun,
  IconCopy,
  IconExternal,
  IconFlame,
  IconFolder,
  IconGauge,
  IconGlobe,
  IconGrid,
  IconHelpCircle,
  IconHome,
  IconHourglass,
  IconLink,
  IconList,
  IconMessage,
  IconMore,
  IconNotebook,
  IconPause,
  IconPen,
  IconPlay,
  IconPlus,
  IconQuote,
  IconRefresh,
  IconSearch,
  IconSun,
  IconTarget,
  IconTimer,
  IconTrash,
  IconWaves,
  IconZap,
} from './icons.jsx';
import { DEFAULT_GROUP_ID, FAVICON, moveItem, removeItem, reorderItem } from './shortcuts.js';
import { dropAfter } from './layout.js';

const { useEffect, useMemo, useRef, useState } = React;

/** 每分钟（或给定间隔）触发的当前时间 hook。 */
export function useNow(intervalMs = 30000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);
  return now;
}

/** 由页面注入：拖拽手柄与 ⋯ 菜单（卡片头部两端）、是否布置模式，以及卡片内需要的页面级菜单/对话框/可撤销提交。 */
export const CardChromeContext = React.createContext(null);

/** 卡片骨架：头部图标 + 标题 + 计数 + 头部动作。 */
export function Card({ icon: Icon, title, count, actions, children, sourceId }) {
  const chrome = React.useContext(CardChromeContext);
  return (
    <section className="qh-card" data-source={sourceId}>
      <header className="qh-card-head">
        {chrome?.handle}
        <Icon size={15} />
        <span className="qh-card-title">{title}</span>
        {count ? <span className="qh-card-count">{count}</span> : null}
        {actions}
        {chrome?.menu}
      </header>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 今日待办
 * ------------------------------------------------------------------ */

export function TodoCard({ t, state, setState, limit = 6 }) {
  const [draft, setDraft] = useState('');
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef(null);
  const todos = state.todos;
  const open = todos.filter((todo) => !todo.done).length;

  const submit = () => {
    const next = addTodo(todos, draft);
    if (next === todos) return;
    setState({ todos: next });
    // 新待办追加在末尾；数量限制会把它藏起来，所以添加后展开全部。
    setShowAll(true);
    setDraft('');
    inputRef.current?.focus();
  };

  return (
    <Card icon={IconList} title={t('card.todo')} count={open > 0 ? t('todo.remaining', { count: open }) : ''}>
      <form
        className="qh-todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <input
          ref={inputRef}
          className="qh-todo-input"
          value={draft}
          placeholder={t('todo.placeholder')}
          maxLength={200}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="qh-todo-add" aria-label={t('shortcuts.confirm')}>
          <IconPlus size={15} />
        </button>
      </form>
      {todos.length === 0 ? <div className="qh-card-empty">{t('todo.empty')}</div> : null}
      <div className="qh-todo-list">
        {(showAll ? todos : todos.slice(0, limit)).map((todo) => (
          <div key={todo.id} className={`qh-todo-item${todo.done ? ' qh-done' : ''}`}>
            <button
              type="button"
              className="qh-todo-check"
              aria-pressed={todo.done}
              onClick={() => setState({ todos: toggleTodo(todos, todo.id) })}
            >
              <IconCheck size={11} strokeWidth={2.6} />
            </button>
            <span className="qh-todo-text">{todo.text}</span>
            <button
              type="button"
              className="qh-todo-del"
              aria-label={t('action.remove', { name: todo.text })}
              onClick={() => setState({ todos: removeTodo(todos, todo.id) })}
            >
              <IconClose size={12} />
            </button>
          </div>
        ))}
      </div>
      {todos.length > 0 ? (
        <footer className="qh-card-foot">
          <span>{open === 0 ? t('todo.allDone') : t('todo.remaining', { count: open })}</span>
          <span style={{ flex: 1 }} />
          {todos.length > limit ? (
            <button type="button" className="qh-link-btn" aria-expanded={showAll} onClick={() => setShowAll((value) => !value)}>
              {showAll ? t('quickNote.showLess') : t('quickNote.showAll', { count: todos.length })}
            </button>
          ) : null}
          {todos.some((todo) => todo.done) ? (
            <button type="button" className="qh-link-btn" onClick={() => setState({ todos: clearDoneTodos(todos) })}>
              {t('todo.clearDone')}
            </button>
          ) : null}
        </footer>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 最近会话
 * ------------------------------------------------------------------ */

function timeLabel(t, updatedAt, now) {
  const { unit, n } = relativeTime(updatedAt, now);
  if (unit === 'justNow') return t('recent.justNow');
  if (unit === 'minutes') return t('recent.minutes', { n });
  if (unit === 'hours') return t('recent.hours', { n });
  if (unit === 'days') return t('recent.days', { n });
  const date = new Date(updatedAt);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

/** 最近会话：排除空白与已归档，按更新时间倒序取前 limit 条。 */
export function recentSessions(list, archived = [], limit = 5) {
  if (!list?.ids) return [];
  const archivedSet = new Set(archived);
  return list.ids
    .map((id) => list.byId[id])
    .filter((row) => row && !row.blank && !archivedSet.has(row.id))
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
    .slice(0, limit);
}

export function RecentCard({ t, services, limit = 5 }) {
  const now = useNow(30000);
  const listSource = services.sessions?.list;
  const list = useExternalStore(
    listSource ? (fn) => listSource.subscribe(fn) : null,
    listSource ? () => listSource.getSnapshot() : () => null,
  );
  const archived = services.workspaces?.list?.getSnapshot?.().archivedSessionIds ?? [];

  const items = useMemo(() => recentSessions(list, archived, limit), [list, archived, limit]);

  const open = (id) => services.uiWorkspace?.openSession?.(id);

  return (
    <Card icon={IconMessage} title={t('card.recent')}>
      {items.length === 0 ? (
        <>
          <div className="qh-card-empty">{t('recent.empty')}</div>
          <div>
            <button type="button" className="qh-btn qh-accent" onClick={() => services.uiWorkspace?.startSession?.()}>
              {t('recent.new')}
            </button>
          </div>
        </>
      ) : (
        <div>
          {items.map((row) => (
            <button key={row.id} type="button" className="qh-session-row" onClick={() => open(row.id)}>
              <IconMessage size={14} />
              <span className="qh-session-title">{row.title?.trim() || t('recent.untitled')}</span>
              <span className="qh-session-time">{timeLabel(t, row.updatedAt ?? 0, now)}</span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}

/** useSyncExternalStore 的薄封装：源缺失时返回 fallback。 */
function useExternalStore(subscribe, getSnapshot) {
  return React.useSyncExternalStore(
    subscribe ?? (() => () => {}),
    getSnapshot,
    getSnapshot,
  );
}

/* ------------------------------------------------------------------ *
 * 常用入口
 * ------------------------------------------------------------------ */

export const TILE_ICONS = {
  link: IconLink, globe: IconGlobe, folder: IconFolder, book: IconBook, home: IconHome, pen: IconPen, notebook: IconNotebook,
  target: IconTarget, flame: IconFlame, zap: IconZap, calendar: IconCalendar, sun: IconSun,
};

function TileIcon({ item }) {
  const [failed, setFailed] = useState(false);
  if (item.kind === 'session') return <IconPlus size={18} />;
  if (item.kind === 'workspace') return <IconFolder size={18} />;
  const Custom = item.icon && item.icon !== FAVICON ? TILE_ICONS[item.icon] : null;
  if (Custom) return <Custom size={18} />;
  const icon = !failed && item.url ? faviconUrl(item.url) : null;
  if (icon) {
    return <img src={icon} alt="" loading="lazy" onError={() => setFailed(true)} />;
  }
  return <IconGlobe size={18} />;
}

/**
 * 快捷入口分组卡片。默认组前置「新会话 / 打开工作区」两个内置入口；
 * 条目的增改排删通过页面级对话框与菜单完成（由 CardChromeContext 提供），布置模式下可拖动排序。
 */
export function ShortcutGroupCard({ t, state, setState, services, groupId = DEFAULT_GROUP_ID }) {
  const chrome = React.useContext(CardChromeContext);
  const group = state.shortcutGroups.find((entry) => entry.id === groupId);
  const dragging = useRef(null);
  const [marker, setMarker] = useState(null);
  if (!group) return null;

  const builtins = groupId === DEFAULT_GROUP_ID ? [
    { id: '__new', kind: 'session', label: t('shortcuts.newSession'), run: () => services.uiWorkspace?.startSession?.() },
    {
      id: '__workspace',
      kind: 'workspace',
      label: t('shortcuts.openWorkspace'),
      run: async () => {
        const path = await services.uiWorkspace?.pickDirectory?.();
        if (!path) return;
        try {
          const workspace = await services.workspaces?.create?.({ path });
          if (workspace?.workspaceId) await services.uiWorkspace?.openWorkspace?.(workspace.workspaceId);
        } catch {
          /* 目录已注册或不可用时静默，用户可在侧栏里找到它 */
        }
      },
    },
  ] : [];
  const custom = group.items.map((item) => ({ ...item, run: () => globalThis.open(item.url, '_blank', 'noopener') }));
  const update = (groups) => setState({ shortcutGroups: groups });

  const itemMenu = (event, item) => {
    const index = group.items.findIndex((entry) => entry.id === item.id);
    chrome?.openMenu?.(event, [
      { label: t('shortcuts.edit'), icon: IconPen, onSelect: () => chrome.openDialog({ type: 'shortcut', groupId, itemId: item.id }) },
      { label: t('layout.earlier'), icon: IconArrowLeft, disabled: index === 0, onSelect: () => update(moveItem(state.shortcutGroups, groupId, item.id, -1)) },
      { label: t('layout.later'), icon: IconArrowRight, disabled: index === group.items.length - 1, onSelect: () => update(moveItem(state.shortcutGroups, groupId, item.id, 1)) },
      { separator: true },
      { label: t('layout.remove'), icon: IconTrash, danger: true, onSelect: () => chrome.commit({ shortcutGroups: removeItem(state.shortcutGroups, groupId, item.id) }, t('toast.removed', { name: item.label })) },
    ]);
  };

  const dragProps = (item) => (chrome?.editing ? {
    draggable: true,
    onDragStart: (event) => { dragging.current = item.id; event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('application/x-qiaomu-home-shortcut', item.id); },
    onDragEnd: () => { dragging.current = null; setMarker(null); },
    onDragOver: (event) => {
      if (!dragging.current || dragging.current === item.id) return;
      event.preventDefault();
      const side = dropAfter('x', event.currentTarget.getBoundingClientRect(), event) ? 'after' : 'before';
      setMarker((current) => (current?.id === item.id && current.side === side ? current : { id: item.id, side }));
    },
    onDragLeave: (event) => { if (!event.currentTarget.contains(event.relatedTarget)) setMarker((current) => (current?.id === item.id ? null : current)); },
    onDrop: (event) => {
      if (!dragging.current || dragging.current === item.id) return;
      event.preventDefault();
      event.stopPropagation();
      const after = dropAfter('x', event.currentTarget.getBoundingClientRect(), event);
      const from = dragging.current;
      dragging.current = null;
      setMarker(null);
      update(reorderItem(state.shortcutGroups, groupId, from, item.id, after));
    },
  } : {});

  return (
    <Card
      icon={IconLink}
      title={group.name || t('card.shortcuts')}
      actions={
        <button type="button" className="qh-icon-btn" style={{ width: 24, height: 24 }} aria-label={t('shortcuts.add')} onClick={() => chrome?.openDialog?.({ type: 'shortcut', groupId })}>
          <IconPlus size={13} />
        </button>
      }
    >
      <div className="qh-tiles">
        {[...builtins, ...custom].map((item) => (
          <span
            key={item.id}
            className="qh-tile-wrap"
            {...(item.kind === 'url' ? dragProps(item) : {})}
            {...(marker?.id === item.id ? { 'data-drop-marker': '', 'data-drop-axis': 'x', 'data-drop-side': marker.side } : {})}
            onContextMenu={item.kind === 'url' ? (event) => { event.preventDefault(); itemMenu(event, item); } : undefined}
          >
            <button type="button" className="qh-tile" onClick={item.run} title={item.url || item.label}>
              <span className="qh-tile-icon"><TileIcon item={item} /></span>
              <span className="qh-tile-label">{item.label}</span>
            </button>
            {item.kind === 'url' ? (
              <button type="button" className="qh-tile-more" aria-label={t('shortcuts.menuFor', { name: item.label })} aria-haspopup="menu" onClick={(event) => itemMenu(event, item)}>
                <IconMore size={12} />
              </button>
            ) : null}
          </span>
        ))}
      </div>
      {!custom.length ? <div className="qh-card-empty">{t('shortcuts.empty')}</div> : null}
    </Card>
  );
}

/** 旧入口：默认组。 */
export function ShortcutsCard(props) {
  return <ShortcutGroupCard {...props} groupId={DEFAULT_GROUP_ID} />;
}

/* ------------------------------------------------------------------ *
 * 专注计时
 * ------------------------------------------------------------------ */

const FOCUS_PRESETS = [15, 25, 45, 60];
const DIAL_R = 52;
const DIAL_C = 2 * Math.PI * DIAL_R;

export function FocusCard({ t, state, setState }) {
  const now = useNow(500);
  const focus = state.focus;
  const running = focus.endAt > now;
  const remainingMs = running ? focus.endAt - now : focus.remainingMs;
  const totalMs = focus.minutes * 60000;
  const fraction = totalMs > 0 ? Math.min(1, Math.max(0, remainingMs / totalMs)) : 0;

  const mm = Math.floor(Math.max(0, remainingMs) / 60000);
  const ss = String(Math.floor((Math.max(0, remainingMs) % 60000) / 1000)).padStart(2, '0');

  // 计时到点：把 remainingMs 归零（只触发一次）。
  useEffect(() => {
    if (focus.endAt > 0 && focus.endAt <= now && focus.remainingMs !== 0) {
      setState({ focus: { ...focus, endAt: 0, remainingMs: 0 } });
    }
  }, [now, focus, setState]);

  const pick = (minutes) => {
    if (running) return;
    setState({ focus: { minutes, endAt: 0, remainingMs: minutes * 60000 } });
  };
  const start = () => setState({ focus: { ...focus, endAt: Date.now() + (focus.remainingMs || totalMs), remainingMs: focus.remainingMs || totalMs } });
  const pause = () => setState({ focus: { ...focus, endAt: 0, remainingMs: Math.max(0, focus.endAt - Date.now()) } });
  const reset = () => setState({ focus: { minutes: focus.minutes, endAt: 0, remainingMs: focus.minutes * 60000 } });

  const status = running ? t('focus.running') : focus.remainingMs === 0 ? t('focus.done') : focus.remainingMs < totalMs ? t('focus.paused') : t('focus.idle');

  return (
    <Card icon={IconTimer} title={t('card.focus')}>
      <div className="qh-focus">
        <div className="qh-focus-dial">
          <svg width="128" height="128" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="qh-focus-track" cx="60" cy="60" r={DIAL_R} />
            <circle
              className="qh-focus-arc"
              cx="60"
              cy="60"
              r={DIAL_R}
              transform="rotate(-90 60 60)"
              strokeDasharray={DIAL_C}
              strokeDashoffset={DIAL_C * (1 - fraction)}
            />
          </svg>
          <div className="qh-focus-center">
            <div className="qh-focus-clock">{`${mm}:${ss}`}</div>
            <div className="qh-focus-status">{status}</div>
          </div>
        </div>
        <div className="qh-focus-presets" role="group">
          {FOCUS_PRESETS.map((minutes) => (
            <button
              key={minutes}
              type="button"
              className={`qh-chip${focus.minutes === minutes ? ' qh-active' : ''}`}
              aria-pressed={focus.minutes === minutes}
              disabled={running}
              onClick={() => pick(minutes)}
            >
              {t('focus.minutes', { minutes })}
            </button>
          ))}
        </div>
        <div className="qh-focus-controls">
          {running ? (
            <button type="button" className="qh-btn" onClick={pause}>
              <IconPause size={12} /> {t('focus.pause')}
            </button>
          ) : (
            <button type="button" className="qh-btn qh-accent" onClick={start} disabled={focus.remainingMs === 0}>
              <IconPlay size={12} /> {focus.remainingMs < totalMs && focus.remainingMs > 0 ? t('focus.resume') : t('focus.start')}
            </button>
          )}
          <button type="button" className="qh-btn" onClick={reset}>
            <IconRefresh size={12} /> {t('focus.reset')}
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 时间进度
 * ------------------------------------------------------------------ */

export function ProgressCard({ t }) {
  const now = useNow(60000);
  const progress = timeProgress(new Date(now));
  const rows = [
    ['progress.today', progress.day],
    ['progress.week', progress.week],
    ['progress.month', progress.month],
    ['progress.year', progress.year],
  ];
  return (
    <Card icon={IconGauge} title={t('card.progress')}>
      <div className="qh-progress-rows">
        {rows.map(([key, value]) => (
          <div key={key} className="qh-progress-row">
            <span className="qh-progress-label">{t(key)}</span>
            <span className="qh-progress-bar">
              <span className="qh-progress-fill" style={{ width: `${(value * 100).toFixed(1)}%` }} />
            </span>
            <span className="qh-progress-value">{`${Math.floor(value * 100)}%`}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 世界时钟
 * ------------------------------------------------------------------ */

export function WorldClockCard({ t, lang }) {
  const now = useNow(30000);
  return (
    <Card icon={IconClock} title={t('card.worldclock')}>
      <div className="qh-clock-rows">
        {DEFAULT_ZONES.map((city) => {
          let value;
          try {
            value = zonedTime(new Date(now), city.zone);
          } catch {
            return null;
          }
          const offset = value.offset > 0 ? t('worldclock.tomorrow') : value.offset < 0 ? t('worldclock.yesterday') : '';
          return (
            <div key={city.zone} className="qh-clock-row">
              <span className="qh-clock-city">{lang === 'zh' ? city.label : city.labelEn}</span>
              <span className="qh-clock-offset">{offset}</span>
              <span className="qh-clock-time">{value.time}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 每日一句
 * ------------------------------------------------------------------ */

export function QuoteCard({ t, lang, state, setState }) {
  const quotes = BUILTIN_QUOTES[lang] ?? BUILTIN_QUOTES.en;
  const index = dailyIndex(dayKey(), quotes.length, state.quoteShift);
  return (
    <Card
      icon={IconQuote}
      title={t('card.quote')}
      actions={
        <button
          type="button"
          className="qh-icon-btn"
          style={{ width: 24, height: 24 }}
          aria-label={t('quote.another')}
          title={t('quote.another')}
          onClick={() => setState({ quoteShift: (state.quoteShift + 1) % quotes.length })}
        >
          <IconRefresh size={12} />
        </button>
      }
    >
      <p className="qh-quote-text">{quotes[index]}</p>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 天气
 * ------------------------------------------------------------------ */

const WEATHER_ICONS = {
  sun: IconSun,
  'cloud-sun': IconCloudSun,
  cloud: IconCloud,
  'cloud-fog': IconCloudFog,
  'cloud-drizzle': IconCloudRain,
  'cloud-rain': IconCloudRain,
  'cloud-snow': IconCloudSnow,
  'cloud-lightning': IconCloudLightning,
};

export function WeatherCard({ t, lang, state, setState }) {
  const place = state.weatherPlace ?? null;
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [nonce, setNonce] = useState(0);
  // 地点搜索：picking 打开搜索界面；query 防抖后走 Open-Meteo geocoding。
  const [picking, setPicking] = useState(false);
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState(null); // null=未搜索 | [] | 地点数组 | 'loading' | 'error'
  const seqRef = useRef(0);

  useEffect(() => {
    if (!place) {
      setWeather(null);
      setStatus('idle');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    fetch(weatherUrl(place))
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((json) => {
        if (cancelled) return;
        setWeather(parseWeather(json));
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [place?.latitude, place?.longitude, nonce]);

  useEffect(() => {
    const value = query.trim();
    if (!picking || !value) {
      setPlaces(null);
      return;
    }
    const seq = ++seqRef.current;
    setPlaces('loading');
    const timer = setTimeout(() => {
      searchWeatherPlaces(value, lang)
        .then((found) => {
          if (seqRef.current === seq) setPlaces(found);
        })
        .catch(() => {
          if (seqRef.current === seq) setPlaces('error');
        });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, picking, lang]);

  const pick = (entry) => {
    setState({ weatherPlace: entry });
    setPicking(false);
    setQuery('');
    setPlaces(null);
    setNonce((n) => n + 1);
  };

  const dayLabels = [t('weather.today'), t('weather.tomorrow'), t('weather.afterTomorrow')];
  const searchBox = (
    <div className="qh-weather-search">
      <input
        className="qh-todo-input"
        value={query}
        placeholder={t('weather.search')}
        aria-label={t('weather.search')}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setPicking(false);
          if (event.key === 'Enter' && Array.isArray(places) && places.length) {
            event.preventDefault();
            pick(places[0]);
          }
        }}
        autoFocus={picking && !place}
      />
      {places === 'loading' ? <div className="qh-card-empty">{t('weather.searching')}</div> : null}
      {places === 'error' ? <div className="qh-card-empty">{t('weather.searchError')}</div> : null}
      {Array.isArray(places) && places.length === 0 ? <div className="qh-card-empty">{t('weather.noResults')}</div> : null}
      {Array.isArray(places) && places.length ? (
        <div className="qh-weather-places" role="listbox" aria-label={t('weather.search')}>
          {places.map((entry) => (
            <button key={`${entry.name}:${entry.latitude.toFixed(3)}:${entry.longitude.toFixed(3)}`} type="button" role="option" aria-selected="false" className="qh-weather-place" onClick={() => pick(entry)}>
              <span className="qh-weather-place-name">{entry.name}</span>
              {entry.detail ? <span className="qh-weather-place-detail">{entry.detail}</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <Card
      icon={IconSun}
      title={t('card.weather')}
      actions={
        place ? (
          <button type="button" className="qh-link-btn" onClick={() => setPicking((value) => !value)}>
            {t('weather.change')}
          </button>
        ) : null
      }
    >
      {place ? (
        <div className="qh-weather-city">
          <span>{place.name}</span>
          {place.detail ? <span className="qh-weather-place-detail">{place.detail}</span> : null}
        </div>
      ) : null}
      {picking || !place ? searchBox : null}
      {!place && !picking ? <div className="qh-card-empty">{t('weather.choose')}</div> : null}
      {place && status === 'loading' ? <div className="qh-card-empty">{t('weather.loading')}</div> : null}
      {place && status === 'error' ? (
        <button type="button" className="qh-link-btn" onClick={() => setNonce((n) => n + 1)}>
          {t('weather.error')}
        </button>
      ) : null}
      {place && status === 'ready' && weather ? (
        <>
          <div className="qh-weather-now">
            <span className="qh-weather-icon">
              {React.createElement(WEATHER_ICONS[weatherKind(weather.current.code).icon] ?? IconCloud, { size: 30 })}
            </span>
            <span className="qh-weather-temp">{`${Math.round(weather.current.temperature)}°`}</span>
            <span className="qh-weather-meta">
              <span className="qh-weather-cond">{lang === 'zh' ? weatherKind(weather.current.code).zh : weatherKind(weather.current.code).en}</span>
              <span className="qh-weather-feels">{t('weather.feels', { value: Math.round(weather.current.feels) })}</span>
            </span>
          </div>
          <div className="qh-weather-days">
            {weather.days.map((day, index) => {
              const kind = weatherKind(day.code);
              const DayIcon = WEATHER_ICONS[kind.icon] ?? IconCloud;
              return (
                <div key={day.day} className="qh-weather-day">
                  <span className="qh-weather-day-label">{dayLabels[index] ?? day.day}</span>
                  <DayIcon size={15} />
                  <span className="qh-weather-day-temp">{`${Math.round(day.min)}° / ${Math.round(day.max)}°`}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 今日重点（最多三件，未完成结转明天）
 * ------------------------------------------------------------------ */

export function DailyFocusCard({ t, state, setState }) {
  const [draft, setDraft] = useState('');
  const today = dayKey();
  const focus = ensureDailyFocus(state.dailyFocus, today);
  // 跨天时把归一结果写回（只在内容真的变化时）。
  useEffect(() => {
    if (state.dailyFocus?.date !== today) setState({ dailyFocus: focus });
  }, [today]);

  const items = focus.items;
  const submit = () => {
    const next = addFocusItem(focus, draft);
    if (next === focus) return;
    setState({ dailyFocus: next });
    setDraft('');
  };

  return (
    <Card icon={IconTarget} title={t('card.dailyFocus')} count={`${items.filter((i) => i.done).length}/${items.length || 3}`}>
      {items.length < 3 ? (
        <form
          className="qh-todo-form"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <input
            className="qh-todo-input"
            value={draft}
            placeholder={t('dailyFocus.placeholder')}
            maxLength={120}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" className="qh-todo-add" aria-label={t('shortcuts.confirm')}>
            <IconPlus size={15} />
          </button>
        </form>
      ) : (
        <div className="qh-card-empty">{t('dailyFocus.full')}</div>
      )}
      {items.length === 0 ? <div className="qh-card-empty">{t('dailyFocus.empty')}</div> : null}
      <div className="qh-todo-list">
        {items.map((item) => (
          <div key={item.id} className={`qh-todo-item${item.done ? ' qh-done' : ''}`}>
            <button
              type="button"
              className="qh-todo-check"
              aria-pressed={item.done}
              onClick={() =>
                setState({
                  dailyFocus: { ...focus, items: items.map((entry) => (entry.id === item.id ? { ...entry, done: !entry.done } : entry)) },
                })
              }
            >
              <IconCheck size={11} strokeWidth={2.6} />
            </button>
            <span className="qh-todo-text">{item.text}</span>
            <button
              type="button"
              className="qh-todo-del"
              aria-label={t('action.remove', { name: item.text })}
              onClick={() => setState({ dailyFocus: { ...focus, items: items.filter((entry) => entry.id !== item.id) } })}
            >
              <IconClose size={12} />
            </button>
          </div>
        ))}
      </div>
      <footer className="qh-card-foot">{t('dailyFocus.hint')}</footer>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 快速记录
 * ------------------------------------------------------------------ */

export function QuickNoteCard({ t, state, setState, limit = 6 }) {
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const notes = state.quickNotes;

  const submit = () => {
    const next = addQuickNote(notes, draft);
    if (next === notes) return;
    setState({ quickNotes: next });
    setDraft('');
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(quickNotesMarkdown(notes));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 剪贴板不可用时静默 */
    }
  };

  return (
    <Card
      icon={IconZap}
      title={t('card.quickNote')}
      count={notes.length > 0 ? String(notes.length) : ''}
      actions={
        notes.length > 0 ? (
          <button type="button" className="qh-icon-btn" style={{ width: 24, height: 24 }} aria-label={t('quickNote.copy')} title={t('quickNote.copy')} onClick={copyAll}>
            <IconCopy size={12} />
          </button>
        ) : null
      }
    >
      <form
        className="qh-todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <input
          className="qh-todo-input"
          value={draft}
          placeholder={t('quickNote.placeholder')}
          maxLength={500}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="qh-todo-add" aria-label={t('shortcuts.confirm')}>
          <IconPlus size={15} />
        </button>
      </form>
      {notes.length === 0 ? <div className="qh-card-empty">{t('quickNote.empty')}</div> : null}
      <div className="qh-note-list">
        {(expanded ? notes : notes.slice(0, limit)).map((note) => {
          const date = new Date(note.time);
          const stamp = `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
          return (
            <div key={note.id} className="qh-note-row">
              <span className="qh-note-time">{stamp}</span>
              <span className="qh-note-text">{note.text}</span>
              <button
                type="button"
                className="qh-todo-del"
                aria-label={t('action.remove', { name: note.text })}
                onClick={() => setState({ quickNotes: notes.filter((entry) => entry.id !== note.id) })}
              >
                <IconClose size={12} />
              </button>
            </div>
          );
        })}
      </div>
      {notes.length > 0 ? (
        <footer className="qh-card-foot">
          <span>{copied ? t('quickNote.copied') : ''}</span>
          <span style={{ flex: 1 }} />
          {notes.length > limit ? (
            <button type="button" className="qh-link-btn" onClick={() => setExpanded((value) => !value)}>
              {expanded ? t('quickNote.showLess') : t('quickNote.showAll', { count: notes.length })}
            </button>
          ) : null}
          <button type="button" className="qh-link-btn" onClick={() => setState({ quickNotes: [] })}>
            {t('quickNote.clear')}
          </button>
        </footer>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 便签
 * ------------------------------------------------------------------ */

export function ScratchpadCard({ t, state, setState }) {
  return (
    <Card icon={IconNotebook} title={t('card.scratchpad')}>
      <textarea
        className="qh-scratchpad"
        value={state.scratchpad}
        placeholder={t('scratchpad.placeholder')}
        rows={6}
        onChange={(event) => setState({ scratchpad: event.target.value })}
      />
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 习惯打卡
 * ------------------------------------------------------------------ */

export function HabitCard({ t, state, setState }) {
  const [draft, setDraft] = useState('');
  const today = dayKey();
  const days = lastNDays(7);
  const habits = state.habits;
  const log = state.habitLog;

  const submit = () => {
    const next = addHabit(habits, draft);
    if (next === habits) return;
    setState({ habits: next });
    setDraft('');
  };

  return (
    <Card icon={IconFlame} title={t('card.habit')}>
      <form
        className="qh-todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <input className="qh-todo-input" value={draft} placeholder={t('habit.add')} maxLength={32} onChange={(event) => setDraft(event.target.value)} />
        <button type="submit" className="qh-todo-add" aria-label={t('shortcuts.confirm')}>
          <IconPlus size={15} />
        </button>
      </form>
      {habits.length === 0 ? <div className="qh-card-empty">{t('habit.empty')}</div> : null}
      {habits.length > 0 ? (
        <>
          <div className="qh-habit-grid-head">
            <span />
            {days.map((day) => (
              <span key={day} className={`qh-habit-day${day === today ? ' qh-today' : ''}`}>
                {Number(day.slice(8))}
              </span>
            ))}
            <span />
          </div>
          {habits.map((habit) => {
            const count = log[habit.id]?.[today] ?? 0;
            const reached = count >= habit.target;
            return (
              <div key={habit.id} className="qh-habit-row">
                <span className="qh-habit-name" title={habit.name}>
                  {habit.name}
                </span>
                {days.map((day) => {
                  const value = log[habit.id]?.[day] ?? 0;
                  return <span key={day} className={`qh-habit-dot${value >= habit.target ? ' qh-full' : value > 0 ? ' qh-part' : ''}`} />;
                })}
                <span className="qh-habit-actions">
                  <button
                    type="button"
                    className={`qh-habit-check${reached ? ' qh-done' : ''}`}
                    title={t('habit.today', { count, target: habit.target })}
                    onClick={() =>
                      setState({
                        habitLog: reached ? uncheckHabit(log, habit.id, today) : checkinHabit(log, habit.id, today, habit.target),
                      })
                    }
                  >
                    {reached ? <IconCheck size={10} strokeWidth={2.6} /> : <IconPlus size={10} strokeWidth={2.4} />}
                  </button>
                  <button
                    type="button"
                    className="qh-todo-del"
                    aria-label={t('action.remove', { name: habit.name })}
                    onClick={() => setState({ habits: habits.filter((entry) => entry.id !== habit.id) })}
                  >
                    <IconClose size={11} />
                  </button>
                </span>
              </div>
            );
          })}
        </>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 倒计时
 * ------------------------------------------------------------------ */

export function CountdownCard({ t, state, setState }) {
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState('');
  const [label, setLabel] = useState('');
  const configured = /^\d{4}-\d{2}-\d{2}$/.test(state.countdown.date);
  const diff = configured ? daysBetween(state.countdown.date, dayKey()) : null;

  const save = () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    setState({ countdown: { date, label: label.trim().slice(0, 30) } });
    setEditing(false);
  };

  return (
    <Card
      icon={IconHourglass}
      title={t('card.countdown')}
      actions={
        configured && !editing ? (
          <button type="button" className="qh-icon-btn" style={{ width: 24, height: 24 }} aria-label={t('countdown.edit')} onClick={() => { setDate(state.countdown.date); setLabel(state.countdown.label); setEditing(true); }}>
            <IconPen size={12} />
          </button>
        ) : null
      }
    >
      {!configured && !editing ? (
        <>
          <div className="qh-card-empty">{t('countdown.unset')}</div>
          <div>
            <button type="button" className="qh-btn qh-accent" onClick={() => { setDate(''); setLabel(''); setEditing(true); }}>
              {t('countdown.set')}
            </button>
          </div>
        </>
      ) : null}
      {editing ? (
        <form
          className="qh-shortcut-form"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label={t('countdown.set')} />
          <input value={label} placeholder={t('countdown.label')} maxLength={30} onChange={(event) => setLabel(event.target.value)} />
          <div className="qh-row">
            <button type="button" className="qh-btn" onClick={() => setEditing(false)}>
              {t('shortcuts.cancel')}
            </button>
            <button type="submit" className="qh-btn qh-accent">
              {t('shortcuts.confirm')}
            </button>
          </div>
        </form>
      ) : null}
      {configured && !editing && diff !== null ? (
        <div className="qh-countdown">
          <div className="qh-countdown-number">
            {diff === 0 ? t('countdown.today') : Math.abs(diff)}
            {diff !== 0 ? <span className="qh-countdown-unit">{t('countdown.days')}</span> : null}
          </div>
          <div className="qh-countdown-label">
            {state.countdown.label || state.countdown.date}
            {' · '}
            {diff === 0 ? state.countdown.date : diff > 0 ? t('countdown.left', { n: diff }) : t('countdown.passed', { n: -diff })}
          </div>
        </div>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 每日一问
 * ------------------------------------------------------------------ */

export function DailyQuestionCard({ t, lang, state, setState }) {
  const questions = DAILY_QUESTIONS[lang] ?? DAILY_QUESTIONS.en;
  const today = dayKey();
  const question = questions[dailyIndex(today, questions.length)];
  const answer = state.answers[today] ?? '';
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef(0);

  const onChange = (value) => {
    setState({ answers: { ...state.answers, [today]: value } });
    setSaved(false);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaved(true), 600);
  };

  return (
    <Card icon={IconHelpCircle} title={t('card.dailyQuestion')}>
      <p className="qh-quote-text">{question}</p>
      <textarea
        className="qh-scratchpad"
        value={answer}
        placeholder={t('dailyQuestion.placeholder')}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
      />
      <footer className="qh-card-foot">{saved && answer.trim() ? t('dailyQuestion.saved') : ''}</footer>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 多站搜索
 * ------------------------------------------------------------------ */

export function MultiSearchCard({ t, lang, state, setState, openAll = true }) {
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [templateError, setTemplateError] = useState(null);
  const custom = parseSearchTemplates(state.searchTemplates ?? '');
  const customSites = custom.ok ? custom.sites : [];

  /** 当前分组；每组记住自己的站点选择，未记住时用目录默认。 */
  const groupId = SEARCH_GROUPS.some((entry) => entry.id === state.searchGroup) ? state.searchGroup : SEARCH_GROUPS[0].id;
  const sites = groupSites(groupId, customSites);
  const siteIds = new Set(sites.map((entry) => entry.id));
  const saved = (state.searchEnginesByGroup ?? {})[groupId];
  const knownSaved = Array.isArray(saved) ? saved.filter((id) => siteIds.has(id)) : [];
  // 「多站搜索」组兼容旧版全局 searchEngines 选择。
  const legacy = groupId === SEARCH_GROUPS[0].id
    ? (Array.isArray(state.searchEngines) ? state.searchEngines : []).filter((id) => siteIds.has(id))
    : [];
  const selected = knownSaved.length ? knownSaved : legacy.length ? legacy : defaultSiteIds(groupId, customSites);
  // 按目录顺序排列被点亮的站点，「只打开第一个」时行为稳定可预期。
  const active = sites.filter((entry) => selected.includes(entry.id));

  const selectGroup = (id) => {
    if (id !== groupId) setState({ searchGroup: id });
  };
  const toggle = (id) => {
    const next = selected.includes(id) ? selected.filter((entry) => entry !== id) : [...selected, id];
    if (!next.length) return;
    setState({ searchEnginesByGroup: { ...(state.searchEnginesByGroup ?? {}), [groupId]: next } });
  };
  const search = () => {
    const value = query.trim();
    if (!value || !active.length) return;
    for (const site of openAll ? active : active.slice(0, 1)) globalThis.open(discoveryUrl(site, value), '_blank', 'noopener');
  };
  const saveTemplates = () => {
    const parsed = parseSearchTemplates(draft);
    if (!parsed.ok) {
      setTemplateError(t(parsed.error.key, parsed.error.params));
      return parsed;
    }
    setState({ searchTemplates: draft.trim() });
    setTemplateError(null);
    setEditing(false);
    setDraft('');
    return parsed;
  };

  return (
    <Card icon={IconSearch} title={t('card.multiSearch')}>
      <div className="qh-focus-presets" role="group" aria-label={t('multiSearch.groups')}>
        {SEARCH_GROUPS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`qh-chip${entry.id === groupId ? ' qh-active' : ''}`}
            aria-pressed={entry.id === groupId}
            onClick={() => selectGroup(entry.id)}
          >
            {lang === 'zh' ? entry.zh : entry.en}
          </button>
        ))}
      </div>
      <div className="qh-focus-presets" role="group" aria-label={t('multiSearch.sites')}>
        {sites.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`qh-chip${selected.includes(entry.id) ? ' qh-active' : ''}`}
            aria-pressed={selected.includes(entry.id)}
            onClick={() => toggle(entry.id)}
          >
            {lang === 'zh' ? entry.zh : entry.en}
          </button>
        ))}
      </div>
      <form
        className="qh-todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          search();
        }}
      >
        <input className="qh-todo-input" value={query} placeholder={t('multiSearch.placeholder')} onChange={(event) => setQuery(event.target.value)} />
        <button type="submit" className="qh-todo-add" aria-label={t('multiSearch.open')}>
          <IconSearch size={14} />
        </button>
      </form>
      {editing ? (
        <div className="qh-templates">
          <textarea
            className="qh-templates-input"
            value={draft}
            rows={3}
            placeholder={t('multiSearch.templatePlaceholder')}
            aria-label={t('multiSearch.templates')}
            onChange={(event) => setDraft(event.target.value)}
          />
          <div className="qh-card-foot">
            {templateError ? <span>{templateError}</span> : null}
            <button type="button" className="qh-link-btn" onClick={saveTemplates}>
              {t('shortcuts.confirm')}
            </button>
            <button type="button" className="qh-link-btn" onClick={() => { setEditing(false); setDraft(''); setTemplateError(null); }}>
              {t('shortcuts.cancel')}
            </button>
          </div>
        </div>
      ) : (
        <div className="qh-card-foot">
          <span>{openAll && active.length > 1 ? t('multiSearch.openAllHint', { count: active.length }) : t('multiSearch.openFirstHint', { name: lang === 'zh' ? active[0].zh : active[0].en })}</span>
          <button type="button" className="qh-link-btn" onClick={() => { setDraft(state.searchTemplates ?? ''); setEditing(true); }}>
            {t('multiSearch.templates')}
          </button>
        </div>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 会话活动热力图（近 10 周）
 * ------------------------------------------------------------------ */

export function HeatmapCard({ t, services }) {
  const listSource = services.sessions?.list;
  const list = useExternalStore(
    listSource ? (fn) => listSource.subscribe(fn) : null,
    listSource ? () => listSource.getSnapshot() : () => null,
  );

  const { days, counts, max } = useMemo(() => {
    const days = lastNDays(70);
    const counts = activityByDay(list?.byId);
    let max = 0;
    for (const value of counts.values()) max = Math.max(max, value);
    return { days, counts, max };
  }, [list]);

  const today = dayKey();

  return (
    <Card icon={IconGrid} title={t('card.heatmap')}>
      {max === 0 ? <div className="qh-card-empty">{t('heatmap.empty')}</div> : (
        <>
          <div className="qh-heatmap" role="img" aria-label={t('card.heatmap')}>
            {days.map((day) => {
              const count = counts.get(day) ?? 0;
              const level = heatIntensity(count, max);
              return <span key={day} className={`qh-heat qh-heat-${level}${day === today ? ' qh-today' : ''}`} title={`${day} · ${count}`} />;
            })}
          </div>
          <footer className="qh-card-foot">
            <span>{t('heatmap.less')}</span>
            <span className="qh-heat qh-heat-1" />
            <span className="qh-heat qh-heat-2" />
            <span className="qh-heat qh-heat-3" />
            <span className="qh-heat qh-heat-4" />
            <span>{t('heatmap.more')}</span>
          </footer>
        </>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * 专注白噪音（Web Audio 本地生成）
 * ------------------------------------------------------------------ */

const NOISE_KINDS = ['white', 'pink', 'brown'];

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
    if (kind === 'white') {
      data[i] = white * 0.5;
    } else if (kind === 'pink') {
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

export function AmbientCard({ t }) {
  const [kind, setKind] = useState('brown');
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
      /* 已停止 */
    }
    chain.audio.close().catch(() => {});
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

  return (
    <Card icon={IconWaves} title={t('card.ambient')}>
      <div className="qh-focus-presets" role="group">
        {NOISE_KINDS.map((entry) => (
          <button
            key={entry.id ?? entry}
            type="button"
            className={`qh-chip${entry === kind ? ' qh-active' : ''}`}
            aria-pressed={entry === kind}
            onClick={() => {
              setKind(entry);
              if (playing) play(entry);
            }}
          >
            {t(`ambient.${entry}`)}
          </button>
        ))}
      </div>
      <div className="qh-focus-controls" style={{ justifyContent: 'center' }}>
        {playing ? (
          <button type="button" className="qh-btn" onClick={stop}>
            <IconPause size={12} /> {t('ambient.stop')}
          </button>
        ) : (
          <button type="button" className="qh-btn qh-accent" onClick={() => play(kind)}>
            <IconPlay size={12} /> {t('ambient.play')}
          </button>
        )}
      </div>
    </Card>
  );
}
