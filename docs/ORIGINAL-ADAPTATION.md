# Original Home migration (in progress)

Target: complete the original Home workflows and use their existing UI in DeepSeek Harness. The currently published 0.3.0 page is still the earlier React implementation; this branch is not yet a replacement release.

## Source and ownership

- Frozen upstream: Qiaomu Home 0.9.2, `38d5dc570032a571ec564cae8a7ccda393e8a706`.
- `src/original` contains the upstream source, language resources, data and unchanged stylesheet. `vendor/qiaomu-home/source.json` records every original SHA-256; GPL-3.0 license is included.
- Original DOM helpers resolve to `src/client/original-ui.ts` and `harness-ui.ts` during the adapter build. No `window`, `Node.prototype` or `HTMLElement.prototype` extensions.
- Source edits are limited to the native DOM boundary, DSH release notes, disabling Obsidian pane-divider ownership, native card registration/rendering, Harness search and session-activity labels. `vendor/qiaomu-home/patches.json` records additional exact replacements; automated tests reverse every patch and compare all upstream hashes. The original canvas glass, dimensions, module layout and CSS remain intact.
- Host storage/credential primitives derive from Qiaomu Audio DSH 0.1.3 (`528efc073911fbdecfb4b126eb161661542ee448`) with independent Home credential namespace and directory.

## Verified in automated tests

- The actual original HomeView renders all six preset pages, the original module library filters/adds a module, and all four original settings tabs render. Keyboard picker selection, live Undo notice callbacks and disposal are exercised in jsdom.
- Original capture, task completion/Undo, daily-note templates and focus metadata execute against real temporary Markdown files through the new Host workspace adapter.
- Task completion rereads an externally changed file before locating the original task. Focus updates preserve unrelated frontmatter and comments and reject incompatible values.
- File writes require matching content hashes; duplicate creates have one winner; traversal, hidden paths and symlinks are rejected. Workspace scanning is limited to 5,000 entries/16 levels; text is limited to 2 MB and attachments to 16 MB.
- Secrets use Home's own OS credential namespace. The client receives references only; authenticated network calls resolve references only for the expected GitHub/Unsplash origin, reject authenticated redirects, and bound response size/time.
- Invalid persisted settings fail without replacing the existing file.

## Required before release

1. Complete the remaining legacy preference mappings (multi-search group selections/custom templates, wallpaper/quote offsets), and review original-only integrations and new-tab behavior against public Harness APIs.
2. Exercise real Harness navigation, commands, scoped local wallpapers, provider lifecycle, keychain pickers, daily-note settings, and live weather/gallery requests.
3. Visually compare original module workflows, including responsive settings, dialogs, menus, typography and dark theme. The browser is user-controlled; no browser operation or restart is authorized during this pause.
4. Publish only after applicable checks; download/hash-check the public package, install with backup, and separately verify the installed version. Do not restart the daily Harness while another chat awaits approval.

## Legacy-data and native-API checkpoint

The legacy migration planner now converts all valid 0.3.0 state into original settings and Markdown, while archiving the exact raw input. It preserves task completion, quick notes, scratchpad, journal answers, page order/options, provider placement, shortcut groups, absolute focus deadlines, daily focus and habit history. More than eight habits receive additional original habit pages; names reserved by YAML/card syntax receive distinct readable aliases with the old names retained in the archive. The Host refuses to overwrite an existing changed import, resumes identical partial imports, and does not repeat completed imports.

Host remote service and matching client descriptors are implemented in `src/host/service.js` / `src/client/home-remote.js`. The client serializes all revision-changing settings, credential-reference and daily-configuration writes. Native navigation uses the local Harness public SDK: `workspaces.create`, `sessions.create`, `uiWorkspace.openSession`, `sidebarRight.openResource`, `uiSession.bindingSource`, and the real `__DSH_DIRECTORY_PICKER__.pick` contract. Note navigation creates/reuses a Home-scoped workspace/session, never submits an AI message, and questions preserve any pre-existing input. These are contract tests against fixture services, not real browser validation.

## Production entry checkpoint — 0.4.0 candidate

The production build now bundles the actual original Plugin/HomeView/settings/module-library lifecycle, unchanged original CSS and the Home Host RemoteService. The old React page remains only as legacy source/tests and is no longer imported by the production entry. Host CSS supplies only missing host tokens, primitives and panel dimensions. Original view instances survive panel detach/reattach; original focus and ambient lifecycles are retained and cleaned up on unload.

The Home provider registry feeds the original plugin-source discovery and adds native Harness conversation search/recent/actions. Public sidebar tab metadata supplies the working-set card. Original saved-search actions now open a scoped Home note search with text, quoted path/file, tags, content, exclusions and OR. Note navigation continues even if saving recent-file history encounters a settings conflict.

Legacy scratchpad and daily-question cards use the original native-card factory, input classes and actions. Markdown writes compare the displayed base text plus the Host content hash. Drafts survive card refresh, navigation and reload; external edits are preserved, and conflicts can be saved as a separate Markdown copy. The conversation activity card uses the actual original heatmap renderer with session creation/update times and accurate conversation labels. It is a snapshot of these timestamps, not an invented message-by-message history.

Automated verification includes the built client factory and slot/CSS cleanup, original full Plugin mounting on real temporary Host state, draft conflict/reload/copy, journal history preservation and local search syntax. This is Node/jsdom and real temporary filesystem evidence. No new real Harness runtime, release or installed 0.4.0 is claimed.
