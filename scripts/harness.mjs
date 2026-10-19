#!/usr/bin/env node
/**
 * 交互验证用的浏览器测试页：打包 scripts/harness/entry.jsx 并在 http://localhost:8765 提供。
 * 打开页面后，在控制台粘贴/导入 scripts/harness/checks.js 的内容即可跑一遍真实 DOM 交互检查
 * （组件库、菜单、拖拽、撤销、快捷入口、书签导入等）。
 *
 * 用法：npm run harness
 */
import { build } from 'esbuild';
import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'build', 'harness');
const modules = (name) => path.join(ROOT, 'node_modules', name);
await mkdir(OUT, { recursive: true });
await build({
  entryPoints: [path.join(ROOT, 'scripts/harness/entry.jsx')],
  bundle: true,
  outfile: path.join(OUT, 'out.js'),
  loader: { '.js': 'jsx' },
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"development"' },
  // 保证只有一份 React，否则会出现 Invalid hook call。
  alias: { react: modules('react'), 'react-dom': modules('react-dom') },
});

const page = '<!doctype html><meta charset="utf-8"><body style="margin:0"><div id="app"></div><script src="out.js"></script>';
const fixtures = {
  '/': ['text/html', async () => page],
  '/index.html': ['text/html', async () => page],
  '/out.js': ['text/javascript', () => readFile(path.join(OUT, 'out.js'))],
  '/checks.js': ['text/javascript', () => readFile(path.join(ROOT, 'scripts/harness/checks.js'))],
  '/bookmarks.html': ['text/html', () => readFile(path.join(ROOT, 'scripts/harness/bookmarks.html'))],
};
const port = Number(process.env.PORT) || 8765;
createServer(async (req, res) => {
  const entry = fixtures[new URL(req.url, 'http://x').pathname];
  if (!entry) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': `${entry[0]}; charset=utf-8` }).end(await entry[1]());
}).listen(port, () => console.log(`harness: http://localhost:${port}/index.html  （?w=420 为窄宽度）`));
