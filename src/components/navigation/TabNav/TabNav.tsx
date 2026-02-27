import styles from './TabNav.module.css';

export interface TabNavItem {
  id: string;
  label: string;
}

export interface TabNavProps {
  items: TabNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  /** Typography size for tab labels (default: 'h2') */
  size?: 'h1' | 'h2';
}

export function TabNav({ items, activeId, onChange, size = 'h2' }: TabNavProps) {
  return (
    <div className={styles.nav}>
      <div className={styles.tabs}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.tab} ${size === 'h1' ? styles.sizeH1 : ''} ${item.id === activeId ? styles.active : ''}`}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.divider} />
    </div>
  );
}
