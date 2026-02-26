import { Button } from '@/components/primitives/Button';
import styles from './VersionList.module.css';

export interface VersionEntry {
  id: string;
  date: string;
  time: string;
  itemCount: number;
}

export interface VersionListProps {
  entries: VersionEntry[];
  onRestore?: (id: string) => void;
}

export function VersionList({ entries, onRestore }: VersionListProps) {
  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <div key={entry.id} className={styles.row}>
          <div className={styles.info}>
            <span className={styles.date}>
              {entry.date} <span className={styles.dateHighlight}>at {entry.time}</span>
            </span>
            <span className={styles.count}>{entry.itemCount} items</span>
          </div>
          <div className={styles.restoreWrap}>
            <Button
              variant="outline"
              size="micro"
              onClick={() => onRestore?.(entry.id)}
            >
              restore
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
