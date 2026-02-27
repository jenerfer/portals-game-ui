import { BackIcon } from '@/icons/BackIcon';
import { CloseIcon } from '@/icons/CloseIcon';
import { ExpandIcon } from '@/icons/ExpandIcon';
import styles from './PanelHeader.module.css';

interface PanelHeaderProps {
  title: string;
  onClose?: () => void;
  onBack?: () => void;
  hasBackIcon?: boolean;
  /** Renders an expand icon button before the close button */
  onExpand?: () => void;
}

function PanelHeader({ title, onClose, onBack, hasBackIcon = false, onExpand }: PanelHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.trailing}>
        {onExpand && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onExpand}
            aria-label="Expand panel"
          >
            <ExpandIcon size={18} />
          </button>
        )}

        {hasBackIcon && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onBack}
            aria-label="Go back"
          >
            <BackIcon size={24} />
          </button>
        )}

        {onClose && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onClose}
            aria-label="Close panel"
          >
            <CloseIcon size={24} />
          </button>
        )}
      </div>
    </header>
  );
}

PanelHeader.displayName = 'PanelHeader';

export { PanelHeader };
export type { PanelHeaderProps };
