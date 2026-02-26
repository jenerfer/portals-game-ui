import styles from './UserList.module.css';

export interface UserEntry {
  id: string;
  name: string;
}

export interface UserListProps {
  entries: UserEntry[];
  onMore?: (id: string) => void;
}

export function UserList({ entries, onMore }: UserListProps) {
  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <div key={entry.id} className={styles.row}>
          <span className={styles.name}>{entry.name}</span>
          <button
            type="button"
            className={styles.moreBtn}
            onClick={() => onMore?.(entry.id)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="4" cy="10" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="16" cy="10" r="2" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
