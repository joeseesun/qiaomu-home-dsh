/**
 * 产物冒烟测试：在 Node 里用模拟的 DSH 环境评估 client.js，
 * 验证模块外壳、apply() 与 Slot 注册在加载时不崩。
 * 运行前需要先 `npm run build`。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** 最小 React 桩：apply 与注册不渲染，只需要符号存在。 */
const reactStub = {
  createElement: () => ({}),
  useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
  useEffect: () => {},
  useMemo: (fn) => fn(),
  useRef: (value) => ({ current: value ?? null }),
  useSyncExternalStore: (_sub, get) => get(),
  StrictMode: Symbol('StrictMode'),
  Fragment: Symbol('Fragment'),
};

async function loadBundle() {
  const source = await readFile(path.join(ROOT, 'client.js'), 'utf8');
  let captured = null;
  const window = {
    __ModuleLoader__: {
      load(row) {
        captured = row;
      },
    },
  };
  const requireStub = (spec) => {
    if (spec === 'react' || spec === 'react/jsx-runtime') return { ...reactStub, jsx: reactStub.createElement, jsxs: reactStub.createElement };
    throw new Error(`意外的外部 require：${spec}`);
  };
  const evaluate = new Function('window', 'globalThis', 'document', 'self', source);
  const documentStub = {
    querySelector: () => null,
    createElement: () => ({ dataset: {}, textContent: '' }),
    head: { appendChild: () => {} },
  };
  evaluate(window, window, documentStub, window);
  assert.ok(captured, '模块没有注册到 __ModuleLoader__');
  assert.equal(captured.id, 'qiaomu-home-dsh');
  const exports = captured.factory(requireStub);
  return exports;
}

test('client.js 在模拟环境中加载并注册 Slot', async () => {
  const exports = await loadBundle();
  assert.equal(typeof exports.apply, 'function');
  assert.deepEqual(exports.inject, ['slots', 'locale', 'sessions', 'workspaces', 'uiWorkspace']);

  const registrations = [];
  const dicts = [];
  const ctx = {
    effects: [],
    effect(fn, label) {
      this.effects.push(label);
      fn();
    },
    get: () => undefined,
    locale: {
      register(ns, dict) {
        dicts.push([ns, dict]);
        return () => {};
      },
      bind: () => (key) => key,
    },
    slots: {
      inject(name, callback) {
        callback();
      },
      register(options, component) {
        registrations.push([options, component]);
        return () => {};
      },
    },
  };
  exports.apply(ctx);

  const main = registrations.find(([options]) => options.name === 'main');
  assert.ok(main, '缺少 main 注册');
  assert.equal(main[0].key, 'qiaomu-home');
  assert.equal(main[0].locale, 'qiaomuHome');
  const injected = main[0].inject();
  assert.ok(injected.store, 'main 注入缺少 store');
  assert.ok(injected.services, 'main 注入缺少 services');

  const panel = registrations.find(([options]) => options.name === 'sidebar.panellist');
  assert.ok(panel, '缺少 panellist 注册');
  assert.equal(panel[0].id, 'qiaomu-home');
  assert.equal(panel[0].order, -20);
  assert.equal(panel[0].label(), 'panel.title');

  assert.equal(dicts.length, 1);
  assert.equal(dicts[0][0], 'qiaomuHome');
  assert.deepEqual(Object.keys(dicts[0][1].zh).sort(), Object.keys(dicts[0][1].en).sort(), '中英字典 key 必须一致');
});
