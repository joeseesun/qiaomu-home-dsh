import { createHash } from "node:crypto";
import { mkdir, writeFile, readFile } from "node:fs/promises";
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
      legacyPending: state.data.legacyPending || null,
      compatibility: state.data.compatibility || null,
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
  migrateLegacy(request) {
    return this.serial(async () => {
      if (
        typeof request?.raw !== "string" ||
        Buffer.byteLength(request.raw) > 8 * 1024 * 1024
      )
        throw Error("Previous Home data exceeds 8 MB");
      const legacy = JSON.parse(request.raw);
      if (!legacy || typeof legacy !== "object" || Array.isArray(legacy))
        throw Error("Invalid previous Home data");
      const id = createHash("sha256")
        .update(request.raw)
        .digest("hex")
        .slice(0, 24);
      if (
        id !== request.id ||
        !Array.isArray(request.files) ||
        request.files.length > 3000 ||
        !request.settings ||
        !request.daily ||
        !request.compatibility
      )
        throw Error("Invalid Home migration plan");
      const prefix = "Imported/Home-0.3/" + id + "/";
      if (
        typeof request.daily.folder !== "string" ||
        !request.daily.folder.startsWith(prefix)
      )
        throw Error("Invalid imported daily note folder");
      await this.workspace.resolve(request.daily.folder, { directory: true });
      const seen = new Set();
      for (const file of request.files) {
        if (
          typeof file?.path !== "string" ||
          !file.path.startsWith(prefix) ||
          seen.has(file.path) ||
          typeof file.text !== "string"
        )
          throw Error("Invalid migrated note");
        seen.add(file.path);
        await this.workspace.resolve(file.path);
      }
      let current = await this.store.load();
      if (current.data.legacyImported)
        return { revision: current.revision, alreadyImported: true };
      if (current.data.settings && !current.data.legacyPending)
        throw Error(
          "Home already contains settings; automatic import would replace them",
        );
      if (current.data.legacyPending && current.data.legacyPending !== id)
        throw Error(
          "Finish the pending import before importing another Home profile",
        );
      const archive = path.join(
        path.dirname(this.store.file),
        "legacy-home-" + id + ".json",
      );
      await mkdir(path.dirname(archive), { recursive: true, mode: 0o700 });
      try {
        await writeFile(archive, request.raw, { flag: "wx", mode: 0o600 });
      } catch (error) {
        if (
          error.code !== "EEXIST" ||
          (await readFile(archive, "utf8")) !== request.raw
        )
          throw Error(
            "The previous Home archive already exists with different content",
          );
      }
      if (!current.data.legacyPending)
        current = await this.store.save({
          revision: current.revision,
          data: { ...current.data, legacyPending: id },
        });
      for (const file of request.files) {
        if (await this.workspace.exists(file.path)) {
          if ((await this.workspace.read(file.path)).text !== file.text)
            throw Error(
              "An imported note was changed. Original and new data have both been preserved.",
            );
        } else await this.workspace.write({ path: file.path, text: file.text });
      }
      const next = await this.store.save({
        revision: current.revision,
        data: {
          ...current.data,
          settings: request.settings,
          daily: request.daily,
          compatibility: request.compatibility,
          legacyImported: true,
          legacyId: id,
          legacyPending: null,
        },
      });
      return {
        revision: next.revision,
        alreadyImported: false,
        notes: request.files.length,
      };
    });
  }
  dispose() {
    this.closed = true;
    this.network.dispose();
  }
}
