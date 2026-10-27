# Original Home migration (in progress)

Target: complete the original Home workflows and use their existing UI in DeepSeek Harness. The currently published 0.3.0 page is still the earlier React implementation; this branch is not yet a replacement release.

## Source and ownership

- Frozen upstream: Qiaomu Home 0.9.2, `38d5dc570032a571ec564cae8a7ccda393e8a706`.
- `src/original` contains the upstream source, language resources, data and unchanged stylesheet. `vendor/qiaomu-home/source.json` records every original SHA-256; GPL-3.0 license is included.
- Original DOM helpers resolve to `src/client/original-ui.ts` and `harness-ui.ts` during the adapter build. No `window`, `Node.prototype` or `HTMLElement.prototype` extensions.
- The only source edit at this checkpoint is `Node.instanceOf(HTMLElement)` → native `instanceof` in the wallpaper glass observer. The original canvas glass, dimensions, module layout and CSS remain intact.
- Host storage/credential primitives derive from Qiaomu Audio DSH 0.1.3 (`528efc073911fbdecfb4b126eb161661542ee448`) with independent Home credential namespace and directory.

## Verified in automated tests

- The actual original HomeView renders all six preset pages, the original module library filters/adds a module, and all four original settings tabs render. Keyboard picker selection, live Undo notice callbacks and disposal are exercised in jsdom.
- Original capture, task completion/Undo, daily-note templates and focus metadata execute against real temporary Markdown files through the new Host workspace adapter.
- Task completion rereads an externally changed file before locating the original task. Focus updates preserve unrelated frontmatter and comments and reject incompatible values.
- File writes require matching content hashes; duplicate creates have one winner; traversal, hidden paths and symlinks are rejected. Workspace scanning is limited to 5,000 entries/16 levels; text is limited to 2 MB and attachments to 16 MB.
- Secrets use Home's own OS credential namespace. The client receives references only; authenticated network calls resolve references only for the expected GitHub/Unsplash origin, reject authenticated redirects, and bound response size/time.
- Invalid persisted settings fail without replacing the existing file.

## Required before release

1. Wire the Home Host remote service and original HomeView into the actual Harness panel; currently this branch tests those adapters independently and the production entry still uses 0.3.0's React page.
2. Migrate existing `dsh-qiaomu-home:v1` state without losing todos, quick notes, scratchpad, habits/history, shortcut groups, pages, focus timer, provider card placement or session navigation. Preserve the raw legacy state and make migration restart-safe.
3. Map native sessions, note preview/editing, search, commands, provider lifecycle and startup behavior. Reconcile Obsidian-only integrations explicitly against available Harness capabilities.
4. Finish scoped local-wallpaper cache, daily-note settings UI and keychain references in the runtime mount. Verify network fixtures and live weather/gallery requests separately.
5. Run original module workflows and visual comparison in the real Harness. Browser is user-controlled; no browser operation/restart is authorized during this pause.
6. Publish a release only after applicable checks; download/hash-check the public package, install with backup, and separately verify the installed version. Do not restart the daily Harness while the other chat awaits approval.
