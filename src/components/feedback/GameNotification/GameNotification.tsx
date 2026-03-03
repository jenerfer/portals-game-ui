import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useSound } from '../../../audio';
import styles from './GameNotification.module.css';

/* ── Prop types (discriminated union) ──────────────────── */

interface GameNotificationBase {
  message: string;
  actionLabel: string;
  onAction?: () => void;
  duration?: number;
  onDismiss?: () => void;
}

interface DefaultNotificationProps extends GameNotificationBase {
  variant?: 'default';
  avatarSrc: string;
  username: string;
}

interface ErrorNotificationProps extends GameNotificationBase {
  variant: 'error';
  icon: ReactNode;
}

export type GameNotificationProps = DefaultNotificationProps | ErrorNotificationProps;

/* ── Component ─────────────────────────────────────────── */

export function GameNotification(props: GameNotificationProps) {
  const {
    message,
    actionLabel,
    onAction,
    duration = 5000,
    onDismiss,
  } = props;

  const isError = props.variant === 'error';
  const { play } = useSound();
  const [exiting, setExiting] = useState(false);

  /* Sound on mount */
  useEffect(() => { play(isError ? 'notification-error' : 'notification-in'); }, []);

  /* Sound on dismiss */
  useEffect(() => { if (exiting) play('notification-out'); }, [exiting]);

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
    <div
      className={`${styles.notification} ${isError ? styles.error : ''} ${exiting ? styles.exiting : ''}`}
    >
      {/* Left visual slot */}
      {isError ? (
        <span className={styles.icon}>{props.icon}</span>
      ) : (
        <img className={styles.avatar} src={props.avatarSrc} alt={props.username} />
      )}

      {/* Message */}
      <span className={`${styles.message} ${isError ? styles.errorMessage : ''}`}>
        {!isError && <span className={styles.username}>{props.username}</span>}
        {!isError ? ` ${message}` : message}
      </span>

      {/* Action button */}
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
