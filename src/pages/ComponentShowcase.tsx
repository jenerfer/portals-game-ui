import { useState } from 'react';

// Layout
import { Panel } from '@/components/layout/Panel';
import { PanelHeader } from '@/components/layout/PanelHeader';
import { ItemHeader } from '@/components/layout/ItemHeader';

// Primitives
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { Box } from '@/components/primitives/Box';

// Inputs
import { Toggle } from '@/components/inputs/Toggle';
import { Slider } from '@/components/inputs/Slider';
import { TextEntry } from '@/components/inputs/TextEntry';
import { Dropdown } from '@/components/inputs/Dropdown';
import { Radio } from '@/components/inputs/Radio';
import { CheckSelect } from '@/components/inputs/CheckSelect';
import { Coordinates } from '@/components/inputs/Coordinates';
import { TabSwitcher } from '@/components/inputs/TabSwitcher';

// Selectors
import { MultiTagSelector } from '@/components/selectors/MultiTagSelector';
import { GraphicSelectorGrid } from '@/components/selectors/GraphicSelectorGrid';
import { GraphicSelectorHorizontal } from '@/components/selectors/GraphicSelectorHorizontal';

// Navigation
import { ClickThruPanel } from '@/components/navigation/ClickThruPanel';
import { BuildBar } from '@/components/navigation/BuildBar';

// Static UI
import { CommsBar } from '@/components/static-ui/CommsBar';
import { PlayerCounter } from '@/components/static-ui/PlayerCounter';
import { TopRight } from '@/components/static-ui/TopRight';
import { AccountEditMode } from '@/components/static-ui/AccountEditMode';

// Icons
import { MicIcon, ChatIcon } from '@/icons';
import { GeneralIcon } from '@/icons/GeneralIcon';
import { InventoryIcon } from '@/icons/InventoryIcon';
import { BuildSettingsIcon } from '@/icons/BuildSettingsIcon';
import { VersionIcon } from '@/icons/VersionIcon';
import { AudioIcon } from '@/icons/AudioIcon';
import { AvatarIcon } from '@/icons/AvatarIcon';
import { MovementIcon } from '@/icons/MovementIcon';
import { CameraIcon } from '@/icons/CameraIcon';
import { MusicIcon } from '@/icons/MusicIcon';
import { AtmosphericsIcon } from '@/icons/AtmosphericsIcon';
import { StudioIcon } from '@/icons/StudioIcon';
import { BugsIcon } from '@/icons/BugsIcon';
import { UsersIcon } from '@/icons/UsersIcon';

import styles from './ComponentShowcase.module.css';

/* ── Placeholder SVG Icons ──────────────────────────────── */

function PlaceholderIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}

function StarIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function GearIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}


function UserIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* ── Component Showcase ─────────────────────────────────── */

