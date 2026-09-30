#!/usr/bin/env node
/**
 * 构建乔木 Home 客户端半：
 *
 *   client.js  浏览器懒加载 CJS 模块，React 走平台种子表，其余全部内联。
 *
 * 产物外壳必须是 `window.__ModuleLoader__.load({ id, factory(require) })`：
 * DSH 的模块系统以「工厂返回 exports」的惰性 CJS 协议加载插件，不能是 ESM。
 * 宿主半 index.js 是手写的，不需要构建。
 *
 * 用法：node scripts/build.mjs [--dev]
 */
import { build } from 'esbuild';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const CLIENT_ID = 'qiaomu-home-dsh';
const STAGE = path.join(ROOT, 'build');

const dev = process.argv.includes('--dev');

/** 客户端半的 external：只有平台种子表里的模块可以外部化，其余必须内联。 */
const CLIENT_EXTERNAL = ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'];

/** 把 esbuild 的 CJS 产物包进 DSH 的懒加载工厂外壳。 */
function moduleLoaderShell(body) {
  return `window.__ModuleLoader__.load({
  id: ${JSON.stringify(CLIENT_ID)},
  factory: (require) => {
    const module = { exports: {} };
    const exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    (function (module, exports, require) {
${body}
    })(module, exports, require);
    return module.exports;
  },
});
`;
}

async function buildClient() {
  await mkdir(STAGE, { recursive: true });
  const entry = path.join(STAGE, 'client-entry.js');
  const raw = path.join(STAGE, 'client.raw.cjs');
  await writeFile(
    entry,
    [
      '/* 客户端半的 esbuild 入口：重新导出 src/client/index.jsx 的公开接口。 */',
      "export * from '../src/client/index.jsx';",
      '',
    ].join('\n'),
    'utf8',
  );
  await build({
    entryPoints: [entry],
    outfile: raw,
    bundle: true,
    format: 'cjs',
    platform: 'browser',
    target: ['chrome120'],
    external: CLIENT_EXTERNAL,
    legalComments: 'none',
    logLevel: 'warning',
    loader: { '.css': 'text' },
    jsx: 'automatic',
    sourcemap: dev,
  });
  // 剥掉可能存在的 sourceMappingURL：外壳里的注释行会失效，留着只会让浏览器 404。
  const body = (await readFile(raw, 'utf8')).replace(/^\/\/# sourceMappingURL=.*$/gm, '');
  await writeFile(path.join(ROOT, 'client.js'), moduleLoaderShell(body), 'utf8');
}

async function summary() {
  const client = await readFile(path.join(ROOT, 'client.js'), 'utf8');
  const check = (label, ok) => process.stdout.write(`  ${ok ? '✓' : '✗'} ${label}\n`);
  process.stdout.write('\n产物自检：\n');
  check('client.js 使用 __ModuleLoader__.load', client.includes('__ModuleLoader__.load('));
  check(`client.js 注册 id 为 ${CLIENT_ID}`, client.includes(`id: "${CLIENT_ID}"`));
  check('client.js 只外部化 react', !/require\("@deepseek-ai\//.test(client));
  check('client.js 导出 apply', /apply/.test(client));
  process.stdout.write(`\n  client.js ${client.length.toLocaleString()} 字节\n`);
}

async function main() {
  process.stdout.write('构建 乔木 Home (qiaomu-home-dsh)\n');
  await rm(STAGE, { recursive: true, force: true });
  await buildClient();
  await rm(STAGE, { recursive: true, force: true });
  await summary();
  process.stdout.write(`\n完成${dev ? '（开发模式，含 sourcemap）' : ''}。\n`);
}

main().catch((error) => {
  process.stderr.write(`构建失败：${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});
