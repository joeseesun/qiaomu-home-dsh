/** Only public Harness client services. Nothing calls private Sidebar controller methods. */
export function nativeHomeBridge(
  services,
  {
    directoryPicker = () => globalThis.__DSH_DIRECTORY_PICKER__,
    timeout = 5000,
    translate = (zh, en) =>
      globalThis.navigator?.language?.startsWith("zh") ? zh : en,
  } = {},
) {
  let closed = false,
    root = "",
    workspaceRequest = null,
    fileLane = Promise.resolve();
  const waits = new Set();
  const requireReady = () => {
    if (closed) throw Error("Home has closed");
    if (!services.sessions || !services.workspaces || !services.uiWorkspace)
      throw Error("Harness workspace services are not ready");
  };
  const workspaces = () => services.workspaces?.list.getSnapshot().items || [];
  const sessions = () => {
    const snapshot = services.sessions?.list.getSnapshot();
    const archived = new Set(
      services.workspaces?.list.getSnapshot().archivedSessionIds || [],
    );
    return (snapshot?.ids || [])
      .map((id) => snapshot.byId[id])
      .filter((row) => row && !row.blank && !archived.has(row.id))
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  };
  const samePath = (a, b) =>
    String(a || "")
      .replace(/\\/g, "/")
      .replace(/\/+$/, "") ===
    String(b || "")
      .replace(/\\/g, "/")
      .replace(/\/+$/, "");
  async function homeWorkspace() {
    requireReady();
    if (!root) throw Error("Home notes are loading");
    const existing = workspaces().find((item) => samePath(item.path, root));
    if (existing) return existing;
    workspaceRequest ??= Promise.resolve(
      services.workspaces.create({ path: root }),
    ).finally(() => (workspaceRequest = null));
    const workspace = await workspaceRequest;
    requireReady();
    return workspace;
  }
  function waitFor(store, predicate) {
    if (predicate(store.getSnapshot())) return Promise.resolve();
    return new Promise((resolve, reject) => {
      let unsubscribe = () => {},
        settled = false;
      const finish = (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        unsubscribe();
        waits.delete(cancel);
        error ? reject(error) : resolve();
      };
      const cancel = () => finish(Error("Home has closed"));
      const timer = setTimeout(
        () => finish(Error("Harness is still opening the session. Try again.")),
        timeout,
      );
      waits.add(cancel);
      unsubscribe = store.subscribe(() => {
        if (predicate(store.getSnapshot())) finish();
      });
      if (settled) unsubscribe();
      else if (predicate(store.getSnapshot())) finish();
    });
  }
  async function showSession(id) {
    requireReady();
    services.uiWorkspace.openSession(id);
    const sidebar = services.sidebarRight;
    if (!sidebar?.mounted || typeof sidebar.openResource !== "function")
      throw Error("Harness file preview is not ready");
    await waitFor(sidebar.mounted, (current) => current === id);
    requireReady();
    return sidebar;
  }
  const provider = {
    protocol: "qiaomu-home",
    version: 1,
    sections() {
      return [
        {
          id: "recent",
          title: translate("最近对话", "Recent conversations"),
          icon: "messages-square",
          items: sessions()
            .slice(0, 6)
            .map((row) => ({
              id: row.id,
              title:
                row.title?.trim() || translate("新对话", "New conversation"),
              subtitle: row.workspaceTitle || "",
              icon: "message-square",
              open: () => {
                requireReady();
                services.uiWorkspace.openSession(row.id);
              },
            })),
          empty: translate("还没有对话", "No conversations yet"),
        },
      ];
    },
    actions() {
      return [
        {
          id: "new-session",
          label: translate("新对话", "New conversation"),
          icon: "message-square-plus",
          run: () => {
            requireReady();
            services.uiWorkspace.startSession();
          },
        },
        {
          id: "open-workspace",
          label: translate("打开工作区", "Open workspace"),
          icon: "folder-open",
          run: async () => {
            requireReady();
            const picker = directoryPicker();
            if (typeof picker?.pick !== "function")
              throw Error(
                "请通过 Harness 侧栏添加工作区 / Add a workspace from the Harness sidebar",
              );
            const picked = await picker.pick();
            if (!picked) return;
            const workspace = await services.workspaces.create({
              path: picked,
            });
            requireReady();
            await services.uiWorkspace.openWorkspace(workspace.workspaceId);
          },
        },
      ];
    },
    async search(query, limit) {
      requireReady();
      const response = await services.sessions.search(query);
      if (!response?.ok) throw Error("Harness session search failed");
      return (response.value?.items || []).slice(0, limit).map((item) => ({
        id: item.sessionId,
        title: item.title || "Conversation",
        subtitle: item.snippet || "",
        icon: "message-square",
        open: () => {
          requireReady();
          services.uiWorkspace.openSession(item.sessionId);
        },
      }));
    },
  };
  const openFiles = () => {
    const currentWorkspace = workspaces().find((item) =>
      samePath(item.path, root),
    );
    const sessionIds = new Set(currentWorkspace?.sessionIds || []),
      paths = new Set();
    for (const tab of services.sidebarRight?.openTabs?.getSnapshot() || []) {
      if (
        typeof tab.contentId !== "string" ||
        !tab.contentId.startsWith("dsh-resource://file/session/")
      )
        continue;
      try {
        const [session, ...parts] = tab.contentId
          .slice("dsh-resource://file/session/".length)
          .split("/");
        if (!sessionIds.has(decodeURIComponent(session))) continue;
        let path = parts.map(decodeURIComponent).join("/");
        const normalizedRoot = root.replace(/\\/g, "/").replace(/\/+$/, "");
        if (path.startsWith(normalizedRoot + "/"))
          path = path.slice(normalizedRoot.length + 1);
        if (
          !path ||
          path.startsWith("/") ||
          /^[A-Za-z]:/.test(path) ||
          path.split("/").some((part) => part === ".." || part.startsWith("."))
        )
          continue;
        paths.add(path);
      } catch {}
    }
    return [...paths];
  };
  return {
    openFiles,
    provider,
    workspaces,
    sessions,
    setRoot(value) {
      root = value;
    },
    subscribe(fn) {
      const unsubs = [
        services.sessions?.list.subscribe(fn),
        services.workspaces?.list.subscribe(fn),
        services.sidebarRight?.openTabs?.subscribe(fn),
      ].filter(Boolean);
      return () => unsubs.forEach((unsubscribe) => unsubscribe());
    },
    openFile(relative, { newPane = true, line } = {}) {
      const run = async () => {
        if (
          typeof relative !== "string" ||
          !relative ||
          relative.startsWith("/") ||
          relative.includes("\\") ||
          relative
            .split("/")
            .some((part) => part === ".." || part.startsWith("."))
        )
          throw Error("Invalid Home note path");
        const workspace = await homeWorkspace();
        const rows = services.sessions.list.getSnapshot().byId || {};
        const archived = new Set(
          services.workspaces.list.getSnapshot().archivedSessionIds || [],
        );
        let id = (workspace.sessionIds || []).find(
          (id) => rows[id] && !archived.has(id),
        );
        if (!id)
          id = await services.sessions.create({
            workspaceId: workspace.workspaceId,
          });
        const sidebar = await showSession(id);
        const address =
          "dsh-resource://file/session/" +
          encodeURIComponent(id) +
          "/" +
          relative.split("/").map(encodeURIComponent).join("/");
        await sidebar.openResource(address, {
          preferNewPane: newPane,
          ...(Number.isInteger(line) && line >= 0
            ? { params: { line: line + 1 } }
            : {}),
        });
        return { id, address };
      };
      const task = fileLane.catch(() => {}).then(run);
      fileLane = task;
      return task;
    },
    async compose(prompt, { submit = true } = {}) {
      requireReady();
      if (
        typeof prompt !== "string" ||
        !prompt.trim() ||
        prompt.length > 100000
      )
        throw Error("Enter a question");
      const workspace = await homeWorkspace();
      const id = await services.sessions.create({
        workspaceId: workspace.workspaceId,
      });
      requireReady();
      const reference = services.sessions.retain(id, { source: "qiaomu-home" });
      try {
        const source = services.uiSession?.bindingSource(reference),
          input = source?.value.hooks?.input,
          actions = source?.value.props?.inputActions;
        if (
          !input ||
          typeof actions?.setDraft !== "function" ||
          (submit && typeof actions.submit !== "function")
        )
          throw Error("Harness conversation input is not ready");
        const current = input.getSnapshot();
        if (
          current.phase !== "plain" ||
          current.draft.trim() ||
          current.attachmentIds?.length
        )
          throw Error(
            "The conversation already contains input. Nothing was replaced.",
          );
        services.uiWorkspace.openSession(id);
        actions.setDraft(prompt);
        await waitFor(input, (state) => state.draft === prompt);
        requireReady();
        if (submit) {
          if (input.getSnapshot().phase !== "plain")
            throw Error(
              "The question is in the draft. Send it when Harness is ready.",
            );
          actions.submit();
        }
        return id;
      } finally {
        reference.release();
      }
    },
    showHome() {
      requireReady();
      services.layout?.selectPanel("qiaomu-home");
    },
    dispose() {
      closed = true;
      for (const cancel of [...waits]) cancel();
    },
  };
}
