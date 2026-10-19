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
  ShortcutGroupCard,
  TodoCard,
  WeatherCard,
  WorldClockCard,
  useNow,
} from './cards.jsx';
import { IconArrowDown, IconArrowLeft, IconArrowRight, IconArrowUp, IconCheck, IconCopy, IconFolder, IconGrid, IconGrip, IconImage, IconMinusCircle, IconMore, IconPanels, IconPen, IconPlus, IconRefresh, IconSearch, IconSettings, IconSliders, IconTrash } from './icons.jsx';
import { CardChromeContext } from './cards.jsx';
import { AppearanceDialog, CardSettingsDialog, ConfirmDialog, ImportBookmarksDialog, MoveCardDialog, NewTabDialog, PromptDialog, ShortcutDialog } from './dialogs.jsx';
import { DEFAULT_GROUP_ID, addGroup, addItem, bookmarkItems, groupCardId, groupIdOf, removeGroup, renameGroup, updateItem } from './shortcuts.js';
import { LibraryDialog } from './library.jsx';
import { attachMasonry } from './masonry.js';
import { ToastHost, useMenu, useToasts } from './ui.jsx';
import { defaultPreferences } from './store.js';
import {
  addCard, addTab, addTemplateTab, cardOptions, cardTitle, defaultTabs, dropAfter, duplicateTab, edgeScrollSpeed, hasCardSettings, moveCard, moveCardToTab, moveTab,
  removeCard, removeTab, renameTab, reorderCard, reorderTab, resetTab, setCardOptions, tabName,
} from './layout.js';

