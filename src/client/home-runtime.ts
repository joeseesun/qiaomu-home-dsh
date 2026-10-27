import OriginalPlugin from "../original/main";
import { HomeView } from "../original/view";
import { WallpaperCache } from "../original/wallpaper/wallpaper";
import { createNamedNote, importFiles } from "../original/actions";
import { ensureTodayNote } from "../original/today";
import { L, currentLanguage } from "../original/i18n";
import {
  Events,
  Modal,
  Setting,
  TFile,
  createEl,
  Notice,
  setRequestTransport,
  disposeSurfaces,
} from "./original-ui";
import { HomeVault } from "./home-vault";
import { legacyMigrationPlan } from "./legacy-migration";
import { createNativeCards } from "./native-cards";
import { HomeSearchModal } from "./home-search";
import { createHomeClientState } from "./home-remote.js";
import { nativeHomeBridge } from "./native-home.js";
import { STORAGE_KEY } from "./store.js";

export async function createHomeRuntime(
  api: any,
  services: any,
  { storage = globalThis.localStorage, version = "0.4.0" }: any = {},
) {
  const state = createHomeClientState(api),
    cleanups: Array<() => void> = [],
    views = new Map<string, any>(),
    commands: Record<string, any> = {},
    settingTabs = new Map<string, any>();
  let disposed = false,
    opened = false,
    attached = false,
    layoutReady = false,
    settingsModal: Modal | null = null,
    plugin: any;
  const root = createEl("div", { cls: "qaudio-dsh-surface qhome-dsh-view" }),
    content = root.createDiv({
      cls: "view-content qhome-dsh-content qaudio-dsh-surface",
    });
  const native = nativeHomeBridge(services, { translate: L });
  const workspace: any = new Events();
  const pendingReady: Array<() => void> = [];
  const assertOpen = () => {
    if (disposed) throw Error("Home has closed");
  };
  const vault = new HomeVault(
    (request: any) => api.workspace(request),
    () => plugin?.eachView((view: any) => void view.renderPhoto()),
  );
  const leaf: any = {
    contentEl: content,
    containerEl: root,
    getRoot: () => workspace.rootSplit,
    view: { containerEl: root, getViewType: () => "empty" },
    getViewState: () => ({ type: "qiaomu-home" }),
    openFile: (file: TFile, options: any) => openNote(file, options),
    async setViewState(value: any) {
      if (value.type !== "qiaomu-home") throw Error("Unsupported Home view");
      native.showHome();
      if (!opened) await mountView();
    },
    updateHeader() {},
  };
  async function openNote(file: TFile, options: any = {}) {
    assertOpen();
    if (!(file instanceof TFile) || !vault.getFileByPath(file.path))
      throw Error("The Home file no longer exists");
    const previous = state.getSnapshot().native?.recentFiles || [];
    await state
      .saveNative({
        recentFiles: [
          file.path,
          ...previous.filter((path: string) => path !== file.path),
        ].slice(0, 200),
      })
      .catch((error: Error) => new Notice(error.message));
    workspace.trigger("file-open", file);
    return native.openFile(file.path, { newPane: options.active !== false });
  }
  function search(query = "") {
    assertOpen();
    new HomeSearchModal(app, (file) => openNote(file), query).open();
  }
  const explorerLeaf: any = {
    getViewState: () => ({ type: "file-explorer" }),
    view: {
      getViewType: () => "file-explorer",
      revealInFolder: (folder: any) => search('path:"' + folder.path + '"'),
    },
    setViewState: async () => {},
    getRoot: () => workspace.leftSplit,
  };
  Object.assign(workspace, {
    rootSplit: {},
    leftSplit: {},
    rightSplit: {},
    getMostRecentLeaf: () => leaf,
    getActiveFile: () => null,
    getLastOpenFiles: () => state.getSnapshot()?.native?.recentFiles || [],
    getLeavesOfType: (type: string) =>
      type === "qiaomu-home" && opened
        ? [leaf]
        : type === "file-explorer"
          ? [explorerLeaf]
          : type === "markdown"
            ? native.openFiles().map((path: string) => ({
                view: {
                  file: vault.getFileByPath(path),
                  getViewType: () => "markdown",
                },
                getViewState: () => ({
                  type: "markdown",
                  state: { file: path },
                }),
                openFile: (file: TFile, options: any) =>
                  openNote(file, options),
              }))
            : [],
    getLeaf: () => leaf,
    getLeftLeaf: () => explorerLeaf,
    iterateAllLeaves: (fn: any) => {
      if (opened) fn(leaf);
    },
    onLayoutReady: (fn: any) => {
      if (layoutReady) fn();
      else pendingReady.push(fn);
    },
    revealLeaf: async (target: any) => {
      if (target === leaf) native.showHome();
    },
    setActiveLeaf: (target: any) => {
      if (target === leaf) workspace.trigger("active-leaf-change", leaf);
    },
  });
  function openSettings(id = "qiaomu-home") {
    assertOpen();
    settingsModal?.close();
    const modal = new Modal(app);
    settingsModal = modal;
    modal.modalEl.addClass("qh-ui");
    if (id === "qiaomu-home") {
      const tab = settingTabs.get("qiaomu-home");
      if (!tab) throw Error("Home settings are loading");
      modal.onOpen = () => {
        modal.contentEl.append(tab.containerEl);
        tab.display();
      };
      modal.onClose = () => {
        tab.hide();
        tab.containerEl.remove();
        if (settingsModal === modal) settingsModal = null;
      };
    } else if (id === "daily-notes" || id === "plugins") {
      modal.setTitle(L("日记设置", "Daily note settings"));
      const settings = { ...state.getSnapshot().daily };
      for (const [key, label] of [
        ["folder", L("文件夹", "Folder")],
        ["format", L("日期格式", "Date format")],
        ["template", L("模板笔记", "Template note")],
      ])
        new Setting(modal.contentEl)
          .setName(label)
          .addText((text: any) =>
            text
              .setValue(settings[key] || "")
              .onChange((value: string) => (settings[key] = value)),
          );
      new Setting(modal.contentEl).addButton((button: any) =>
        button
          .setButtonText(L("保存", "Save"))
          .setCta()
          .onClick(async () => {
            await state.daily(settings);
            workspace.trigger("layout-change");
            modal.close();
          }),
      );
    } else {
      modal.setTitle(L("Harness 插件", "Harness plugins"));
      modal.contentEl.createEl("p", {
        text: L(
          "请在 Harness 的插件管理中安装或启用对应的 DSH 版本。Obsidian 插件需要单独适配。",
          "Install or enable the DSH version in Harness plugin management. Obsidian plugins require adaptation.",
        ),
      });
    }
    modal.open();
  }
  function registerCommand(id: string, command: any) {
    const entry = { ...command, id };
    commands[id] = entry;
    const remove = services.registerCommand?.(id, command.name, () => {
      if (command.checkCallback && command.checkCallback(true) === false)
        return false;
      return () => {
        if (command.callback) return command.callback();
        return command.checkCallback?.(false);
      };
    });
    return () => {
      if (commands[id] === entry) delete commands[id];
      remove?.();
    };
  }
  const app: any = {
    vault,
    workspace,
    metadataCache: vault.metadataCache,
    plugins: { plugins: {}, manifests: {} },
    commands: {
      commands,
      executeCommandById(id: string) {
        const command = commands[id];
        if (!command) return false;
        if (command.checkCallback && command.checkCallback(true) === false)
          return false;
        Promise.resolve()
          .then(() =>
            command.callback
              ? command.callback()
              : command.checkCallback(false),
          )
          .catch((error) => new Notice(error.message));
        return true;
      },
    },
    secretStorage: {
      getSecret: (id: string) =>
        state.getSnapshot()?.credentialIds.includes(id)
          ? "home-keychain:" + id
          : "",
      listSecrets: () => state.getSnapshot()?.credentialIds || [],
      setSecret: (id: string, value: string) => state.secret(id, value),
    },
    setting: {
      open() {},
      openTabById: openSettings,
      close: () => settingsModal?.close(),
    },
    internalPlugins: {
      getPluginById: (id: string) =>
        id === "daily-notes"
          ? {
              instance: {
                get options() {
                  return state.getSnapshot().daily;
                },
              },
            }
          : id === "global-search"
            ? { instance: { openGlobalSearch: search } }
            : null,
    },
    fileManager: {
      processFrontMatter: (file: TFile, change: any) =>
        vault.processFrontMatter(file, change),
      getNewFileParent: () => vault.getRoot(),
      async getAvailablePathForAttachment(name: string) {
        const safe = name.replace(/[\\/:*?"<>|]/g, "_");
        for (let index = 0; index < 1000; index++) {
          const path = "Attachments/" + (index ? index + "-" : "") + safe;
          if (!(await vault.adapter.exists(path))) return path;
        }
        throw Error("No free attachment name");
      },
    },
    home: {
      state,
      registerView: (type: string, factory: any) => views.set(type, factory),
      registerSettings: (tab: any) => settingTabs.set("qiaomu-home", tab),
      registerCommand,
      // The Harness sidebar owns the ribbon; retain its original action for that launcher.
      registerLauncher: (launcher: any) => {
        app.home.launcher = launcher;
        return root;
      },
      search,
    },
  };
  leaf.app = app;
  async function mountView() {
    if (opened || disposed) return;
    if (!attached) return;
    const factory = views.get("qiaomu-home");
    if (!factory) throw Error("Home view is not ready");
    leaf.view = factory(leaf);
    opened = true;
    await leaf.view.onOpen();
    if (disposed) return;
    layoutReady = true;
    for (const fn of pendingReady.splice(0)) fn();
  }
  try {
    await state.load();
    const raw = storage?.getItem(STORAGE_KEY);
    if (raw && !state.getSnapshot().legacyImported)
      await state.migrate(await legacyMigrationPlan(raw, currentLanguage()));
    assertOpen();
    await vault.sync();
    native.setRoot(vault.root);
    cleanups.push(
      setRequestTransport(async (request: any) => {
        const response = await api.network(request);
        const bytes = Uint8Array.from(atob(response.base64 || ""), (char) =>
          char.charCodeAt(0),
        );
        return { ...response, arrayBuffer: bytes.buffer };
      }),
    );
    plugin = new OriginalPlugin(app, {
      id: "qiaomu-home",
      name: "Qiaomu Home",
      version,
      dir: "Cache/Home",
    });
    await plugin.onload();
    const cards = createNativeCards(plugin, native, state, storage);
    app.home.renderNativeModules = cards.render;
    cleanups.push(() => cards.dispose());
    plugin.wallpaper.cache = new WallpaperCache(app, "Cache/Wallpapers");
    const register = (id: string, name: string, callback: any) =>
      cleanups.push(registerCommand(id, { name, callback }));
    register("daily-notes", L("打开今日日记", "Open daily note"), async () =>
      openNote(await ensureTodayNote(app)),
    );
    register("global-search:open", L("搜索笔记", "Search notes"), () =>
      search(),
    );
    register(
      "file-explorer:new-file-in-current-tab",
      L("新建笔记", "New note"),
      () =>
        createNamedNote(
          app,
          leaf,
          L("未命名", "Untitled"),
          plugin.settings.createFolder,
        ),
    );
    register("file-explorer:new-folder", L("新建文件夹", "New folder"), () => {
      const modal = new Modal(app);
      modal.modalEl.addClass("qh-ui");
      modal.setTitle(L("新建文件夹", "New folder"));
      let folder = "";
      new Setting(modal.contentEl)
        .setName(L("文件夹名称", "Folder name"))
        .addText((text: any) =>
          text.onChange((value: string) => (folder = value)),
        );
      new Setting(modal.contentEl).addButton((button: any) =>
        button
          .setButtonText(L("创建", "Create"))
          .setCta()
          .onClick(async () => {
            if (!folder.trim()) throw Error(L("请输入名称", "Enter a name"));
            await vault.createFolder(folder.trim());
            modal.close();
          }),
      );
      modal.open();
    });
    const syncProviders = () => {
      const plugins: Record<string, any> = {},
        manifests: Record<string, any> = {};
      for (const entry of services.providers?.originalSources() || []) {
        plugins[entry.id] = { qiaomuHome: entry.provider };
        manifests[entry.id] = { name: entry.label };
      }
      plugins["qiaomu-agent"] = {
        ...plugins["qiaomu-agent"],
        api: {
          protocol: "qiaomu-agent",
          version: 1,
          compose: (request: any) =>
            native.compose(request.prompt, { submit: request.submit }),
        },
      };
      app.plugins.plugins = plugins;
      app.plugins.manifests = manifests;
      workspace.trigger("qiaomu-home:changed");
    };
    if (services.providers) {
      cleanups.push(
        services.providers.register("qiaomu-harness", native.provider, {
          label: "Harness",
        }),
      );
      cleanups.push(services.providers.subscribe(syncProviders));
      syncProviders();
      cleanups.push(
        native.subscribe(() => {
          void services.providers.changed("qiaomu-harness");
          workspace.trigger("layout-change");
        }),
      );
    }
    if (!state.getSnapshot().data) {
      const page = plugin.settings.pages[0];
      page.moduleOrder.push("section:qiaomu-harness:recent");
      page.moduleOptions["section:qiaomu-harness:recent"] = {
        visible: true,
        limit: 6,
      };
      await plugin.saveSettings({ rerender: false });
    }
    const sync = () => {
      if (attached && !disposed)
        void vault.sync().catch((error) => new Notice(error.message));
    };
    const timer = setInterval(sync, 15000);
    cleanups.push(() => clearInterval(timer));
    window.addEventListener("focus", sync);
    cleanups.push(() => window.removeEventListener("focus", sync));
  } catch (error) {
    disposed = true;
    plugin?.unload();
    vault.dispose();
    native.dispose();
    state.dispose();
    for (const fn of cleanups.reverse()) await fn();
    throw error;
  }
  return {
    app,
    plugin,
    state,
    vault,
    native,
    root,
    async attach(container: HTMLElement) {
      assertOpen();
      container.append(root);
      attached = true;
      await mountView();
      workspace.trigger("active-leaf-change", leaf);
      workspace.trigger("layout-change");
    },
    detach(container: HTMLElement) {
      if (root.parentElement === container) {
        root.remove();
        attached = false;
      }
    },
    openSettings,
    search,
    async dispose() {
      if (disposed) return;
      disposed = true;
      settingsModal?.close();
      if (opened) {
        await leaf.view.onClose();
        leaf.view.unload();
      }
      plugin.unload();
      for (const fn of cleanups.reverse()) await fn();
      vault.dispose();
      native.dispose();
      state.dispose();
      root.remove();
      disposeSurfaces();
    },
  };
}
