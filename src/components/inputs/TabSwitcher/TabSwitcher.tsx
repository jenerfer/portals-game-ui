import { useControllable } from '@/hooks/useControllable';
import styles from './TabSwitcher.module.css';

export interface TabSwitcherProps {
  /** Array of tab labels */
  tabs: string[];
  /** Controlled active tab index */
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
        style={{
          width: `calc(${100 / tabs.length}% - 3px)`,
          transform: `translateX(${active * 100}%)`,
        }}
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
