import styles from './PlayerCounter.module.css';

export interface PlayerCounterProps {
  /** Current number of online players */
  count: number;
  /** Optional maximum player capacity */
  maxCount?: number;
  /** Callback fired when the counter is clicked */
  onClick?: () => void;
}

export function PlayerCounter({ count, maxCount, onClick }: PlayerCounterProps) {
  const label = maxCount != null ? `${count}/${maxCount}` : `${count}`;

  return (
    <button
      type="button"
      className={styles.container}
      onClick={onClick}
      aria-label={`${count} players online${maxCount != null ? ` of ${maxCount}` : ''}`}
    >
      <span className={styles.count}>{label}</span>
    </button>
  );
}
