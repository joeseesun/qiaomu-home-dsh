/**
 * 组件库对话框：对标 Obsidian 版 ModuleLibrary —— 目标页上下文、搜索、带数量与图标的分类芯片
 * （方向键切换）、只看未添加、按分类分组的卡片网格、真实内容预览、添加/移除。
 * 分类与「只看未添加」在本次会话内记忆。
 */
import React from 'react';
import { CARD_CATALOG, CATEGORIES, addCard, removeCard } from './layout.js';
import { groupCardId } from './shortcuts.js';
import { Modal } from './ui.jsx';
import { recentSessions } from './cards.jsx';
import {
  IconCalendar, IconCheck, IconClock, IconCompass, IconFlame, IconGauge, IconGrid, IconHelpCircle, IconHourglass, IconLink, IconList,
  IconMessage, IconNotebook, IconPen, IconPlus, IconQuote, IconMinusCircle, IconSearch, IconSun, IconTarget, IconTimer, IconWaves, IconFolder,
} from './icons.jsx';

const { useMemo, useRef, useState } = React;

export const CARD_ICONS = {
  dailyFocus: IconTarget, todo: IconList, recent: IconMessage, shortcuts: IconLink, quickNote: IconPen, scratchpad: IconNotebook,
  dailyQuestion: IconHelpCircle, heatmap: IconCalendar, focus: IconTimer, habit: IconFlame, ambient: IconWaves, progress: IconGauge,
  worldclock: IconClock, quote: IconQuote, multiSearch: IconSearch, weather: IconSun, countdown: IconHourglass,
};

const CATEGORY_ICONS = { plan: IconTarget, notes: IconPen, dsh: IconMessage, links: IconLink, focus: IconTimer, time: IconClock, discover: IconCompass };

/** 会话内记忆：下次打开组件库仍停留在上次的分类。 */
const remembered = { category: 'all', onlyNew: false };

const take = (list, n = 3) => list.filter(Boolean).map((text) => String(text).trim()).filter(Boolean).slice(0, n);

/** 预览只展示真实内容；没有内容的组件不出预览框（与 Obsidian 版一致）。 */
export function previewLines(id, { state, services }) {
  switch (id) {
    case 'todo': return take(state.todos.filter((todo) => !todo.done).map((todo) => todo.text));
    case 'recent': return take(recentSessions(services?.sessions?.list?.getSnapshot?.(), services?.workspaces?.list?.getSnapshot?.()?.archivedSessionIds ?? [], 3).map((row) => row.title));
    case 'quickNote': return take(state.quickNotes.map((note) => note.text.split('\n')[0]));
    case 'scratchpad': return take(state.scratchpad.split('\n'), 2);
    case 'dailyFocus': return take(state.dailyFocus.items.map((item) => item.text));
    case 'habit': return take(state.habits.map((habit) => habit.name));
    case 'countdown': return take([state.countdown.label]);
    default: return [];
  }
}

