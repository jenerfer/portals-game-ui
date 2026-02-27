import type { ReactNode } from 'react';
import { Keycap } from '@/components/primitives/Keycap';
import styles from './ShortcutRow.module.css';

interface ShortcutRowProps {
  label: string;
  /** Strings become <Keycap>, ReactNodes render as-is (for mouse icons) */
  keys: (string | ReactNode)[];
  /** Connector between keys — defaults to none, use "+" for combos */
  separator?: string;
}

export function ShortcutRow({ label, keys, separator }: ShortcutRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.keys}>
        {keys.map((key, i) => (
          <span key={i} className={styles.keyGroup}>
            {i > 0 && separator && (
              <span className={styles.separator}>{separator}</span>
            )}
            {typeof key === 'string' ? <Keycap label={key} /> : key}
          </span>
        ))}
      </span>
    </div>
  );
}
