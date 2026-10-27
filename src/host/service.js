import { TypertRemoteService, Remote } from "@deepseek-ai/dsh-typert-protocol";
import { homedir } from "node:os";
import path from "node:path";
import { HomeHost } from "./home-host.js";
export const Config = {
  "~standard": {
    version: 1,
    vendor: "qiaomu-home-dsh",
    validate(value) {
      if (value == null) return { value: {} };
      if (
        typeof value !== "object" ||
        Array.isArray(value) ||
        Object.keys(value).some(
          (key) => !["dataDir", "workspaceDir"].includes(key),
        ) ||
        ["dataDir", "workspaceDir"].some(
          (key) =>
            value[key] !== undefined &&
            (typeof value[key] !== "string" || !path.isAbsolute(value[key])),
        )
      )
        return {
          issues: [
            {
              message:
                "Home dataDir and workspaceDir must be absolute directories",
            },
          ],
        };
      return { value };
    },
  },
};
export default class HomeService extends TypertRemoteService {
  constructor(ctx, config = {}) {
    super(ctx, "qiaomuHomeState");
    this.host = new HomeHost(
      config.dataDir ||
        path.join(
          process.env.DSH_HOME || path.join(homedir(), ".dsh"),
          "qiaomu",
          "qiaomu-home-dsh",
        ),
      { workspaceDir: config.workspaceDir },
    );
    ctx.effect(() => () => this.host.dispose());
  }
  load() {
    return this.host.load();
  }
  save(request) {
    return this.host.save(request);
  }
  workspace(request) {
    if (this.host.closed) throw Error("Home has closed");
    return this.host.workspace.operate(request);
  }
  network(request) {
    return this.host.network.request(request);
  }
  secret(request) {
    return this.host.secret(request);
  }
  daily(request) {
    return this.host.daily(request);
  }
  migrateLegacy(request) {
    return this.host.migrateLegacy(request);
  }
}
for (const name of [
  "load",
  "save",
  "workspace",
  "network",
  "secret",
  "daily",
  "migrateLegacy",
])
  Remote(name)(HomeService.prototype[name], {
    name,
    private: false,
    static: false,
    addInitializer(fn) {
      fn.call(Object.create(HomeService.prototype));
    },
  });
