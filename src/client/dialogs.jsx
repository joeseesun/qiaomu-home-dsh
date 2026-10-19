/**
 * 各类小对话框：新建 Tab（模板网格）、重命名/复制、删除确认、组件设置、跨页移动、外观。
 * 交互对标 Obsidian 版 page-dialogs / ModuleOptionsModal / MoveModuleModal。
 */
import React from 'react';
import { PAGE_TEMPLATES, cardMeta, cardOptions } from './layout.js';
import { Modal } from './ui.jsx';
import { TILE_ICONS } from './cards.jsx';
import { FAVICON, MAX_IMPORT, SHORTCUT_ICONS, parseBookmarks } from './shortcuts.js';
import { normalizeUrl } from './data.js';
import {
  IconBook, IconBriefcase, IconCheck, IconCompass, IconFlame, IconHome, IconNotebook, IconPen, IconPlus, IconSquareDashed, IconTimer,
} from './icons.jsx';

const { useRef, useState } = React;

const TEMPLATE_ICONS = { home: IconHome, work: IconBriefcase, timer: IconTimer, pen: IconPen, book: IconBook, flame: IconFlame, compass: IconCompass };
TEMPLATE_ICONS.notes = IconNotebook;

/** 新建 Tab：可选空白或模板；名称跟随模板名，除非用户自己改过。 */
export function NewTabDialog({ t, onCreate, onClose }) {
  const [template, setTemplate] = useState(null);
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const templateName = (id) => (id ? t(`template.${id}`) : '');

  const choose = (id) => {
    setTemplate(id);
    if (!touched || !name.trim() || name === templateName(template)) {
      setName(templateName(id));
      setTouched(false);
    }
  };
  const submit = () => {
    const value = name.trim();
    if (!value || busy) return;
    setBusy(true);
    onCreate(value, template);
  };

  const choices = [{ id: null, Icon: IconSquareDashed, name: t('settings.blankTab'), desc: t('template.blank.desc') },
    ...PAGE_TEMPLATES.map((entry) => ({ id: entry.id, Icon: TEMPLATE_ICONS[entry.icon] ?? IconHome, name: t(`template.${entry.id}`), desc: t(`template.${entry.id}.desc`) }))];

  return (
    <Modal title={t('pages.add')} onClose={onClose}>
      <form onSubmit={(event) => { event.preventDefault(); submit(); }}>
        <p className="qh-hint">{t('template.hint')}</p>
        <div className="qh-template-grid" role="radiogroup" aria-label={t('settings.tabTemplate')}>
          {choices.map((choice) => (
            <button
              key={choice.id ?? 'blank'}
              type="button"
              role="radio"
              aria-checked={choice.id === template}
              className="qh-template-option"
              onClick={() => choose(choice.id)}
              onKeyDown={(event) => {
                if (event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft' && event.key !== 'ArrowUp') return;
                event.preventDefault();
                const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
                const nodes = Array.from(event.currentTarget.parentElement.querySelectorAll('[role="radio"]'));
                const next = nodes[(nodes.indexOf(event.currentTarget) + step + nodes.length) % nodes.length];
                next.focus();
                next.click();
              }}
            >
              <choice.Icon size={18} />
              <span className="qh-template-text"><span className="qh-template-name">{choice.name}</span><span className="qh-template-desc">{choice.desc}</span></span>
            </button>
          ))}
        </div>
        <label className="qh-field">
          <span>{t('settings.tabName')}</span>
          <input
            type="text"
            data-autofocus
            value={name}
            maxLength={30}
            placeholder={t('pages.example')}
            onChange={(event) => { setName(event.target.value); setTouched(true); }}
          />
        </label>
        <footer className="qh-modal-foot">
          <button type="button" className="qh-btn" onClick={onClose}>{t('dialog.cancel')}</button>
          <button type="submit" className="qh-btn qh-accent" disabled={!name.trim() || busy}><IconPlus size={13} />{t('pages.add')}</button>
        </footer>
      </form>
    </Modal>
  );
}

/** 单行文本对话框：重命名与复制共用。 */
export function PromptDialog({ title, label, initial, submitText, t, onSubmit, onClose }) {
  const [value, setValue] = useState(initial);
  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={(event) => { event.preventDefault(); submit(); }}>
        <label className="qh-field">
          <span>{label}</span>
          <input
            type="text"
            data-autofocus
            value={value}
            maxLength={30}
            onFocus={(event) => event.target.select()}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
        <footer className="qh-modal-foot">
          <button type="button" className="qh-btn" onClick={onClose}>{t('dialog.cancel')}</button>
          <button type="submit" className="qh-btn qh-accent" disabled={!value.trim()}>{submitText}</button>
        </footer>
      </form>
    </Modal>
  );
}

