/**
 * 页面内的交互基础件：模态对话框、弹出菜单、带撤销的提示条。
 * DSH 没有 Obsidian 的 Modal / Menu / Notice，这里在 .qh-root 内自带一套，
 * 并保证键盘可达：Esc 关闭、焦点陷阱与还原、菜单方向键、IME 组合输入不误触发提交。
 */
import React from 'react';

const { useCallback, useEffect, useLayoutEffect, useRef, useState } = React;

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';


/* ------------------------------------------------------------------ *
 * Modal
 * ------------------------------------------------------------------ */

export function Modal({ title, onClose, children, wide = false, label }) {
  const ref = useRef(null);
  const titleId = React.useId();

  useLayoutEffect(() => {
    const previous = document.activeElement;
    const root = ref.current;
    const first = root?.querySelector('[data-autofocus]') ?? root?.querySelector(FOCUSABLE);
    (first ?? root)?.focus();
    return () => {
      if (previous && typeof previous.focus === 'function' && previous.isConnected) previous.focus();
    };
  }, []);

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const nodes = Array.from(ref.current?.querySelectorAll(FOCUSABLE) ?? []).filter((node) => node.offsetParent !== null || node === document.activeElement);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="qh-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div
        ref={ref}
        className={`qh-modal${wide ? ' qh-modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={label ? undefined : titleId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        <header className="qh-modal-head">
          <h2 id={titleId}>{title}</h2>
        </header>
        <div className="qh-modal-body">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Menu：锚定在触发元素下方的弹出菜单
 * ------------------------------------------------------------------ */

function MenuList({ anchor, items, onClose, trigger }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(null);

  useLayoutEffect(() => {
    const menu = ref.current;
    if (!menu) return;
    const root = menu.offsetParent?.getBoundingClientRect() ?? { left: 0, top: 0, width: innerWidth, height: innerHeight };
    const rect = anchor.rect;
    const width = menu.offsetWidth;
    const height = menu.offsetHeight;
    let left = rect.right - root.left - width;
    let top = rect.bottom - root.top + 6;
    if (left < 8) left = Math.min(rect.left - root.left, root.width - width - 8);
    if (left < 8) left = 8;
    if (top + height > root.height - 8) top = Math.max(8, rect.top - root.top - height - 6);
    setPos({ left, top });
    menu.querySelector('[role="menuitem"]:not([aria-disabled="true"])')?.focus();
  }, [anchor]);

  useEffect(() => {
    // 点触发按钮自身交给它的 click 处理（切换），这里只处理真正的外部点击。
    const down = (event) => {
      if (ref.current?.contains(event.target) || trigger?.current?.contains(event.target)) return;
      onClose();
    };
    document.addEventListener('pointerdown', down, true);
    return () => document.removeEventListener('pointerdown', down, true);
  }, [onClose, trigger]);

  const onKeyDown = (event) => {
    const nodes = Array.from(ref.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])') ?? []);
    const index = nodes.indexOf(document.activeElement);
    const go = (next) => { event.preventDefault(); nodes[(next + nodes.length) % nodes.length]?.focus(); };
    if (event.key === 'ArrowDown') go(index + 1);
    else if (event.key === 'ArrowUp') go(index < 0 ? nodes.length - 1 : index - 1);
    else if (event.key === 'Home') go(0);
    else if (event.key === 'End') go(nodes.length - 1);
    else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose(); }
    else if (event.key === 'Tab') onClose();
  };

  return (
    <div ref={ref} className="qh-menu" role="menu" style={pos ? { left: pos.left, top: pos.top } : { opacity: 0, pointerEvents: 'none' }} onKeyDown={onKeyDown}>
      {items.map((item, index) => item.separator
        ? <div key={`sep-${index}`} className="qh-menu-sep" role="separator" />
        : (
          <button
            key={item.key ?? item.label}
            type="button"
            role="menuitem"
            className={`qh-menu-item${item.danger ? ' qh-danger' : ''}`}
            aria-disabled={item.disabled ? 'true' : undefined}
            tabIndex={-1}
            onClick={() => {
              if (item.disabled) return;
              onClose();
              item.onSelect();
            }}
          >
            {item.icon ? <item.icon size={14} /> : <span className="qh-menu-gap" />}
            <span>{item.label}</span>
          </button>
        ))}
    </div>
  );
}

/**
 * useMenu：返回 { menu, open }。open(eventOrElement, items) 在其位置弹出菜单；
 * 菜单关闭后焦点回到触发元素。`menu` 要渲染在 .qh-root 内。
 */
export function useMenu() {
  const [state, setState] = useState(null);
  const trigger = useRef(null);
  const isOpen = useRef(false);
  const close = useCallback(() => {
    isOpen.current = false;
    setState(null);
    const node = trigger.current;
    trigger.current = null;
    if (node?.isConnected) node.focus();
  }, []);
  const serial = useRef(0);
  const open = useCallback((source, items) => {
    const element = source?.currentTarget instanceof HTMLElement ? source.currentTarget : source instanceof HTMLElement ? source : null;
    const pointer = source?.type === 'contextmenu' || !element;
    // 再次点击同一个触发按钮：收起菜单，而不是重开。
    if (!pointer && isOpen.current && trigger.current === element) {
      close();
      return;
    }
    trigger.current = element;
    isOpen.current = true;
    const rect = pointer
      ? { left: source.clientX ?? 0, right: source.clientX ?? 0, top: source.clientY ?? 0, bottom: source.clientY ?? 0 }
      : element.getBoundingClientRect();
    serial.current += 1;
    setState({ anchor: { rect }, items, serial: serial.current });
  }, [close]);
  const menu = state ? <MenuList key={state.serial} anchor={state.anchor} items={state.items} onClose={close} trigger={trigger} /> : null;
  return { menu, open, close };
}

/* ------------------------------------------------------------------ *
 * Toasts：短暂提示，可带「撤销」
 * ------------------------------------------------------------------ */

export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());
  const dismiss = useCallback((id) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);
  const push = useCallback((message, action) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((list) => [...list.slice(-2), { id, message, action }]);
    timers.current.set(id, setTimeout(() => dismiss(id), action ? 7000 : 3500));
    return id;
  }, [dismiss]);
  useEffect(() => () => { for (const timer of timers.current.values()) clearTimeout(timer); }, []);
  return { toasts, push, dismiss };
}

export function ToastHost({ toasts, dismiss }) {
  return (
    <div className="qh-toasts" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="qh-toast">
          <span>{toast.message}</span>
          {toast.action ? (
            <button type="button" className="qh-toast-action" onClick={() => { dismiss(toast.id); toast.action.run(); }}>
              {toast.action.label}
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
