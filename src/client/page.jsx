/**
 * 起点页主页面：壁纸背景、问候与时间、会话搜索、页签与卡片网格、设置弹层。
 */
import React from 'react';
import { curatedPhotos, dailyIndex, dayKey, sizedUrl, targetWidth } from './data.js';
import {
  AmbientCard,
  CountdownCard,
  DailyFocusCard,
  DailyQuestionCard,
  FocusCard,
  HabitCard,
  HeatmapCard,
  MultiSearchCard,
  ProgressCard,
  QuickNoteCard,
  QuoteCard,
  RecentCard,
  ScratchpadCard,
  ShortcutsCard,
  TodoCard,
  WeatherCard,
  WorldClockCard,
  useNow,
} from './cards.jsx';
import { IconFolder, IconImage, IconPlus, IconSearch, IconSettings } from './icons.jsx';

const { useEffect, useMemo, useRef, useState } = React;

/** 页签 → 卡片编排。 */
const TABS = [
  { id: 'home', labelKey: 'tabs.home', cards: ['dailyFocus', 'todo', 'recent', 'shortcuts'] },
  { id: 'notes', labelKey: 'tabs.notes', cards: ['quickNote', 'scratchpad', 'dailyQuestion', 'heatmap'] },
  { id: 'focus', labelKey: 'tabs.focus', cards: ['focus', 'habit', 'ambient', 'progress', 'worldclock'] },
  { id: 'explore', labelKey: 'tabs.explore', cards: ['quote', 'multiSearch', 'weather', 'countdown'] },
];

const CARD_META = {
  todo: { titleKey: 'card.todo' },
  recent: { titleKey: 'card.recent' },
  shortcuts: { titleKey: 'card.shortcuts' },
  focus: { titleKey: 'card.focus' },
  progress: { titleKey: 'card.progress' },
  worldclock: { titleKey: 'card.worldclock' },
  quote: { titleKey: 'card.quote' },
  weather: { titleKey: 'card.weather' },
  dailyFocus: { titleKey: 'card.dailyFocus' },
  quickNote: { titleKey: 'card.quickNote' },
  scratchpad: { titleKey: 'card.scratchpad' },
  habit: { titleKey: 'card.habit' },
  countdown: { titleKey: 'card.countdown' },
  dailyQuestion: { titleKey: 'card.dailyQuestion' },
  multiSearch: { titleKey: 'card.multiSearch' },
  heatmap: { titleKey: 'card.heatmap' },
  ambient: { titleKey: 'card.ambient' },
};

/** 订阅外部 store（useSyncExternalStore 薄封装）。 */
function useStore(store) {
  return React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}

/** 当前语言（zh / en）。 */
function langOf(t) {
  return t('date.weekdays').includes('一') ? 'zh' : 'en';
}

/** 问候语按时段。 */
function greetingKey(hour) {
  if (hour < 12) return 'hero.greeting.morning';
  if (hour < 18) return 'hero.greeting.afternoon';
  return 'hero.greeting.evening';
}