export default function ComponentShowcase() {
  // Input states
  const [sliderVal, setSliderVal] = useState(42);
  const [toggleOn, setToggleOn] = useState(true);
  const [textVal, setTextVal] = useState('');
  const [dropdownVal, setDropdownVal] = useState('option1');
  const [radioVal, setRadioVal] = useState('low');
  const [tabIdx, setTabIdx] = useState(0);
  const [coords, setCoords] = useState({ x: 12.5, y: -3.2, z: 0 });

  // Selector states
  const [selectedTags, setSelectedTags] = useState<string[]>(['plants', 'bricks']);
  const [gridSelection, setGridSelection] = useState('item1');
  const [horzSelection, setHorzSelection] = useState('h1');

  // Navigation states
  const [activePanel, setActivePanel] = useState<'main' | 'sub'>('main');
  const [buildBarActive, setBuildBarActive] = useState('general');

  // Static UI states
  const [editMode, setEditMode] = useState<'build' | 'account'>('build');
  const [activeComms, setActiveComms] = useState<Set<string>>(new Set());

  // Data
  const allTags = ['plants', 'chairs', 'doors', 'bricks', 'floors', 'decor'];
  const dropdownOptions = [
    { value: 'option1', label: 'Low Quality' },
    { value: 'option2', label: 'Medium Quality' },
    { value: 'option3', label: 'High Quality' },
    { value: 'option4', label: 'Ultra Quality' },
  ];

  const gridItems = [
    { id: 'item1', icon: <PlaceholderIcon />, label: 'Walls' },
    { id: 'item2', icon: <StarIcon />, label: 'Floors' },
    { id: 'item3', icon: <GearIcon />, label: 'Props' },
    { id: 'item4', icon: <PlaceholderIcon />, label: 'Lights' },
  ];

  const horzItems = [
    { id: 'h1', icon: <PlaceholderIcon size={20} />, label: 'Modern' },
    { id: 'h2', icon: <StarIcon size={20} />, label: 'Classic' },
    { id: 'h3', icon: <GearIcon size={20} />, label: 'Industrial' },
  ];

  const buildBarItems = [
    { id: 'general', icon: <GeneralIcon />, label: 'General' },
    { id: 'inventory', icon: <InventoryIcon />, label: 'Inventory' },
    { id: 'build-settings', icon: <BuildSettingsIcon />, label: 'Build Settings' },
    { id: 'version', icon: <VersionIcon />, label: 'Version' },
    { id: 'audio', icon: <AudioIcon />, label: 'Audio' },
    { id: 'avatar', icon: <AvatarIcon />, label: 'Avatar' },
    { id: 'movement', icon: <MovementIcon />, label: 'Movement' },
    { id: 'camera', icon: <CameraIcon />, label: 'Camera' },
    { id: 'music', icon: <MusicIcon />, label: 'Music' },
    { id: 'atmospherics', icon: <AtmosphericsIcon />, label: 'Atmospherics' },
    { id: 'studio', icon: <StudioIcon />, label: 'Studio' },
    { id: 'bugs', icon: <BugsIcon />, label: 'Bugs' },
    { id: 'users', icon: <UsersIcon />, label: 'Users' },
  ];

  const commsItems = [
    { id: 'mic', icon: <MicIcon />, label: 'Microphone', active: activeComms.has('mic') },
    { id: 'chat', icon: <ChatIcon />, label: 'Chat', active: activeComms.has('chat') },
  ];

  const topRightItems = [
    { id: 'settings', icon: <GearIcon size={20} />, label: 'Settings' },
    { id: 'account', icon: <UserIcon size={20} />, label: 'Account' },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className={styles.viewport}>
      {/* ── BuildBar (left edge) ─────────────────────── */}
      <div className={styles.buildBarAnchor}>
        <BuildBar
          items={buildBarItems}
          activeId={buildBarActive}
          onChange={setBuildBarActive}
        />
      </div>

      {/* ── Main Panel ───────────────────────────────── */}
      <div className={styles.panelAnchor}>
        {activePanel === 'main' ? (
          <Panel>
            <PanelHeader title="settings" onClose={() => {}} />

            {/* Buttons Section */}
            <ItemHeader title="buttons" />
            <Box direction="column" gap={10}>
              <Box direction="row" gap={10}>
                <Button variant="primary-blue" size="micro">primary</Button>
                <Button variant="secondary-white" size="micro">secondary</Button>
              </Box>
              <Box direction="row" gap={10}>
                <Button variant="tertiary" size="micro">tertiary</Button>
                <Button variant="outline" size="micro">outline</Button>
              </Box>
              <Box direction="row" gap={10}>
                <Button variant="disabled" size="micro">disabled</Button>
              </Box>
            </Box>

            {/* Toggle */}
            <ItemHeader title="toggle" hasHelpIcon />
            <Box direction="row" gap={20} align="center">
              <Toggle checked={toggleOn} onChange={setToggleOn} />
              <Text variant="p2" color="secondary">
                {toggleOn ? 'enabled' : 'disabled'}
              </Text>
            </Box>

            {/* Slider */}
            <ItemHeader title="render quality" hasHelpIcon />
            <Slider value={sliderVal} onChange={setSliderVal} min={0} max={100} />

            {/* Text Entry */}
            <ItemHeader title="text entry" />
            <TextEntry
              value={textVal}
              onChange={setTextVal}
              placeholder="enter world name..."
            />

            {/* Dropdown */}
            <ItemHeader title="quality preset" />
            <Dropdown
              options={dropdownOptions}
              value={dropdownVal}
              onChange={setDropdownVal}
            />

            {/* Radio */}
            <ItemHeader title="shadow quality" />
            <Box direction="column" gap={12}>
              {['low', 'medium', 'high'].map((val) => (
                <Radio
                  key={val}
                  value={val}
                  label={val}
                  selected={radioVal === val}
                  onChange={setRadioVal}
                />
              ))}
            </Box>

            {/* Check Select */}
            <ItemHeader title="features" />
            <Box direction="column" gap={12}>
              <CheckSelect label="anti-aliasing" defaultChecked={true} />
              <CheckSelect label="ambient occlusion" defaultChecked={false} />
              <CheckSelect label="bloom" defaultChecked={true} />
            </Box>

            {/* Coordinates */}
            <ItemHeader title="spawn position" />
            <Coordinates value={coords} onChange={setCoords} />

            {/* Tab Switcher */}
            <ItemHeader title="view mode" />
            <TabSwitcher
              tabs={['first person', 'third person']}
              activeTab={tabIdx}
              onChange={setTabIdx}
            />

            {/* Multi Tag Selector */}
            <ItemHeader title="categories" hasHelpIcon />
            <div className={styles.tagWrap}>
              {allTags.map((tag) => (
                <MultiTagSelector
                  key={tag}
                  label={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                />
              ))}
            </div>

            {/* Graphic Selector Grid */}
            <ItemHeader title="object type" />
            <GraphicSelectorGrid
              items={gridItems}
              selectedId={gridSelection}
              onChange={setGridSelection}
            />

            {/* Graphic Selector Horizontal */}
            <ItemHeader title="style" />
            <GraphicSelectorHorizontal
              items={horzItems}
              selectedId={horzSelection}
              onChange={setHorzSelection}
            />

            {/* Click-thru navigation */}
            <ItemHeader title="navigation" />
            <ClickThruPanel
              label="advanced settings"
              icon={<GearIcon size={24} />}
              onClick={() => setActivePanel('sub')}
            />
            <ClickThruPanel label="audio settings" />
            <ClickThruPanel label="controls" />

            {/* Footer buttons */}
            <Box direction="row" gap={20} style={{ marginTop: 10 }}>
              <Button variant="primary-blue" size="micro">save</Button>
              <Button variant="outline" size="micro">cancel</Button>
            </Box>
          </Panel>
        ) : (
          <Panel>
            <PanelHeader
              title="advanced settings"
              hasBackIcon
              onBack={() => setActivePanel('main')}
              onClose={() => setActivePanel('main')}
            />
            <ItemHeader
              title="advanced options"
              description="configure advanced rendering settings"
              variant="double"
            />
            <Slider defaultValue={75} min={0} max={100} />
            <Toggle defaultChecked />
            <Box direction="row" gap={20} style={{ marginTop: 20 }}>
              <Button variant="primary-blue" size="micro">apply</Button>
              <Button variant="outline" size="micro">back</Button>
            </Box>
          </Panel>
        )}
      </div>

      {/* ── Static UI: Top Right ──────────────────────── */}
      <div className={styles.topRightAnchor}>
        <Box direction="row" gap={10} align="center">
          <AccountEditMode mode={editMode} onChange={setEditMode} />
          <TopRight items={topRightItems} />
        </Box>
      </div>

      {/* ── Static UI: Bottom Left ────────────────────── */}
      <div className={styles.bottomLeftAnchor}>
        <CommsBar
          items={commsItems}
          onItemClick={(id) => setActiveComms((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
          })}
        />
      </div>

      {/* ── Static UI: Bottom Right ───────────────────── */}
      <div className={styles.bottomRightAnchor}>
        <PlayerCounter count={24} maxCount={50} />
      </div>

    </div>
  );
}
