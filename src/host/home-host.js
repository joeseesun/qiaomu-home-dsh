import path from "node:path";
import { HomeWorkspace } from "./workspace.js";
import { StateStore } from "./storage.js";
import { CredentialStore } from "./credential-store.js";
import { HomeNetwork } from "./network.js";
const validId = (id) =>
  typeof id === "string" && /^[a-zA-Z0-9_.-]{1,100}$/.test(id);
export class HomeHost {
  constructor(
    directory,
    { workspaceDir, credentials = new CredentialStore(), fetcher } = {},
  ) {
    this.store = new StateStore(directory);
    this.workspace = new HomeWorkspace(
      workspaceDir || path.join(directory, "workspace"),
    );
    this.credentials = credentials;
    this.network = new HomeNetwork(credentials, { fetcher });
    this.lane = Promise.resolve();
    this.closed = false;
  }
  serial(run) {
    const task = this.lane
      .catch(() => {})
      .then(() => {
        if (this.closed) throw Error("Home has closed");
        return run();
      });
    this.lane = task;
    return task;
  }
  async load() {
    if (this.closed) throw Error("Home has closed");
    const state = await this.store.load();
    return {
      revision: state.revision,
      data: state.data.settings ?? null,
      legacyImported: !!state.data.legacyImported,
      credentialIds: state.data.credentialIds || [],
      daily: state.data.daily || {
        folder: "Daily",
        format: "YYYY-MM-DD",
        template: "",
      },
      platform: process.platform,
    };
  }
  save(request) {
    return this.serial(async () => {
      const current = await this.store.load();
      if (request?.revision !== current.revision)
        throw Error("Home settings changed in another window. Reopen Home.");
      if (
        !request.data ||
        typeof request.data !== "object" ||
        Array.isArray(request.data)
      )
        throw Error("Invalid Home settings");
      const next = await this.store.save({
        revision: current.revision,
        data: { ...current.data, settings: request.data },
      });
      return { revision: next.revision };
    });
  }
  secret(request) {
    return this.serial(async () => {
      if (
        !validId(request?.id) ||
        typeof request.value !== "string" ||
        Buffer.byteLength(request.value) > 8192
      )
        throw Error("Invalid credential");
      const current = await this.store.load();
      await this.credentials.set(
        "qiaomu-home-dsh-secret-" + request.id,
        request.value,
      );
      const ids = new Set(current.data.credentialIds || []);
      if (request.value) ids.add(request.id);
      else ids.delete(request.id);
      const next = await this.store.save({
        revision: current.revision,
        data: { ...current.data, credentialIds: [...ids] },
      });
      return { revision: next.revision, credentialIds: [...ids] };
    });
  }
  daily(request) {
    return this.serial(async () => {
      const { folder, format, template } = request || {};
      if (
        typeof folder !== "string" ||
        typeof template !== "string" ||
        typeof format !== "string" ||
        format.length > 100 ||
        !format
      )
        throw Error("Invalid daily note settings");
      await this.workspace.resolve(folder, { directory: true });
      if (template)
        await this.workspace.resolve(
          template.endsWith(".md") ? template : template + ".md",
        );
      const current = await this.store.load();
      const next = await this.store.save({
        revision: current.revision,
        data: { ...current.data, daily: { folder, format, template } },
      });
      return { revision: next.revision, daily: next.data.daily };
    });
  }
  dispose() {
    this.closed = true;
    this.network.dispose();
  }
}
