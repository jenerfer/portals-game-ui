import styles from './TopRight.module.css';

export interface TopRightItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export interface TopRightProps {
  /** Array of icon action items (build tools, menu, etc.) */
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
          className={`${styles.iconButton} ${item.active ? styles.active : ''}`}
          onClick={() => onItemClick?.(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
        </button>
      ))}
    </nav>
  );
}
