import styles from './AdvancedBuildBar.module.css';

export interface AdvancedBuildBarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface AdvancedBuildBarProps {
  /** Array of tool items (grab, move, rotate, scale) */
  items: AdvancedBuildBarItem[];
  /** ID of the currently active tool */
  activeId: string;
  /** Callback fired when a tool is selected */
  onChange: (id: string) => void;
}

export function AdvancedBuildBar({ items, activeId, onChange }: AdvancedBuildBarProps) {
  return (
    <nav className={styles.bar} aria-label="Advanced build tools">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={isActive}
            aria-label={item.label}
            className={`${styles.toolButton} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
          </button>
        );
      })}
    </nav>
  );
}
