import styles from './ClickThruPanel.module.css';

export interface ClickThruPanelProps {
  /** Label text for the navigation row */
  label: string;
  /** Optional icon displayed to the left of the label */
  icon?: React.ReactNode;
  /** Click handler for navigation */
  onClick?: () => void;
  /** Show a chevron arrow on the right side (defaults to true) */
  hasChevron?: boolean;
  /** Additional CSS class name */
  className?: string;
}

export function ClickThruPanel({
  label,
  icon,
  onClick,
  hasChevron = true,
  className,
}: ClickThruPanelProps) {
  const classNames = [styles.row, className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
    >
      <span className={styles.left}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
      </span>

      {hasChevron && (
        <span className={styles.chevron} aria-hidden="true" />
      )}
    </button>
  );
}
