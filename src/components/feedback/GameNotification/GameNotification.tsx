import { useState, useEffect, useCallback } from 'react';
import styles from './GameNotification.module.css';

export interface GameNotificationProps {
  avatarSrc: string;
  username: string;
  message: string;
  actionLabel: string;
  onAction?: () => void;
  duration?: number;
  onDismiss?: () => void;
}

export function GameNotification({
  avatarSrc,
  username,
  message,
  actionLabel,
  onAction,
  duration = 5000,
  onDismiss,
}: GameNotificationProps) {
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      onDismiss?.();
    }, 400); // matches slideOut duration
  }, [onDismiss]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, dismiss]);

  return (
    <div className={`${styles.notification} ${exiting ? styles.exiting : ''}`}>
      <img className={styles.avatar} src={avatarSrc} alt={username} />
      <span className={styles.message}>
        <span className={styles.username}>{username}</span>
        {` ${message}`}
      </span>
      <button
        type="button"
        className={styles.action}
        onClick={() => {
          onAction?.();
          dismiss();
        }}
      >
        {actionLabel}
      </button>
    </div>
  );
}
