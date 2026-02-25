import styles from './GraphicSelectorHorizontal.module.css';

export interface GraphicSelectorHorizontalItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface GraphicSelectorHorizontalProps {
  /** Array of selectable icon items */
  items: GraphicSelectorHorizontalItem[];
  /** Currently selected item id */
  selectedId?: string;
  /** Callback fired when an item is selected */
  onChange?: (id: string) => void;
}

export function GraphicSelectorHorizontal({
  items,
  selectedId,
  onChange,
}: GraphicSelectorHorizontalProps) {
  return (
    <div className={styles.container} role="listbox">
      {items.map((item) => {
        const isSelected = item.id === selectedId;

        return (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            className={`${styles.item} ${isSelected ? styles.selected : ''}`}
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
