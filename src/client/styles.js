/**
 * 乔木 Home 的全部样式。注入为一个 <style> 标签（data-plugin / data-plugin-css）。
 * 页面在壁纸上始终使用深色方案：白字 + 暗色蒙层，与 Obsidian 版一致。
 */
export const CSS = `
.qh-root {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  color: #f2f4f3;
  background: #14201a;
  font-size: 14px;
  line-height: 1.55;
  --qh-card: rgba(18, 24, 21, 0.62);
  --qh-card-border: rgba(255, 255, 255, 0.09);
  --qh-text: #f2f4f3;
  --qh-text-2: rgba(242, 244, 243, 0.72);
  --qh-text-3: rgba(242, 244, 243, 0.48);
  --qh-accent: #9fd3ae;
  --qh-radius: 16px;
}
.qh-root * { box-sizing: border-box; }
.qh-root button { font: inherit; color: inherit; }
.qh-root :is(button, a):focus-visible {
  outline: 2px solid var(--qh-accent);
  outline-offset: 2px;
}
.qh-root :is(input, select, textarea):focus-visible {
  outline: none;
  border-color: rgba(159, 211, 174, 0.55);
}

.qh-scroll {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  container-type: inline-size;
}

.qh-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.qh-bg-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.9s ease;
}
.qh-bg-img.qh-loaded { opacity: 1; }
.qh-bg-gradient {
  position: absolute; inset: 0;
  background:
    radial-gradient(120% 90% at 20% 0%, rgba(38, 64, 89, 0.9) 0%, transparent 60%),
    radial-gradient(100% 80% at 85% 15%, rgba(12, 64, 64, 0.85) 0%, transparent 55%),
    linear-gradient(160deg, #16211c 0%, #101816 45%, #0d1412 100%);
}
.qh-bg-scrim {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(8, 12, 10, 0.42) 0%, rgba(8, 12, 10, 0.30) 30%, rgba(8, 12, 10, 0.55) 100%);
}

.qh-credit {
  position: absolute; top: 14px; right: 16px; z-index: 2;
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; color: var(--qh-text-3);
  pointer-events: auto;
}
.qh-credit a { color: inherit; text-decoration: none; }
.qh-credit a:hover { color: var(--qh-text-2); text-decoration: underline; }
.qh-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; padding: 0;
  border: none; border-radius: 8px;
  background: rgba(20, 28, 24, 0.5); color: var(--qh-text-2);
  cursor: pointer; backdrop-filter: blur(8px);
  transition: background 0.15s ease, color 0.15s ease;
}
.qh-icon-btn:hover { background: rgba(32, 44, 38, 0.75); color: var(--qh-text); }

.qh-main {
  position: relative; z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: clamp(48px, 9vh, 110px) 28px 64px;
  display: flex; flex-direction: column;
  min-height: 100%;
}

/* ---- Hero ---- */
.qh-hero { text-align: center; margin-bottom: 30px; }
.qh-clock {
  font-size: 15px; font-weight: 500;
  color: var(--qh-text-2);
  letter-spacing: 0.04em;
  margin-bottom: 10px;
}
.qh-headline {
  margin: 0;
  font-size: clamp(26px, 4.2vw, 40px);
  font-weight: 650;
  letter-spacing: 0.01em;
  color: var(--qh-text);
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
}

/* ---- Search ---- */
.qh-search-row {
  display: flex; gap: 10px; align-items: stretch;
  max-width: 640px; margin: 26px auto 0;
}
.qh-searchbox {
  position: relative; flex: 1;
  display: flex; align-items: center;
  background: rgba(16, 22, 19, 0.72);
  border: 1px solid var(--qh-card-border);
  border-radius: 14px;
  backdrop-filter: blur(12px);
  transition: border-color 0.15s ease;
}
.qh-searchbox:focus-within { border-color: rgba(159, 211, 174, 0.45); }
.qh-searchbox > svg { margin-left: 14px; color: var(--qh-text-3); flex: none; }
.qh-search-input {
  flex: 1; min-width: 0;
  background: transparent; border: none; outline: none;
  padding: 12px 14px;
  color: var(--qh-text);
  font-size: 14px;
}
.qh-search-input::placeholder { color: var(--qh-text-3); }
.qh-search-input:focus-visible { border-color: transparent; }
.qh-action-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 0 16px;
  border: 1px solid var(--qh-card-border);
  border-radius: 14px;
  background: rgba(16, 22, 19, 0.72);
  color: var(--qh-text-2);
  cursor: pointer; white-space: nowrap;
  backdrop-filter: blur(12px);
  transition: background 0.15s ease, color 0.15s ease;
}
.qh-action-btn:hover { background: rgba(34, 46, 40, 0.8); color: var(--qh-text); }
.qh-action-btn.qh-primary { color: var(--qh-accent); }

.qh-search-hint { margin-top: 8px; font-size: 11.5px; color: var(--qh-text-3); }

.qh-results {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 5;
  background: rgba(14, 19, 17, 0.96);
  border: 1px solid var(--qh-card-border);
  border-radius: 14px;
  backdrop-filter: blur(16px);
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
  text-align: left;
}
.qh-results-row {
  display: flex; flex-direction: column; gap: 2px;
  width: 100%; padding: 9px 14px;
  background: none; border: none; cursor: pointer;
  text-align: left;
}
.qh-results-row:hover, .qh-results-row.qh-active { background: rgba(255, 255, 255, 0.07); }
.qh-results-title {
  font-size: 13.5px; color: var(--qh-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.qh-results-snippet {
  font-size: 12px; color: var(--qh-text-3);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.qh-results-status { padding: 12px 14px; font-size: 12.5px; color: var(--qh-text-3); }

/* ---- Tabs ---- */
.qh-tabs-row {
  display: flex; align-items: center; gap: 4px;
  margin: 18px 0 18px;
}
.qh-tabs-list { display: flex; align-items: center; gap: 4px; min-width: 0; overflow-x: auto; scrollbar-width: thin; }
.qh-tab {
  flex: none; white-space: nowrap;
  padding: 6px 14px;
  border: none; border-radius: 10px;
  background: transparent;
  color: var(--qh-text-3);
  font-size: 14px; cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.qh-tab:hover { color: var(--qh-text-2); }
.qh-tab.qh-active {
  background: rgba(255, 255, 255, 0.10);
  color: var(--qh-text);
  backdrop-filter: blur(8px);
}
.qh-tabs-spacer { flex: 1; }

/* ---- Cards ---- */
.qh-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-items: start;
}
/* Masonry：行高 1px，卡片按自身高度跨行，落入更短的列（见 masonry.js）。 */
.qh-grid.qh-masonry { grid-auto-rows: 1px; }
.qh-grid.qh-masonry .qh-slot { overflow: visible; }
@container (max-width: 780px) {
  .qh-grid { grid-template-columns: 1fr; }
  .qh-main { padding: 40px 20px 48px; }
  .qh-search-row { flex-wrap: wrap; }
  .qh-searchbox { flex-basis: 100%; min-height: 42px; }
  .qh-action-btn { min-height: 40px; }
}
.qh-card {
  background: var(--qh-card);
  border: 1px solid var(--qh-card-border);
  border-radius: var(--qh-radius);
  backdrop-filter: blur(14px);
  padding: 14px 16px 14px;
  display: flex; flex-direction: column; gap: 10px;
  min-height: 0;
}
.qh-card-head { display: flex; align-items: center; gap: 8px; color: var(--qh-text-2); }
.qh-card-head svg { color: var(--qh-text-3); }
.qh-card-title { font-size: 13.5px; font-weight: 600; color: var(--qh-text-2); flex: 1; }
.qh-card-count { font-size: 11.5px; color: var(--qh-text-3); }
.qh-card-empty { font-size: 12.5px; color: var(--qh-text-3); padding: 4px 0 6px; }
.qh-card-foot { display: flex; align-items: center; gap: 10px; font-size: 11.5px; color: var(--qh-text-3); }
.qh-link-btn {
  background: none; border: none; padding: 0;
  color: var(--qh-text-3); font-size: 11.5px; cursor: pointer;
}
.qh-link-btn:hover { color: var(--qh-text-2); text-decoration: underline; }

/* ---- Todo ---- */
.qh-todo-form { display: flex; gap: 8px; }
.qh-todo-input {
  flex: 1; min-width: 0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 8px 12px;
  color: var(--qh-text); font-size: 13px; outline: none;
  transition: border-color 0.15s ease;
}
.qh-todo-input:focus { border-color: rgba(159, 211, 174, 0.4); }
.qh-todo-input::placeholder { color: var(--qh-text-3); }
.qh-todo-add {
  width: 34px; flex: none;
  border: none; border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--qh-text-2); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
}
.qh-todo-add:hover { background: rgba(255, 255, 255, 0.14); color: var(--qh-text); }
.qh-todo-list { display: flex; flex-direction: column; gap: 2px; }
.qh-todo-item {
  display: flex; align-items: center; gap: 10px;
  padding: 6px 4px; border-radius: 8px;
}
.qh-todo-item:hover { background: rgba(255, 255, 255, 0.05); }
.qh-todo-check {
  width: 16px; height: 16px; flex: none;
  border: 1.5px solid var(--qh-text-3);
  border-radius: 5px;
  background: transparent; cursor: pointer; padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  color: transparent;
  transition: all 0.15s ease;
}
.qh-todo-check:hover { border-color: var(--qh-text-2); }
.qh-todo-item.qh-done .qh-todo-check {
  background: var(--qh-accent); border-color: var(--qh-accent); color: #10241a;
}
.qh-todo-text {
  flex: 1; min-width: 0; font-size: 13.5px; color: var(--qh-text);
  overflow-wrap: break-word;
}
.qh-todo-item.qh-done .qh-todo-text { color: var(--qh-text-3); text-decoration: line-through; }
.qh-todo-del {
  flex: none; width: 28px; height: 28px;
  border: none; border-radius: 6px; background: none;
  color: var(--qh-text-3); cursor: pointer; padding: 0;
  visibility: hidden; display: inline-flex; align-items: center; justify-content: center;
}
.qh-todo-item:hover .qh-todo-del, .qh-todo-item:focus-within .qh-todo-del { visibility: visible; }
.qh-todo-del:hover { color: var(--qh-text); background: rgba(255, 255, 255, 0.08); }

/* ---- Recent ---- */
.qh-session-row {
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 7px 8px;
  border: none; border-radius: 9px;
  background: none; cursor: pointer; text-align: left;
}
.qh-session-row:hover { background: rgba(255, 255, 255, 0.06); }
.qh-session-row svg { flex: none; color: var(--qh-text-3); }
.qh-session-title {
  flex: 1; min-width: 0;
  font-size: 13.5px; color: var(--qh-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.qh-session-time { flex: none; font-size: 11.5px; color: var(--qh-text-3); }

/* ---- Shortcuts ---- */
.qh-tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.qh-tile-wrap { position: relative; min-width: 0; }
@container (max-width: 460px) { .qh-tiles { grid-template-columns: repeat(3, 1fr); } }
.qh-tile {
  position: relative;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  width: 100%; height: 100%; padding: 14px 6px 12px;
  border: 1px solid transparent; border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.qh-tile:hover { background: rgba(255, 255, 255, 0.10); }
.qh-tile-icon {
  width: 30px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  color: var(--qh-text-2);
}
.qh-tile-icon img { width: 22px; height: 22px; border-radius: 5px; }
.qh-tile-label {
  max-width: 100%;
  font-size: 11.5px; color: var(--qh-text-2);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
@media (hover: none) {
  .qh-todo-del { visibility: visible; }
}
.qh-shortcut-form { display: flex; flex-direction: column; gap: 8px; }
.qh-shortcut-form input {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 10px;
  padding: 8px 12px; color: var(--qh-text); font-size: 13px; outline: none;
}
.qh-shortcut-form input:focus { border-color: rgba(159, 211, 174, 0.4); }
.qh-shortcut-form .qh-row { display: flex; gap: 8px; justify-content: flex-end; }
.qh-btn {
  padding: 7px 14px; border: none; border-radius: 9px;
  background: rgba(255, 255, 255, 0.10); color: var(--qh-text);
  font-size: 12.5px; cursor: pointer;
}
.qh-btn:hover { background: rgba(255, 255, 255, 0.16); }
.qh-root button:disabled { opacity: 0.48; cursor: not-allowed; }
.qh-root button:disabled:hover { background: rgba(255, 255, 255, 0.10); }
.qh-btn.qh-accent { background: rgba(159, 211, 174, 0.2); color: var(--qh-accent); }
.qh-btn.qh-accent:hover { background: rgba(159, 211, 174, 0.3); }
.qh-form-error { font-size: 12px; color: #e8a0a0; }

/* ---- Focus timer ---- */
.qh-focus { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 4px 0; }
.qh-focus-dial { position: relative; width: 128px; height: 128px; }
.qh-focus-dial svg { display: block; }
.qh-focus-track { fill: none; stroke: rgba(255, 255, 255, 0.10); stroke-width: 5; }
.qh-focus-arc {
  fill: none; stroke: var(--qh-accent); stroke-width: 5; stroke-linecap: round;
  transition: stroke-dashoffset 0.5s linear;
}
.qh-focus-center {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
}
.qh-focus-clock { font-size: 26px; font-weight: 600; font-variant-numeric: tabular-nums; color: var(--qh-text); }
.qh-focus-status { font-size: 11px; color: var(--qh-text-3); }
.qh-focus-presets { display: flex; gap: 6px; }
.qh-chip {
  padding: 4px 10px; border: none; border-radius: 999px;
  background: rgba(255, 255, 255, 0.07); color: var(--qh-text-2);
  font-size: 12px; cursor: pointer;
}
.qh-chip:hover { background: rgba(255, 255, 255, 0.13); }
.qh-chip.qh-active { background: rgba(159, 211, 174, 0.22); color: var(--qh-accent); }
.qh-focus-controls { display: flex; gap: 8px; }

/* ---- Progress ---- */
.qh-progress-rows { display: flex; flex-direction: column; gap: 9px; }
.qh-progress-row { display: flex; align-items: center; gap: 10px; }
.qh-progress-label { width: 34px; flex: none; font-size: 12px; color: var(--qh-text-3); }
.qh-progress-bar {
  flex: 1; height: 5px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.08); overflow: hidden;
}
.qh-progress-fill {
  height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, rgba(159, 211, 174, 0.55), var(--qh-accent));
  transition: width 0.6s ease;
}
.qh-progress-value { width: 42px; flex: none; text-align: right; font-size: 11.5px; color: var(--qh-text-3); font-variant-numeric: tabular-nums; }

/* ---- World clock ---- */
.qh-clock-rows { display: flex; flex-direction: column; gap: 6px; }
.qh-clock-row { display: flex; align-items: baseline; gap: 10px; }
.qh-clock-city { flex: 1; font-size: 13px; color: var(--qh-text-2); }
.qh-clock-offset { font-size: 11px; color: var(--qh-text-3); }
.qh-clock-time { font-size: 15px; font-weight: 600; color: var(--qh-text); font-variant-numeric: tabular-nums; }

/* ---- Quote ---- */
.qh-quote-text { font-size: 13.5px; line-height: 1.8; color: var(--qh-text); }

/* ---- Weather ---- */
.qh-weather-now { display: flex; align-items: center; gap: 12px; }
.qh-weather-icon { color: var(--qh-accent); }
.qh-weather-temp { font-size: 28px; font-weight: 650; color: var(--qh-text); font-variant-numeric: tabular-nums; }
.qh-weather-meta { display: flex; flex-direction: column; }
.qh-weather-cond { font-size: 13px; color: var(--qh-text-2); }
.qh-weather-feels { font-size: 11.5px; color: var(--qh-text-3); }
.qh-weather-days { display: flex; gap: 8px; }
.qh-weather-day {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 8px 4px; border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
}
.qh-weather-day-label { font-size: 11px; color: var(--qh-text-3); }
.qh-weather-day-temp { font-size: 11.5px; color: var(--qh-text-2); font-variant-numeric: tabular-nums; }
.qh-weather-city { display: flex; align-items: baseline; gap: 8px; font-size: 12.5px; color: var(--qh-text); }
.qh-weather-city .qh-weather-place-detail { font-size: 11px; }
.qh-weather-place-detail { font-size: 11.5px; color: var(--qh-text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.qh-weather-places { display: flex; flex-direction: column; gap: 2px; max-height: 168px; overflow-y: auto; }
.qh-weather-place {
  display: flex; align-items: baseline; gap: 8px; text-align: left;
  background: none; border: none; padding: 6px 8px; border-radius: 8px;
  color: var(--qh-text); font-size: 12.5px; cursor: pointer;
}
.qh-weather-place:hover { background: rgba(255, 255, 255, 0.08); }
.qh-templates { display: flex; flex-direction: column; gap: 6px; }
.qh-templates-input {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 9px;
  padding: 8px 10px; color: var(--qh-text); font-size: 12px; line-height: 1.6;
  resize: vertical; min-height: 54px; outline: none;
  font-family: inherit;
}
.qh-templates-input:focus { border-color: var(--qh-accent); }

/* ---- Shortcut tiles: per-item menu, markers, icon picker, import ---- */
.qh-tile-more {
  position: absolute; top: 2px; right: 2px; width: 22px; height: 22px; padding: 0; display: inline-flex; align-items: center; justify-content: center;
  border: 0; border-radius: 6px; background: rgba(0, 0, 0, .35); color: var(--qh-text-2); cursor: pointer; opacity: 0;
}
.qh-tile-wrap:hover .qh-tile-more, .qh-tile-wrap:focus-within .qh-tile-more, .qh-editing .qh-tile-more { opacity: 1; }
@media (hover: none) { .qh-tile-more { opacity: .8; } }
.qh-tile-more:hover { background: rgba(255, 255, 255, .2); color: var(--qh-text); }
.qh-editing .qh-tile-wrap[draggable='true'] { cursor: grab; }
.qh-tile-wrap[data-drop-marker]::after { content: ''; position: absolute; top: 4px; bottom: 4px; width: 3px; border-radius: 2px; background: var(--qh-accent); pointer-events: none; }
.qh-tile-wrap[data-drop-side='before']::after { left: -6px; }
.qh-tile-wrap[data-drop-side='after']::after { right: -6px; }
.qh-icon-choices { display: flex; flex-wrap: wrap; gap: 6px; }
.qh-icon-choice { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--qh-card-border); border-radius: 9px; background: transparent; color: var(--qh-text-2); cursor: pointer; }
.qh-icon-choice img { width: 18px; height: 18px; border-radius: 4px; }
.qh-icon-choice:hover { background: rgba(255, 255, 255, .07); }
.qh-icon-choice[aria-pressed='true'] { border-color: var(--qh-accent); background: rgba(159, 211, 174, .14); color: var(--qh-accent); }
.qh-import-preview { padding: 8px 12px; border-radius: 10px; background: rgba(0, 0, 0, .22); display: flex; flex-direction: column; gap: 2px; }
.qh-import-line { font-size: 12px; color: var(--qh-text-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.qh-dim { color: var(--qh-text-3); }
.qh-modal input[type='file'] { font-size: 12.5px; color: var(--qh-text-2); }

/* ---- Layout editing: slots, handles, drop markers ---- */
.qh-sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.qh-empty-tab { grid-column: 1 / -1; min-height: 120px; border: 1px dashed var(--qh-card-border); border-radius: var(--qh-radius); background: var(--qh-card); color: var(--qh-text-2); cursor: pointer; }
.qh-slot { position: relative; min-width: 0; }
.qh-focus-presets { flex-wrap: wrap; }
.qh-chip { white-space: nowrap; }
.qh-headline { text-wrap: balance; }
.qh-slot > .qh-card { height: 100%; }
.qh-card-menu-btn, .qh-drag-handle {
  flex: none; display: inline-flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; padding: 0; border: 0; border-radius: 7px; background: transparent; color: var(--qh-text-3); cursor: pointer;
}
.qh-card-menu-btn { opacity: 0; transition: opacity .12s ease, background .12s ease; }
.qh-card:hover .qh-card-menu-btn, .qh-card:focus-within .qh-card-menu-btn, .qh-editing .qh-card-menu-btn { opacity: 1; }
@media (hover: none) { .qh-card-menu-btn { opacity: .7; } }
.qh-card-menu-btn:hover, .qh-drag-handle:hover { background: rgba(255, 255, 255, .1); color: var(--qh-text); }
.qh-drag-handle { cursor: grab; margin-left: -6px; }
.qh-drag-handle:active { cursor: grabbing; }
.qh-editing .qh-card { border-style: dashed; border-color: rgba(159, 211, 174, .35); }
.qh-editing .qh-tab[draggable='true'] { cursor: grab; }
.qh-slot[draggable], .qh-slot.qh-dragging { opacity: 1; }
.qh-slot[data-drop-marker]::after, .qh-tab[data-drop-marker]::after {
  content: ''; position: absolute; background: var(--qh-accent); border-radius: 2px; pointer-events: none; z-index: 3;
}
.qh-slot[data-drop-axis='y']::after { left: 0; right: 0; height: 3px; }
.qh-slot[data-drop-axis='y'][data-drop-side='before']::after { top: -8px; }
.qh-slot[data-drop-axis='y'][data-drop-side='after']::after { bottom: -8px; }
.qh-tab { position: relative; }
.qh-tab[data-drop-axis='x']::after { top: 4px; bottom: 4px; width: 3px; }
.qh-tab[data-drop-axis='x'][data-drop-side='before']::after { left: -3px; }
.qh-tab[data-drop-axis='x'][data-drop-side='after']::after { right: -3px; }
.qh-edit-hint { margin: 14px 2px 0; font-size: 12px; color: var(--qh-text-3); text-align: center; }
.qh-done-btn { min-height: 28px; padding: 3px 12px; }
.qh-tabs-row { flex-wrap: nowrap; }
.qh-tabs-list { flex: 0 1 auto; min-width: 0; }
.qh-tabs-row > * { flex-shrink: 0; }
.qh-tabs-row > .qh-tabs-list { flex-shrink: 1; }
.qh-tabs-row > .qh-tabs-spacer { flex: 1 1 0; min-width: 0; flex-shrink: 1; }

/* ---- Overlay, modal, menu, toast ---- */
.qh-overlay {
  position: absolute; inset: 0; z-index: 20; display: flex; align-items: center; justify-content: center; padding: 20px;
  background: rgba(6, 10, 8, .62); backdrop-filter: blur(3px);
}
.qh-modal {
  width: min(460px, 100%); max-height: min(720px, 100%); display: flex; flex-direction: column; overflow: hidden;
  background: rgba(16, 22, 19, .98); border: 1px solid var(--qh-card-border); border-radius: 14px; box-shadow: 0 24px 64px rgba(0, 0, 0, .55);
  color: var(--qh-text);
}
.qh-modal:focus { outline: none; }
.qh-modal-wide { width: min(860px, 100%); height: min(720px, 100%); }
.qh-modal-head { padding: 16px 20px 6px; }
.qh-modal-head h2 { margin: 0; font-size: 15px; font-weight: 650; }
.qh-modal-body { padding: 8px 20px 4px; overflow-y: auto; min-height: 0; flex: 1; display: flex; flex-direction: column; gap: 12px; }
.qh-modal form { display: contents; }
.qh-modal-foot { position: sticky; bottom: 0; z-index: 3; display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 12px 0 14px; margin-top: auto; background: rgba(16, 22, 19, .98); border-top: 1px solid var(--qh-card-border); }
.qh-hint, .qh-confirm-text { margin: 0; font-size: 12.5px; color: var(--qh-text-2); line-height: 1.6; }
.qh-field { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--qh-text-3); }
.qh-field-inline { flex-direction: row; align-items: center; justify-content: space-between; font-size: 13px; color: var(--qh-text-2); }
.qh-field input[type='text'], .qh-modal input[type='search'], .qh-field select, .qh-lib-context select {
  width: 100%; padding: 8px 11px; border: 1px solid transparent; border-radius: 9px; background: rgba(255, 255, 255, .07);
  color: var(--qh-text); font-size: 13px; outline: none;
}
.qh-field-inline select { width: auto; min-width: 84px; }
.qh-field select, .qh-lib-context select { background: #25312a; }
.qh-field input:focus, .qh-modal input[type='search']:focus, .qh-field select:focus { border-color: rgba(159, 211, 174, .5); }
.qh-radio-row { display: flex; gap: 6px; flex-wrap: wrap; }
.qh-danger-btn { color: #f0a7a0; }
.qh-danger-btn:hover { background: rgba(240, 120, 110, .18); }
.qh-btn:disabled { opacity: .4; cursor: default; }

.qh-menu {
  position: absolute; z-index: 30; min-width: 190px; padding: 5px; display: flex; flex-direction: column; gap: 1px;
  background: rgba(16, 22, 19, .98); border: 1px solid var(--qh-card-border); border-radius: 11px; box-shadow: 0 16px 40px rgba(0, 0, 0, .5);
}
.qh-menu-item {
  display: flex; align-items: center; gap: 9px; width: 100%; min-height: 32px; padding: 5px 10px; border: 0; border-radius: 7px;
  background: transparent; color: var(--qh-text-2); font-size: 13px; text-align: left; cursor: pointer;
}
.qh-menu-item:hover, .qh-menu-item:focus-visible { background: rgba(255, 255, 255, .09); color: var(--qh-text); outline: none; }
.qh-menu-item[aria-disabled='true'] { opacity: .38; cursor: default; }
.qh-menu-item[aria-disabled='true']:hover { background: transparent; }
.qh-menu-item.qh-danger { color: #f0a7a0; }
.qh-menu-gap { width: 14px; }
.qh-menu-sep { height: 1px; margin: 4px 6px; background: var(--qh-card-border); }

.qh-toasts { position: absolute; left: 50%; bottom: 22px; z-index: 40; transform: translateX(-50%); display: flex; flex-direction: column; gap: 8px; align-items: center; pointer-events: none; }
.qh-toast {
  pointer-events: auto; display: flex; align-items: center; gap: 14px; padding: 9px 14px; border-radius: 11px;
  background: rgba(16, 22, 19, .98); border: 1px solid var(--qh-card-border); box-shadow: 0 10px 30px rgba(0, 0, 0, .45); font-size: 13px; color: var(--qh-text);
}
.qh-toast-action { border: 0; background: transparent; color: var(--qh-accent); font-weight: 600; cursor: pointer; padding: 2px 4px; border-radius: 5px; }
.qh-toast-action:hover { background: rgba(159, 211, 174, .16); }

/* ---- Templates ---- */
.qh-template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 8px; }
.qh-template-option {
  display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border: 1px solid var(--qh-card-border); border-radius: 10px;
  background: transparent; color: var(--qh-text-2); text-align: left; cursor: pointer;
}
.qh-template-option svg { flex: none; margin-top: 2px; color: var(--qh-text-3); }
.qh-template-option:hover { background: rgba(255, 255, 255, .05); }
.qh-template-option[aria-checked='true'] { border-color: var(--qh-accent); background: rgba(159, 211, 174, .1); color: var(--qh-text); }
.qh-template-option[aria-checked='true'] svg { color: var(--qh-accent); }
.qh-template-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.qh-template-name { font-weight: 600; font-size: 13px; }
.qh-template-desc { font-size: 11.5px; color: var(--qh-text-3); line-height: 1.45; }

/* ---- Library ---- */
.qh-lib-context { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--qh-text-3); }
.qh-lib-context select { width: auto; padding: 4px 9px; }
.qh-lib-filters { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; position: sticky; top: 0; z-index: 2; padding: 6px 0; background: rgba(16, 22, 19, .98); }
.qh-lib-filters .qh-chip { display: inline-flex; align-items: center; gap: 5px; }
.qh-lib-count { color: var(--qh-text-3); font-size: 11px; font-variant-numeric: tabular-nums; }
.qh-lib-only-new { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; font-size: 12px; color: var(--qh-text-2); cursor: pointer; }
.qh-lib-only-new input { accent-color: #9fd3ae; }
.qh-lib-list { display: flex; flex-direction: column; gap: 6px; }
.qh-lib-group { display: flex; align-items: center; gap: 8px; margin: 14px 0 8px; font-size: 13px; font-weight: 600; color: var(--qh-text-2); }
.qh-lib-group svg { color: var(--qh-text-3); }
.qh-lib-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.qh-lib-tile { display: flex; flex-direction: column; gap: 8px; padding: 12px 14px; border: 1px solid var(--qh-card-border); border-radius: 12px; background: rgba(255, 255, 255, .03); }
.qh-lib-tile.qh-added { background: rgba(159, 211, 174, .07); border-color: rgba(159, 211, 174, .22); }
.qh-lib-tile-head { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 13.5px; }
.qh-lib-tile-head svg { flex: none; color: var(--qh-text-3); }
.qh-lib-tile-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.qh-lib-badge { flex: none; padding: 1px 8px; border-radius: 999px; background: rgba(159, 211, 174, .18); color: var(--qh-accent); font-size: 11px; font-weight: 500; }
.qh-lib-meta { font-size: 11px; color: var(--qh-text-3); }
.qh-lib-preview { padding: 5px 10px; border-radius: 8px; background: rgba(0, 0, 0, .22); }
.qh-lib-preview-line { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; line-height: 24px; color: var(--qh-text-2); }
.qh-lib-desc { font-size: 12px; line-height: 1.5; color: var(--qh-text-3); }
.qh-lib-actions { margin-top: auto; display: flex; gap: 8px; }
.qh-lib-empty { padding: 28px; text-align: center; color: var(--qh-text-3); font-size: 13px; }
.qh-move-list { display: flex; flex-direction: column; gap: 6px; }
.qh-move-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 6px 4px; font-size: 13px; color: var(--qh-text-2); }
.qh-modal :is(button, input, select):focus-visible { outline: 2px solid var(--qh-accent); outline-offset: 2px; }
@media (max-width: 560px) { .qh-overlay { padding: 10px; } .qh-modal-wide { height: 100%; } }
@media (prefers-reduced-motion: reduce) { .qh-card-menu-btn { transition: none; } }
`;
export const CSS_EXTRA = `
/* ---- Quick note / scratchpad ---- */
.qh-note-list { display: flex; flex-direction: column; gap: 2px; }
.qh-note-row {
  display: flex; align-items: baseline; gap: 8px;
  padding: 5px 4px; border-radius: 8px;
}
.qh-note-row:hover { background: rgba(255, 255, 255, 0.05); }
.qh-note-row .qh-todo-del { visibility: visible; opacity: 0.65; }
.qh-note-row:hover .qh-todo-del, .qh-note-row:focus-within .qh-todo-del { opacity: 1; }
.qh-note-time { flex: none; font-size: 11px; color: var(--qh-text-3); font-variant-numeric: tabular-nums; }
.qh-note-text { flex: 1; min-width: 0; font-size: 13px; color: var(--qh-text); overflow-wrap: break-word; }
.qh-scratchpad {
  width: 100%; resize: vertical; min-height: 72px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent; border-radius: 10px;
  padding: 9px 12px; color: var(--qh-text);
  font: inherit; font-size: 13px; line-height: 1.7; outline: none;
  transition: border-color 0.15s ease;
}
.qh-scratchpad:focus { border-color: rgba(159, 211, 174, 0.4); }
.qh-scratchpad::placeholder { color: var(--qh-text-3); }

/* ---- Habits ---- */
.qh-habit-grid-head, .qh-habit-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(7, 18px) auto;
  align-items: center; gap: 4px;
}
.qh-habit-day {
  font-size: 10px; color: var(--qh-text-3); text-align: center;
  font-variant-numeric: tabular-nums;
}
.qh-habit-day.qh-today { color: var(--qh-accent); font-weight: 600; }
.qh-habit-name {
  font-size: 13px; color: var(--qh-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.qh-habit-dot {
  width: 12px; height: 12px; border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  justify-self: center;
}
.qh-habit-dot.qh-part { background: rgba(159, 211, 174, 0.4); }
.qh-habit-dot.qh-full { background: var(--qh-accent); }
.qh-habit-actions { display: flex; align-items: center; gap: 4px; }
.qh-habit-check {
  width: 20px; height: 20px; border: 1.5px solid var(--qh-text-3); border-radius: 6px;
  background: transparent; color: var(--qh-text-3); cursor: pointer; padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
}
.qh-habit-check:hover { border-color: var(--qh-text-2); color: var(--qh-text-2); }
.qh-habit-check.qh-done { background: var(--qh-accent); border-color: var(--qh-accent); color: #10241a; }
.qh-habit-row .qh-todo-del { visibility: hidden; }
.qh-habit-row:hover .qh-todo-del, .qh-habit-row:focus-within .qh-todo-del { visibility: visible; }
@media (hover: none) { .qh-habit-row .qh-todo-del { visibility: visible; } }

/* ---- Countdown ---- */
.qh-countdown { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 0 4px; }
.qh-countdown-number {
  font-size: 40px; font-weight: 700; color: var(--qh-text);
  font-variant-numeric: tabular-nums; line-height: 1.1;
}
.qh-countdown-unit { font-size: 15px; font-weight: 500; color: var(--qh-text-3); margin-left: 6px; }
.qh-countdown-label { font-size: 12px; color: var(--qh-text-3); }
.qh-shortcut-form input[type='date'] {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 10px;
  padding: 8px 12px; color: var(--qh-text); font-size: 13px; outline: none;
  color-scheme: dark;
}

/* ---- Heatmap ---- */
.qh-heatmap {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  justify-content: start;
}
.qh-heat {
  width: 11px; height: 11px; border-radius: 3px;
  background: rgba(255, 255, 255, 0.07);
}
.qh-heat-1 { background: rgba(159, 211, 174, 0.25); }
.qh-heat-2 { background: rgba(159, 211, 174, 0.45); }
.qh-heat-3 { background: rgba(159, 211, 174, 0.7); }
.qh-heat-4 { background: var(--qh-accent); }
.qh-heat.qh-today { outline: 1px solid rgba(255, 255, 255, 0.55); outline-offset: 1px; }
.qh-card-foot .qh-heat { width: 9px; height: 9px; }
`;
