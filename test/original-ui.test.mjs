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
test("vendored sources match the recorded upstream files except the explicit native Node boundary", async () => {
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
