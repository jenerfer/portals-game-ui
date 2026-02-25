import { type ChangeEvent, useId } from 'react';
import { useControllable } from '@/hooks/useControllable';
import styles from './TextEntry.module.css';

export interface TextEntryProps {
  /** Controlled value */
  value?: string;
  /** Initial value for uncontrolled usage */
  defaultValue?: string;
  /** Callback fired when the input value changes */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Optional label displayed above the input */
  label?: string;
}

export function TextEntry({
  value,
  defaultValue = '',
  onChange,
  placeholder,
  disabled = false,
  label,
}: TextEntryProps) {
  const [current, setCurrent] = useControllable(value, defaultValue, onChange);
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrent(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        className={styles.input}
        value={current}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
