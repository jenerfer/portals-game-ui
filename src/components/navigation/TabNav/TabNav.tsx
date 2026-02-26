import styles from './TabNav.module.css';

export interface TabNavItem {
  id: string;
  label: string;
}

export interface TabNavProps {
  items: TabNavItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function TabNav({ items, activeId, onChange }: TabNavProps) {
  return (
    <div className={styles.nav}>
      <div className={styles.tabs}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.tab} ${item.id === activeId ? styles.active : ''}`}
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
