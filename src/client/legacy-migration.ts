import { loadState } from "./store.js";
import { quickNotesMarkdown, DAILY_QUESTIONS, dailyIndex } from "./data.js";
import { normalizeSettings, sectionKey } from "../original/settings";
import { stringify } from "yaml";
const CARD_MAP: Record<string, string[]> = {
  dailyFocus: ["daily-focus"],
  todo: ["todo"],
  recent: [sectionKey("qiaomu-harness", "recent")],
  quickNote: ["quick-capture", "inbox-preview"],
  scratchpad: ["dsh-scratchpad"],
  dailyQuestion: ["dsh-daily-question"],
  heatmap: ["dsh-session-activity"],
  focus: ["focus-timer"],
  habit: ["habit-checkin"],
  ambient: ["ambient-sound"],
  progress: ["day-progress"],
  worldclock: ["world-clock"],
  quote: ["daily-quote"],
  multiSearch: ["multi-search"],
  weather: ["weather"],
  countdown: ["countdown"],
};
const PAGE_NAMES: Record<string, [string, string]> = {
  home: ["主页", "Home"],
  notes: ["笔记", "Notes"],
  focus: ["专注", "Focus"],
  explore: ["探索", "Explore"],
  reading: ["阅读", "Reading"],
  work: ["工作", "Work"],
  rhythm: ["节奏", "Rhythm"],
};
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
/** Pure plan; the Host archives the exact input and installs it atomically/idempotently. */
export async function legacyMigrationPlan(raw: string, language = "zh") {
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
    throw Error("Invalid previous Home data");
  const id = Array.from(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw)),
    ),
    (byte) => byte.toString(16).padStart(2, "0"),
  )
    .join("")
    .slice(0, 24);
  const prefix = `Imported/Home-0.3/${id}`,
    state = loadState({ getItem: () => raw }),
    files: Array<{ path: string; text: string }> = [];
  const settings = normalizeSettings(null);
  settings.homeShortcutsSeeded = true;
  settings.todoDaily = false;
  settings.todoPath = prefix + "/Todo.md";
  settings.captureInboxPath = prefix + "/Inbox.md";
  settings.captureTarget = "inbox";
  settings.headline = state.headline ? "custom" : "clock";
  settings.customHeadline = state.headline;
  settings.wallpaper.source =
    state.wallpaperMode === "gradient" ? "none" : "curated";
  settings.wallpaper.rotation =
    state.wallpaperMode === "open" ? "open" : "daily";
  settings.countdown = state.countdown;
  settings.dailyFocus = {
    day: state.dailyFocus.date,
    items: state.dailyFocus.items,
  };
  settings.focusSession = {
    kind: "focus",
    label: "",
    durationMinutes: state.focus.minutes,
    focusMinutes: state.focus.minutes,
    endAt: state.focus.endAt,
    remainingMs: state.focus.remainingMs,
  };
  const groups = state.shortcutGroups.map((group: any) => ({
    id: group.id,
    name: group.name,
    items: group.items.map((item: any) => ({
      id: item.id,
      kind: "url",
      target: item.url,
      name: item.label,
      icon:
        ({ book: "book-open", pen: "pencil" } as any)[item.icon] || item.icon,
    })),
  }));
  const mapCard = (id: string) =>
    id === "shortcuts"
      ? ["shortcut:home-shortcuts"]
      : id.startsWith("shortcut:")
        ? [id]
        : id.startsWith("plugin:")
          ? [sectionKey(id.split(":")[1], id.split(":")[2])]
          : CARD_MAP[id] || [id];
  const habitNames: Record<string, string> = Object.create(null);
  const usedNames = new Set<string>();
  const reserved = new Set([
    "__proto__",
    "constructor",
    "prototype",
    "tags",
    "aliases",
    "cssclasses",
    "position",
    "focus",
    "focus_done",
  ]);
  for (const habit of state.habits) {
    if (
      !habit ||
      typeof habit.name !== "string" ||
      typeof habit.id !== "string"
    )
      continue;
    let base =
      habit.name
        .replace(/[,，:：#[\]{}|>]/g, " ")
        .trim()
        .slice(0, 24) || "Habit";
    if (reserved.has(base)) base = "Habit " + base;
    let name = base,
      index = 2;
    while (usedNames.has(name)) name = base.slice(0, 24) + " " + index++;
    usedNames.add(name);
    habitNames[habit.id] = name;
  }
  const habitSpecs = state.habits
    .filter((habit: any) => habitNames[habit?.id])
    .map(
      (habit: any) =>
        habitNames[habit.id] + (habit.target > 1 ? ":" + habit.target : ""),
    );
  settings.pages = state.tabs.map((tab: any) => {
    const moduleOrder = [...new Set<string>(tab.cards.flatMap(mapCard))];
    const moduleOptions: Record<string, any> = {};
    for (const id of tab.cards)
      for (const mapped of mapCard(id))
        moduleOptions[mapped] = {
          visible: true,
          limit: tab.options?.[id]?.limit || 3,
          ...(tab.options?.[id] || {}),
        };
    if (moduleOptions["habit-checkin"])
      moduleOptions["habit-checkin"].query = habitSpecs.slice(0, 8).join(", ");
    if (moduleOptions.weather && state.weatherPlace)
      moduleOptions.weather.location = { ...state.weatherPlace };
    return {
      id: tab.id,
      name:
        tab.name ||
        PAGE_NAMES[tab.id]?.[language.startsWith("zh") ? 0 : 1] ||
        tab.id,
      moduleOrder,
      moduleOptions,
      shortcutGroups: groups
        .filter((group: any) => moduleOrder.includes("shortcut:" + group.id))
        .map((group: any) => structuredClone(group)),
      defaultVisible: false,
      showRecommendations: false,
    };
  });
  settings.activePageId = state.tab;
  settings.homePageId = settings.pages.some((page) => page.id === "home")
    ? "home"
    : settings.pages[0]?.id || "home";
  // Preserve active habits beyond the original per-card limit on additional original pages.
  for (let offset = 8; offset < habitSpecs.length; offset += 8) {
    const pageId = "imported-habits-" + offset;
    settings.pages.push({
      id: pageId,
      name:
        (language.startsWith("zh") ? "习惯 " : "Habits ") + (offset / 8 + 1),
      moduleOrder: ["habit-checkin"],
      moduleOptions: {
        "habit-checkin": {
          visible: true,
          limit: 3,
          query: habitSpecs.slice(offset, offset + 8).join(", "),
        },
      },
      shortcutGroups: [],
      defaultVisible: false,
      showRecommendations: false,
    });
  }
  files.push({
    path: settings.todoPath,
    text:
      state.todos
        .filter((todo: any) => typeof todo.text === "string")
        .map(
          (todo: any) =>
            `- [${todo.done ? "x" : " "}] ${todo.text.replace(/\r?\n/g, "\n  ")}`,
        )
        .join("\n") + "\n",
  });
  files.push({
    path: settings.captureInboxPath,
    text: quickNotesMarkdown(state.quickNotes) + "\n",
  });
  files.push({ path: prefix + "/Scratchpad.md", text: state.scratchpad });
  const questions = DAILY_QUESTIONS[language.startsWith("zh") ? "zh" : "en"];
  files.push({
    path: prefix + "/Daily questions.md",
    text: Object.entries(state.answers)
      .filter(
        ([date, answer]) =>
          datePattern.test(date) && typeof answer === "string",
      )
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([date, answer]) =>
          `## ${date}\n\n${questions[dailyIndex(date, questions.length)]}\n\n${answer}\n`,
      )
      .join("\n"),
  });
  const days = new Map<string, Record<string, any>>();
  for (const habit of state.habits) {
    if (!habitNames[habit?.id]) continue;
    for (const [date, count] of Object.entries(
      state.habitLog[habit.id] || {},
    )) {
      if (
        !datePattern.test(date) ||
        typeof count !== "number" ||
        !Number.isFinite(count)
      )
        continue;
      const properties = days.get(date) || {};
      properties[habitNames[habit.id]] = habit.target > 1 ? count : count > 0;
      days.set(date, properties);
    }
  }
  if (datePattern.test(state.dailyFocus.date)) {
    const properties = days.get(state.dailyFocus.date) || {};
    properties.focus = state.dailyFocus.items.map((item: any) => item.text);
    properties.focus_done = state.dailyFocus.items
      .filter((item: any) => item.done)
      .map((item: any) => item.text);
    days.set(state.dailyFocus.date, properties);
  }
  for (const [date, properties] of [...days].sort(([a], [b]) =>
    a.localeCompare(b),
  ))
    files.push({
      path: prefix + "/Daily/" + date + ".md",
      text: "---\n" + stringify(properties) + "---\n",
    });
  return {
    raw,
    id,
    settings: normalizeSettings(settings),
    files,
    daily: { folder: prefix + "/Daily", format: "YYYY-MM-DD", template: "" },
    compatibility: {
      scratchpadPath: prefix + "/Scratchpad.md",
      questionPath: prefix + "/Daily questions.md",
      sessionActivity: true,
      legacyState: state,
      habitNames,
    },
  };
}
