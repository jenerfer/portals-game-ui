import { useControllable } from '@/hooks/useControllable';
import styles from './Toggle.module.css';

export interface ToggleProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback fired when the toggle value changes */
  onChange?: (checked: boolean) => void;
  /** Whether the toggle is disabled */
  disabled?: boolean;
}

export function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
}: ToggleProps) {
  const [isChecked, setIsChecked] = useControllable(
    checked,
    defaultChecked,
    onChange,
  );

  const handleClick = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      className={`${styles.track} ${isChecked ? styles.on : styles.off}`}
      onClick={handleClick}
    >
      <span className={styles.thumb} />
    </button>
  );
}
