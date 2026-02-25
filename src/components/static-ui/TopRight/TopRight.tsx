import styles from './TopRight.module.css';

export interface TopRightItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface TopRightProps {
  /** Array of icon action items (settings, account, etc.) */
  items: TopRightItem[];
  /** Callback fired when an item button is clicked */
  onItemClick?: (id: string) => void;
}

export function TopRight({ items, onItemClick }: TopRightProps) {
  return (
    <nav className={styles.container} aria-label="Account actions">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-label={item.label}
          className={styles.iconButton}
          onClick={() => onItemClick?.(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
        </button>
      ))}
    </nav>
  );
}
