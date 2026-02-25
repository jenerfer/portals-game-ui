import styles from './BuildBar.module.css';

export interface BuildBarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface BuildBarProps {
  /** Array of toolbar icon items */
  items: BuildBarItem[];
  /** Currently active item id */
  activeId?: string;
  /** Callback fired when an item is selected */
  onChange?: (id: string) => void;
}

export function BuildBar({
  items,
  activeId,
  onChange,
}: BuildBarProps) {
  return (
    <nav className={styles.bar} aria-label="Build toolbar">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={isActive}
            className={`${styles.iconButton} ${isActive ? styles.active : ''}`}
            onClick={() => onChange?.(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.tooltip}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
