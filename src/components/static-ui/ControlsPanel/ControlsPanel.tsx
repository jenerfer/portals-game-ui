import { useState } from 'react';
import { TabSwitcher } from '@/components/inputs/TabSwitcher';
import { Text } from '@/components/primitives/Text';
import { ShortcutRow } from '@/components/primitives/ShortcutRow';
import { Keycap } from '@/components/primitives/Keycap';
import { GameIcon } from '@/icons/GameIcon';
import { CloseIcon } from '@/icons/CloseIcon';
import { MouseLeftClickIcon } from '@/icons/MouseLeftClickIcon';
import { MouseRightClickIcon } from '@/icons/MouseRightClickIcon';
import { MouseScrollIcon } from '@/icons/MouseScrollIcon';
import { DragIcon } from '@/icons/DragIcon';
import { characterTab, buildingTab, cameraUiTab } from './controlsData';
import type { TabData, ShortcutEntry } from './controlsData';
import styles from './ControlsPanel.module.css';

export interface ControlsPanelProps {
  onClose?: () => void;
}

const TABS = ['Character', 'Building', 'Camera & Ui'];
const TAB_DATA: TabData[] = [characterTab, buildingTab, cameraUiTab];

/** Map special mouse key strings to icon components */
function renderKey(key: string, index: number) {
  switch (key) {
    case 'mouse-left':
      return <MouseLeftClickIcon key={index} size={24} />;
    case 'mouse-right':
      return <MouseRightClickIcon key={index} size={24} />;
    case 'mouse-scroll':
      return <MouseScrollIcon key={index} size={24} />;
    case 'mouse-drag':
      return <DragIcon key={index} size={18} />;
    default:
      return <Keycap key={index} label={key} />;
  }
}

function ShortcutGrid({ shortcuts }: { shortcuts: ShortcutEntry[] }) {
  return (
    <div className={styles.grid}>
      {shortcuts.map((s, i) => (
        <ShortcutRow
          key={i}
          label={s.label}
          keys={s.keys.map((k, ki) => renderKey(k, ki))}
          separator={s.separator}
        />
      ))}
    </div>
  );
}

export function ControlsPanel({ onClose }: ControlsPanelProps) {
  const [activeTab, setActiveTab] = useState(0);
  const data = TAB_DATA[activeTab];

  return (
    <div className={styles.panel}>
      {/* ── Header ──────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerIcon}>
            <GameIcon size={36} />
          </span>
          <h1 className={styles.title}>Controls</h1>
        </div>
        {onClose && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close controls"
          >
            <CloseIcon size={24} />
          </button>
        )}
      </header>

      {/* ── Tabs ────────────────────────────────────── */}
      <TabSwitcher
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* ── Tab content ─────────────────────────────── */}
      <div className={styles.content}>
        {data.sections.map((section, i) => (
          <div key={i}>
            <Text variant="h2Divider" color="blue">{section.title}</Text>
            <ShortcutGrid shortcuts={section.shortcuts} />
          </div>
        ))}
      </div>
    </div>
  );
}