const { useEffect, useMemo, useRef, useState } = React;


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
  const [failedAll, setFailedAll] = useState(false);
  const failedIds = useRef(new Set());
  const photo = useGradient || failedAll ? null : (override ?? pickDaily(state, photos));
  const [loaded, setLoaded] = useState(false);

  // 切到 open 模式时随机一张；切回 daily 时回到按天推导。
  useEffect(() => {
    failedIds.current.clear();
    setFailedAll(false);
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
      // 尝试剩余壁纸一次；全部失败时保留渐变，避免请求循环。
      failedIds.current.add(photo.id);
      const at = photos.findIndex((entry) => entry.id === photo?.id);
      const next = [...photos.slice(at + 1), ...photos.slice(0, at)].find((entry) => !failedIds.current.has(entry.id));
      if (next) setOverride(next);
      else setFailedAll(true);
    };
    img.src = sizedUrl(photo, targetWidth(globalThis.innerWidth || 1600, globalThis.devicePixelRatio || 1));
    return () => {
      cancelled = true;
    };
  }, [photo, useGradient, photos]);

  const nextPhoto = () => {
    failedIds.current.clear();
    setFailedAll(false);
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
 * 主页面
 * ------------------------------------------------------------------ */

const CARD_RENDERERS = {
  todo: TodoCard, recent: RecentCard, shortcuts: ShortcutGroupCard, focus: FocusCard, progress: ProgressCard, worldclock: WorldClockCard,
  quote: QuoteCard, weather: WeatherCard, dailyFocus: DailyFocusCard, quickNote: QuickNoteCard, scratchpad: ScratchpadCard,
  habit: HabitCard, countdown: CountdownCard, dailyQuestion: DailyQuestionCard, multiSearch: MultiSearchCard, heatmap: HeatmapCard,
  ambient: AmbientCard,
};

export function HomePage({ t, store, services }) {
  const state = useStore(store);
  const setState = (patch) => store.set(patch);
  const now = useNow(30000);
  const lang = langOf(t);
  const [editing, setEditing] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [marker, setMarker] = useState(null);
  const [announce, setAnnounce] = useState('');
  const { menu, open: openMenu } = useMenu();
  const { toasts, push, dismiss } = useToasts();
  const drag = useRef(null);
  const scrollRef = useRef(null);
  const revealRef = useRef(null);
  const scrollTimer = useRef({ frame: 0, speed: 0 });

  const tabs = state.tabs;
  const tab = tabs.find((entry) => entry.id === state.tab) ?? tabs[0];
  /**
   * 关闭组件库等弹窗后，把刚添加的卡片滚进视野。必须等弹窗关闭、焦点回到按钮之后再滚：
   * 浏览器恢复焦点时会把触发按钮滚回顶部，过早滚动会被这次聚焦滚回抵消。
   * 卡片按固定顺序追加在页尾，不滚动的话看起来就像“添加后没有显示”。
   */
  const revealAddedCard = () => {
    const pending = revealRef.current;
    revealRef.current = null;
    if (!pending || pending.tabId !== state.tab) return;
    const scroll = scrollRef.current;
    const node = gridRef.current?.querySelector(`[data-card="${pending.cardId}"]`);
    if (!scroll || !node) return;
    const top = node.getBoundingClientRect().top - scroll.getBoundingClientRect().top + scroll.scrollTop - Math.max(24, scroll.clientHeight * 0.2);
    scroll.scrollTo({ top, behavior: 'smooth' });
  };
  const closeDialog = () => {
    setDialog(null);
    if (revealRef.current) setTimeout(revealAddedCard, 180);
  };

  /** 提交改动；带 message 时给出「撤销」——撤销回到提交前的页签，以及这次改动涉及的全部字段。 */
  const commit = (patch, message) => {
    const keys = new Set(['tabs', 'tab', ...Object.keys(patch)]);
    const before = Object.fromEntries([...keys].map((key) => [key, state[key]]));
    setState(patch);
    if (!message) return;
    // 撤销只回滚这次改动涉及的字段；若之后这些字段又被改过，整体回滚会吞掉新的修改，所以拒绝并说明。
    const after = store.getSnapshot();
    push(message, {
      label: t('toast.undo'),
      run: () => {
        const now = store.getSnapshot();
        // 切换选中的 Tab 不算改动，否则删除 Tab 后点一下别的标签就再也撤销不了。
        if ([...keys].some((key) => key !== 'tab' && now[key] !== after[key])) push(t('toast.undoStale'));
        else setState(before);
      },
    });
  };
  const select = (id, focus = false) => {
    setState({ tab: id });
    if (focus) requestAnimationFrame(() => scrollRef.current?.parentElement?.querySelector('[role="tab"][aria-selected="true"]')?.focus());
  };

  /* ---- Tab 操作 ---- */
  const createTab = (name, templateId) => {
    const created = templateId ? addTemplateTab(tabs, templateId, name) : addTab(tabs, name);
    if (!created.id) return;
    setState({ tabs: created.tabs, tab: created.id });
    // 空白页需要先放组件；模板页已经可用。
    setDialog(templateId ? null : { type: 'library', tabId: created.id });
  };
  const tabMenu = (event, id) => {
    event.preventDefault();
    const entry = tabs.find((item) => item.id === id);
    if (!entry) return;
    const name = tabName(entry, t);
    const index = tabs.indexOf(entry);
    const builtin = defaultTabs().some((entry) => entry.id === id);
    openMenu(event, [
      { label: t('library.title'), icon: IconGrid, onSelect: () => setDialog({ type: 'library', tabId: id }) },
      { label: t('pages.rename'), icon: IconPen, onSelect: () => setDialog({ type: 'rename', tabId: id }) },
      { label: t('pages.duplicate'), icon: IconCopy, onSelect: () => setDialog({ type: 'duplicate', tabId: id }) },
      { separator: true },
      { label: t('layout.earlier'), icon: IconArrowLeft, disabled: index <= 1, onSelect: () => setState({ tabs: moveTab(tabs, id, -1) }) },
      { label: t('layout.later'), icon: IconArrowRight, disabled: index < 1 || index === tabs.length - 1, onSelect: () => setState({ tabs: moveTab(tabs, id, 1) }) },
      ...(builtin ? [{ separator: true }, { label: t('settings.resetTab'), icon: IconRefresh, onSelect: () => commit({ tabs: resetTab(tabs, id) }, t('toast.reset', { name })) }] : []),
      { separator: true },
      { label: t('pages.delete'), icon: IconTrash, danger: true, disabled: id === 'home', onSelect: () => setDialog({ type: 'delete', tabId: id }) },
    ]);
  };
  const onTabKey = (event, index) => {
    const last = tabs.length - 1;
    let next;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;
    event.preventDefault();
    select(tabs[next].id, true);
  };

  /* ---- 组件操作 ---- */
  const cardName = (id) => cardTitle(id, t, state.shortcutGroups);
  const shift = (id, delta) => {
    const from = tab.cards.indexOf(id);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= tab.cards.length) return;
    setState({ tabs: moveCard(tabs, tab.id, id, delta) });
    setAnnounce(t('layout.movedAnnounce', { name: cardName(id), position: to + 1, total: tab.cards.length }));
  };
  /** Alt+↑/↓：键盘调整卡片顺序（手柄与 ⋯ 按钮共用）。 */
  const altMove = (event, id) => {
    if (!event.altKey || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return;
    event.preventDefault();
    shift(id, event.key === 'ArrowUp' ? -1 : 1);
  };
  const cardMenu = (event, id) => {
    const index = tab.cards.indexOf(id);
    openMenu(event, [
      ...(hasCardSettings(id) ? [{ label: t('cardSettings.open'), icon: IconSliders, onSelect: () => setDialog({ type: 'cardSettings', cardId: id }) }] : []),
      { label: t('layout.move'), icon: IconPanels, onSelect: () => setDialog({ type: 'moveCard', cardId: id }) },
      ...(groupIdOf(id) ? [{ label: t('shortcuts.renameGroup'), icon: IconPen, onSelect: () => setDialog({ type: 'renameGroup', groupId: groupIdOf(id) }) }] : []),
      { separator: true },
      { label: t('layout.earlier'), icon: IconArrowUp, disabled: index === 0, onSelect: () => shift(id, -1) },
      { label: t('layout.later'), icon: IconArrowDown, disabled: index === tab.cards.length - 1, onSelect: () => shift(id, 1) },
      { separator: true },
      { label: t('layout.remove'), icon: IconMinusCircle, danger: true, onSelect: () => commit({ tabs: removeCard(tabs, tab.id, id) }, t('toast.removed', { name: cardName(id) })) },
      ...(groupIdOf(id) && groupIdOf(id) !== DEFAULT_GROUP_ID ? [{ label: t('shortcuts.deleteGroup'), icon: IconTrash, danger: true, onSelect: () => setDialog({ type: 'deleteGroup', groupId: groupIdOf(id) }) }] : []),
    ]);
  };

  /* ---- 拖拽：标记线、自动滚动、落点重排 ---- */
  const stopScroll = () => {
    scrollTimer.current.speed = 0;
    cancelAnimationFrame(scrollTimer.current.frame);
    scrollTimer.current.frame = 0;
  };
  const endDrag = () => {
    drag.current = null;
    setMarker(null);
    stopScroll();
  };
  const autoScroll = (event) => {
    const box = scrollRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    scrollTimer.current.speed = edgeScrollSpeed(event.clientY, rect.top, rect.bottom);
    if (scrollTimer.current.frame || !scrollTimer.current.speed) return;
    const step = () => {
      scrollTimer.current.frame = 0;
      if (!scrollTimer.current.speed || !box.isConnected) return;
      box.scrollTop += scrollTimer.current.speed;
      scrollTimer.current.frame = requestAnimationFrame(step);
    };
    scrollTimer.current.frame = requestAnimationFrame(step);
  };
  const dragSource = (kind, id, preview) => ({
    draggable: true,
    onDragStart: (event) => {
      drag.current = { kind, id };
      event.dataTransfer.setData('application/x-qiaomu-home-layout', id);
      event.dataTransfer.effectAllowed = 'move';
      const node = preview?.(event.currentTarget);
      if (node) event.dataTransfer.setDragImage(node, 16, 16);
    },
    onDragEnd: endDrag,
  });
  const dropTarget = (kind, id, axis) => ({
    onDragOver: (event) => {
      const from = drag.current;
      if (!from || from.kind !== kind || from.id === id) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      const side = dropAfter(axis, event.currentTarget.getBoundingClientRect(), event) ? 'after' : 'before';
      setMarker((current) => (current && current.id === id && current.side === side && current.kind === kind ? current : { kind, id, side, axis }));
      autoScroll(event);
    },
    onDragLeave: (event) => {
      if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) return;
      // 指针离开页面（relatedTarget 为空）时也要停掉自动滚动，否则会一直滚到头。
      if (!event.relatedTarget || !scrollRef.current?.contains(event.relatedTarget)) stopScroll();
      setMarker((current) => (current?.id === id ? null : current));
    },
    onDrop: (event) => {
      const from = drag.current;
      if (!from || from.kind !== kind || from.id === id) return;
      event.preventDefault();
      event.stopPropagation();
      const after = dropAfter(axis, event.currentTarget.getBoundingClientRect(), event);
      endDrag();
      setState({ tabs: kind === 'tab' ? reorderTab(tabs, from.id, id, after) : reorderCard(tabs, tab.id, from.id, id, after) });
    },
  });
  const markerProps = (kind, id) => (marker && marker.kind === kind && marker.id === id
    ? { 'data-drop-marker': '', 'data-drop-axis': marker.axis, 'data-drop-side': marker.side } : {});

  const cardProps = { t, lang, state, setState, services };
  const renderCard = (id) => {
    const groupId = groupIdOf(id);
    const Component = groupId ? ShortcutGroupCard : CARD_RENDERERS[id];
    if (!Component) return null;
    const name = cardName(id);
    const menuButton = (
      <button
        type="button"
        className="qh-card-menu-btn"
        aria-label={t('layout.menuFor', { name })}
        aria-haspopup="menu"
        onClick={(event) => cardMenu(event, id)}
        onKeyDown={(event) => altMove(event, id)}
      >
        <IconMore size={15} />
      </button>
    );
    const handle = editing ? (
      <button
        type="button"
        className="qh-drag-handle"
        aria-label={t('layout.dragFor', { name })}
        title={t('layout.dragHint')}
        {...dragSource('card', id, (node) => node.closest('.qh-slot'))}
        onClick={(event) => cardMenu(event, id)}
        onKeyDown={(event) => altMove(event, id)}
      >
        <IconGrip size={15} />
      </button>
    ) : null;
    return (
      <div key={id} className="qh-slot" data-card={id} {...(editing ? dropTarget('card', id, 'y') : {})} {...markerProps('card', id)}>
        <CardChromeContext.Provider value={{ handle, menu: menuButton, editing, openMenu, openDialog: setDialog, commit }}>
          <Component {...cardProps} {...cardOptions(tab, id)} {...(groupId ? { groupId } : {})} />
        </CardChromeContext.Provider>
      </div>
    );
  };

  // 页面卸载前把待写入的存储落盘。
  useEffect(() => () => store.flush(), [store]);
  useEffect(() => () => stopScroll(), []);
  // Masonry 卡片布局：不等高的卡片各自占行，落进更短的列。
  const gridRef = useRef(null);
  useEffect(() => attachMasonry(gridRef.current), []);
  // 标签栏窄到需要横向滚动时，保证选中的标签始终可见。
  useEffect(() => {
    document.getElementById(`qh-tab-${tab.id}`)?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
  }, [tab.id]);
  // 当前 Tab 被删掉或迁移后，退出依赖它的编辑态。
  useEffect(() => { if (state.tab !== tab.id) setState({ tab: tab.id }); }, [state.tab, tab.id]);

  /**
   * 组件库改动布局后的即时反馈：提示添加/移除到了哪个 Tab，并把新卡片滚进视野。
   * 卡片按固定顺序追加在页尾，页面滚动在顶部时新卡片常常落在视口之外，
   * 不滚动的话看起来就像“没有立即显示”。
   */
  const applyLibraryLayout = (nextTabs) => {
    let changed = null;
    let added = [];
    let removed = [];
    for (const next of nextTabs) {
      const previous = tabs.find((entry) => entry.id === next.id);
      const before = new Set(previous?.cards ?? []);
      const after = new Set(next.cards);
      const plus = next.cards.filter((id) => !before.has(id));
      const minus = (previous?.cards ?? []).filter((id) => !after.has(id));
      if (plus.length || minus.length) { changed = next; added = plus; removed = minus; break; }
    }
    if (added.length) {
      const name = cardName(added[0]);
      // store 的通知可能同步触发渲染，先把待滚动目标挂好，再提交这次布局。
      if (changed.id === state.tab) revealRef.current = { tabId: changed.id, cardId: added[0] };
      commit({ tabs: nextTabs }, t('toast.addedToTab', { name, tab: tabName(changed, t) }));
      return;
    }
    if (removed.length) {
      commit({ tabs: nextTabs }, t('toast.removedFromTab', { name: cardName(removed[0]), tab: tabName(changed, t) }));
      return;
    }
    setState({ tabs: nextTabs });
  };

  const dialogTab = dialog?.tabId ? tabs.find((entry) => entry.id === dialog.tabId) : null;

  return (
    <div className={`qh-root${editing ? ' qh-editing' : ''}`}>
      <Wallpaper state={state} setState={setState} t={t} />
      <div className="qh-scroll" ref={scrollRef}>
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
          <div className="qh-tabs-list" role="tablist" aria-label={t('pages.label')}>
            {tabs.map((entry, index) => {
              const selected = entry.id === tab.id;
              return (
                <button
                  key={entry.id}
                  id={`qh-tab-${entry.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="qh-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`qh-tab${selected ? ' qh-active' : ''}`}
                  onClick={() => select(entry.id)}
                  onContextMenu={(event) => tabMenu(event, entry.id)}
                  onKeyDown={(event) => onTabKey(event, index)}
                  {...(editing && entry.id !== 'home' ? dragSource('tab', entry.id) : {})}
                  {...(editing ? dropTarget('tab', entry.id, 'x') : {})}
                  {...markerProps('tab', entry.id)}
                >
                  {tabName(entry, t)}
                </button>
              );
            })}
          </div>
          <button type="button" className="qh-icon-btn" aria-label={t('pages.add')} title={t('pages.add')} onClick={() => setDialog({ type: 'newTab' })}>
            <IconPlus size={14} />
          </button>
          <button type="button" className="qh-icon-btn" aria-label={t('pages.menu')} title={t('pages.menu')} aria-haspopup="menu" onClick={(event) => tabMenu(event, tab.id)}>
            <IconMore size={14} />
          </button>
          <span className="qh-tabs-spacer" />
          <button type="button" className="qh-icon-btn" aria-label={t('library.title')} title={t('library.title')} onClick={() => setDialog({ type: 'library', tabId: tab.id })}>
            <IconGrid size={14} />
          </button>
          <button type="button" className="qh-icon-btn" aria-label={t('settings.appearance')} title={t('settings.appearance')} onClick={() => setDialog({ type: 'appearance' })}>
            <IconImage size={14} />
          </button>
          {editing ? (
            <button type="button" className="qh-action-btn qh-primary qh-done-btn" aria-pressed="true" onClick={() => { endDrag(); setEditing(false); }}>
              <IconCheck size={14} />
              {t('layout.done')}
            </button>
          ) : (
            <button type="button" className="qh-icon-btn" aria-label={t('layout.customize')} title={t('layout.customize')} aria-pressed="false" onClick={() => setEditing(true)}>
              <IconSettings size={14} />
            </button>
          )}
        </div>

        <div className="qh-grid" id="qh-panel" ref={gridRef} role="tabpanel" aria-labelledby={`qh-tab-${tab.id}`}>
          {tab.cards.length
            ? tab.cards.map(renderCard)
            : <button type="button" className="qh-empty-tab" onClick={() => setDialog({ type: 'library', tabId: tab.id })}>{t('settings.emptyTab')}</button>}
        </div>
        {editing ? <p className="qh-edit-hint">{t('layout.editHint')}</p> : null}
        </div>
      </div>

      {menu}
      <div className="qh-sr-only" aria-live="polite">{announce}</div>
      <ToastHost toasts={toasts} dismiss={dismiss} />

      {dialog?.type === 'newTab' ? <NewTabDialog t={t} onCreate={createTab} onClose={closeDialog} /> : null}
      {dialog?.type === 'library' ? (
        <LibraryDialog
          t={t}
          state={state}
          services={services}
          tabId={dialog.tabId}
          tabName={tabName}
          onLayout={applyLibraryLayout}
          onCommand={(command, tabId) => setDialog({ type: command === 'import' ? 'import' : 'newGroup', tabId })}
          onClose={closeDialog}
        />
      ) : null}
      {dialog?.type === 'rename' && dialogTab ? (
        <PromptDialog
          t={t}
          title={t('pages.rename')}
          label={t('settings.tabName')}
          initial={tabName(dialogTab, t)}
          submitText={t('pages.rename')}
          onClose={closeDialog}
          onSubmit={(name) => { setState({ tabs: renameTab(tabs, dialog.tabId, name) }); closeDialog(); }}
        />
      ) : null}
      {dialog?.type === 'duplicate' && dialogTab ? (
        <PromptDialog
          t={t}
          title={t('pages.duplicate')}
          label={t('settings.tabName')}
          initial={t('pages.copyName', { name: tabName(dialogTab, t) })}
          submitText={t('pages.duplicate')}
          onClose={closeDialog}
          onSubmit={(name) => {
            const copy = duplicateTab(tabs, dialog.tabId, name);
            if (copy.id) setState({ tabs: copy.tabs, tab: copy.id });
            closeDialog();
          }}
        />
      ) : null}
      {dialog?.type === 'delete' && dialogTab ? (
        <ConfirmDialog
          t={t}
          title={t('pages.delete')}
          message={t('pages.deleteConfirm', { name: tabName(dialogTab, t) })}
          confirmText={t('pages.delete')}
          onClose={closeDialog}
          onConfirm={() => {
            const at = tabs.findIndex((entry) => entry.id === dialog.tabId);
            commit(
              { tabs: removeTab(tabs, dialog.tabId), tab: state.tab === dialog.tabId ? tabs[Math.max(0, at - 1)].id : state.tab },
              t('toast.deleted', { name: tabName(dialogTab, t) }),
            );
            closeDialog();
          }}
        />
      ) : null}
      {dialog?.type === 'cardSettings' && tab.cards.includes(dialog.cardId) ? (
        <CardSettingsDialog
          t={t}
          tab={tab}
          cardId={dialog.cardId}
          onClose={closeDialog}
          onChange={(patch) => setState({ tabs: setCardOptions(tabs, tab.id, dialog.cardId, patch) })}
        />
      ) : null}
      {dialog?.type === 'moveCard' && tab.cards.includes(dialog.cardId) ? (
        <MoveCardDialog
          t={t}
          tabs={tabs}
          fromId={tab.id}
          cardId={dialog.cardId}
          cardName={cardName(dialog.cardId)}
          tabName={tabName}
          onClose={closeDialog}
          onMove={(toId) => {
            const target = tabs.find((entry) => entry.id === toId);
            commit({ tabs: moveCardToTab(tabs, tab.id, toId, dialog.cardId) }, t('toast.moved', { name: cardName(dialog.cardId), tab: tabName(target, t) }));
            closeDialog();
          }}
        />
      ) : null}
      {dialog?.type === 'shortcut' && state.shortcutGroups.some((entry) => entry.id === dialog.groupId) ? (
        <ShortcutDialog
          t={t}
          item={dialog.itemId ? state.shortcutGroups.find((entry) => entry.id === dialog.groupId).items.find((entry) => entry.id === dialog.itemId) : null}
          onClose={closeDialog}
          onSubmit={(value) => {
            if (dialog.itemId) {
              const next = updateItem(state.shortcutGroups, dialog.groupId, dialog.itemId, value);
              if (next) setState({ shortcutGroups: next });
            } else {
              const added = addItem(state.shortcutGroups, dialog.groupId, value);
              if (added) setState({ shortcutGroups: added.groups });
            }
            closeDialog();
          }}
        />
      ) : null}
      {dialog?.type === 'newGroup' ? (
        <PromptDialog
          t={t}
          title={t('shortcuts.newGroup')}
          label={t('shortcuts.groupName')}
          initial=""
          submitText={t('shortcuts.newGroup')}
          onClose={closeDialog}
          onSubmit={(name) => {
            const created = addGroup(state.shortcutGroups, name);
            if (created.id) setState({ shortcutGroups: created.groups, tabs: addCard(tabs, dialog.tabId ?? tab.id, groupCardId(created.id)) });
            closeDialog();
          }}
        />
      ) : null}
      {dialog?.type === 'renameGroup' && state.shortcutGroups.some((entry) => entry.id === dialog.groupId) ? (
        <PromptDialog
          t={t}
          title={t('shortcuts.renameGroup')}
          label={t('shortcuts.groupName')}
          initial={state.shortcutGroups.find((entry) => entry.id === dialog.groupId).name || t('card.shortcuts')}
          submitText={t('pages.rename')}
          onClose={closeDialog}
          onSubmit={(name) => { setState({ shortcutGroups: renameGroup(state.shortcutGroups, dialog.groupId, name) }); closeDialog(); }}
        />
      ) : null}
      {dialog?.type === 'deleteGroup' && state.shortcutGroups.some((entry) => entry.id === dialog.groupId) ? (
        <ConfirmDialog
          t={t}
          title={t('shortcuts.deleteGroup')}
          message={t('shortcuts.deleteGroupConfirm', { name: cardTitle(groupCardId(dialog.groupId), t, state.shortcutGroups) })}
          confirmText={t('shortcuts.deleteGroup')}
          onClose={closeDialog}
          onConfirm={() => {
            const cardId = groupCardId(dialog.groupId);
            const name = cardTitle(cardId, t, state.shortcutGroups);
            commit(
              { shortcutGroups: removeGroup(state.shortcutGroups, dialog.groupId), tabs: tabs.reduce((acc, entry) => removeCard(acc, entry.id, cardId), tabs) },
              t('toast.deleted', { name }),
            );
            closeDialog();
          }}
        />
      ) : null}
      {dialog?.type === 'import' ? (
        <ImportBookmarksDialog
          t={t}
          onClose={closeDialog}
          onImport={(bookmarks) => {
            const created = addGroup(state.shortcutGroups, t('import.groupName'), bookmarkItems(bookmarks));
            if (created.id) setState({ shortcutGroups: created.groups, tabs: addCard(tabs, dialog.tabId ?? tab.id, groupCardId(created.id)) });
            closeDialog();
          }}
        />
      ) : null}
      {dialog?.type === 'appearance' ? (
        <AppearanceDialog
          t={t}
          state={state}
          setState={setState}
          onClose={closeDialog}
          onReset={() => { commit(defaultPreferences(), t('toast.resetAll')); closeDialog(); }}
        />
      ) : null}
    </div>
  );
}
