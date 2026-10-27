const PACKAGE = "qiaomu-home-dsh",
  SERVICE = "qiaomuHomeState";
export const HOME_REMOTE_METHODS = [
  "load",
  "save",
  "workspace",
  "network",
  "secret",
  "daily",
  "migrateLegacy",
];
const codec = () => ({
  mode: "strict",
  typeSymbol: PACKAGE + "#json",
  create: () => ({
    parse: (value) => value,
    safeParse: (value) => ({ success: true, data: value }),
  }),
});
export const HOME_REMOTE = {
  package: PACKAGE,
  descriptors: HOME_REMOTE_METHODS.map((method) => ({
    id: `${PACKAGE}#${SERVICE}/${method}`,
    service: SERVICE,
    namespace: SERVICE,
    method,
    invocation: { kind: "direct" },
    parameters:
      method === "load"
        ? []
        : [
            {
              name: "request",
              wire: "request",
              source: "json",
              codec: codec(),
            },
          ],
    result: { mode: "src-json" },
    cancellation: { parameter: "signal" },
  })),
};
export function homeRemoteApi(service) {
  return Object.fromEntries(
    HOME_REMOTE_METHODS.map((method) => [
      method,
      async (...args) => {
        const result = await service[method](...args);
        if (result?.ok === true) return result.value;
        throw Error(
          typeof result?.error === "string"
            ? result.error
            : result?.error?.message || "Home operation failed",
        );
      },
    ]),
  );
}
/** All settings writes share one revision, including credentials and daily-note configuration. */
export function createHomeClientState(api) {
  let value = null,
    closed = false;
  let lane = Promise.resolve();
  const listeners = new Set();
  const publish = () => {
    if (!closed) for (const fn of listeners) fn();
  };
  const serialize = (run) => {
    const task = lane
      .catch(() => {})
      .then(async () => {
        if (closed) throw Error("Home has closed");
        return run();
      });
    lane = task;
    return task;
  };
  return {
    getSnapshot: () => value,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    load() {
      return serialize(async () => {
        const next = await api.load();
        if (closed) return;
        value = next;
        publish();
        return next;
      });
    },
    save(data) {
      const snapshot = structuredClone(data);
      return serialize(async () => {
        if (!value) throw Error("Home is loading");
        const result = await api.save({
          revision: value.revision,
          data: snapshot,
        });
        value = { ...value, revision: result.revision, data: snapshot };
        publish();
      });
    },
    saveNative(patch) {
      const saved = structuredClone(patch);
      return serialize(async () => {
        if (!value?.data) throw Error("Home is loading");
        const next = { ...value.native, ...saved };
        const result = await api.save({
          revision: value.revision,
          data: value.data,
          native: next,
        });
        value = { ...value, revision: result.revision, native: next };
        publish();
      });
    },
    secret(id, key) {
      return serialize(async () => {
        const result = await api.secret({ id, value: key });
        value = {
          ...value,
          revision: result.revision,
          credentialIds: result.credentialIds,
        };
        publish();
      });
    },
    daily(settings) {
      return serialize(async () => {
        const result = await api.daily(settings);
        value = { ...value, revision: result.revision, daily: result.daily };
        publish();
      });
    },
    migrate(plan) {
      return serialize(async () => {
        await api.migrateLegacy(plan);
        value = await api.load();
        publish();
        return value;
      });
    },
    dispose() {
      closed = true;
      listeners.clear();
    },
  };
}
