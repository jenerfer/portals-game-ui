import styles from './TaskList.module.css';

export interface TaskEntry {
  id: string;
  name: string;
  status: 'error' | 'warning' | 'success';
}

export interface TaskListProps {
  entries: TaskEntry[];
  onClick?: (id: string) => void;
}

export function TaskList({ entries, onClick }: TaskListProps) {
  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <button
          key={entry.id}
          type="button"
          className={styles.row}
          onClick={() => onClick?.(entry.id)}
        >
          <span className={styles.name}>{entry.name}</span>
          <span className={styles.lights}>
            <span className={`${styles.pill} ${entry.status === 'error' ? styles.error : ''}`} />
            <span className={`${styles.pill} ${entry.status === 'warning' ? styles.warning : ''}`} />
            <span className={`${styles.pill} ${entry.status === 'success' ? styles.success : ''}`} />
          </span>
        </button>
      ))}
    </div>
  );
}
