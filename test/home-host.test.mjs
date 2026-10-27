import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { HomeHost } from "../src/host/home-host.js";
import { HomeNetwork } from "../src/host/network.js";
const fakeCredentials = () => {
  const values = new Map();
  return {
    get: async (id) => values.get(id) || "",
    set: async (id, value) => {
      values.set(id, value);
    },
    values,
  };
};
test("Host preserves revisions and credential references, and refuses corrupt state without replacing it", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "qhome-host-")),
    credentials = fakeCredentials();
  const host = new HomeHost(dir, { credentials });
  try {
    assert.equal((await host.load()).data, null);
    await host.save({ revision: 0, data: { customHeadline: "Original UI" } });
    await host.secret({ id: "github", value: "fixture-secret-not-real" });
    await assert.rejects(
      host.save({ revision: 1, data: { customHeadline: "stale" } }),
      /another window/,
    );
    const state = await host.load();
    assert.equal(state.revision, 2);
    assert.deepEqual(state.credentialIds, ["github"]);
    const raw = await readFile(path.join(dir, "state.json"), "utf8");
    assert(!raw.includes("fixture-secret"));
    await host.daily({ folder: "Daily", format: "YYYY-MM-DD", template: "" });
    assert.equal((await host.load()).daily.folder, "Daily");
    await assert.rejects(
      host.daily({ folder: "../private", format: "YYYY", template: "" }),
    );
    await writeFile(path.join(dir, "state.json"), "broken");
    await assert.rejects(host.load(), /preserved/);
    await assert.rejects(host.save({ revision: 3, data: {} }));
    assert.equal(
      await readFile(path.join(dir, "state.json"), "utf8"),
      "broken",
    );
  } finally {
    host.dispose();
    await rm(dir, { recursive: true, force: true });
  }
});
test("network resolves keychain only at the intended origin and never follows authenticated redirects", async () => {
  const credentials = fakeCredentials();
  await credentials.set("qiaomu-home-dsh-secret-github", "fixture-secret");
  let requests = [];
  const network = new HomeNetwork(credentials, {
    fetcher: async (url, init) => {
      requests.push({ url: String(url), init });
      return new Response('{"login":"fixture"}', {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });
  try {
    const result = await network.request({
      url: "https://api.github.com/user",
      headers: { Authorization: "Bearer home-keychain:github" },
    });
    assert.equal(result.json.login, "fixture");
    assert.equal(
      requests[0].init.headers.get("Authorization"),
      "Bearer fixture-secret",
    );
    assert.equal(requests[0].init.redirect, "error");
    assert(!JSON.stringify(result).includes("fixture-secret"));
    await assert.rejects(
      network.request({
        url: "https://example.com",
        headers: { Authorization: "Bearer home-keychain:github" },
      }),
      /does not match/,
    );
    await assert.rejects(
      network.request({
        url: "https://api.github.com",
        headers: { Authorization: "Bearer plaintext" },
      }),
      /reference/,
    );
    await assert.rejects(
      network.request({ url: "file:///tmp/secret" }),
      /HTTP/,
    );
    assert.equal(requests.length, 1);
  } finally {
    network.dispose();
  }
});
test("network bounds streaming and advertised payloads and sanitizes transport failures", async () => {
  for (const mode of ["header", "stream", "failure"]) {
    const network = new HomeNetwork(fakeCredentials(), {
      fetcher: async () => {
        if (mode === "failure") throw Error("credential=secret");
        if (mode === "header")
          return new Response("small", {
            headers: { "content-length": String(17 * 1024 * 1024) },
          });
        return new Response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(new Uint8Array(17 * 1024 * 1024));
              controller.close();
            },
          }),
        );
      },
    });
    try {
      await assert.rejects(
        network.request({ url: "https://example.com" }),
        mode === "failure" ? /could not reach/ : /exceeds/,
      );
    } finally {
      network.dispose();
    }
  }
});
