/**
 * Masonry 卡片布局（对标 Obsidian 版 0.7.2 的 masonry.ts）：
 * 在双列 grid 上让每张卡片按自身高度占行，落进当前更短的列，
 * DOM 顺序不变，因此拖拽排序与键盘排序的行为不受影响。
 * 网格 gap 为 14px、行高 1px；跨行数按「高度 + gap」除以「行高 + gap」换算。
 */

const GAP = 14;
/** CSS 里 .qh-grid.qh-masonry 的行高；行间距为 GAP。 */
const ROW = 1;

/**
 * 卡片高度 → 需要跨多少行。
 * 跨 N 行的实际高度是 N*ROW + (N-1)*GAP，所以 N 必须按「行高 + 间距」换算；
 * 直接写高度(+GAP) 会得到约 15 倍高的行区域，把后面的卡片推到很远的地方。
 */
export function masonrySpan(height) {
  const value = Number(height);
  if (!Number.isFinite(value) || value <= 0) return 1;
  return Math.max(1, Math.ceil((value + GAP) / (ROW + GAP)));
}

/** 观察网格内 .qh-slot 的高度变化并写入 grid-row-end；返回清理函数。 */
export function attachMasonry(grid) {
  if (!grid || typeof ResizeObserver === 'undefined') return () => {};
  grid.classList.add('qh-masonry');
  const sized = new Set();
  const place = (node) => {
    const height = node.getBoundingClientRect().height;
    node.style.gridRowEnd = `span ${masonrySpan(height)}`;
  };
  const sync = () => {
    const slots = new Set(grid.querySelectorAll(':scope > .qh-slot'));
    for (const node of sized) {
      if (!slots.has(node)) {
        observer.unobserve(node);
        sized.delete(node);
        node.style.gridRowEnd = '';
      }
    }
    for (const node of slots) {
      if (!sized.has(node)) {
        sized.add(node);
        observer.observe(node);
        place(node);
      }
    }
  };
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) place(entry.target);
  });
  const mutations = new MutationObserver(sync);
  mutations.observe(grid, { childList: true, subtree: false });
  sync();
  return () => {
    observer.disconnect();
    mutations.disconnect();
    grid.classList.remove('qh-masonry');
    for (const node of sized) node.style.gridRowEnd = '';
    sized.clear();
  };
}
