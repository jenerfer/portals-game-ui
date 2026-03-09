import { useState } from 'react';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { TextEntry } from '@/components/inputs/TextEntry';
import styles from './PasswordModal.module.css';

export interface PasswordModalProps {
  title: string;
  description: string;
  placeholder?: string;
  buttonLabel: string;
  onSubmit?: (password: string) => void;
  onClose: () => void;
}

export function PasswordModal({
  title,
  description,
  placeholder = 'enter password',
  buttonLabel,
  onSubmit,
  onClose,
}: PasswordModalProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit?.(password);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Text variant="h1" color="primary">{title}</Text>
        <Text variant="p1Para" color="secondary">{description}</Text>
        <TextEntry
          placeholder={placeholder}
          value={password}
          onChange={setPassword}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="primary-blue"
          className={styles.fullWidthButton}
          onClick={handleSubmit}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
