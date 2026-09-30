/**
 * 乔木 Home · 客户端半入口
 *
 * esbuild 的打包入口，产物被包成 DSH 的懒加载模块外壳后成为 `client.js`。
 * 做四件事：
 *   1. 注入页面样式；
 *   2. 注册中英字典；
 *   3. 把起点页注册到 `main`（key: qiaomu-home），把入口图标注册到 `sidebar.panellist`；
 *   4. 一切资源登记成 ctx.effect，插件卸载时干净回收。
 *
 * 只 require 平台种子表里的 react，不 import 任何 DSH 客户端包。
 */
import React from 'react';

import { HomePage } from './page.jsx';
import { createHomeStore } from './store.js';
import { CSS, CSS_EXTRA } from './styles.js';
import { zh, en } from './locale.js';
import { IconHome } from './icons.jsx';

/** 面板 id：main 的 key 与 panellist 的 id 必须一致，侧栏点击才会选中本页。 */
const PANEL_ID = 'qiaomu-home';
const NS = 'qiaomuHome';

/**
 * 需要的客户端服务。会话/工作区服务在 web 组合里始终存在，
 * 但仍在组件里做了判空降级，缺了也不至于白屏。
 */
export const inject = ['slots', 'locale', 'sessions', 'workspaces', 'uiWorkspace'];

/** 注入样式表（内容变化时更新，重复挂载只插一次）。 */
function injectStyles() {
  const tagId = 'qiaomu-home-dsh/page.css';
  if (typeof document === 'undefined') return;
  const content = CSS + CSS_EXTRA;
  const existing = document.querySelector(`style[data-plugin-css=${JSON.stringify(tagId)}]`);
  if (existing !== null) {
    if (existing.textContent !== content) existing.textContent = content;
    return;
  }
  const tag = document.createElement('style');
  tag.dataset.plugin = 'qiaomu-home-dsh';
  tag.dataset.pluginCss = tagId;
  tag.textContent = content;
  document.head.appendChild(tag);
}

/** 侧栏面板图标：外壳负责按钮与选中态，这里只画图标。 */
function PanelIcon({ size }) {
  return React.createElement(IconHome, { size: size ?? 18 });
}
PanelIcon.displayName = 'QiaomuHomePanelIcon';

/**
 * 客户端插件主体。
 * @param {object} ctx - 客户端根上下文。
 */
export function apply(ctx) {
  injectStyles();

  ctx.effect(() => {
    if (typeof ctx.locale?.register !== 'function') return () => {};
    return ctx.locale.register(NS, { zh, en });
  }, 'qiaomu-home: 字典');

  const store = createHomeStore();

  /** 传给页面的服务面：组件内全部判空调用。 */
  const services = {
    sessions: ctx.get?.('sessions') ?? ctx.sessions,
    workspaces: ctx.get?.('workspaces') ?? ctx.workspaces,
    uiWorkspace: ctx.get?.('uiWorkspace') ?? ctx.uiWorkspace,
  };

  ctx.effect(
    () =>
      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: PANEL_ID,
            locale: NS,
            inject: () => ({ store, services }),
          },
          HomePage,
        ),
      ),
    'qiaomu-home: 起点页',
  );

  ctx.effect(
    () =>
      ctx.slots.inject('sidebar.panellist', () =>
        ctx.slots.register(
          {
            name: 'sidebar.panellist',
            id: PANEL_ID,
            order: -20,
            locale: NS,
            label: () => {
              try {
                return ctx.locale.bind(NS)('panel.title');
              } catch {
                return 'Home';
              }
            },
          },
          PanelIcon,
        ),
      ),
    'qiaomu-home: 侧栏入口',
  );
}
