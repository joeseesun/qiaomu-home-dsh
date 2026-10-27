import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
const temp = await mkdtemp(path.join(tmpdir(), "qhome-original-"));
await build({
  entryPoints: ["src/client/original-components.ts"],
  outfile: path.join(temp, "components.mjs"),
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "chrome120",
  alias: { obsidian: path.resolve("src/client/original-ui.ts") },
  inject: [path.resolve("src/client/original-globals.ts")],
  logLevel: "silent",
});
const ui = await import(pathToFileURL(path.join(temp, "components.mjs")));
const dom = new JSDOM(
  '<!doctype html><html lang="zh"><head></head><body></body></html>',
  { url: "https://home.test", pretendToBeVisual: true },
);
for (const key of [
  "window",
  "document",
  "Node",
  "Element",
  "HTMLElement",
  "SVGElement",
  "HTMLInputElement",
  "HTMLTextAreaElement",
  "CustomEvent",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "MutationObserver",
  "getComputedStyle",
])
  Object.defineProperty(globalThis, key, {
    value: dom.window[key],
    configurable: true,
    writable: true,
  });
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(
  dom.window,
);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(
  dom.window,
);
globalThis.ResizeObserver = class {
  observe() {}
  disconnect() {}
  unobserve() {}
};
globalThis.innerWidth = 1200;
globalThis.innerHeight = 900;
const tick = () => new Promise((resolve) => setTimeout(resolve, 180));
const setup = () => {
  const contentEl = ui.createEl("div");
  document.body.append(contentEl);
  const vault = Object.assign(new ui.Events(), {
    getMarkdownFiles: () => [],
    getFiles: () => [],
    getAllLoadedFiles: () => [],
    getAbstractFileByPath: () => null,
    configDir: "Config",
    adapter: { exists: async () => false },
    getName: () => "Home test",
  });
  const workspace = Object.assign(new ui.Events(), {
    getLeavesOfType: (type) => (type === "qiaomu-home" ? [leaf] : []),
    getMostRecentLeaf: () => leaf,
    getLastOpenFiles: () => [],
    getActiveFile: () => null,
    iterateAllLeaves: (fn) => fn(leaf),
  });
  const app = {
    vault,
    workspace,
    metadataCache: Object.assign(new ui.Events(), {
      getFileCache: () => null,
      resolvedLinks: {},
      unresolvedLinks: {},
    }),
    plugins: { plugins: {}, manifests: {} },
    commands: { commands: {} },
    secretStorage: { listSecrets: () => [], getSecret: () => "" },
  };
  const leaf = { app, contentEl };
  const saved = [];
  const cleanups = [];
  const plugin = {
    app,
    manifest: { id: "qiaomu-home", version: "0.4.0" },
    settings: ui.normalizeSettings(null),
    taskIndex: new ui.HomeTaskIndex(app),
    ambient: new ui.AmbientPlayer(),
    register: (fn) => cleanups.push(fn),
    eachView: (fn) => leaf.view && fn(leaf.view),
    saveSettings: async () => {
      saved.push(structuredClone(plugin.settings));
      leaf.view?.render();
    },
    openSettings: () => {},
    openHome: async () => leaf.view,
    updateNotes: {
      addButton: (el) => el.createEl("button", { text: "Release notes" }),
    },
  };
  plugin.settings.wallpaper.source = "none";
  plugin.settings.todoDaily = false;
  plugin.wallpaper = new ui.WallpaperService(plugin);
  leaf.view = new ui.HomeView(leaf, plugin);
  return {
    plugin,
    leaf,
    saved,
    async close() {
      await leaf.view.onClose();
      leaf.view.unload();
      for (const fn of cleanups) fn();
      plugin.ambient.destroy();
      contentEl.remove();
      ui.disposeSurfaces();
    },
  };
};
test.after(async () => {
  ui.disposeSurfaces();
  dom.window.close();
  await rm(temp, { recursive: true, force: true });
});
test("original CSS is byte-identical to the frozen 0.9.2 source", async () => {
  const source = JSON.parse(
    await readFile("vendor/qiaomu-home/source.json", "utf8"),
  );
  assert.equal(
    createHash("sha256")
      .update(await readFile("src/original/styles.css"))
      .digest("hex"),
    source.files["styles.css"],
  );
});
test("vendored sources reconcile exactly to upstream after reversing documented host patches", async () => {
  const source = JSON.parse(
    await readFile("vendor/qiaomu-home/source.json", "utf8"),
  );
  for (const [file, expected] of Object.entries(source.files)) {
    let bytes = await readFile(
      file === "styles.css"
        ? "src/original/styles.css"
        : file.replace(/^src\//, "src/original/"),
    );
    if (file === "src/wallpaper/glass.ts")
      bytes = Buffer.from(
        bytes
          .toString()
          .replace(
            "node instanceof HTMLElement",
            "node.instanceOf(HTMLElement)",
          ),
      );
    if (file === "src/main.ts")
      bytes = Buffer.from(
        bytes
          .toString()
          .replace(
            "import { UPDATE_ENTRIES } from '../client/home-release';",
            "import { UPDATE_ENTRIES } from './update-notes-release';",
          )
          .replace(
            "    // Harness owns its pane dividers; Home styles only its own surfaces.",
            "    watchPaneDividers(this);",
          ),
      );
    const patches = JSON.parse(
      await readFile("vendor/qiaomu-home/patches.json", "utf8"),
    );
    for (const [original, adapted] of (patches[file] || []).slice().reverse()) {
      assert.equal(
        bytes.toString().split(adapted).length,
        2,
        `Exact host patch: ${file}`,
      );
      bytes = Buffer.from(bytes.toString().replace(adapted, original));
    }
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      expected,
      file,
    );
  }
});
test("original HomeView renders every preset and releases its lifecycle without patching global DOM", async () => {
  const fixture = setup();
  ui.setLanguage("zh");
  try {
    assert.equal(HTMLElement.prototype.createDiv, undefined);
    await fixture.leaf.view.onOpen();
    await tick();
    assert(document.querySelector(".qh-root .qh-head"));
    assert(document.querySelector(".qh-pages"));
    assert(document.querySelector(".qh-grid .qh-card"));
    assert(document.querySelector(".qh-photo"));
    for (const page of fixture.plugin.settings.pages) {
      fixture.plugin.settings.activePageId = page.id;
      fixture.leaf.view.render();
      await tick();
      assert(document.querySelector(".qh-grid"), page.id);
    }
    assert.equal(HTMLElement.prototype.createDiv, undefined);
    assert.equal(document.body.createDiv, undefined);
  } finally {
    await fixture.close();
  }
  assert.equal(document.querySelector(".qh-root"), null);
});
test("original library filters modules, adds to a chosen page, and settings preserve four native sections", async () => {
  const fixture = setup();
  ui.setLanguage("zh");
  try {
    await fixture.leaf.view.onOpen();
    await tick();
    const library = new ui.ModuleLibrary(fixture.plugin, "home");
    library.open();
    await tick();
    const cards = [...document.querySelectorAll(".qh-library-module")];
    assert(cards.length > 30);
    const search = document.querySelector(
      ".qh-library-modal input[type=search]",
    );
    search.value = "世界时钟";
    search.dispatchEvent(new Event("input", { bubbles: true }));
    await tick();
    const card = document.querySelector(".qh-library-module");
    assert(card.textContent.includes("世界时钟"));
    const add = [...card.querySelectorAll("button")].find((el) =>
      el.textContent.includes("添加"),
    );
    assert(add);
    add.click();
    await tick();
    assert(fixture.saved.length);
    assert.equal(
      fixture.plugin.settings.pages.find((p) => p.id === "home").moduleOptions[
        "world-clock"
      ].visible,
      true,
    );
    library.close();
    const setting = new ui.HomeSettingTab(fixture.plugin.app, fixture.plugin);
    document.body.append(setting.containerEl);
    setting.display();
    assert.equal(setting.containerEl.querySelectorAll("[role=tab]").length, 4);
    for (const index of [1, 2, 3, 0]) {
      setting.containerEl.querySelectorAll("[role=tab]")[index].click();
      assert(
        setting.containerEl.querySelector(".qh-settings-body").children.length,
      );
    }
    setting.hide();
    setting.containerEl.remove();
  } finally {
    await fixture.close();
  }
});
test("original pickers support keyboard choice and notice Undo keeps its live callback", async () => {
  let chosen = "";
  class Picker extends ui.FuzzySuggestModal {
    getItems() {
      return ["Alpha", "Beta"];
    }
    getItemText(item) {
      return item;
    }
    onChooseItem(item) {
      chosen = item;
    }
  }
  const picker = new Picker({});
  picker.open();
  await tick();
  picker.inputEl.value = "bt";
  picker.inputEl.dispatchEvent(new Event("input"));
  await tick();
  picker.inputEl.dispatchEvent(
    new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
  );
  await tick();
  assert.equal(chosen, "Beta");
  assert.equal(picker.opened, false);
  let undone = false;
  const fragment = ui.createFragment((el) =>
    el
      .createEl("button", { text: "Undo" })
      .addEventListener("click", () => (undone = true)),
  );
  const notice = new ui.Notice(fragment, 0);
  notice.el.querySelector("button").click();
  assert(undone);
  notice.hide();
});
test("original note actions use real disk: capture, task completion and Undo, daily templates and focus metadata", async () => {
  const { HomeWorkspace } = await import("../src/host/workspace.js");
  const { writeFile } = await import("node:fs/promises");
  const dir = await mkdtemp(path.join(tmpdir(), "qhome-actions-"));
  const workspace = new HomeWorkspace(dir),
    vault = new ui.HomeVault((request) => workspace.operate(request));
  const app = {
    vault,
    metadataCache: vault.metadataCache,
    workspace: { getLeavesOfType: () => [] },
    commands: { commands: { "daily-notes": { id: "daily-notes" } } },
    internalPlugins: {
      getPluginById: () => ({
        instance: {
          options: {
            folder: "Daily",
            format: "YYYY-MM-DD",
            template: "Template",
          },
        },
      }),
    },
    fileManager: {
      processFrontMatter: (file, change) =>
        vault.processFrontMatter(file, change),
    },
  };
  const plugin = {
    app,
    settings: ui.normalizeSettings(null),
    saveSettings: async () => {},
  };
  try {
    await workspace.write({
      path: "Template.md",
      text: "---\n# Retain my comment\ntags: [daily]\ncustom: retained\n---\n# {{title}}\n",
    });
    await vault.sync();
    await ui.captureNote(app, plugin.settings, "First thought\nsecond line");
    assert.match(
      (await workspace.read("Inbox.md")).text,
      /- First thought\n  second line/,
    );
    const taskFile = await vault.create(
      "Home Todo.md",
      "Header\n- [ ] Ship migration\n",
    );
    const snapshot = await vault.read(taskFile),
      item = ui.readTodos(snapshot)[0];
    await writeFile(
      path.join(dir, taskFile.path),
      "External heading\n" + snapshot,
    );
    await vault.process(taskFile, (current) =>
      ui.completeTodo(current, snapshot, item),
    );
    assert.match(
      (await workspace.read(taskFile.path)).text,
      /External heading[\s\S]*\[x\] Ship migration/,
    );
    await vault.process(taskFile, (current) =>
      ui.reopenTodo(current, "- [x] Ship migration", item.raw),
    );
    assert.match(
      (await workspace.read(taskFile.path)).text,
      /\[ \] Ship migration/,
    );
    const today = await ui.ensureTodayNote(app);
    await ui.writeFocus(plugin, [{ text: "Preserve original UI", done: true }]);
    const daily = await workspace.read(today.path);
    assert(daily.text.includes("# Retain my comment"));
    assert(daily.text.includes("custom: retained"));
    assert(daily.text.includes("# " + today.basename));
    assert.deepEqual((await ui.readFocus(plugin)).items, [
      { text: "Preserve original UI", done: true },
    ]);
    const index = new ui.HomeTaskIndex(app);
    const dated = await vault.create(
      "Due.md",
      "- [ ] Complete migration 📅 2026-10-28\n",
    );
    assert((await index.read()).some((task) => task.path === dated.path));
    await vault.create(
      "Linked.md",
      "---\naliases: [Reference]\ntags: [work]\n---\n[[Home Todo]] #project\n",
    );
    await vault.sync();
    assert.equal(
      vault.metadataCache.resolvedLinks["Linked.md"]["Home Todo.md"],
      1,
    );
    assert.deepEqual(
      ui.getAllTags(
        vault.metadataCache.getFileCache(vault.getFileByPath("Linked.md")),
      ),
      ["#project", "#work"],
    );
    await vault.process(
      today,
      () => "---\nfocus: {invalid: true}\n---\nBody\n",
    );
    await assert.rejects(
      ui.writeFocus(plugin, [
        { text: "Must not replace invalid values", done: false },
      ]),
      /Focus property changed/,
    );
    assert.match((await workspace.read(today.path)).text, /invalid: true/);
  } finally {
    vault.dispose();
    await rm(dir, { recursive: true, force: true });
  }
});
test("all original built-in module renderers mount in one configured page", async () => {
  const fixture = setup();
  try {
    const modules = ui.builtinModules();
    assert(modules.length > 30);
    fixture.plugin.settings.pages = [
      {
        id: "all-modules",
        name: "All original modules",
        moduleOptions: Object.fromEntries(
          modules.map((module) => [module.id, { visible: true, limit: 3 }]),
        ),
        moduleOrder: modules.map((module) => module.id),
        shortcutGroups: [],
        defaultVisible: false,
        showRecommendations: false,
      },
    ];
    fixture.plugin.settings.activePageId = "all-modules";
    fixture.plugin.settings.homePageId = "all-modules";
    await fixture.leaf.view.onOpen();
    await tick();
    assert(document.querySelectorAll(".qh-grid .qh-card").length > 30);
    assert(document.querySelector(".qh-grid svg"));
  } finally {
    await fixture.close();
  }
});
test("legacy Home state migration preserves content, layouts, provider placement, timer and all habit history", async () => {
  const { HomeHost } = await import("../src/host/home-host.js");
  const { readFile } = await import("node:fs/promises");
  const root = await mkdtemp(path.join(tmpdir(), "qhome-legacy-"));
  const raw = JSON.stringify({
    headline: "My home",
    tab: "notes",
    tabs: [
      {
        id: "home",
        name: "Start",
        cards: ["todo", "shortcuts", "recent", "plugin:reader:continue"],
        options: { todo: { limit: 6 } },
      },
      {
        id: "notes",
        name: "My notes",
        cards: ["quickNote", "scratchpad", "dailyQuestion", "heatmap", "habit"],
        options: {},
      },
    ],
    shortcutGroups: [
      {
        id: "home-shortcuts",
        name: "Sites",
        items: [
          {
            id: "docs",
            url: "https://example.com",
            label: "Docs",
            icon: "book",
          },
        ],
      },
    ],
    todos: [
      { id: "a", text: "Keep this task", done: false },
      { id: "b", text: "Finished task", done: true },
    ],
    quickNotes: [
      {
        id: "n",
        time: 1793116800000,
        text: "Captured thought\nWith a second line",
      },
    ],
    scratchpad: "Private scratchpad\nDo not lose",
    answers: { "2026-10-27": "Journal answer" },
    dailyFocus: {
      date: "2026-10-27",
      items: [{ text: "Migration", done: true }],
    },
    habits: Array.from({ length: 10 }, (_, index) => ({
      id: "h" + index,
      name: "Habit " + index,
      target: index === 0 ? 8 : 1,
    })),
    habitLog: Object.fromEntries(
      Array.from({ length: 10 }, (_, index) => [
        "h" + index,
        { "2026-10-27": index === 0 ? 4 : 1 },
      ]),
    ),
    focus: { minutes: 45, endAt: 1900000000000, remainingMs: 600000 },
    countdown: { date: "2026-11-01", label: "Launch" },
    weatherPlace: { name: "Beijing", latitude: 39.9, longitude: 116.4 },
  });
  const credentials = { get: async () => "", set: async () => {} };
  let host = new HomeHost(root, { credentials });
  try {
    const plan = await ui.legacyMigrationPlan(raw);
    assert.equal(plan.settings.customHeadline, "My home");
    assert.equal(plan.settings.activePageId, "notes");
    assert.equal(plan.settings.focusSession.endAt, 1900000000000);
    assert.equal(plan.settings.focusSession.durationMinutes, 45);
    assert(
      plan.settings.pages[0].moduleOrder.includes("section:reader:continue"),
    );
    assert.equal(
      plan.settings.pages[0].shortcutGroups[0].items[0].target,
      "https://example.com/",
    );
    assert.equal(plan.settings.pages[0].moduleOptions.todo.limit, 6);
    assert(plan.settings.pages.some((page) => page.id === "imported-habits-8"));
    assert.equal(plan.compatibility.legacyState.habits.length, 10);
    const write = host.workspace.write.bind(host.workspace);
    let writes = 0;
    host.workspace.write = async (input) => {
      if (++writes === 3) throw Error("Simulated disk failure");
      return write(input);
    };
    await assert.rejects(host.migrateLegacy(plan), /Simulated/);
    assert.equal((await host.load()).legacyImported, false);
    assert.equal(
      await readFile(
        path.join(root, "legacy-home-" + plan.id + ".json"),
        "utf8",
      ),
      raw,
    );
    host.dispose();
    host = new HomeHost(root, { credentials });
    await host.migrateLegacy(plan);
    const loaded = await host.load();
    assert(loaded.legacyImported);
    assert.equal(
      (await host.workspace.read(plan.settings.todoPath)).text,
      "- [ ] Keep this task\n- [x] Finished task\n",
    );
    assert(
      (
        await host.workspace.read(plan.compatibility.scratchpadPath)
      ).text.includes("Do not lose"),
    );
    assert(
      (
        await host.workspace.read(plan.compatibility.questionPath)
      ).text.includes("Journal answer"),
    );
    const daily = await host.workspace.read(
      plan.daily.folder + "/2026-10-27.md",
    );
    assert(daily.text.includes("Habit 9: true"));
    assert(daily.text.includes("Habit 0: 4"));
    assert(daily.text.includes("focus_done:"));
    assert.equal((await host.migrateLegacy(plan)).alreadyImported, true);
    assert.equal((await host.load()).revision, loaded.revision);
  } finally {
    host.dispose();
    await rm(root, { recursive: true, force: true });
  }
});
test("legacy habit names incompatible with YAML/card syntax get distinct readable aliases without losing counts", async () => {
  const habits = ["tags", "focus", "a,b", "a，b", "constructor"].map(
    (name, index) => ({ id: "h" + index, name, target: 2 }),
  );
  const raw = JSON.stringify({
    habits,
    habitLog: Object.fromEntries(
      habits.map((habit) => [habit.id, { "2026-10-27": 1 }]),
    ),
  });
  const plan = await ui.legacyMigrationPlan(raw);
  const names = Object.values(plan.compatibility.habitNames);
  assert.equal(new Set(names).size, habits.length);
  assert(
    names.every(
      (name) =>
        !["tags", "focus", "constructor"].includes(name) && !name.includes(","),
    ),
  );
  const daily = plan.files.find((file) =>
    file.path.endsWith("/Daily/2026-10-27.md"),
  );
  assert(daily);
  for (const name of names) assert(daily.text.includes(name + ": 1"));
});
test("the original Plugin lifecycle mounts on real Host state, opens original settings and survives panel detach", async () => {
  const { HomeHost } = await import("../src/host/home-host.js");
  const dir = await mkdtemp(path.join(tmpdir(), "qhome-runtime-"));
  const host = new HomeHost(dir, {
    credentials: { get: async () => "", set: async () => {} },
  });
  let runtime;
  const providers = ui.createProviderRegistry();
  const observable = (value) => ({
    getSnapshot: () => value,
    subscribe: () => () => {},
  });
  const sessionList = observable({ phase: "ready", ids: [], byId: {} }),
    workspaceList = observable({
      phase: "ready",
      items: [],
      archivedSessionIds: [],
    });
  const calls = [];
  const services = {
    providers,
    sessions: {
      list: sessionList,
      search: async () => ({ ok: true, value: { items: [] } }),
    },
    workspaces: { list: workspaceList },
    uiWorkspace: {},
    layout: { selectPanel: (id) => calls.push(id) },
  };
  const api = {
    load: () => host.load(),
    save: (value) => host.save(value),
    workspace: (value) => host.workspace.operate(value),
    network: async () => ({
      status: 200,
      headers: {},
      text: "",
      json: { version: 1, extensions: [] },
      base64: "",
    }),
    secret: (value) => host.secret(value),
    daily: (value) => host.daily(value),
    migrateLegacy: (value) => host.migrateLegacy(value),
  };
  const container = document.createElement("div");
  document.body.append(container);
  try {
    const settings = ui.normalizeSettings(null);
    settings.wallpaper.source = "none";
    settings.openOnStartup = false;
    await host.save({ revision: 0, data: settings });
    await host.workspace.write({
      path: "Config/plugins/qiaomu-home/update-notes.json",
      text: JSON.stringify({ seenVersion: "0.4.0", autoShow: false }),
    });
    runtime = await ui.createHomeRuntime(api, services, {
      storage: { getItem: () => null },
    });
    await runtime.attach(container);
    await tick();
    assert(container.querySelector(".qh-head"));
    assert.equal(runtime.plugin.manifest.id, "qiaomu-home");
    assert(runtime.app.commands.commands["qiaomu-home:focus-search"]);
    assert(runtime.app.commands.commands["daily-notes"]);
    runtime.openSettings();
    assert(document.querySelector(".qh-settings"));
    document.querySelector(".modal-close-button").click();
    const view = runtime.app.workspace.getLeavesOfType("qiaomu-home")[0].view;
    runtime.detach(container);
    assert(!container.children.length);
    await runtime.attach(container);
    assert.equal(
      runtime.app.workspace.getLeavesOfType("qiaomu-home")[0].view,
      view,
    );
    runtime.plugin.settings.customHeadline = "Persisted original settings";
    await runtime.plugin.saveSettings();
    assert.equal(
      (await host.load()).data.customHeadline,
      "Persisted original settings",
    );
    await runtime.dispose();
    assert(!container.children.length);
    assert.equal(HTMLElement.prototype.createDiv, undefined);
  } finally {
    await runtime?.dispose();
    providers.dispose();
    host.dispose();
    container.remove();
    await host.workspace.ready;
    await rm(dir, { recursive: true, force: true });
  }
});

