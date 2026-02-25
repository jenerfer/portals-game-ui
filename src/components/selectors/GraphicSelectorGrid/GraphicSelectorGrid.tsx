import styles from './GraphicSelectorGrid.module.css';

export interface GraphicSelectorGridItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface GraphicSelectorGridProps {
  /** Array of selectable icon cards */
  items: GraphicSelectorGridItem[];
  /** Currently selected item id */
  selectedId?: string;
  /** Callback fired when an item is selected */
  onChange?: (id: string) => void;
}

export function GraphicSelectorGrid({
  items,
  selectedId,
  onChange,
}: GraphicSelectorGridProps) {
  return (
    <div className={styles.grid} role="listbox">
      {items.map((item) => {
        const isSelected = item.id === selectedId;

        return (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            className={`${styles.card} ${isSelected ? styles.selected : ''}`}
            onClick={() => onChange?.(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
