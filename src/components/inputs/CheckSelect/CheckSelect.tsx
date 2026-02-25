import { useControllable } from '@/hooks/useControllable';
import styles from './CheckSelect.module.css';

export interface CheckSelectProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback fired when the checked state changes */
  onChange?: (checked: boolean) => void;
  /** Label text displayed next to the checkbox */
  label: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
}

export function CheckSelect({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
}: CheckSelectProps) {
  const [isChecked, setIsChecked] = useControllable(checked, defaultChecked, onChange);

  const handleClick = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      disabled={disabled}
      className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
    >
      <span className={`${styles.box} ${isChecked ? styles.checked : ''}`}>
        {isChecked && <span className={styles.checkmark} />}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
