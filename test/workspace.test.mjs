import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  rm,
  readFile,
  writeFile,
  symlink,
  mkdir,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { HomeWorkspace } from "../src/host/workspace.js";
async function withWorkspace(run) {
  const dir = await mkdtemp(path.join(tmpdir(), "qhome-workspace-"));
  try {
    await run(new HomeWorkspace(path.join(dir, "home")), dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
test("Home workspace creates, updates with a revision, and preserves concurrent edits", () =>
  withWorkspace(async (store, dir) => {
    const first = await store.write({
      path: "Daily/2026-10-28.md",
      text: "- [ ] Original task\n",
    });
    await assert.rejects(
      store.write({ path: first.path, text: "overwrite" }),
      /changed/,
    );
    await writeFile(
      path.join(dir, "home", first.path),
      "- [x] Edited externally\n",
    );
    await assert.rejects(
      store.write({ path: first.path, etag: first.etag, text: "stale" }),
      /changed/,
    );
    const read = await store.read(first.path);
    const saved = await store.write({
      path: first.path,
      etag: read.etag,
      text: read.text + "- [ ] Next\n",
    });
    assert.notEqual(saved.etag, first.etag);
    assert((await store.read(first.path)).text.includes("Edited externally"));
    const restart = new HomeWorkspace(path.join(dir, "home"));
    assert.equal((await restart.read(first.path)).etag, saved.etag);
    assert.equal(
      (await restart.snapshot()).entries.filter((file) => !file.directory)
        .length,
      1,
    );
  }));
test("workspace scope rejects traversal, hidden directories and symlinks; never deletes notes", () =>
  withWorkspace(async (store, dir) => {
    await store.ready;
    for (const p of [
      "../outside.md",
      "/tmp/outside.md",
      ".obsidian/a.md",
      "a/../b.md",
      "a\\b.md",
      "a/.env.md",
      "a.js",
    ])
      await assert.rejects(store.write({ path: p, text: "bad" }));
    await writeFile(path.join(dir, "outside.md"), "private");
    await symlink(
      path.join(dir, "outside.md"),
      path.join(dir, "home", "link.md"),
    );
    await assert.rejects(store.read("link.md"), /Symbolic/);
    await symlink(dir, path.join(dir, "home", "folder"));
    await assert.rejects(
      store.write({ path: "folder/other.md", text: "bad" }),
      /Symbolic/,
    );
    assert.deepEqual((await store.snapshot()).entries, []);
    await store.write({ path: "note.md", text: "keep" });
    await assert.rejects(
      store.operate({ action: "remove-cache", path: "note.md" }),
    );
    assert.equal((await store.read("note.md")).text, "keep");
  }));
test("workspace handles image imports and bounded content; concurrent creates have one winner", () =>
  withWorkspace(async (store) => {
    const result = await Promise.allSettled([
      store.write({ path: "same.md", text: "one" }),
      store.write({ path: "same.md", text: "two" }),
    ]);
    assert.equal(
      result.filter((item) => item.status === "fulfilled").length,
      1,
    );
    await assert.rejects(
      store.write({ path: "large.md", text: "x".repeat(2 * 1024 * 1024 + 1) }),
      /2 MB/,
    );
    await assert.rejects(
      store.write({ path: "bad.png", base64: "not base64" }),
    );
    await store.write({
      path: "Cache/Wallpapers/example.jpg",
      base64: Buffer.from([1, 2, 3]).toString("base64"),
    });
    assert.equal(
      (await store.read("Cache/Wallpapers/example.jpg", { binary: true }))
        .base64,
      "AQID",
    );
    await store.removeCache("Cache/Wallpapers/example.jpg");
    assert.equal(await store.exists("Cache/Wallpapers/example.jpg"), false);
  }));
