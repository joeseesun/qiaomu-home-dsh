# DeepSeek Harness 0.2.2-rc.2 verification

Verified 2026-11-12 (America/Los_Angeles). Product 0.3.4, baseline v0.3.3 / `10d5c38fb6338f84d7ee5e43005492bbb6dd3ab7`.

The old public tgz is rejected by the unmodified official rc.2 installer in an empty profile. This release explicitly adds only `0.2.2-rc.2` to the existing engines/DSH peers; untested future rc.3 remains rejected. Lock root metadata and bundled product identity are synchronized; the locked dependency graph is unchanged.

Upstream: [official rc.2 release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.2-rc.2). The official compatibility evaluator still gives engines.dsh precedence. Reviewed the actual sidebar slot, layout, Typert remote/gateway and tool contracts. The sidebar.panellist registration remains supported; these products do not wrap the changed session append API or depend on the old host overlay positioning API. RSS defines tools through defineTool and does not inspect obsolete error categories. No exemption is used.

## Verified

- Clean `npm ci`, existing `npm run check`, build and package audit pass.
- Official signed macOS arm64 rc.2 Desktop bundled CLI; signature and exact version rechecked. A separate DSH_HOME/workspace and web profile are used, with no daily-host changes.
- Candidate plugin install, composed configuration, host startup and every packaged installed file compared by size/SHA-256.
- 真实主页添加待办，重载后恢复；补齐 pagehide 保存后重新打包、全新 profile 安装，点击添加后立即重载仍恢复新待办。增加回归测试证明 300ms 防抖前 pagehide 保留变更，插件释放移除监听。

## Limits and recovery

未复测全部第三方 provider。UI 自动化记录的是点击到重载完成493ms，不作为 pagehide 发生时刻；提前关闭的时序由独立回归测试覆盖。 Windows/Linux and older host versions were not rerun; retained older declarations are not new runtime evidence. No production publishing or paid model calls. Existing migration branches and primary-workspace edits are preserved.

Previous version remains available at [the prior release](https://github.com/joeseesun/qiaomu-home-dsh/releases/tag/v0.3.3). Roll back by installing that tgz with the matching prior host; no data-format migration is introduced. Release assets and the independently downloaded public package are checked separately after merge.

Home also flushes pending debounced edits on pagehide and disposes the listener with its plugin context. The immediate-reload regression fails before this fix and passes after it.
