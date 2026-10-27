import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import {
  HOME_REMOTE,
  HOME_REMOTE_METHODS,
  homeRemoteApi,
  createHomeClientState,
} from "../src/client/home-remote.js";
import { HomeHost } from "../src/host/home-host.js";
test("shared client revisions serialize settings, secret references and daily changes against the real Host", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "qhome-remote-"));
  const host = new HomeHost(dir, {
    credentials: { get: async () => "", set: async () => {} },
  });
  const remote = Object.fromEntries(
    HOME_REMOTE_METHODS.map((method) => [
      method,
      async (...args) => {
        try {
          return { ok: true, value: await host[method](...args) };
        } catch (error) {
          return { ok: false, error: { message: error.message } };
        }
      },
    ]),
  );
  const client = createHomeClientState(homeRemoteApi(remote));
  try {
    await client.load();
    await Promise.all([
      client.save({ headline: "First" }),
      client.secret("github", "fixture"),
      client.daily({ folder: "Daily", format: "YYYY-MM-DD", template: "" }),
      client.save({ headline: "Last" }),
    ]);
    assert.equal(client.getSnapshot().revision, 4);
    assert.equal((await host.load()).data.headline, "Last");
    assert.deepEqual((await host.load()).credentialIds, ["github"]);
    await host.save({ revision: 4, data: { headline: "External" } });
    await assert.rejects(
      client.save({ headline: "Must not overwrite" }),
      /another window/,
    );
    assert.equal(client.getSnapshot().data.headline, "Last");
    await client.load();
    assert.equal(client.getSnapshot().data.headline, "External");
    client.dispose();
    await assert.rejects(client.save({ headline: "closed" }), /closed/);
  } finally {
    client.dispose();
    host.dispose();
    await host.workspace.ready;
    await rm(dir, { recursive: true, force: true });
  }
});
test("Host service bundle and client descriptor expose the same seven methods and validate paths", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "qhome-service-"));
  let service;
  try {
    const output = path.join(dir, "service.mjs");
    await build({
      entryPoints: ["src/host/service.js"],
      outfile: output,
      bundle: true,
      format: "esm",
      platform: "node",
      banner: {js: "import {createRequire as __nodeRequire} from 'node:module';const require=__nodeRequire(import.meta.url);"},
      target: "node22",
      plugins: [
        {
          name: "fixture-cordis",
          setup(build) {
            build.onResolve(
              { filter: /^@deepseek-ai\/dsh-typert-protocol$/ },
              () => ({ path: "cordis", namespace: "fixture" }),
            );
            build.onLoad({ filter: /.*/, namespace: "fixture" }, () => ({
              contents:
                'export class TypertRemoteService{constructor(ctx,name){this.serviceName=name;}} export const Remote=name=>(method,context)=>{if(name!==context.name||typeof method!=="function")throw Error("Invalid remote registration");};',
            }));
          },
        },
      ],
      logLevel: "silent",
    });
    const mod = await import(pathToFileURL(output));
    assert.equal(
      mod.Config["~standard"].validate({ workspaceDir: "relative" }).issues
        .length,
      1,
    );
    const dataDir = path.join(dir, "data");
    const callbacks = [];
    service = new mod.default(
      { effect: (fn) => callbacks.push(fn()) },
      { dataDir },
    );
    assert.equal(service.serviceName, "qiaomuHomeState");
    for (const descriptor of HOME_REMOTE.descriptors) {
      assert.equal(typeof service[descriptor.method], "function");
      assert.equal(descriptor.namespace, service.serviceName);
    }
    assert.equal((await service.load()).revision, 0);
    await service.workspace({
      action: "write",
      path: "New.md",
      text: "From the Home remote",
    });
    assert.equal(
      (await service.workspace({ action: "read", path: "New.md" })).text,
      "From the Home remote",
    );
    for (const fn of callbacks) fn();
    await assert.rejects(service.load(), /closed/);
  } finally {
    service?.host.dispose();
    await service?.host.workspace.ready;
    await rm(dir, { recursive: true, force: true });
  }
});
