import styles from './Keycap.module.css';

interface KeycapProps {
  label: string;
  className?: string;
}

export function Keycap({ label, className }: KeycapProps) {
  return (
    <kbd className={`${styles.keycap} ${className ?? ''}`}>
      {label}
    </kbd>
  );
}
