import test from "node:test";
import assert from "node:assert/strict";
import { nativeHomeBridge } from "../src/client/native-home.js";
function store(value) {
  const listeners = new Set();
  return {
    getSnapshot: () => value,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    set(next) {
      value = next;
      for (const fn of listeners) fn();
    },
    listeners,
  };
}
function fixture() {
  const list = store({
      ids: ["existing"],
      byId: {
        existing: {
          id: "existing",
          title: "Keep existing draft",
          updatedAt: 1,
        },
      },
    }),
    workspaces = store({ phase: "ready", items: [], archivedSessionIds: [] }),
    mounted = store(null),
    input = store({ phase: "plain", draft: "", attachmentIds: [] });
  const calls = [];
  let count = 0;
  const services = {
    sessions: {
      list,
      async create({ workspaceId }) {
        const id = "created-" + ++count;
        calls.push(["create", workspaceId, id]);
        const next = list.getSnapshot();
        list.set({
          ids: [...next.ids, id],
          byId: { ...next.byId, [id]: { id, blank: true } },
        });
        const ws = workspaces.getSnapshot();
        workspaces.set({
          ...ws,
          items: ws.items.map((item) =>
            item.workspaceId === workspaceId
              ? { ...item, sessionIds: [...item.sessionIds, id] }
              : item,
          ),
        });
        return id;
      },
      retain(id) {
        return {
          release() {
            calls.push(["release", id]);
          },
        };
      },
      search: async () => ({
        ok: true,
        value: {
          items: [
            {
              sessionId: "existing",
              title: "A conversation",
              snippet: "found",
            },
          ],
        },
      }),
    },
    workspaces: {
      list: workspaces,
      async create({ path }) {
        calls.push(["workspace", path]);
        const workspace = { workspaceId: "home", path, sessionIds: [] };
        workspaces.set({
          ...workspaces.getSnapshot(),
          items: [...workspaces.getSnapshot().items, workspace],
        });
        return workspace;
      },
    },
    uiWorkspace: {
      openSession(id) {
        calls.push(["open", id]);
        mounted.set(id);
      },
      startSession() {
        calls.push(["new"]);
      },
      openWorkspace(id) {
        calls.push(["open-workspace", id]);
      },
    },
    sidebarRight: {
      mounted,
      openResource(address, options) {
        calls.push(["file", address, options]);
      },
    },
    layout: { selectPanel: (id) => calls.push(["panel", id]) },
    uiSession: {
      bindingSource: () => ({
        value: {
          hooks: { input },
          props: {
            inputActions: {
              setDraft: (draft) => {
                calls.push(["draft", draft]);
                input.set({ ...input.getSnapshot(), draft });
              },
              submit: () => calls.push(["submit"]),
            },
          },
        },
      }),
    },
  };
  return { services, calls, input, workspaces };
}
test("note opening registers its scoped workspace once, reuses its session, and uses public native file preview", async () => {
  const f = fixture(),
    bridge = nativeHomeBridge(f.services);
  try {
    bridge.setRoot("/tmp/home-notes");
    await bridge.openFile("Daily/中文.md");
    await Promise.all([
      bridge.openFile("Todo.md", { newPane: false, line: 12 }),
      bridge.openFile("Other.md", { newPane: true, line: 0 }),
    ]);
    const files = f.calls.filter((call) => call[0] === "file");
    assert.deepEqual(files[1][2], {
      preferNewPane: false,
      params: { line: 13 },
    });
    assert.deepEqual(files[2][2], { preferNewPane: true, params: { line: 1 } });
    assert.equal(f.calls.filter((call) => call[0] === "workspace").length, 1);
    assert.equal(f.calls.filter((call) => call[0] === "create").length, 1);
    assert.equal(
      f.calls.filter((call) => call[0] === "file")[0][1],
      "dsh-resource://file/session/created-1/Daily/%E4%B8%AD%E6%96%87.md",
    );
    assert(!f.calls.some((call) => call[0] === "submit"));
    await assert.rejects(bridge.openFile("../private.md"));
  } finally {
    bridge.dispose();
  }
});
test("native question compose uses a fresh session and guards existing input before any submission", async () => {
  const f = fixture(),
    bridge = nativeHomeBridge(f.services);
  try {
    bridge.setRoot("/tmp/home-notes");
    await bridge.compose("User explicitly asked this");
    assert.equal(f.calls.filter((call) => call[0] === "submit").length, 1);
    assert(f.calls.some((call) => call[0] === "release"));
    f.input.set({ phase: "plain", draft: "Keep me", attachmentIds: [] });
    await assert.rejects(
      bridge.compose("Do not overwrite"),
      /Nothing was replaced/,
    );
    assert.equal(f.input.getSnapshot().draft, "Keep me");
    assert.equal(f.calls.filter((call) => call[0] === "submit").length, 1);
  } finally {
    bridge.dispose();
  }
});
test("native providers preserve search/recent actions and use the actual directory picker contract", async () => {
  const f = fixture(),
    bridge = nativeHomeBridge(f.services, {
      directoryPicker: () => ({ pick: async () => "/tmp/chosen" }),
    });
  try {
    assert.equal(bridge.provider.sections()[0].items[0].id, "existing");
    const result = await bridge.provider.search("query", 4);
    result[0].open();
    await bridge.provider
      .actions()
      .find((action) => action.id === "open-workspace")
      .run();
    assert(
      f.calls.some(
        (call) => call[0] === "workspace" && call[1] === "/tmp/chosen",
      ),
    );
    assert(f.calls.some((call) => call[0] === "open-workspace"));
  } finally {
    bridge.dispose();
  }
  assert.throws(() => bridge.provider.actions()[0].run(), /closed/);
});
test("working-set inventory reads the public openTabs metadata and excludes unrelated workspaces", async () => {
  const f = fixture();
  f.workspaces.set({
    phase: "ready",
    items: [
      {
        workspaceId: "home",
        path: "/tmp/home-notes",
        sessionIds: ["home-session"],
      },
    ],
    archivedSessionIds: [],
  });
  f.services.sidebarRight.openTabs = store([
    {
      sessionId: "home-session",
      kind: "document-preview",
      contentId: "dsh-resource://file/session/home-session/Note.md",
    },
    {
      sessionId: "home-session",
      contentId:
        "dsh-resource://file/session/home-session//tmp/home-notes/Daily/Today.md",
    },
    {
      sessionId: "other",
      contentId: "dsh-resource://file/session/other/private.md",
    },
    {
      sessionId: "home-session",
      contentId: "dsh-resource://file/session/home-session/../private.md",
    },
  ]);
  const bridge = nativeHomeBridge(f.services);
  try {
    bridge.setRoot("/tmp/home-notes");
    assert.deepEqual(bridge.openFiles(), ["Note.md", "Daily/Today.md"]);
    f.services.sidebarRight.openTabs.set([]);
    assert.deepEqual(bridge.openFiles(), []);
  } finally {
    bridge.dispose();
  }
});