test("native legacy cards reuse original components, persist journal and preserve conflicting drafts across reload", async () => {
  const { HomeWorkspace } = await import("../src/host/workspace.js");
  const { writeFile } = await import("node:fs/promises");
  const directory = await mkdtemp(path.join(tmpdir(), "qhome-cards-"));
  const workspace = new HomeWorkspace(directory);
  const vault = new ui.HomeVault((request) => workspace.operate(request));
  await vault.sync();
  await vault.create("Home/Scratchpad.md", "Original scratchpad");
  await vault.create(
    "Home/Daily questions.md",
    "## 2020-01-01\n\nEarlier question\n\nPreserve this answer\n",
  );
  const fixture = setup(),
    plugin = fixture.plugin;
  plugin.app.vault = vault;
  const saved = new Map();
  const storage = {
    getItem: (key) => saved.get(key) || null,
    setItem: (key, value) => saved.set(key, value),
    removeItem: (key) => saved.delete(key),
  };
  const state = { getSnapshot: () => ({ compatibility: null }) };
  const native = {
    sessions: () => [
      { id: "conversation-1", createdAt: Date.now(), updatedAt: Date.now() },
    ],
  };
  const page = plugin.settings.pages[0];
  for (const id of [
    "dsh-scratchpad",
    "dsh-daily-question",
    "dsh-session-activity",
  ])
    page.moduleOptions[id] = { visible: true, limit: 6 };
  let cards = ui.createNativeCards(plugin, native, state, storage);
  const parent = ui.createEl("div");
  document.body.append(parent);
  const mount = () => {
    parent.empty();
    cards.render(parent, page.id, (id, title) => {
      const card = parent.createDiv({ cls: "qh-card" });
      card.dataset.module = id;
      card.createDiv({ cls: "qh-card-title", text: title });
      return card;
    });
  };
  const field = (id) => parent.querySelector(`[data-module="${id}"] textarea`);
  const save = (id) =>
    [...parent.querySelectorAll(`[data-module="${id}"] button`)]
      .find((button) => button.textContent === "保存")
      .click();
  const input = (id, value) => {
    field(id).value = value;
    field(id).dispatchEvent(new Event("input", { bubbles: true }));
  };
  try {
    ui.setLanguage("zh");
    mount();
    await tick();
    assert.equal(field("dsh-scratchpad").value, "Original scratchpad");
    assert.equal(parent.querySelectorAll(".qh-heatmap").length, 1);
    assert.match(
      parent.querySelector('[data-module="dsh-session-activity"]').textContent,
      /今天新建对话/,
    );
    assert.match(
      parent.querySelector(".qh-heatmap").getAttribute("aria-label"),
      /1 个对话/,
    );
    input("dsh-scratchpad", "Saved scratchpad");
    save("dsh-scratchpad");
    await tick();
    assert.equal(
      (await workspace.read("Home/Scratchpad.md")).text,
      "Saved scratchpad",
    );
    input("dsh-daily-question", "Today’s answer\nWith another line");
    save("dsh-daily-question");
    await tick();
    const journal = (await workspace.read("Home/Daily questions.md")).text;
    assert.match(journal, /Preserve this answer/);
    assert.match(journal, /Today’s answer\nWith another line/);
    input("dsh-scratchpad", "Unsaved draft preserved");
    await writeFile(
      path.join(directory, "Home/Scratchpad.md"),
      "External edit wins",
    );
    save("dsh-scratchpad");
    await tick();
    assert.equal(
      (await workspace.read("Home/Scratchpad.md")).text,
      "External edit wins",
    );
    assert.match(
      parent.querySelector('[data-module="dsh-scratchpad"]').textContent,
      /草稿已保留/,
    );
    assert(
      [...saved.values()].some((value) =>
        value.includes("Unsaved draft preserved"),
      ),
    );
    await cards.dispose();
    cards = ui.createNativeCards(plugin, native, state, storage);
    mount();
    await tick();
    assert.equal(field("dsh-scratchpad").value, "Unsaved draft preserved");
    save("dsh-scratchpad");
    await tick();
    const copyButton = [
      ...parent.querySelectorAll('[data-module="dsh-scratchpad"] button'),
    ].find((button) => button.textContent === "另存副本");
    assert.equal(copyButton.hidden, false);
    copyButton.click();
    await tick();
    const copy = (await workspace.snapshot()).entries.find((entry) =>
      entry.path.startsWith("Home/Scratchpad-draft-"),
    );
    assert(copy);
    assert.equal(
      (await workspace.read(copy.path)).text,
      "Unsaved draft preserved",
    );
    assert.equal(
      (await workspace.read("Home/Scratchpad.md")).text,
      "External edit wins",
    );
  } finally {
    await cards.dispose();
    parent.remove();
    vault.dispose();
    await fixture.close();
    await rm(directory, { recursive: true, force: true });
  }
});

