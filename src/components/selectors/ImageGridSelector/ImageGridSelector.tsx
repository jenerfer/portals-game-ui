import styles from './ImageGridSelector.module.css';

export interface ImageGridSelectorItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface ImageGridSelectorProps {
  /** Array of selectable image cards */
  items: ImageGridSelectorItem[];
  /** Currently selected item ids */
  selectedIds?: string[];
  /** Callback fired with updated selection set */
  onChange?: (ids: string[]) => void;
}

export function ImageGridSelector({
  items,
  selectedIds = [],
  onChange,
}: ImageGridSelectorProps) {
  function handleClick(id: string) {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id];
    onChange?.(next);
  }

  return (
    <div className={styles.grid} role="listbox" aria-multiselectable>
      {items.map((item) => {
        const isSelected = selectedIds.includes(item.id);

        return (
          <div key={item.id} className={styles.wrapper}>
            <button
              type="button"
              role="option"
              aria-selected={isSelected}
              className={`${styles.card} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleClick(item.id)}
            >
              <span className={styles.image}>{item.icon}</span>
            </button>
            <span className={`${styles.label} ${isSelected ? styles.selectedLabel : ''}`}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
