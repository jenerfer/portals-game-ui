import styles from './ItemHeader.module.css';

interface ItemHeaderProps {
  title: string;
  description?: string;
  variant?: 'single' | 'double';
  hasHelpIcon?: boolean;
}

function ItemHeader({
  title,
  description,
  variant = 'single',
  hasHelpIcon = false,
}: ItemHeaderProps) {
  return (
    <div
      className={styles.root}
      data-variant={variant}
    >
      <div className={styles.titleRow}>
        <span className={styles.title}>{title}</span>
        {hasHelpIcon && (
          <span className={styles.helpIcon} aria-label="Help">
            ?
          </span>
        )}
      </div>

      {variant === 'double' && description && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
}

ItemHeader.displayName = 'ItemHeader';

export { ItemHeader };
export type { ItemHeaderProps };
