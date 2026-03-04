import { PanelHeader } from '@/components/layout/PanelHeader';
import { UserList, type UserEntry, type UserAction } from '@/components/data/UserList/UserList';
import styles from './UsersInSpaceModal.module.css';

export interface UsersInSpaceModalProps {
  users: UserEntry[];
  onClose: () => void;
  onAction?: (userId: string, action: UserAction) => void;
}

export function UsersInSpaceModal({ users, onClose, onAction }: UsersInSpaceModalProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <PanelHeader title="users in space" onClose={onClose} />

        <span className={styles.subtitle}>
          {users.length} {users.length === 1 ? 'user' : 'users'} in space
        </span>

        <div className={styles.listWrap}>
          <UserList entries={users} onAction={onAction} />
        </div>
      </div>
    </div>
  );
}
