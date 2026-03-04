import { useState, useRef, useEffect, useCallback, type ComponentType } from 'react';
import { createPortal } from 'react-dom';
import { MuteIcon } from '@/icons/MuteIcon';
import { KickIcon } from '@/icons/KickIcon';
import { BanIcon } from '@/icons/BanIcon';
import { AdminIcon } from '@/icons/AdminIcon';
import { ModeratorIcon } from '@/icons/ModeratorIcon';
import styles from './UserList.module.css';

export type UserRole = 'owner' | 'moderator' | 'admin';

export interface UserEntry {
  id: string;
  name: string;
  avatarSrc?: string;
  role?: UserRole;
}

export type UserAction = 'mute' | 'kick' | 'ban' | 'make-admin' | 'make-moderator';

interface ActionItem {
  id: UserAction;
  label: string;
  Icon: ComponentType<{ size?: number }>;
}

const USER_ACTIONS: ActionItem[] = [
  { id: 'mute',           label: 'mute',           Icon: MuteIcon },
  { id: 'kick',           label: 'kick',           Icon: KickIcon },
  { id: 'ban',            label: 'ban from space',  Icon: BanIcon },
  { id: 'make-admin',     label: 'make admin',      Icon: AdminIcon },
  { id: 'make-moderator', label: 'make moderator',  Icon: ModeratorIcon },
];

export interface UserListProps {
  entries: UserEntry[];
  onAction?: (userId: string, action: UserAction) => void;
}

export function UserList({ entries, onAction }: UserListProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleMoreClick = useCallback((userId: string) => {
    if (openMenu === userId) {
      setOpenMenu(null);
      return;
    }
    const btn = btnRefs.current[userId];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setMenuPos({ left: rect.right - 220, top: rect.bottom + 6 });
    }
    setOpenMenu(userId);
  }, [openMenu]);

  /* Close on outside click */
  useEffect(() => {
    if (!openMenu) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (btnRefs.current[openMenu]?.contains(target)) return;
      setOpenMenu(null);
    };
    window.addEventListener('pointerdown', handleClick);
    return () => window.removeEventListener('pointerdown', handleClick);
  }, [openMenu]);

  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <div key={entry.id} className={`${styles.row} ${openMenu === entry.id ? styles.active : ''}`}>
          {entry.avatarSrc && (
            <img
              className={styles.avatar}
              src={entry.avatarSrc}
              alt={entry.name}
            />
          )}
          <span className={styles.name}>{entry.name}</span>
          {entry.role && (
            <span className={`${styles.badge} ${styles[entry.role]}`}>{entry.role}</span>
          )}
          <button
            ref={(el) => { btnRefs.current[entry.id] = el; }}
            type="button"
            className={styles.moreBtn}
            onClick={() => handleMoreClick(entry.id)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="4" cy="10" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="16" cy="10" r="2" />
            </svg>
          </button>
        </div>
      ))}

      {openMenu && menuPos && createPortal(
        <div ref={menuRef} className={styles.popover} style={{ left: menuPos.left, top: menuPos.top }}>
          {USER_ACTIONS.map((action) => (
            <button
              key={action.id}
              type="button"
              className={styles.popoverItem}
              onClick={() => {
                onAction?.(openMenu, action.id);
                setOpenMenu(null);
              }}
            >
              <span className={styles.popoverItemIcon}>
                <action.Icon size={24} />
              </span>
              <span className={styles.popoverItemLabel}>{action.label}</span>
            </button>
          ))}
        </div>,
        document.body,
      )}
    </div>
  );
}
