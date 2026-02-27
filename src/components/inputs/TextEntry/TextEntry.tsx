import { type ChangeEvent, type KeyboardEventHandler, useId } from 'react';
import type { ReactNode } from 'react';
import { useControllable } from '@/hooks/useControllable';
import styles from './TextEntry.module.css';

export interface TextEntryProps {
  /** Controlled value */
  value?: string;
  /** Initial value for uncontrolled usage */
  defaultValue?: string;
  /** Callback fired when the input value changes */
  onChange?: (value: string) => void;
  /** Keyboard event handler (e.g. Enter-to-send) */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Optional label displayed above the input */
  label?: string;
  /** Content rendered after the input (e.g. icon button) */
  endAddon?: ReactNode;
  /** Browser spellcheck attribute */
  spellCheck?: boolean;
  /** Visual variant: 'default' (55px, radius-md) or 'pill' (auto height, rounded) */
  variant?: 'default' | 'pill';
  /** Override border-radius (sets --te-radius custom property) */
  borderRadius?: number | string;
}

export function TextEntry({
  value,
  defaultValue = '',
  onChange,
  onKeyDown,
  placeholder,
  disabled = false,
  label,
  endAddon,
  spellCheck,
  variant = 'default',
  borderRadius,
}: TextEntryProps) {
  const [current, setCurrent] = useControllable(value, defaultValue, onChange);
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrent(e.target.value);
  };

  const containerClass = [
    styles.inputContainer,
    variant === 'pill' ? styles.pill : '',
    disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={containerClass}
        style={borderRadius != null ? { '--te-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius } as React.CSSProperties : undefined}
      >
        <input
          id={id}
          type="text"
          className={styles.input}
          value={current}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          spellCheck={spellCheck}
        />
        {endAddon}
      </div>
    </div>
  );
}
