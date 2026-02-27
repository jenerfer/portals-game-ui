import { useState, useRef, useEffect, useCallback } from 'react';
import { MicIcon } from '@/icons/MicIcon';
import { ChevronUpIcon } from '@/icons/ChevronUpIcon';
import styles from './MenuBar.module.css';

export interface SubMenuItem {
  id: string;
  label: string;
}

export interface MenuBarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  /** Optional list of sub-menu items (e.g. mic devices) */
  subMenu?: SubMenuItem[];
  /** ID of the currently active sub-menu item */
  activeSubMenuId?: string;
  /** Callback when a sub-menu item is selected */
  onSubMenuSelect?: (deviceId: string) => void;
}

export interface MenuBarProps {
  /** Array of menu bar items (menu, build-tools, chat, mic, etc.) */
  items: MenuBarItem[];
  /** Callback fired when an item button is clicked */
  onItemClick?: (id: string) => void;
}

export function MenuBar({ items, onItemClick }: MenuBarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ── Click-outside to close menu ──────────────────────── */
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpenMenuId(null);
    }
  }, []);

  useEffect(() => {
    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId, handleClickOutside]);

  /* ── Hover delay helpers ──────────────────────────────── */
  const handleMouseEnter = (id: string, hasSubMenu: boolean) => {
    if (!hasSubMenu) return;
    // Cancel any pending leave timer (user moved back in)
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    hoverTimerRef.current = setTimeout(() => {
      setHoveredId(id);
    }, 400);
  };

  const handleMouseLeave = (id: string) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    // Only hide caret if menu is not open for this item
    if (openMenuId !== id) {
      // Short grace period so user can reach the caret
      leaveTimerRef.current = setTimeout(() => {
        setHoveredId(null);
      }, 500);
    }
  };

  /* ── Caret click → open menu ──────────────────────────── */
  const handleCaretClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Don't trigger the icon button click
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  /* ── Device selection ─────────────────────────────────── */
  const handleDeviceSelect = (item: MenuBarItem, deviceId: string) => {
    // Update selection immediately so user sees the active state
    item.onSubMenuSelect?.(deviceId);
    // Brief pause to let the selection feel satisfying before closing
    setTimeout(() => {
      setOpenMenuId(null);
      setHoveredId(null);
    }, 350);
  };

  return (
    <nav className={styles.bar} aria-label="Menu bar">
      {items.map((item) => {
        const hasSubMenu = item.subMenu && item.subMenu.length > 0;
        const showCaret = hasSubMenu && (hoveredId === item.id || openMenuId === item.id);
        const menuOpen = openMenuId === item.id;

        return (
          <div
            key={item.id}
            className={styles.itemWrapper}
            ref={menuOpen ? menuRef : undefined}
            onMouseEnter={() => handleMouseEnter(item.id, !!hasSubMenu)}
            onMouseLeave={() => handleMouseLeave(item.id)}
          >
            {/* Caret indicator */}
            {showCaret && (
              <button
                type="button"
                className={styles.caret}
                onClick={(e) => handleCaretClick(e, item.id)}
                onMouseEnter={() => {
                  if (leaveTimerRef.current) {
                    clearTimeout(leaveTimerRef.current);
                    leaveTimerRef.current = null;
                  }
                }}
                onMouseLeave={() => handleMouseLeave(item.id)}
                aria-label={`${item.label} options`}
              >
                <ChevronUpIcon size={14} />
              </button>
            )}

            {/* Floating device menu */}
            {menuOpen && item.subMenu && (
              <div className={styles.deviceMenu}>
                {item.subMenu.map((device) => {
                  const isActive = device.id === item.activeSubMenuId;
                  return (
                    <button
                      key={device.id}
                      type="button"
                      className={`${styles.deviceRow} ${isActive ? styles.deviceRowActive : ''}`}
                      onClick={() => handleDeviceSelect(item, device.id)}
                    >
                      <span className={styles.deviceIcon}>
                        <MicIcon size={23} />
                      </span>
                      <span className={styles.deviceLabel}>{device.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Icon button */}
            <button
              type="button"
              aria-pressed={item.active}
              aria-label={item.label}
              className={`${styles.iconButton} ${item.active ? styles.active : ''}`}
              onClick={() => onItemClick?.(item.id)}
            >
              <span className={styles.icon}>{item.icon}</span>

              {item.badge != null && item.badge > 0 && (
                <span className={styles.badge} aria-label={`${item.badge} notifications`}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
