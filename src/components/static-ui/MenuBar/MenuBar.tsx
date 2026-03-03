import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  const [menuPos, setMenuPos] = useState<{ left: number; bottom: number } | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /* ── Click-outside to close menu ──────────────────────── */
  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as Node;
    // Check both the portal menu and the wrapper that triggered it
    const insideMenu = menuRef.current && menuRef.current.contains(target);
    const insideWrapper = openMenuId && wrapperRefs.current[openMenuId]?.contains(target);
    if (!insideMenu && !insideWrapper) {
      setOpenMenuId(null);
      setMenuPos(null);
    }
  }, [openMenuId]);

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
    const isClosing = openMenuId === id;
    setOpenMenuId(isClosing ? null : id);

    if (!isClosing) {
      // Compute position from the wrapper so the portal can be placed correctly
      const wrapper = wrapperRefs.current[id];
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        setMenuPos({
          left: rect.left,
          bottom: window.innerHeight - rect.top + 44, // 44px gap (caret height + spacing)
        });
      }
    } else {
      setMenuPos(null);
    }
  };

  /* ── Device selection ─────────────────────────────────── */
  const handleDeviceSelect = (item: MenuBarItem, deviceId: string) => {
    // Update selection immediately so user sees the active state
    item.onSubMenuSelect?.(deviceId);
    // Brief pause to let the selection feel satisfying before closing
    setTimeout(() => {
      setOpenMenuId(null);
      setMenuPos(null);
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
            ref={(el) => { wrapperRefs.current[item.id] = el; }}
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

            {/* Floating device menu — rendered via portal to escape parent backdrop-filter */}
            {menuOpen && item.subMenu && menuPos && createPortal(
              <div
                ref={menuRef}
                className={styles.deviceMenu}
                style={{ left: menuPos.left, bottom: menuPos.bottom }}
              >
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
              </div>,
              document.body,
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