test("Home workspace search applies quoted paths, tags, exclusions and OR without executing regex", async () => {
  const { HomeWorkspace } = await import("../src/host/workspace.js");
  const directory = await mkdtemp(path.join(tmpdir(), "qhome-search-"));
  const workspace = new HomeWorkspace(directory),
    vault = new ui.HomeVault((request) => workspace.operate(request));
  await vault.sync();
  await vault.create("Project A/One.md", "---\ntags: [todo]\n---\nUseful text");
  await vault.create("Project B/Two.md", "#todo\nExcluded text");
  await vault.create("Elsewhere.md", "Needle");
  const app = { vault, metadataCache: vault.metadataCache };
  const modal = new ui.HomeSearchModal(app, async () => {});
  try {
    modal.open();
    await tick();
    assert.deepEqual(
      (
        await modal.getSuggestions(
          'path:"Project A" tag:todo -content:excluded',
        )
      ).map((file) => file.path),
      ["Project A/One.md"],
    );
    const found = (await modal.getSuggestions("file:One OR content:Needle"))
      .map((file) => file.path)
      .sort();
    assert.deepEqual(found, ["Elsewhere.md", "Project A/One.md"]);
    await assert.rejects(
      modal.getSuggestions("/unbounded.*/"),
      /支持文字|Supported/,
    );
  } finally {
    modal.close();
    vault.dispose();
    await rm(directory, { recursive: true, force: true });
  }
});

