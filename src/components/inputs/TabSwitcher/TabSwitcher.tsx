import { useControllable } from '@/hooks/useControllable';
import styles from './TabSwitcher.module.css';

export interface TabSwitcherProps {
  /** Tuple of two tab labels [left, right] */
  tabs: [string, string];
  /** Controlled active tab index (0 or 1) */
  activeTab?: number;
  /** Initial active tab for uncontrolled usage */
  defaultActiveTab?: number;
  /** Callback fired when the active tab changes */
  onChange?: (index: number) => void;
}

export function TabSwitcher({
  tabs,
  activeTab,
  defaultActiveTab = 0,
  onChange,
}: TabSwitcherProps) {
  const [active, setActive] = useControllable(activeTab, defaultActiveTab, onChange);

  return (
    <div className={styles.container} role="tablist">
      <span
        className={styles.indicator}
        style={{ transform: `translateX(${active * 100}%)` }}
        aria-hidden="true"
      />
      {tabs.map((label, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={active === index}
          className={`${styles.tab} ${active === index ? styles.active : styles.inactive}`}
          onClick={() => setActive(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
