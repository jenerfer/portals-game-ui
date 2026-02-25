import styles from './AccountEditMode.module.css';

export type AccountEditModeValue = 'build' | 'account';

export interface AccountEditModeProps {
  /** Currently active mode */
  mode: AccountEditModeValue;
  /** Callback fired when the mode changes */
  onChange?: (mode: AccountEditModeValue) => void;
}

const SEGMENTS: { value: AccountEditModeValue; label: string }[] = [
  { value: 'build', label: 'Build' },
  { value: 'account', label: 'Account' },
];

export function AccountEditMode({ mode, onChange }: AccountEditModeProps) {
  return (
    <div className={styles.container} role="tablist" aria-label="Mode selector">
      {SEGMENTS.map((segment) => {
        const isActive = segment.value === mode;

        return (
          <button
            key={segment.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.segment} ${isActive ? styles.active : ''}`}
            onClick={() => onChange?.(segment.value)}
          >
            {segment.label}
          </button>
        );
      })}
    </div>
  );
}