export function LibraryDialog({ t, state, services, tabId, onLayout, onCommand, onClose, tabName }) {
  const [targetId, setTargetId] = useState(tabId);
  const [query, setQuery] = useState('');
  const [category, setCategoryState] = useState(remembered.category);
  const [onlyNew, setOnlyNewState] = useState(remembered.onlyNew);
  const chips = useRef(null);
  const setCategory = (id) => { remembered.category = id; setCategoryState(id); };
  const setOnlyNew = (value) => { remembered.onlyNew = value; setOnlyNewState(value); };

  const target = state.tabs.find((tab) => tab.id === targetId) ?? state.tabs[0];
  const needle = query.trim().toLocaleLowerCase();

  const modules = useMemo(() => {
    const place = (id) => ({
      added: target.cards.includes(id),
      elsewhere: state.tabs.filter((tab) => tab.id !== target.id && tab.cards.includes(id)).map((tab) => tabName(tab, t)),
    });
    const catalog = CARD_CATALOG.filter((card) => card.id !== 'shortcuts').map((card) => ({
      ...card, title: t(card.titleKey), description: t(card.descKey), ...place(card.id), preview: previewLines(card.id, { state, services }),
    }));
    // 每个快捷入口分组是一张独立卡片；默认组沿用 shortcuts 这个卡片 ID。
    const groups = state.shortcutGroups.map((group) => {
      const id = groupCardId(group.id);
      return { id, category: 'links', title: group.name || t('card.shortcuts'), description: t('shortcuts.groupDesc'), ...place(id), preview: take(group.items.map((item) => item.label)), icon: IconLink };
    });
    const actions = [
      { id: '__newGroup', action: 'newGroup', category: 'links', title: t('shortcuts.newGroup'), description: t('shortcuts.newGroupDesc'), icon: IconPlus, elsewhere: [], preview: [] },
      { id: '__import', action: 'import', category: 'links', title: t('import.title'), description: t('import.desc'), icon: IconFolder, elsewhere: [], preview: [] },
    ];
    return [...catalog, ...groups, ...actions];
  }, [state, services, target, t, tabName]);

  const searched = modules.filter((card) => (!onlyNew || !card.added)
    && `${card.title} ${card.description} ${card.preview.join(' ')} ${t(`settings.category.${card.category}`)}`.toLocaleLowerCase().includes(needle));
  const shown = searched.filter((card) => category === 'all' || card.category === category);
  const grouped = category === 'all' && !needle;

  const chipList = [{ id: 'all', count: searched.length }, ...CATEGORIES
    .map((id) => ({ id, count: searched.filter((card) => card.category === id).length }))
    .filter((chip) => chip.count || chip.id === category)];

  const onChipKey = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const nodes = Array.from(chips.current.querySelectorAll('[data-chip]'));
    nodes[(index + (event.key === 'ArrowRight' ? 1 : -1) + nodes.length) % nodes.length]?.focus();
  };

  const runAction = (card) => { onClose(); onCommand?.(card.action, target.id); };
  const toggle = (card) => onLayout(card.added ? removeCard(state.tabs, target.id, card.id) : addCard(state.tabs, target.id, card.id), card.added ? 'remove' : 'add', card);

  const renderTile = (card) => {
    const Icon = card.icon ?? CARD_ICONS[card.id] ?? IconGrid;
    return (
      <div key={card.id} className={`qh-lib-tile${card.added ? ' qh-added' : ''}`} data-card={card.id}>
        <div className="qh-lib-tile-head">
          <Icon size={16} />
          <span className="qh-lib-tile-title">{card.title}</span>
          {card.added ? <span className="qh-lib-badge">{t('library.added')}</span> : null}
        </div>
        {card.elsewhere.length ? <div className="qh-lib-meta">{t('library.elsewhere', { tabs: card.elsewhere.join('、') })}</div> : null}
        {card.preview.length ? (
          <div className="qh-lib-preview">{card.preview.map((line, index) => <div key={index} className="qh-lib-preview-line">{line}</div>)}</div>
        ) : null}
        <div className="qh-lib-desc">{card.description}</div>
        <div className="qh-lib-actions">
          {card.action ? (
            <button type="button" className="qh-btn qh-accent" aria-label={card.title} onClick={() => runAction(card)}>
              <IconPlus size={13} />
              {t(card.action === 'import' ? 'import.open' : 'shortcuts.newShort')}
            </button>
          ) : (
            <button
              type="button"
              className={`qh-btn${card.added ? '' : ' qh-accent'}`}
              aria-label={t(card.added ? 'library.removeAria' : 'library.addAria', { name: card.title })}
              onClick={() => toggle(card)}
            >
              {card.added ? <IconMinusCircle size={13} /> : <IconPlus size={13} />}
              {t(card.added ? 'library.remove' : 'library.add')}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Modal title={t('library.title')} onClose={onClose} wide>
      <div className="qh-lib-context">
        <span>{t('library.target', { name: '' })}</span>
        <select value={target.id} aria-label={t('library.targetAria')} onChange={(event) => setTargetId(event.target.value)}>
          {state.tabs.map((tab) => <option key={tab.id} value={tab.id}>{tabName(tab, t)}</option>)}
        </select>
      </div>
      <input
        type="search"
        className="qh-lib-search"
        data-autofocus
        value={query}
        placeholder={t('library.searchHint')}
        aria-label={t('library.search')}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="qh-lib-filters" role="toolbar" aria-label={t('library.filterAria')} ref={chips}>
        {chipList.map((chip, index) => {
          const Icon = CATEGORY_ICONS[chip.id];
          return (
            <button
              key={chip.id}
              type="button"
              data-chip={chip.id}
              className={`qh-chip${category === chip.id ? ' qh-active' : ''}`}
              aria-pressed={category === chip.id}
              onClick={() => setCategory(chip.id)}
              onKeyDown={(event) => onChipKey(event, index)}
            >
              {Icon ? <Icon size={13} /> : null}
              <span>{t(`settings.category.${chip.id}`)}</span>
              <span className="qh-lib-count">{chip.count}</span>
            </button>
          );
        })}
        <label className="qh-lib-only-new">
          <input type="checkbox" checked={onlyNew} onChange={(event) => setOnlyNew(event.target.checked)} />
          <span>{t('settings.onlyNew')}</span>
        </label>
      </div>
      <div className="qh-lib-list">
        {!shown.length ? <div className="qh-lib-empty">{t('settings.noCards')}</div> : null}
        {grouped
          ? CATEGORIES.map((id) => {
            const items = shown.filter((card) => card.category === id);
            if (!items.length) return null;
            const Icon = CATEGORY_ICONS[id];
            return (
              <section key={id}>
                <h3 className="qh-lib-group"><Icon size={15} /><span>{t(`settings.category.${id}`)}</span><span className="qh-lib-count">{items.length}</span></h3>
                <div className="qh-lib-grid">{items.map(renderTile)}</div>
              </section>
            );
          })
          : <div className="qh-lib-grid">{shown.map(renderTile)}</div>}
      </div>
      <footer className="qh-modal-foot">
        <button type="button" className="qh-btn qh-accent" onClick={onClose}><IconCheck size={13} />{t('settings.close')}</button>
      </footer>
    </Modal>
  );
}
