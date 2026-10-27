import { L, currentLanguage } from "../original/i18n";
import { moduleOptions, localDay } from "../original/settings";
import { cardAction } from "../original/card-ui";
import { renderExtra } from "../original/extra-ui";
import { Notice } from "./original-ui";
import { DAILY_QUESTIONS, dailyIndex } from "./data.js";

export function nativeModules() {
  return [
    {
      id: "dsh-scratchpad",
      title: L("便签", "Scratchpad"),
      icon: "notebook-pen",
      description: L(
        "随手记录，自动保存到 Markdown 笔记。",
        "Write freely and save automatically to Markdown.",
      ),
    },
    {
      id: "dsh-daily-question",
      title: L("每日一问", "Daily question"),
      icon: "circle-help",
      description: L(
        "每天回答一个问题，保留每一天的记录。",
        "Answer one question each day and keep your journal.",
      ),
    },
    {
      id: "dsh-session-activity",
      title: L("对话足迹", "Conversation activity"),
      icon: "calendar-days",
      description: L(
        "查看 Harness 会话的创建和更新日期。",
        "See when Harness conversations were created and updated.",
      ),
    },
  ].map((item) => ({ ...item, source: "Harness", status: "ready" as const }));
}

export function questionSection(text: string, date: string) {
  const headings = [...text.matchAll(/^## (\d{4}-\d{2}-\d{2})\s*$/gm)];
  const index = headings.findIndex((match) => match[1] === date);
  if (index < 0) return { before: text, section: "", after: "" };
  const start = headings[index].index!,
    end = headings[index + 1]?.index ?? text.length;
  return {
    before: text.slice(0, start),
    section: text.slice(start, end),
    after: text.slice(end),
  };
}

/** Drafts survive original card re-renders, navigation and reloads. CAS never replaces external edits. */
export function createNativeCards(
  plugin: any,
  native: any,
  state: any,
  storage: any,
) {
  const drafts = new Map<string, any>();
  let closed = false;
  const storageKey = (key: string) => "qiaomu-home-dsh/draft/" + key;
  const remember = (draft: any) => {
    try {
      storage?.setItem(
        storageKey(draft.key),
        JSON.stringify({
          base: draft.base,
          value: draft.value,
          dirty: draft.dirty,
        }),
      );
    } catch {
      if (!draft.storageError) {
        draft.storageError = true;
        new Notice(
          L(
            "草稿无法写入浏览器存储，请保存笔记后再关闭。",
            "Draft storage is unavailable. Save the note before closing.",
          ),
        );
      }
    }
  };
  function getDraft(path: string, date: string, question: string) {
    const key = path + "#" + date;
    if (drafts.has(key)) return drafts.get(key);
    const draft: any = {
      key,
      path,
      date,
      question,
      base: null,
      value: "",
      dirty: false,
      timer: null,
      running: null,
      listeners: new Set(),
      error: "",
    };
    drafts.set(key, draft);
    draft.ready = (async () => {
      const exists = await plugin.app.vault.adapter.exists(path);
      draft.base = exists ? await plugin.app.vault.adapter.read(path) : null;
      if (date) {
        const section = questionSection(draft.base || "", date).section;
        draft.value = section
          .replace(/^## \d{4}-\d{2}-\d{2}\s*\n+[^\n]*\n*/, "")
          .replace(/\n+$/, "");
      } else draft.value = draft.base || "";
      try {
        const saved = JSON.parse(storage?.getItem(storageKey(key)) || "null");
        if (
          saved?.dirty === true &&
          typeof saved.value === "string" &&
          (saved.base === null || typeof saved.base === "string")
        ) {
          draft.base = saved.base;
          draft.value = saved.value;
          draft.dirty = true;
        }
      } catch {}
    })();
    return draft;
  }
  const notify = (draft: any) => {
    for (const update of [...draft.listeners]) update();
  };
  async function save(draft: any): Promise<void> {
    clearTimeout(draft.timer);
    await draft.ready;
    if (draft.running) {
      await draft.running;
      if (draft.dirty) return save(draft);
      return;
    }
    if (!draft.dirty) return;
    const value = draft.value,
      base = draft.base;
    let text = value;
    if (draft.date) {
      const parts = questionSection(base || "", draft.date);
      text =
        parts.before +
        (parts.before && !parts.before.endsWith("\n\n") ? "\n" : "") +
        `## ${draft.date}\n\n${draft.question}\n\n${value}\n\n` +
        parts.after;
    }
    draft.error = "";
    draft.running = plugin.app.vault
      .replaceSnapshot(draft.path, base, text)
      .then(() => {
        draft.base = text;
        draft.dirty = draft.value !== value;
        if (draft.dirty) remember(draft);
        else {
          try {
            storage?.removeItem(storageKey(draft.key));
          } catch {}
        }
      })
      .catch((error: Error) => {
        draft.error = error.message;
        remember(draft);
        throw error;
      })
      .finally(() => {
        draft.running = null;
        notify(draft);
      });
    notify(draft);
    await draft.running;
    if (draft.dirty && !closed) return save(draft);
  }
  function editor(card: any, path: string, date = "") {
    const questions =
      DAILY_QUESTIONS[currentLanguage().startsWith("zh") ? "zh" : "en"];
    const question = date ? questions[dailyIndex(date, questions.length)] : "";
    const body = card.createDiv({ cls: "qh-native-preview" });
    if (question) body.createDiv({ cls: "qh-native-line", text: question });
    const field = body.createEl("textarea", {
      cls: "qh-discovery-input qh-capture-input",
      attr: { rows: "5", "aria-label": question || L("便签", "Scratchpad") },
    });
    field.disabled = true;
    const status = body.createDiv({
      cls: "qh-native-scope",
      attr: { "aria-live": "polite" },
    });
    const draft = getDraft(path, date, question);
    const persist = () =>
      void save(draft).catch((error) => new Notice(error.message));
    cardAction(body, L("保存", "Save"), persist, "save");
    const copy = cardAction(
      body,
      L("另存副本", "Save a copy"),
      () => {
        void (async () => {
          await draft.ready;
          const target =
            path.replace(/\.md$/i, "") +
            "-draft-" +
            crypto.randomUUID() +
            ".md";
          await plugin.app.vault.create(
            target,
            date
              ? `## ${date}\n\n${question}\n\n${draft.value}\n`
              : draft.value,
          );
          new Notice(
            L("副本已保存：{path}", "Copy saved: {path}", { path: target }),
          );
        })().catch((error: Error) => new Notice(error.message));
      },
      "files",
    );
    copy.hidden = true;
    cardAction(
      body,
      L("打开笔记", "Open note"),
      () => {
        const file = plugin.app.vault.getFileByPath(path);
        if (file)
          void plugin.app.workspace
            .getLeaf()
            .openFile(file)
            .catch((error: Error) => new Notice(error.message));
        else new Notice(L("请先保存笔记。", "Save the note first."));
      },
      "arrow-up-right",
    );
    const update = () => {
      if (!card.isConnected) {
        draft.listeners.delete(update);
        return;
      }
      copy.hidden = !draft.error;
      status.setText(
        draft.error ||
          (draft.running
            ? L("正在保存…", "Saving…")
            : draft.dirty
              ? L("尚未保存", "Unsaved")
              : L("已保存", "Saved")),
      );
    };
    void draft.ready
      .then(() => {
        if (closed) return;
        field.value = draft.value;
        field.disabled = false;
        draft.listeners.add(update);
        update();
      })
      .catch((error: Error) => {
        status.setText(error.message);
      });
    field.addEventListener("input", () => {
      draft.value = field.value;
      draft.dirty = true;
      draft.error = "";
      remember(draft);
      notify(draft);
      clearTimeout(draft.timer);
      draft.timer = setTimeout(persist, 600);
    });
    field.addEventListener("keydown", (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        persist();
      }
    });
  }
  return {
    render(parent: any, page: string, card: any) {
      for (const item of nativeModules()) {
        if (!moduleOptions(plugin.settings, item.id, page).visible) continue;
        if (item.id === "dsh-session-activity") {
          const rows = native.sessions();
          const activityPlugin = Object.create(plugin);
          activityPlugin.app = {
            ...plugin.app,
            home: { ...plugin.app.home, sessionActivity: true },
            vault: {
              getMarkdownFiles: () =>
                rows.map((row: any) => ({
                  path: row.id + ".md",
                  stat: {
                    ctime: row.createdAt || row.updatedAt,
                    mtime: row.updatedAt || row.createdAt,
                  },
                })),
              getAbstractFileByPath: () => null,
            },
          };
          renderExtra(
            parent,
            activityPlugin,
            "activity-heatmap",
            page,
            () => {},
          );
          const heat = parent.lastElementChild;
          heat.dataset.module = item.id;
          heat.querySelector(".qh-card-title").textContent = item.title;
          continue;
        }
        const compat = state.getSnapshot().compatibility;
        const path =
          item.id === "dsh-scratchpad"
            ? compat?.scratchpadPath || "Home/Scratchpad.md"
            : compat?.questionPath || "Home/Daily questions.md";
        editor(
          card(item.id, item.title, item.icon),
          path,
          item.id === "dsh-daily-question" ? localDay() : "",
        );
      }
    },
    async dispose() {
      closed = true;
      await Promise.allSettled(
        [...drafts.values()].map((draft) => {
          clearTimeout(draft.timer);
          draft.listeners.clear();
          return save(draft);
        }),
      );
      drafts.clear();
    },
  };
}