/** 顶部时钟行：HH:MM · 日期。 */
function ClockLine({ t, now }) {
  const date = new Date(now);
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const weekdays = t('date.weekdays').split(' ').filter(Boolean);
  const weekday = weekdays[(date.getDay() + 6) % 7] ?? '';
  const formatted = t('date.format', { month: date.getMonth() + 1, day: date.getDate(), weekday }).replace(/\{(\w+)\}/g, '');
  return (
    <div className="qh-clock">
      {`${hh}:${mm} · ${formatted} · ${t(greetingKey(date.getHours()))}`}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 壁纸
 * ------------------------------------------------------------------ */

/** 按模式选图：daily 稳定按天，gradient 不选。open 模式由 override 承载（挂载/切换时随机一次）。 */
function pickDaily(state, photos) {
  return photos[dailyIndex(dayKey(), photos.length, state.wallpaperShift)];
}

function pickRandom(photos, exceptId) {
  const pool = photos.filter((entry) => entry.id !== exceptId);
  return pool[Math.floor(Math.random() * pool.length)] ?? photos[0];
}

function Wallpaper({ state, setState, t }) {
  const photos = useMemo(() => curatedPhotos(), []);
  const useGradient = state.wallpaperMode === 'gradient';
  // override 只在「换一张」、open 模式与加载失败递进时设置；daily 模式默认按天推导。
  const [override, setOverride] = useState(() => (state.wallpaperMode === 'open' ? pickRandom(photos, null) : null));
  const photo = useGradient ? null : (override ?? pickDaily(state, photos));
  const [loaded, setLoaded] = useState(false);

  // 切到 open 模式时随机一张；切回 daily 时回到按天推导。
  useEffect(() => {
    if (state.wallpaperMode === 'open') setOverride((current) => current ?? pickRandom(photos, null));
    else setOverride(null);
  }, [state.wallpaperMode, photos]);

  // 预加载图片，成功才挂载 <img>，失败停在渐变。
  useEffect(() => {
    if (useGradient || !photo) {
      setLoaded(false);
      return;
    }
    let cancelled = false;
    setLoaded(false);
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.onerror = () => {
      if (cancelled) return;
      // 这张图加载失败：换到下一张，不打扰用户。
      const at = photos.findIndex((entry) => entry.id === photo?.id);
      setOverride(photos[(at + 1 + photos.length) % photos.length]);
    };
    img.src = sizedUrl(photo, targetWidth(globalThis.innerWidth || 1600, globalThis.devicePixelRatio || 1));
    return () => {
      cancelled = true;
    };
  }, [photo, useGradient, photos]);

  const nextPhoto = () => {
    if (state.wallpaperMode === 'daily') {
      setState({ wallpaperShift: (state.wallpaperShift + 1) % photos.length });
      setOverride(null);
    } else {
      setOverride((current) => pickRandom(photos, current?.id ?? photo?.id));
    }
  };

  return (
    <>
      <div className="qh-bg">
        <div className="qh-bg-gradient" style={photo?.color ? { backgroundColor: photo.color } : undefined} />
        {!useGradient && photo && loaded ? (
          <img className="qh-bg-img qh-loaded" src={sizedUrl(photo, targetWidth(globalThis.innerWidth || 1600, globalThis.devicePixelRatio || 1))} alt="" />
        ) : null}
        <div className="qh-bg-scrim" />
      </div>
      <div className="qh-credit">
        {!useGradient && photo ? (
          <a href={photo.page} target="_blank" rel="noreferrer noopener">{`${photo.author} / Unsplash`}</a>
        ) : null}
        {!useGradient ? (
          <button type="button" className="qh-icon-btn" aria-label={t('wallpaper.next')} title={t('wallpaper.next')} onClick={nextPhoto}>
            <IconImage size={14} />
          </button>
        ) : null}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 会话搜索
 * ------------------------------------------------------------------ */

function SessionSearch({ t, services }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null); // null=未搜索 | {items} | 'loading' | 'error'
  const [active, setActive] = useState(0);
  const seqRef = useRef(0);

  useEffect(() => {
    const value = query.trim();
    if (!value || !services.sessions?.search) {
      setResults(null);
      return;
    }
    const seq = ++seqRef.current;
    setResults('loading');
    setActive(0);
    const controller = new AbortController();
    const timer = setTimeout(() => {
      services.sessions
        .search(value, controller.signal)
        .then((result) => {
          if (seqRef.current !== seq || controller.signal.aborted) return;
          setResults(result?.ok ? { items: (result.value?.items ?? []).slice(0, 8) } : 'error');
        })
        .catch(() => {
          if (seqRef.current === seq && !controller.signal.aborted) setResults('error');
        });
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, services.sessions]);

  const items = results && results !== 'loading' && results !== 'error' ? results.items : [];
  const open = (item) => {
    if (!item) return;
    services.uiWorkspace?.openSession?.(item.sessionId);
    setQuery('');
    setResults(null);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      setQuery('');
      setResults(null);
      return;
    }
    if (items.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((value) => (value + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((value) => (value - 1 + items.length) % items.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      open(items[active] ?? items[0]);
    }
  };

  const titleOf = (item) => {
    const row = services.sessions?.list?.getSnapshot?.().byId?.[item.sessionId];
    return row?.title?.trim() || item.snippet?.slice(0, 40) || t('recent.untitled');
  };

  return (
    <div className="qh-searchbox">
      <IconSearch size={15} />
      <input
        className="qh-search-input"
        value={query}
        placeholder={t('search.placeholder')}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={onKeyDown}
        aria-label={t('search.placeholder')}
      />
      {results !== null ? (
        <div className="qh-results" role="listbox">
          {results === 'loading' ? <div className="qh-results-status">{t('search.loading')}</div> : null}
          {results === 'error' ? <div className="qh-results-status">{t('search.error')}</div> : null}
          {results !== 'loading' && results !== 'error' && items.length === 0 ? (
            <div className="qh-results-status">{t('search.empty')}</div>
          ) : null}
          {items.map((item, index) => (
            <button
              key={`${item.sessionId}-${index}`}
              type="button"
              role="option"
              aria-selected={index === active}
              className={`qh-results-row${index === active ? ' qh-active' : ''}`}
              onMouseEnter={() => setActive(index)}
              onClick={() => open(item)}
            >
              <span className="qh-results-title">{titleOf(item)}</span>
              <span className="qh-results-snippet">{item.snippet}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 设置弹层
 * ------------------------------------------------------------------ */

function SettingsPopover({ t, state, setState, reset, tab, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClose();
    };
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const hidden = state.hidden;
  const toggleCard = (id) => setState({ hidden: { ...hidden, [id]: !hidden[id] } });
  const wallpaperModes = ['daily', 'open', 'gradient'];

  return (
    <div className="qh-popover" ref={ref}>
      <h3>{t('settings.title')}</h3>
      <div className="qh-popover-section">
        <span className="qh-popover-label">{t('settings.cards')}</span>
        {tab.cards.map((id) => (
          <label key={id} className="qh-check-row">
            <input type="checkbox" checked={!hidden[id]} onChange={() => toggleCard(id)} />
            {t(CARD_META[id].titleKey)}
          </label>
        ))}
      </div>
      <div className="qh-popover-section">
        <span className="qh-popover-label">{t('settings.wallpaper')}</span>
        <div className="qh-radio-row">
          {wallpaperModes.map((mode) => (
            <button
              key={mode}
              type="button"
              className={`qh-chip${state.wallpaperMode === mode ? ' qh-active' : ''}`}
              onClick={() => setState({ wallpaperMode: mode })}
            >
              {t(`settings.wallpaper.${mode}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="qh-popover-section">
        <span className="qh-popover-label">{t('settings.headline')}</span>
        <input
          type="text"
          value={state.headline}
          maxLength={60}
          placeholder={t('settings.headline.placeholder')}
          onChange={(event) => setState({ headline: event.target.value })}
        />
      </div>
      <div className="qh-popover-section">
        <button type="button" className="qh-link-btn" onClick={reset}>
          {t('settings.reset')}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 主页面
 * ------------------------------------------------------------------ */

export function HomePage({ t, store, services }) {
  const state = useStore(store);
  const setState = (patch) => store.set(patch);
  const now = useNow(30000);
  const lang = langOf(t);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const tab = TABS.find((entry) => entry.id === state.tab) ?? TABS[0];
  const visibleCards = tab.cards.filter((id) => !state.hidden[id]);

  const cardProps = { t, lang, state, setState, services };
  const renderCard = (id) => {
    switch (id) {
      case 'todo':
        return <TodoCard key={id} {...cardProps} />;
      case 'recent':
        return <RecentCard key={id} {...cardProps} />;
      case 'shortcuts':
        return <ShortcutsCard key={id} {...cardProps} />;
      case 'focus':
        return <FocusCard key={id} {...cardProps} />;
      case 'progress':
        return <ProgressCard key={id} {...cardProps} />;
      case 'worldclock':
        return <WorldClockCard key={id} {...cardProps} />;
      case 'quote':
        return <QuoteCard key={id} {...cardProps} />;
      case 'weather':
        return <WeatherCard key={id} {...cardProps} />;
      case 'dailyFocus':
        return <DailyFocusCard key={id} {...cardProps} />;
      case 'quickNote':
        return <QuickNoteCard key={id} {...cardProps} />;
      case 'scratchpad':
        return <ScratchpadCard key={id} {...cardProps} />;
      case 'habit':
        return <HabitCard key={id} {...cardProps} />;
      case 'countdown':
        return <CountdownCard key={id} {...cardProps} />;
      case 'dailyQuestion':
        return <DailyQuestionCard key={id} {...cardProps} />;
      case 'multiSearch':
        return <MultiSearchCard key={id} {...cardProps} />;
      case 'heatmap':
        return <HeatmapCard key={id} {...cardProps} />;
      case 'ambient':
        return <AmbientCard key={id} {...cardProps} />;
      default:
        return null;
    }
  };

  // 页面卸载前把待写入的存储落盘。
  useEffect(() => () => store.flush(), [store]);

  return (
    <div className="qh-root">
      <Wallpaper state={state} setState={setState} t={t} />
      <div className="qh-scroll">
        <div className="qh-main">
        <div className="qh-hero">
          <ClockLine t={t} now={now} />
          <h1 className="qh-headline">{state.headline.trim() || t('hero.headline')}</h1>
          <div className="qh-search-row">
            <SessionSearch t={t} services={services} />
            <button type="button" className="qh-action-btn qh-primary" onClick={() => services.uiWorkspace?.startSession?.()}>
              <IconPlus size={14} />
              {t('search.newSession')}
            </button>
            <button
              type="button"
              className="qh-action-btn"
              onClick={async () => {
                const path = await services.uiWorkspace?.pickDirectory?.();
                if (!path) return;
                try {
                  const workspace = await services.workspaces?.create?.({ path });
                  if (workspace?.workspaceId) await services.uiWorkspace?.openWorkspace?.(workspace.workspaceId);
                } catch {
                  /* 忽略：目录可能已注册 */
                }
              }}
            >
              <IconFolder size={14} />
              {t('search.openWorkspace')}
            </button>
          </div>
          <div className="qh-search-hint">{t('search.hint')}</div>
        </div>

        <div className="qh-tabs-row">
          {TABS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={`qh-tab${entry.id === tab.id ? ' qh-active' : ''}`}
              onClick={() => setState({ tab: entry.id })}
            >
              {t(entry.labelKey)}
            </button>
          ))}
          <span className="qh-tabs-spacer" />
          <span className="qh-gear-wrap">
            <button
              type="button"
              className="qh-icon-btn"
              aria-label={t('settings.title')}
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((value) => !value)}
            >
              <IconSettings size={14} />
            </button>
            {settingsOpen ? (
              <SettingsPopover
                t={t}
                state={state}
                setState={setState}
                reset={() => store.reset()}
                tab={tab}
                onClose={() => setSettingsOpen(false)}
              />
            ) : null}
          </span>
        </div>

        <div className="qh-grid">{visibleCards.map(renderCard)}</div>
        </div>
      </div>
    </div>
  );
}
