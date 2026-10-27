import React, { useEffect, useRef, useState } from "react";
import { createProviderRegistry } from "./providers.js";
import { createHomeRuntime } from "./home-runtime";
import { HOME_REMOTE, homeRemoteApi } from "./home-remote.js";
import { watchHostTheme, applyHostTheme, setHostLanguage } from "./harness-ui";
import { setLanguage, L } from "../original/i18n";
import originalCss from "../original/styles.css";
import hostCss from "./harness-ui.css";
import boundaryCss from "./home-boundary.css";
import { zh, en } from "./locale.js";
import { IconHome } from "./icons.jsx";
const PANEL_ID = "qiaomu-home",
  NS = "qiaomuHome";
export const inject = [
  "slots",
  "remote",
  "locale",
  "sessions",
  "workspaces",
  "uiWorkspace",
  "sidebarRight",
  "uiSession",
  "layout",
];
export function apply(ctx) {
  const providers = createProviderRegistry(),
    listeners = new Set(),
    commandRegistrations = new Map();
  let runtime = null,
    error = "",
    disposed = false,
    generation = 0,
    shortcuts = null;
  const notify = () => {
    for (const fn of listeners) fn();
  };
  const locale = () => {
    const language = ctx.locale.bind(NS)("language");
    setHostLanguage(language === "zh" ? "zh" : "en");
  };
  ctx.effect(() =>
    ctx.locale.register(NS, {
      zh: { ...zh, language: "zh" },
      en: { ...en, language: "en" },
    }),
  );
  locale();
  ctx.effect(watchHostTheme);
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = "qiaomu-home-dsh";
    style.textContent = hostCss + originalCss + boundaryCss;
    document.head.append(style);
    return () => style.remove();
  });
  ctx.effect(() => ctx.provide("qiaomuHome", providers));
  const installCommand = (entry) => {
    if (!shortcuts) return;
    entry.remove = shortcuts.register({
      id: entry.id,
      label: () => "Qiaomu Home · " + entry.name,
      aliases: [entry.name],
      defaults: {},
      regions: ["page", "editable"],
      modals: [],
      resolve: () => {
        const run = entry.resolve();
        return run
          ? { status: "handled", run }
          : {
              status: "blocked",
              reason: L(
                "此操作当前不可用",
                "This action is currently unavailable",
              ),
            };
      },
    });
  };
  ctx.inject(["shortcuts"], (ready) => {
    shortcuts = ready.shortcuts;
    for (const entry of commandRegistrations.values()) installCommand(entry);
    return () => {
      for (const entry of commandRegistrations.values()) {
        entry.remove?.();
        entry.remove = null;
      }
      shortcuts = null;
    };
  });
  const services = Object.fromEntries(
    inject
      .filter((key) => !["slots", "remote", "locale"].includes(key))
      .map((key) => [key, ctx[key]]),
  );
  services.providers = providers;
  services.registerCommand = (id, name, resolve) => {
    const entry = { id, name, resolve, remove: null };
    commandRegistrations.set(id, entry);
    installCommand(entry);
    return () => {
      entry.remove?.();
      commandRegistrations.delete(id);
    };
  };
  ctx.effect(() => () => {
    disposed = true;
    generation++;
    void runtime?.dispose();
    runtime = null;
    for (const entry of commandRegistrations.values()) entry.remove?.();
    commandRegistrations.clear();
    providers.dispose();
    listeners.clear();
  });
  ctx.remote
    .$mount(HOME_REMOTE)
    .then(() => {
      if (disposed) return;
      ctx.inject(["remote.qiaomuHomeState"], (ready) => {
        const epoch = ++generation;
        const api = homeRemoteApi(ready.remote.qiaomuHomeState);
        void createHomeRuntime(api, services)
          .then(async (value) => {
            if (disposed || epoch !== generation) {
              await value.dispose();
              return;
            }
            runtime = value;
            error = "";
            notify();
            if (value.plugin.settings.openOnStartup)
              services.layout.selectPanel(PANEL_ID);
          })
          .catch((failure) => {
            if (!disposed && epoch === generation) {
              error = failure.message;
              notify();
            }
          });
        return () => {
          generation++;
          void runtime?.dispose();
          runtime = null;
          notify();
        };
      });
    })
    .catch((failure) => {
      if (!disposed) {
        error = failure.message;
        notify();
      }
    });
  function Panel() {
    const ref = useRef(null),
      [, render] = useState(0),
      language = ctx.locale.bind(NS)("language");
    useEffect(() => {
      const update = () => render((value) => value + 1);
      listeners.add(update);
      return () => listeners.delete(update);
    }, []);
    useEffect(() => {
      locale();
      if (!runtime) return;
      setLanguage(runtime.plugin.settings.language);
      runtime.plugin.eachView((view) => view.render());
      applyHostTheme();
    }, [language, runtime]);
    useEffect(() => {
      const active = runtime,
        container = ref.current;
      if (!active || !container) return;
      void active
        .attach(container)
        .then(applyHostTheme)
        .catch((failure) => {
          error = failure.message;
          notify();
        });
      return () => active.detach(container);
    }, [runtime]);
    return (
      <div className="qaudio-dsh-surface qhome-dsh-host" ref={ref}>
        {!runtime && (
          <div className="qh-card-empty" role={error ? "alert" : "status"}>
            {error || L("正在打开 Home…", "Opening Home…")}
          </div>
        )}
      </div>
    );
  }
  ctx.effect(() =>
    ctx.slots.inject("main", () =>
      ctx.slots.register({ name: "main", key: PANEL_ID, locale: NS }, Panel),
    ),
  );
  ctx.effect(() =>
    ctx.slots.inject("sidebar.panellist", () =>
      ctx.slots.register(
        {
          name: "sidebar.panellist",
          id: PANEL_ID,
          order: -20,
          locale: NS,
          label: () => ctx.locale.bind(NS)("panel.title"),
        },
        ({ size }) => <IconHome size={size ?? 18} />,
      ),
    ),
  );
}
