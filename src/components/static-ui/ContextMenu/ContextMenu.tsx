import { useRef, useLayoutEffect, useState, type ComponentType } from 'react';
import { GearIcon } from '@/icons/GearIcon';
import { TrashIcon } from '@/icons/TrashIcon';
import { DuplicateIcon } from '@/icons/DuplicateIcon';
import { LockIcon } from '@/icons/LockIcon';
import { LinkIcon } from '@/icons/LinkIcon';
import { UnlinkIcon } from '@/icons/UnlinkIcon';
import { MagicStarIcon } from '@/icons/MagicStarIcon';
import { MouseCircleIcon } from '@/icons/MouseCircleIcon';
import styles from './ContextMenu.module.css';

export interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction?: (action: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  Icon: ComponentType<{ size?: number }>;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'settings', label: 'settings', Icon: GearIcon },
  { id: 'delete', label: 'delete', Icon: TrashIcon },
  { id: 'duplicate', label: 'duplicate', Icon: DuplicateIcon },
  { id: 'lock', label: 'lock', Icon: LockIcon },
  { id: 'attach', label: 'attach to item', Icon: LinkIcon },
  { id: 'detach', label: 'detach', Icon: UnlinkIcon },
  { id: 'interactive-studio', label: 'interactive studio', Icon: MagicStarIcon },
  { id: 'basic-interactions', label: 'basic interactions', Icon: MouseCircleIcon },
];

export function ContextMenu({ x, y, onClose, onAction }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: x, top: y });

  /* Clamp to viewport edges after first render */
  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = x;
    let top = y;

    if (x + rect.width > vw) left = x - rect.width;
    if (y + rect.height > vh) top = y - rect.height;

    /* Safety: never go off-screen left/top */
    if (left < 0) left = 4;
    if (top < 0) top = 4;

    setPos({ left, top });
  }, [x, y]);

  function handleAction(id: string) {
    onAction?.(id);
    onClose();
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
      <div
        ref={menuRef}
        className={styles.menu}
        style={{ left: pos.left, top: pos.top }}
      >
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.menuRow}
            onClick={() => handleAction(item.id)}
          >
            <span className={styles.menuRowIcon}>
              <item.Icon size={24} />
            </span>
            <span className={styles.menuRowLabel}>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
