import styles from './MultiTagSelector.module.css';

export interface MultiTagSelectorProps {
  /** Label text displayed inside the pill */
  label: string;
  /** Whether the tag is in the selected state */
  selected?: boolean;
  /** Click handler, typically used to toggle selection */
  onClick?: () => void;
}

export function MultiTagSelector({
  label,
  selected = false,
  onClick,
}: MultiTagSelectorProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className={`${styles.tag} ${selected ? styles.selected : styles.default}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
