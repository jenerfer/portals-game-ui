import { forwardRef } from 'react';
import styles from './Panel.module.css';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ children, className }, ref) => {
    const classNames = [styles.panel, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames}>
        {children}
      </div>
    );
  },
);

Panel.displayName = 'Panel';

export { Panel };
export type { PanelProps };
