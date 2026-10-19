/**
 * 真实 DOM 交互检查。先 `localStorage.clear()` 并刷新测试页，然后在控制台执行：
 *   const log = await (await import('/checks.js')).run(); console.log(log);
 * 每行以 PASS / FAIL 开头；出现 FAIL 或 ERR 说明交互回归。
 */
export async function run() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const log = [];
  const ok = (name, condition) => log.push(`${condition ? 'PASS' : 'FAIL'} ${name}`);
  const setValue = (element, value) => {
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), 'value').set.call(element, value);
    element.dispatchEvent(new Event(element.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
  };
  const key = (element, name, extra = {}) => element.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, ...extra }));
  const snap = () => window.__store.getSnapshot();
  const group = (id) => snap().shortcutGroups.find((entry) => entry.id === id);
  const home = () => snap().tabs.find((tab) => tab.id === 'home');
  const menuItem = (text) => qa('.qh-menu-item').find((button) => button.textContent.includes(text));
  const drag = (type, element, point, transfer) => element.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, clientX: point.x, clientY: point.y, dataTransfer: transfer }));
  // 多条提示会叠放：撤销总是点最新的一条。
  const undoLatest = async () => { qa('.qh-toast-action').at(-1).click(); await sleep(50); };
  const openCardMenu = async (name) => { q(`[aria-label="${name}菜单"]`).click(); await sleep(60); };

  try {
    // ---- 组件库 ----
    const libraryButton = q('[aria-label="组件库"]');
    libraryButton.focus(); libraryButton.click(); await sleep(50);
    ok('组件库打开，焦点在搜索框', document.activeElement === q('.qh-lib-search'));
    setValue(q('.qh-lib-search'), '天气'); await sleep(30);
    ok('搜索收窄到 1 张', qa('.qh-lib-tile').length === 1);
    q('[aria-label="添加天气"]').click(); await sleep(30);
    ok('已添加天气，按钮变为移除', home().cards.includes('weather') && !!q('[aria-label="从此页移除天气"]'));
    key(q('.qh-modal'), 'Escape'); await sleep(30);
    ok('Esc 关闭并把焦点还给触发按钮', !q('.qh-modal') && document.activeElement === libraryButton);

    // ---- 卡片菜单与设置 ----
    await openCardMenu('最近会话');
    ok('菜单打开且焦点在第一项', !!q('.qh-menu') && document.activeElement?.textContent === '组件设置');
    key(q('.qh-menu'), 'ArrowUp');
    ok('ArrowUp 从第一项循环到最后一项', document.activeElement?.textContent.includes('移除'));
    key(q('.qh-menu'), 'Home'); document.activeElement.click(); await sleep(60);
    setValue(q('.qh-modal select'), '2'); await sleep(40);
    ok('显示数量保存并生效', home().options.recent?.limit === 2 && qa('.qh-session-row').length === 2);
    key(q('.qh-modal'), 'Escape'); await sleep(30);

    // 菜单触发按钮二次点击应收起
    const menuButton = q('[aria-label="今日待办菜单"]');
    menuButton.click(); await sleep(50);
    menuButton.click(); await sleep(50);
    ok('再次点击 ⋯ 收起菜单', !q('.qh-menu'));

    // ---- 撤销 ----
    await openCardMenu('今日待办');
    menuItem('从此页移除').click(); await sleep(40);
    ok('移除待办并出现撤销', !home().cards.includes('todo') && !!q('.qh-toast-action'));
    await undoLatest();
    ok('撤销恢复', home().cards.includes('todo'));

    // 待办超出数量限制时，新添加的待办必须可见
    const todoInput = q('.qh-slot[data-card=todo] .qh-todo-input');
    for (const text of ['一', '二', '三', '四', '五', '六', '七']) {
      setValue(todoInput, text); todoInput.form.requestSubmit(); await sleep(15);
    }
    ok('超出 6 条后新待办仍可见', qa('.qh-todo-text').some((node) => node.textContent === '七'));

    // ---- 标签页键盘 ----
    const first = q('[role=tab][aria-selected=true]'); first.focus(); key(first, 'ArrowRight'); await sleep(60);
    ok('→ 选中下一页', snap().tab === 'notes');
    key(q('[role=tab][aria-selected=true]'), 'End'); await sleep(40);
    ok('End 选中最后一页', snap().tab === 'explore');
    key(q('[role=tab][aria-selected=true]'), 'Home'); await sleep(40);
    ok('Home 选中第一页', snap().tab === 'home');

    // ---- 新建/重命名/复制/移动/删除 Tab ----
    q('[aria-label="新建 Tab"]').click(); await sleep(50);
    ok('新建 Tab 对话框含空白与 7 个模板', qa('[role=radio]').length === 8 && q('.qh-modal button[type=submit]').disabled);
    qa('[role=radio]').find((node) => node.textContent.includes('工作台')).click(); await sleep(30);
    ok('名称跟随模板', q('.qh-modal input[type=text]').value === '工作台');
    setValue(q('.qh-modal input[type=text]'), '我的工作'); await sleep(20);
    qa('[role=radio]').find((node) => node.textContent.includes('阅读')).click(); await sleep(20);
    ok('改过的名称不被模板覆盖', q('.qh-modal input[type=text]').value === '我的工作');
    qa('[role=radio]').find((node) => node.textContent.includes('工作台')).click(); await sleep(20);
    q('.qh-modal button[type=submit]').click(); await sleep(60);
    ok('模板 Tab 已创建并选中', snap().tabs.at(-1).name === '我的工作' && snap().tab === snap().tabs.at(-1).id);

    q('[aria-label="Tab 选项"]').click(); await sleep(50); menuItem('重命名').click(); await sleep(50);
    setValue(q('.qh-modal input'), '项目A'); q('.qh-modal button[type=submit]').click(); await sleep(50);
    ok('重命名', snap().tabs.at(-1).name === '项目A');
    q('[aria-label="Tab 选项"]').click(); await sleep(50); menuItem('复制 Tab').click(); await sleep(50);
    ok('复制默认名带「副本」', q('.qh-modal input').value === '项目A 副本');
    q('.qh-modal button[type=submit]').click(); await sleep(50);
    ok('副本紧随原页并被选中', snap().tabs.at(-2).name === '项目A' && snap().tabs.at(-1).name === '项目A 副本');

    await openCardMenu('今日待办'); menuItem('移到其他').click(); await sleep(50);
    qa('.qh-move-row').find((row) => row.textContent.startsWith('记录')).querySelector('button').click(); await sleep(50);
    ok('组件移到「记录」', snap().tabs.find((tab) => tab.id === 'notes').cards.includes('todo'));

    const tabCount = snap().tabs.length;
    q('[aria-label="Tab 选项"]').click(); await sleep(50); menuItem('删除 Tab').click(); await sleep(50);
    ok('删除需确认，默认焦点在取消', document.activeElement.textContent === '取消');
    qa('.qh-modal .qh-btn').find((button) => button.textContent === '删除 Tab').click(); await sleep(50);
    ok('Tab 已删除', snap().tabs.length === tabCount - 1);
    await undoLatest();
    ok('撤销恢复 Tab', snap().tabs.length === tabCount);
    q('[role=tab]').click(); await sleep(30);
    q('[aria-label="Tab 选项"]').click(); await sleep(50);
    ok('主页不可删除', menuItem('删除 Tab').getAttribute('aria-disabled') === 'true');
    key(q('.qh-menu'), 'Escape'); await sleep(30);

    // ---- 布置模式：拖拽 ----
    q('[aria-label="布置主页"]').click(); await sleep(50);
    const before = home().cards.join();
    const transfer = new DataTransfer();
    const slots = qa('.qh-slot');
    const handle = q('.qh-drag-handle', slots[0]);
    drag('dragstart', handle, { x: 0, y: 0 }, transfer);
    const rect = slots[2].getBoundingClientRect();
    drag('dragover', slots[2], { x: rect.left + 10, y: rect.bottom - 5 }, transfer); await sleep(20);
    ok('落点标记线显示在目标之后', slots[2].dataset.dropSide === 'after');
    drag('drop', slots[2], { x: rect.left + 10, y: rect.bottom - 5 }, transfer); await sleep(30);
    drag('dragend', handle, { x: 0, y: 0 }, transfer); await sleep(20);
    ok('卡片已重排且标记清除', home().cards.join() !== before && !q('[data-drop-marker]'));
    key(q('.qh-slot:nth-child(2) .qh-drag-handle'), 'ArrowUp', { altKey: true }); await sleep(30);
    ok('Alt+↑ 调整顺序并朗读', q('[aria-live=polite]').textContent.includes('已移到第'));
    q('.qh-done-btn').click(); await sleep(30);

    // ---- 快捷入口 ----
    q('.qh-slot[data-card=shortcuts] [aria-label="添加网址"]').click(); await sleep(50);
    q('.qh-modal button[type=submit]').click(); await sleep(30);
    ok('非法网址提示并留在弹窗', !!q('.qh-modal') && !!q('[role=alert]'));
    setValue(q('.qh-modal input[type=text]'), 'https://github.com'); await sleep(20);
    ok('选择图标时不请求站点图标（无 img）', qa('.qh-icon-choice img').length === 0);
    q('.qh-modal button[type=submit]').click(); await sleep(50);
    ok('入口以域名为默认名称', group('home-shortcuts').items.at(-1)?.label === 'github.com');

    q('[aria-label="组件库"]').click(); await sleep(50);
    q('[aria-label="新建入口组"]').click(); await sleep(60);
    setValue(q('.qh-modal input'), '学习'); q('.qh-modal button[type=submit]').click(); await sleep(60);
    const study = snap().shortcutGroups.find((entry) => entry.name === '学习');
    ok('新入口组已创建并放到当前页', !!study && home().cards.includes(`shortcut:${study.id}`));
    for (const url of ['https://a.dev', 'https://b.dev']) {
      q(`.qh-slot[data-card="shortcut:${study.id}"] [aria-label="添加网址"]`).click(); await sleep(40);
      setValue(q('.qh-modal input[type=text]'), url); q('.qh-modal button[type=submit]').click(); await sleep(40);
    }
    q('[aria-label="b.dev选项"]').click(); await sleep(40); menuItem('往前移').click(); await sleep(40);
    ok('入口前移', group(study.id).items.map((item) => item.label).join() === 'b.dev,a.dev');

    // 撤销：整组删除后撤销恢复入口；之后若又改动则拒绝撤销
    await openCardMenu('学习'); menuItem('删除入口组').click(); await sleep(40);
    qa('.qh-modal .qh-btn').find((button) => button.textContent === '删除入口组').click(); await sleep(50);
    ok('删除分组同时移出所有页', !group(study.id) && !snap().tabs.some((tab) => tab.cards.includes(`shortcut:${study.id}`)));
    await undoLatest();
    ok('撤销恢复分组、卡片与入口', group(study.id)?.items.length === 2 && home().cards.includes(`shortcut:${study.id}`));
    await openCardMenu('学习'); menuItem('删除入口组').click(); await sleep(40);
    qa('.qh-modal .qh-btn').find((button) => button.textContent === '删除入口组').click(); await sleep(50);
    window.__store.set({ shortcutGroups: [...snap().shortcutGroups, { id: 'later', name: '之后新增', items: [] }] }); await sleep(30);
    await undoLatest();
    ok('之后又有修改时拒绝撤销，且不丢新修改', !group(study.id) && !!group('later') && qa('.qh-toast').some((toast) => toast.textContent.includes('无法撤销')));

    // ---- 书签导入（真实文件输入） ----
    const html = await (await fetch('/bookmarks.html')).text();
    q('[aria-label="组件库"]').click(); await sleep(50);
    q('[aria-label="导入浏览器书签"]').click(); await sleep(60);
    const files = new DataTransfer(); files.items.add(new File([html], 'bookmarks.html', { type: 'text/html' }));
    const input = q('.qh-modal input[type=file]'); input.files = files.files; input.dispatchEvent(new Event('change', { bubbles: true })); await sleep(120);
    ok('预览只含去重后的 http(s) 链接', q('.qh-import-preview').textContent.includes('将导入 2 个网址'));
    qa('.qh-modal .qh-btn').find((button) => button.textContent === '导入').click(); await sleep(60);
    const imported = snap().shortcutGroups.find((entry) => entry.name === '导入的书签');
    ok('导入为新分组并放到当前页', imported?.items.length === 2 && home().cards.includes(`shortcut:${imported.id}`));

    window.__store.flush();
    ok('数据已落盘', JSON.parse(localStorage.getItem('dsh-qiaomu-home:v1')).shortcutGroups.some((entry) => entry.id === imported.id));
  } catch (error) {
    log.push(`ERR ${error.message} ${(error.stack || '').split('\n')[1] || ''}`);
  }
  return log.join('\n');
}
