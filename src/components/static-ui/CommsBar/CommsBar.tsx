import styles from './CommsBar.module.css';

export interface CommsBarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}

export interface CommsBarProps {
  /** Array of communication control items (mic, chat, emote, etc.) */
  items: CommsBarItem[];
  /** Callback fired when an item button is clicked */
  onItemClick?: (id: string) => void;
}

export function CommsBar({ items, onItemClick }: CommsBarProps) {
  return (
    <nav className={styles.bar} aria-label="Communication controls">
      {items.map((item) => (
        <button
          key={item.id}
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
      ))}
    </nav>
  );
}