export function ConfirmDialog({ title, message, confirmText, t, danger = true, onConfirm, onClose }) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="qh-confirm-text">{message}</p>
      <footer className="qh-modal-foot">
        <button type="button" className="qh-btn" data-autofocus onClick={onClose}>{t('dialog.cancel')}</button>
        <button type="button" className={`qh-btn${danger ? ' qh-danger-btn' : ' qh-accent'}`} onClick={onConfirm}>{confirmText}</button>
      </footer>
    </Modal>
  );
}

/** 组件设置：显示数量（1–6）与组件专属选项；修改即保存。 */
export function CardSettingsDialog({ t, tab, cardId, onChange, onClose }) {
  const meta = cardMeta(cardId);
  const options = cardOptions(tab, cardId);
  return (
    <Modal title={t('cardSettings.title', { name: t(`card.${cardId}`) })} onClose={onClose}>
      {meta?.limit ? (
        <label className="qh-field qh-field-inline">
          <span>{t('cardSettings.count')}</span>
          <select data-autofocus value={options.limit} onChange={(event) => onChange({ limit: Number(event.target.value) })}>
            {Array.from({ length: meta.limit.max }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
          </select>
        </label>
      ) : null}
      {meta?.options?.includes('openAll') ? (
        <label className="qh-field qh-field-inline">
          <span>{t('cardSettings.onEnter')}</span>
          <select data-autofocus={meta.limit ? undefined : true} value={options.openAll ? 'all' : 'first'} onChange={(event) => onChange({ openAll: event.target.value === 'all' })}>
            <option value="all">{t('cardSettings.openAll')}</option>
            <option value="first">{t('cardSettings.openFirst')}</option>
          </select>
        </label>
      ) : null}
      <p className="qh-hint">{t('cardSettings.note')}</p>
      <footer className="qh-modal-foot">
        <button type="button" className="qh-btn qh-accent" onClick={onClose}><IconCheck size={13} />{t('settings.close')}</button>
      </footer>
    </Modal>
  );
}

/** 把组件移到另一个 Tab；目标页已有时置灰。 */
export function MoveCardDialog({ t, tabs, fromId, cardId, cardName, tabName, onMove, onClose }) {
  const targets = tabs.filter((tab) => tab.id !== fromId);
  return (
    <Modal title={t('layout.moveTitle', { name: cardName ?? t(`card.${cardId}`) })} onClose={onClose}>
      {!targets.length ? <p className="qh-hint">{t('layout.singlePage')}</p> : null}
      <div className="qh-move-list">
        {targets.map((tab, index) => {
          const exists = tab.cards.includes(cardId);
          return (
            <div className="qh-move-row" key={tab.id}>
              <span>{tabName(tab, t)}</span>
              <button type="button" className="qh-btn" data-autofocus={index === 0 ? true : undefined} disabled={exists} onClick={() => onMove(tab.id)}>
                {exists ? t('library.added') : t('layout.move')}
              </button>
            </div>
          );
        })}
      </div>
      <footer className="qh-modal-foot">
        <button type="button" className="qh-btn" onClick={onClose}>{t('dialog.cancel')}</button>
      </footer>
    </Modal>
  );
}

/** 外观：壁纸、顶部文字、重置。 */
export function AppearanceDialog({ t, state, setState, onReset, onClose }) {
  const modes = ['daily', 'open', 'gradient'];
  return (
    <Modal title={t('settings.appearance')} onClose={onClose}>
      <div className="qh-field">
        <span>{t('settings.wallpaper')}</span>
        <div className="qh-radio-row" role="group" aria-label={t('settings.wallpaper')}>
          {modes.map((mode, index) => (
            <button
              key={mode}
              type="button"
              data-autofocus={index === 0 ? true : undefined}
              className={`qh-chip${state.wallpaperMode === mode ? ' qh-active' : ''}`}
              aria-pressed={state.wallpaperMode === mode}
              onClick={() => setState({ wallpaperMode: mode })}
            >
              {t(`settings.wallpaper.${mode}`)}
            </button>
          ))}
        </div>
      </div>
      <label className="qh-field">
        <span>{t('settings.headline')}</span>
        <input
          type="text"
          value={state.headline}
          maxLength={60}
          placeholder={t('settings.headline.placeholder')}
          onChange={(event) => setState({ headline: event.target.value })}
        />
      </label>
      <footer className="qh-modal-foot">
        <button type="button" className="qh-btn qh-danger-btn" onClick={onReset}>{t('settings.reset')}</button>
        <span style={{ flex: 1 }} />
        <button type="button" className="qh-btn qh-accent" onClick={onClose}><IconCheck size={13} />{t('settings.close')}</button>
      </footer>
    </Modal>
  );
}

/** 添加/编辑快捷入口：名称、网址、图标（站点图标或内置图标）。 */
export function ShortcutDialog({ t, item, onSubmit, onClose }) {
  const [label, setLabel] = useState(item?.label ?? '');
  const [url, setUrl] = useState(item?.url ?? '');
  const [icon, setIcon] = useState(item?.icon ?? FAVICON);
  const [error, setError] = useState('');
  const href = normalizeUrl(url);
  const submit = () => {
    if (!href) { setError(t('shortcuts.invalid')); return; }
    onSubmit({ label, url: href, icon });
  };
  const host = href ? new URL(href).hostname : '';
  return (
    <Modal title={item ? t('shortcuts.editTitle') : t('shortcuts.addTitle')} onClose={onClose}>
      <form onSubmit={(event) => { event.preventDefault(); submit(); }}>
        <label className="qh-field">
          <span>{t('shortcuts.urlLabel')}</span>
          <input
            type="text"
            data-autofocus
            inputMode="url"
            value={url}
            placeholder={t('shortcuts.urlPlaceholder')}
            aria-invalid={error ? 'true' : undefined}
            onChange={(event) => { setUrl(event.target.value); setError(''); }}
          />
          {error ? <span className="qh-form-error" role="alert">{error}</span> : null}
        </label>
        <label className="qh-field">
          <span>{t('shortcuts.nameLabel')}</span>
          <input
            type="text"
            value={label}
            maxLength={120}
            placeholder={host || t('shortcuts.namePlaceholder')}
            onChange={(event) => setLabel(event.target.value)}
          />
        </label>
        <div className="qh-field">
          <span>{t('shortcuts.iconLabel')}</span>
          <div className="qh-icon-choices" role="group" aria-label={t('shortcuts.iconLabel')}>
            {[FAVICON, ...SHORTCUT_ICONS].map((name) => {
              const Icon = TILE_ICONS[name];
              return (
                <button key={name} type="button" className="qh-icon-choice" aria-pressed={icon === name} aria-label={t(name === FAVICON ? 'shortcuts.siteIcon' : `shortcuts.icon.${name}`)} title={t(name === FAVICON ? 'shortcuts.siteIcon' : `shortcuts.icon.${name}`)} onClick={() => setIcon(name)}>
                  {/* 输入过程中不请求站点图标：每次按键都会把半截域名发给第三方。保存后卡片才加载。 */}
                  {Icon ? <Icon size={16} /> : <TILE_ICONS.globe size={16} />}
                </button>
              );
            })}
          </div>
        </div>
        <footer className="qh-modal-foot">
          <button type="button" className="qh-btn" onClick={onClose}>{t('dialog.cancel')}</button>
          <button type="submit" className="qh-btn qh-accent">{item ? t('shortcuts.save') : t('shortcuts.confirm')}</button>
        </footer>
      </form>
    </Modal>
  );
}


/** 导入浏览器导出的书签 HTML：先预览，再一次性导入为一个新的入口组。 */
export function ImportBookmarksDialog({ t, onImport, onClose }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [status, setStatus] = useState('');
  const token = useRef(0);
  const choose = (event) => {
    const file = event.target.files?.[0];
    const current = ++token.current;
    setBookmarks([]);
    setStatus('');
    if (!file) return;
    if (file.size > 2_000_000) { setStatus(t('import.tooLarge')); return; }
    file.text().then((text) => {
      if (current !== token.current) return;
      const found = parseBookmarks(text);
      setBookmarks(found);
      setStatus(found.length ? '' : t('import.none'));
    }).catch(() => { if (current === token.current) setStatus(t('import.failed')); });
  };
  return (
    <Modal title={t('import.title')} onClose={onClose}>
      <p className="qh-hint">{t('import.hint', { max: MAX_IMPORT })}</p>
      <label className="qh-field">
        <span>{t('import.file')}</span>
        <input type="file" data-autofocus accept=".html,.htm,text/html" onChange={choose} />
      </label>
      {status ? <p className="qh-form-error" role="alert">{status}</p> : null}
      {bookmarks.length ? (
        <div className="qh-import-preview" aria-live="polite">
          <p className="qh-hint">{t('import.count', { count: bookmarks.length })}</p>
          {bookmarks.slice(0, 8).map((item) => <div key={item.url} className="qh-import-line">{item.name} · {new URL(item.url).hostname}</div>)}
          {bookmarks.length > 8 ? <div className="qh-import-line qh-dim">{t('import.more', { count: bookmarks.length - 8 })}</div> : null}
        </div>
      ) : null}
      <footer className="qh-modal-foot">
        <button type="button" className="qh-btn" onClick={onClose}>{t('dialog.cancel')}</button>
        <button type="button" className="qh-btn qh-accent" disabled={!bookmarks.length} onClick={() => onImport(bookmarks)}>{t('import.confirm')}</button>
      </footer>
    </Modal>
  );
}
