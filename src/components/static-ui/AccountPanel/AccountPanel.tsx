import { useState, useRef, useEffect } from 'react';
import { Panel } from '@/components/layout/Panel';
import { PanelHeader } from '@/components/layout/PanelHeader';
import { ItemHeader } from '@/components/layout/ItemHeader';
import { TextEntry } from '@/components/inputs/TextEntry';
import { Dropdown } from '@/components/inputs/Dropdown';
import { Slider } from '@/components/inputs/Slider';
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
  onOpenControls?: () => void;
}

export function AccountPanel({ onClose, onOpenControls }: AccountPanelProps) {
  const [name, setName] = useState('jen');
  const [view, setView] = useState<'main' | 'graphics-audio'>('main');
  const [copied, setCopied] = useState(false);

  // Graphics & Audio state
  const [graphicsQuality, setGraphicsQuality] = useState('max');
  const [resolution, setResolution] = useState('high');
  const [sfxVolume, setSfxVolume] = useState(23);
  const [notifVolume, setNotifVolume] = useState(23);

  // Measure page heights so slider matches the active page
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const [sliderHeight, setSliderHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const activeRef = view === 'main' ? page1Ref : page2Ref;
    if (activeRef.current) {
      setSliderHeight(activeRef.current.offsetHeight);
    }
  }, [view]);

  return (
    <div className={styles.slider} style={{ height: sliderHeight }}>
      <div
        className={styles.sliderTrack}
        style={{ transform: view === 'graphics-audio' ? 'translateX(calc(-100% - 2px))' : 'translateX(0)' }}
      >
        {/* ── Page 1: Main Account ─────────────────── */}
        <div ref={page1Ref} className={styles.sliderPage}>
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

              <button type="button" className={styles.menuRow} onClick={() => setView('graphics-audio')}>
                <span className={styles.menuRowIcon}><SettingsIcon size={24} /></span>
                <span className={styles.menuRowLabel}>graphics & audio</span>
              </button>

              <button type="button" className={styles.menuRow} onClick={onOpenControls}>
                <span className={styles.menuRowIcon}><GameIcon size={24} /></span>
                <span className={styles.menuRowLabel}>controls</span>
              </button>

              <button
                type="button"
                className={`${styles.menuRow} ${copied ? styles.menuRowActive : ''}`}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href).catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <span className={styles.menuRowIcon}><CopyIcon size={24} /></span>
                <span className={styles.menuRowLabel}>{copied ? 'space link copied!' : 'copy space link'}</span>
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
        </div>

        {/* ── Page 2: Graphics & Audio ─────────────── */}
        <div ref={page2Ref} className={styles.sliderPage}>
          <Panel>
            <PanelHeader title="graphics & audio" hasBackIcon onBack={() => setView('main')} onClose={onClose} />

            <Text variant="h2Divider" color="blue">graphics</Text>

            <ItemHeader title="graphics quality" hasHelpIcon />
            <Dropdown
              options={[
                { value: 'low', label: 'low' },
                { value: 'medium', label: 'medium' },
                { value: 'high', label: 'high' },
                { value: 'max', label: 'max' },
              ]}
              value={graphicsQuality}
              onChange={setGraphicsQuality}
            />

            <ItemHeader title="resolution setting" hasHelpIcon />
            <Dropdown
              options={[
                { value: 'low', label: 'low' },
                { value: 'medium', label: 'medium' },
                { value: 'high', label: 'high' },
              ]}
              value={resolution}
              onChange={setResolution}
            />

            <Text variant="h2Divider" color="blue">audio</Text>

            <ItemHeader title="sound fx volume" hasHelpIcon />
            <Slider value={sfxVolume} onChange={setSfxVolume} min={0} max={100} />

            <ItemHeader title="notifications volume" hasHelpIcon />
            <Slider value={notifVolume} onChange={setNotifVolume} min={0} max={100} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