test("legacy discovery preferences and current daily wallpaper survive the original UI migration", async () => {
  const { BUILTIN_QUOTES, curatedPhotos, dailyIndex, dayKey } = await import(
    "../src/client/data.js"
  );
  const template = "Personal | https://example.test/search?q={query}";
  const plan = await ui.legacyMigrationPlan(
    JSON.stringify({
      tab: "explore",
      tabs: [
        {
          id: "explore",
          name: "Discovery",
          cards: ["multiSearch", "quote"],
          options: { multiSearch: { openAll: false } },
        },
      ],
      searchGroup: "books",
      searchEnginesByGroup: {
        books: ["gutenberg"],
        web: ["github", "custom:https://example.test/search?q={query}"],
      },
      searchTemplates: template,
      wallpaperMode: "daily",
      wallpaperShift: 3,
      quoteShift: 3,
    }),
  );
  const page = plan.settings.pages.find((page) => page.id === "explore");
  assert(page.moduleOrder.includes("book-finder"));
  assert.equal(page.moduleOptions["book-finder"].visible, true);
  assert.deepEqual(page.moduleOptions["book-finder"].sites, ["gutenberg"]);
  assert.equal(page.moduleOptions["book-finder"].openAll, false);
  assert.equal(page.moduleOptions["multi-search"].visible, false);
  assert.deepEqual(page.moduleOptions["multi-search"].sites, [
    "github",
    "custom:https://example.test/search?q={query}",
  ]);
  assert.deepEqual(page.moduleOptions["multi-search"].customSites, [
    { name: "Personal", url: "https://example.test/search?q={query}" },
  ]);
  assert(
    ui.DISCOVERY_MODULES["multi-search"].sites.some(
      (site) => site.id === "github",
    ),
  );
  const photos = curatedPhotos();
  assert.equal(
    plan.settings.wallpaper.current.id,
    photos[dailyIndex(dayKey(), photos.length, 3)].id,
  );
  assert.equal(plan.settings.wallpaper.chosenOn, dayKey());
  const fixture = setup(),
    container = ui.createEl("div");
  document.body.append(container);
  try {
    fixture.plugin.app.home = { quoteShift: 3 };
    ui.setLanguage("zh");
    ui.renderExtra(
      container,
      fixture.plugin,
      "daily-quote",
      "migrated-quote",
      () => {},
    );
    assert.equal(
      container.querySelector(".qh-quote").textContent,
      BUILTIN_QUOTES.zh[dailyIndex(dayKey(), BUILTIN_QUOTES.zh.length, 3)],
    );
    [...container.querySelectorAll("button")]
      .find((button) => button.textContent === "换一句")
      .click();
    assert.equal(
      container.querySelector(".qh-quote").textContent,
      BUILTIN_QUOTES.zh[dailyIndex(dayKey(), BUILTIN_QUOTES.zh.length, 4)],
    );
  } finally {
    container.remove();
    await fixture.close();
  }
});
