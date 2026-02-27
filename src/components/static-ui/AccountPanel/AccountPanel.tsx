import { useState } from 'react';
import { Panel } from '@/components/layout/Panel';
import { PanelHeader } from '@/components/layout/PanelHeader';
import { ItemHeader } from '@/components/layout/ItemHeader';
import { TextEntry } from '@/components/inputs/TextEntry';
import { Text } from '@/components/primitives/Text';
import { VerifiedBadge } from '@/icons/VerifiedBadge';
import { ProfileCircleIcon } from '@/icons/ProfileCircleIcon';
import { SettingsIcon } from '@/icons/SettingsIcon';
import { GameIcon } from '@/icons/GameIcon';
import { CopyIcon } from '@/icons/CopyIcon';
import { LogoutIcon } from '@/icons/LogoutIcon';
import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import styles from './AccountPanel.module.css';

export interface AccountPanelProps {
  onClose?: () => void;
}

export function AccountPanel({ onClose }: AccountPanelProps) {
  const [name, setName] = useState('jen');

  return (
    <Panel>
      <PanelHeader title="account" onClose={onClose} />

      {/* ── Profile card ───────────────────────────── */}
      <div className={styles.profileCard}>
        <img
          className={styles.avatar}
          src="/images/jen-pfp.png"
          alt="avatar"
        />
        <div className={styles.profileInfo}>
          <div className={styles.nameRow}>
            <VerifiedBadge size={20} />
            <Text variant="p1Bold" color="primary">jen</Text>
          </div>
          <Text variant="p3" color="muted">jen78@gmail.com</Text>
        </div>
      </div>

      {/* ── Name field ─────────────────────────────── */}
      <ItemHeader title="name" hasHelpIcon />
      <TextEntry value={name} onChange={setName} />

      {/* ── Menu rows ──────────────────────────────── */}
      <div className={styles.menuList}>
        <button type="button" className={styles.menuRow}>
          <span className={styles.menuRowIcon}><ProfileCircleIcon size={24} /></span>
          <span className={styles.menuRowLabel}>edit avatar</span>
        </button>

        <button type="button" className={styles.menuRow}>
          <span className={styles.menuRowIcon}><SettingsIcon size={24} /></span>
          <span className={styles.menuRowLabel}>graphics & audio</span>
        </button>

        <button type="button" className={styles.menuRow}>
          <span className={styles.menuRowIcon}><GameIcon size={24} /></span>
          <span className={styles.menuRowLabel}>controls</span>
        </button>

        <button type="button" className={styles.menuRow}>
          <span className={styles.menuRowIcon}><CopyIcon size={24} /></span>
          <span className={styles.menuRowLabel}>copy space link</span>
        </button>
      </div>

      {/* ── Divider ─────────────────────────────────── */}
      <div className={styles.divider} />

      {/* ── Logout ─────────────────────────────────── */}
      <button type="button" className={`${styles.menuRow} ${styles.logoutSeparator}`}>
        <span className={styles.menuRowIcon}><LogoutIcon size={24} /></span>
        <span className={styles.menuRowLabel}>logout</span>
        <span className={styles.menuRowChevron}><ChevronRightIcon size={18} /></span>
      </button>
    </Panel>
  );
}
