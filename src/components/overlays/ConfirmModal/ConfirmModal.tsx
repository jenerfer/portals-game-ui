import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import styles from './ConfirmModal.module.css';

export interface ConfirmModalProps {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose: () => void;
}

export function ConfirmModal({
  title,
  description,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  onClose,
}: ConfirmModalProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Text variant="h1" color="primary">{title}</Text>
        <Text variant="p1Para" color="secondary">{description}</Text>
        <div className={styles.buttonRow}>
          <Button variant="primary-blue" onClick={onPrimary}>
            {primaryLabel}
          </Button>
          <Button variant="secondary-white" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
