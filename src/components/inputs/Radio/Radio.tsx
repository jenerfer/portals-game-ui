import styles from './Radio.module.css';

export interface RadioProps {
  /** The value this radio represents */
  value: string;
  /** Label text displayed next to the radio */
  label: string;
  /** Whether this radio is currently selected */
  selected?: boolean;
  /** Callback fired when this radio is clicked */
  onChange?: (value: string) => void;
  /** Whether the radio is disabled */
  disabled?: boolean;
}

export function Radio({
  value,
  label,
  selected = false,
  onChange,
  disabled = false,
}: RadioProps) {
  const handleClick = () => {
    if (disabled) return;
    onChange?.(value);
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
    >
      <span className={`${styles.circle} ${selected ? styles.selected : ''}`}>
        {selected && <span className={styles.dot} />}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
