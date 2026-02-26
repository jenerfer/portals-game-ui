import styles from './VideoPlaceholder.module.css';

export interface VideoPlaceholderProps {
  /** Aspect ratio expressed as width/height (default 16/9) */
  aspectRatio?: string;
}

export function VideoPlaceholder({ aspectRatio = '16 / 9' }: VideoPlaceholderProps) {
  return (
    <div className={styles.container} style={{ aspectRatio }}>
      <svg className={styles.playIcon} width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
        <path d="M15 10 L15 30 L32 20 Z" />
      </svg>
    </div>
  );
}
