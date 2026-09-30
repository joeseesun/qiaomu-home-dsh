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

.qh-scroll {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
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
  position: absolute; top: 14px; right: 16px; z-index: 3;
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
.qh-tab {
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
@media (max-width: 720px) {
  .qh-grid { grid-template-columns: 1fr; }
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
  flex: none; width: 22px; height: 22px;
  border: none; border-radius: 6px; background: none;
  color: var(--qh-text-3); cursor: pointer; padding: 0;
  display: none; align-items: center; justify-content: center;
}
.qh-todo-item:hover .qh-todo-del { display: inline-flex; }
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
@media (max-width: 460px) { .qh-tiles { grid-template-columns: repeat(3, 1fr); } }
.qh-tile {
  position: relative;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 14px 6px 12px;
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
.qh-tile-del {
  position: absolute; top: 4px; right: 4px;
  width: 18px; height: 18px; border: none; border-radius: 50%;
  background: rgba(0, 0, 0, 0.45); color: var(--qh-text-2);
  display: none; align-items: center; justify-content: center;
  cursor: pointer; padding: 0;
}
.qh-tile:hover .qh-tile-del { display: inline-flex; }
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
.qh-city-select {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 9px;
  padding: 6px 8px; color: var(--qh-text); font-size: 12.5px; outline: none;
}
.qh-city-select option { color: #222; }

/* ---- Settings popover ---- */
.qh-popover {
  position: absolute; top: calc(100% + 8px); right: 0; z-index: 6;
  width: 260px;
  background: rgba(14, 19, 17, 0.97);
  border: 1px solid var(--qh-card-border);
  border-radius: 14px;
  backdrop-filter: blur(16px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  padding: 14px;
  display: flex; flex-direction: column; gap: 12px;
}
.qh-popover h3 { margin: 0; font-size: 13px; font-weight: 650; color: var(--qh-text); }
.qh-popover-section { display: flex; flex-direction: column; gap: 6px; }
.qh-popover-label { font-size: 11px; color: var(--qh-text-3); text-transform: none; }
.qh-check-row {
  display: flex; align-items: center; gap: 8px;
  font-size: 12.5px; color: var(--qh-text-2); cursor: pointer;
}
.qh-check-row input { accent-color: #9fd3ae; }
.qh-radio-row { display: flex; gap: 6px; flex-wrap: wrap; }
.qh-popover input[type='text'] {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent; border-radius: 9px;
  padding: 7px 10px; color: var(--qh-text); font-size: 12.5px; outline: none; width: 100%;
}
.qh-popover input[type='text']:focus { border-color: rgba(159, 211, 174, 0.4); }
.qh-gear-wrap { position: relative; }
`;
export const CSS_EXTRA = `
/* ---- Quick note / scratchpad ---- */
.qh-note-list { display: flex; flex-direction: column; gap: 2px; }
.qh-note-row {
  display: flex; align-items: baseline; gap: 8px;
  padding: 5px 4px; border-radius: 8px;
}
.qh-note-row:hover { background: rgba(255, 255, 255, 0.05); }
.qh-note-row:hover .qh-todo-del { display: inline-flex; }
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
.qh-habit-row .qh-todo-del { display: none; }
.qh-habit-row:hover .qh-todo-del { display: inline-flex; }

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
