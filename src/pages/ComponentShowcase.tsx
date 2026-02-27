import { useState, useCallback, useEffect, useMemo } from 'react';

/* ── Random background image (picked once per mount) ───── */
const BG_IMAGES = [
  '/images/bg-1.jpg',
  '/images/bg-2.jpg',
  '/images/bg-3.jpg',
  '/images/bg-4.jpg',
];

// Layout
import { Panel } from '@/components/layout/Panel';
import { PanelHeader } from '@/components/layout/PanelHeader';
import { ItemHeader } from '@/components/layout/ItemHeader';

// Primitives
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';

// Inputs
import { Toggle } from '@/components/inputs/Toggle';
import { Slider } from '@/components/inputs/Slider';
import { TabSwitcher } from '@/components/inputs/TabSwitcher';
import { ColorSwatchPicker } from '@/components/inputs/ColorSwatchPicker';

// Selectors
import { GraphicSelectorGrid } from '@/components/selectors/GraphicSelectorGrid';
import { SkyboxSelector } from '@/components/selectors/SkyboxSelector';

// Media
import { VideoPlaceholder } from '@/components/media/VideoPlaceholder';

// Navigation
import { BuildBar } from '@/components/navigation/BuildBar';
import { TabNav } from '@/components/navigation/TabNav';

// Feedback
import { GameNotification } from '@/components/feedback/GameNotification';

// Data
import { VersionList } from '@/components/data/VersionList';
import { UserList } from '@/components/data/UserList';
import { TaskList } from '@/components/data/TaskList';
import { TrackList } from '@/components/data/TrackList';

// Static UI
import { MenuBar } from '@/components/static-ui/MenuBar';
import { PlayerCounter } from '@/components/static-ui/PlayerCounter';
import { AccountPanel } from '@/components/static-ui/AccountPanel';
import { ChatPanel } from '@/components/static-ui/ChatPanel';
import { ControlsPanel } from '@/components/static-ui/ControlsPanel';
import { ContextMenu } from '@/components/static-ui/ContextMenu';
import { InventoryPanel } from '@/components/static-ui/InventoryPanel';
// Icons
import { MicIcon, ChatIcon } from '@/icons';
import { WrenchIcon } from '@/icons/WrenchIcon';
import { HamburgerIcon } from '@/icons/HamburgerIcon';
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

/* ── Component Showcase ─────────────────────────────────── */

export default function ComponentShowcase() {
  // Navigation states
  const [buildBarActive, setBuildBarActive] = useState('general');

  // Users panel
  const [usersTab, setUsersTab] = useState('banned');

  // Avatar panel
  const [avatarSelection, setAvatarSelection] = useState('explorers');

  // Camera panel
  const [cameraPreset, setCameraPreset] = useState('platformer');

  // Movement panel
  const [movementProfile, setMovementProfile] = useState('anti-grav');

  // Atmospherics panel
  const [atmosTab, setAtmosTab] = useState(1); // 0=day, 1=night
  const [skyboxIdx, setSkyboxIdx] = useState(0);
  const [fogDistance, setFogDistance] = useState(47);
  const [fogColor, setFogColor] = useState('#B8C47A');
  const [bloomIntensity, setBloomIntensity] = useState(23);
  const [bloomClamp, setBloomClamp] = useState(23);
  const [bloomDiffusion, setBloomDiffusion] = useState(23);

  // Music panel
  const [tracks, setTracks] = useState([
    { id: 'tr1', name: 'mymusictrack01.mp3' },
    { id: 'tr2', name: 'mymusictrack02.mp3' },
    { id: 'tr3', name: 'mymusictrack03.mp3' },
    { id: 'tr4', name: 'mymusictrack04.mp3' },
  ]);

  const handleTrackReorder = useCallback((fromIdx: number, toIdx: number) => {
    setTracks((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  }, []);

  // Debug panel
  const [debugTab, setDebugTab] = useState(1); // 0=day, 1=night

  // Chat panel
  const [chatTab, setChatTab] = useState('global');

  // Inventory panel
  const [inventoryExpanded, setInventoryExpanded] = useState(false);

  // Controls panel
  const [controlsOpen, setControlsOpen] = useState(false);

  // Right-click context menu
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Panel close animation
  const [closingPanel, setClosingPanel] = useState(false);

  const handlePanelClose = useCallback(() => {
    setClosingPanel(true);
    setTimeout(() => {
      setBuildBarActive('');
      setClosingPanel(false);
    }, 300); // matches CSS transition duration
  }, []);

  // Unified menu bar state (burger, wrench, chat, mic)
  const [activeMenu, setActiveMenu] = useState<Set<string>>(new Set(['build-tools', 'chat']));

  // Mic device selector
  const [selectedMic, setSelectedMic] = useState('macbook-mic');
  const micDevices = [
    { id: 'macbook-mic', label: 'macbook mic' },
    { id: 'yeti', label: 'yeti' },
    { id: 'iphone', label: 'iphone' },
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

  const menuItems = [
    { id: 'menu', icon: <HamburgerIcon size={25} />, label: 'Menu', active: activeMenu.has('menu') },
    { id: 'build-tools', icon: <WrenchIcon size={25} />, label: 'Build Tools', active: activeMenu.has('build-tools') },
    { id: 'chat', icon: <ChatIcon size={25} />, label: 'Chat', active: activeMenu.has('chat') },
    { id: 'mic', icon: <MicIcon size={25} />, label: 'Microphone', active: activeMenu.has('mic'), subMenu: micDevices, activeSubMenuId: selectedMic, onSubMenuSelect: setSelectedMic },
  ];

  // Notification cycling
  const notifications = [
    { avatarSrc: '/images/bussy-pfp.png', username: '@Bussy', message: 'wants to be your friend', actionLabel: 'respond' },
    { avatarSrc: '/images/gomez-pfp.png', username: 'Gomez', message: 'is hosting a portals event', actionLabel: 'join now' },
    { avatarSrc: '/images/butterscotch-pfp.png', username: 'butterscotch', message: 'sent you a message', actionLabel: 'reply' },
  ];
  const [notificationIdx, setNotificationIdx] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input / textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'n' || e.key === 'N') {
        setShowNotification((prev) => {
          if (!prev) return true;
          // already showing — cycle to next
          setNotificationIdx((i) => (i + 1) % notifications.length);
          return prev;
        });
      }

      if (e.key === 'c' || e.key === 'C') {
        setActiveMenu((prev) => {
          const next = new Set(prev);
          if (next.has('chat')) next.delete('chat'); else next.add('chat');
          return next;
        });
      }

      if (e.key === 'i' || e.key === 'I') {
        setBuildBarActive((prev) => {
          if (prev === 'inventory') {
            // Closing inventory — also hide the build bar
            setActiveMenu((p) => {
              const next = new Set(p);
              next.delete('build-tools');
              return next;
            });
            return '';
          }
          // Opening inventory — ensure build bar is visible
          setActiveMenu((p) => new Set(p).add('build-tools'));
          return 'inventory';
        });
      }

      if (e.key === 'b' || e.key === 'B') {
        setActiveMenu((prev) => {
          const next = new Set(prev);
          if (next.has('build-tools')) next.delete('build-tools'); else next.add('build-tools');
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notifications.length]);

  const buildBarVisible = activeMenu.has('build-tools');

  // Pick a random background image once per mount
  const bgImage = useMemo(
    () => BG_IMAGES[Math.floor(Math.random() * BG_IMAGES.length)],
    [],
  );

  return (
    <div
      className={styles.viewport}
      style={{ backgroundImage: `url('${bgImage}')` }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      {/* ── BuildBar (left edge) ─────────────────────── */}
      <div className={`${styles.buildBarAnchor} ${!buildBarVisible ? styles.hidden : ''}`}>
        <BuildBar
          items={buildBarItems}
          activeId={buildBarActive}
          onChange={setBuildBarActive}
        />
      </div>

      {/* ── Main Panel ───────────────────────────────── */}
      <div className={`${styles.panelAnchor} ${!buildBarVisible ? styles.hidden : ''} ${closingPanel ? styles.closing : ''}`}>

        {/* ── General ──────────────────────────────────── */}
        {buildBarActive === 'general' && (
          <Panel>
            <PanelHeader title="general" onClose={handlePanelClose} />

            <ItemHeader
              title="add welcome greeting"
              description="we need some text here that describes actually what a welcome greeting is"
              variant="double"
              hasHelpIcon
            />
            <Button variant="primary-blue" size="micro">add</Button>

            <ItemHeader
              title="player collisions"
              description="we need some text here that describes actually what a welcome greeting is"
              variant="double"
            />
            <Toggle defaultChecked={false} />

            <ItemHeader title="preload room models" />
            <Toggle defaultChecked />

            <ItemHeader title="preload fast download" />
            <Toggle defaultChecked />

            <ItemHeader
              title="hide main ui"
              description="useful for immersive experiences. Removes all static ui on screen."
              variant="double"
            />
            <Toggle defaultChecked={false} />
          </Panel>
        )}

        {/* ── Inventory ──────────────────────────────────── */}
        {buildBarActive === 'inventory' && !inventoryExpanded && (
          <InventoryPanel
            onExpand={() => {
              setInventoryExpanded(true);
              setActiveMenu((prev) => {
                const next = new Set(prev);
                next.delete('menu');
                return next;
              });
            }}
            onClose={handlePanelClose}
          />
        )}

        {/* ── Versions ────────────────────────────────── */}
        {buildBarActive === 'version' && (
          <Panel>
            <PanelHeader title="versions" onClose={handlePanelClose} />

            <Text variant="p2Para" color="primary">
              portals saves your work at various time intervals. Restore previous edit states by{' '}
              <span style={{ color: 'var(--color-brand-blue-1)' }}>clicking on a restore point</span>{' '}
              below.
            </Text>

            <VersionList
              entries={[
                { id: 'v1', date: 'sep 30', time: '17:33', itemCount: 989 },
                { id: 'v2', date: 'sep 30', time: '16:12', itemCount: 985 },
                { id: 'v3', date: 'sep 30', time: '14:45', itemCount: 972 },
                { id: 'v4', date: 'sep 29', time: '22:08', itemCount: 968 },
                { id: 'v5', date: 'sep 29', time: '19:30', itemCount: 954 },
                { id: 'v6', date: 'sep 29', time: '15:17', itemCount: 941 },
                { id: 'v7', date: 'sep 28', time: '21:55', itemCount: 932 },
                { id: 'v8', date: 'sep 28', time: '18:03', itemCount: 918 },
                { id: 'v9', date: 'sep 28', time: '14:22', itemCount: 905 },
                { id: 'v10', date: 'sep 27', time: '20:41', itemCount: 893 },
                { id: 'v11', date: 'sep 27', time: '16:09', itemCount: 881 },
              ]}
              onRestore={(id) => console.log('restore', id)}
            />
          </Panel>
        )}

        {/* ── Building ────────────────────────────────── */}
        {buildBarActive === 'build-settings' && (
          <Panel>
            <PanelHeader title="building" onClose={handlePanelClose} />

            <ItemHeader title="all can build" />
            <Toggle defaultChecked={false} />

            <ItemHeader title="hide user nametags" />
            <Toggle defaultChecked />

            <ItemHeader
              title="live tasks edit"
              description="disables proximity based audio to allows all voices to be heard in space"
              variant="double"
            />
            <Toggle defaultChecked />

            <ItemHeader
              title="delete all space contents"
              description="temporarily or permanently mute all guests"
              variant="double"
              hasHelpIcon
            />
            <Button variant="primary-blue" style={{ backgroundColor: '#F05C59' }}>delete</Button>
          </Panel>
        )}

        {/* ── Voice & Comms ───────────────────────────── */}
        {buildBarActive === 'audio' && (
          <Panel>
            <PanelHeader title="voice & comms" onClose={handlePanelClose} />

            <ItemHeader title="disable all speaking in space" />
            <Toggle defaultChecked={false} />

            <ItemHeader
              title="global speaking"
              description="disables proximity based audio to allows all voices to be heard in space"
              variant="double"
              hasHelpIcon
            />
            <Toggle defaultChecked={false} />

            <ItemHeader
              title="mute all guests"
              description="temporarily or permanently mute all guests"
              variant="double"
              hasHelpIcon
            />
            <Toggle defaultChecked={false} />
          </Panel>
        )}

        {/* ── Users ─────────────────────────────────────── */}
        {buildBarActive === 'users' && (
          <Panel>
            <PanelHeader title="users" onClose={handlePanelClose} />

            <TabNav
              items={[
                { id: 'banned', label: 'banned' },
                { id: 'muted', label: 'muted' },
              ]}
              activeId={usersTab}
              onChange={setUsersTab}
            />

            <UserList
              entries={[
                { id: 'u1', name: 'jen' },
                { id: 'u2', name: 'bus' },
                { id: 'u3', name: 'nino' },
                { id: 'u4', name: 'gomez' },
                { id: 'u5', name: 'jan' },
                { id: 'u6', name: 'hugh' },
                { id: 'u7', name: 'hugh' },
                { id: 'u8', name: 'tondo' },
                { id: 'u9', name: 'beer' },
                { id: 'u10', name: 'aloha' },
                { id: 'u11', name: 'ghostcat' },
                { id: 'u12', name: 'tondo' },
                { id: 'u13', name: 'beer' },
                { id: 'u14', name: 'aloha' },
              ]}
              onMore={(id) => console.log('more', id)}
            />
          </Panel>
        )}

        {/* ── Avatars ────────────────────────────────────── */}
        {buildBarActive === 'avatar' && (
          <Panel>
            <PanelHeader title="avatars" onClose={handlePanelClose} />

            <ItemHeader title="enable custom avatars" />
            <Toggle defaultChecked={false} />

            <ItemHeader
              title="item header"
              description="select which avatars you want to enable and disable in this space"
              variant="double"
              hasHelpIcon
            />
            <GraphicSelectorGrid
              items={[
                { id: 'operators', icon: <PlaceholderIcon />, label: 'operators' },
                { id: 'explorers', icon: <PlaceholderIcon />, label: 'explorers' },
                { id: 'striders', icon: <PlaceholderIcon />, label: 'striders' },
                { id: 'operators-2', icon: <PlaceholderIcon />, label: 'operators' },
              ]}
              selectedId={avatarSelection}
              onChange={setAvatarSelection}
            />

            <ItemHeader
              title="add custom avatar"
              description="some text here"
              variant="double"
              hasHelpIcon
            />
            <Button variant="secondary-white">add</Button>
          </Panel>
        )}

        {/* ── Atmospherics ──────────────────────────────── */}
        {buildBarActive === 'atmospherics' && (
          <Panel>
            <PanelHeader title="atmospherics" onClose={handlePanelClose} />

            <TabSwitcher
              tabs={['day', 'night']}
              activeTab={atmosTab}
              onChange={setAtmosTab}
            />

            {/* ── Skybox ─────────────────────── */}
            <Text variant="h2Divider" color="blue">skybox</Text>

            <ItemHeader title="select a skybox style" />
            <SkyboxSelector
              options={[
                { id: 'sky1', subtitle: '01', label: 'anime skies 1', thumbnail: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=160&h=160&fit=crop' },
                { id: 'sky2', subtitle: '02', label: 'sunset glow', thumbnail: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=160&h=160&fit=crop' },
                { id: 'sky3', subtitle: '03', label: 'overcast day', thumbnail: 'https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?w=160&h=160&fit=crop' },
              ]}
              activeIndex={skyboxIdx}
              onChange={setSkyboxIdx}
            />
            <Button variant="secondary-white" size="micro">apply</Button>

            <ItemHeader
              title="item header"
              description="max size 15mb"
              variant="double"
              hasHelpIcon
            />
            <Button variant="secondary-white" size="micro">upload</Button>

            {/* ── Fog ────────────────────────── */}
            <Text variant="h2Divider" color="blue">fog</Text>

            <ItemHeader title="fog far distance" hasHelpIcon />
            <Slider value={fogDistance} onChange={setFogDistance} min={0} max={100} />

            <ItemHeader title="fog color" />
            <ColorSwatchPicker
              colors={['#B8C47A', '#8B8C72', '#A8B848', '#5EC4D4', '#8C9490']}
              activeColor={fogColor}
              onSelect={setFogColor}
            />

            {/* ── Bloom ──────────────────────── */}
            <Text variant="h2Divider" color="blue">bloom</Text>

            <ItemHeader title="bloom intensity" hasHelpIcon />
            <Slider value={bloomIntensity} onChange={setBloomIntensity} min={0} max={100} />

            <ItemHeader title="bloom clamp" hasHelpIcon />
            <Slider value={bloomClamp} onChange={setBloomClamp} min={0} max={100} />

            <ItemHeader title="bloom diffusion" hasHelpIcon />
            <Slider value={bloomDiffusion} onChange={setBloomDiffusion} min={0} max={100} />
          </Panel>
        )}

        {/* ── Music ───────────────────────────────────────── */}
        {buildBarActive === 'music' && (
          <Panel>
            <PanelHeader title="music" onClose={handlePanelClose} />

            <Text variant="p2Para" color="primary">
              add ambient music to your space. Simple add music tracks below to create a soundtrack for your space. Use the left icon to shuffle and the context menu to remove tracks
            </Text>

            <TrackList
              entries={tracks}
              onMore={(id) => console.log('track more', id)}
              onReorder={handleTrackReorder}
            />

            <Button variant="secondary-white">add track</Button>
          </Panel>
        )}

        {/* ── Camera ──────────────────────────────────────── */}
        {buildBarActive === 'camera' && (
          <Panel>
            <PanelHeader title="camera" onClose={handlePanelClose} />

            <Text variant="p2Para" color="primary">
              set the tone of your game or experience with custom default camera views. Choose from one of our presets below or use our fine adjustment tool to create your own.
            </Text>

            <ItemHeader title="select a camera preset" hasHelpIcon />
            <GraphicSelectorGrid
              items={[
                { id: 'isometric', icon: <PlaceholderIcon />, label: 'isometric' },
                { id: 'platformer', icon: <PlaceholderIcon />, label: 'platformer' },
                { id: 'birds-eye', icon: <PlaceholderIcon />, label: 'birds eye' },
                { id: 'first-person', icon: <PlaceholderIcon />, label: 'first person' },
              ]}
              selectedId={cameraPreset}
              onChange={setCameraPreset}
            />

            <ItemHeader
              title="create custom view"
              description="create your own default camera view"
              variant="double"
              hasHelpIcon
            />
            <Button variant="secondary-white">create</Button>
          </Panel>
        )}

        {/* ── Movement ───────────────────────────────────── */}
        {buildBarActive === 'movement' && (
          <Panel>
            <PanelHeader title="movement" onClose={handlePanelClose} />

            <Text variant="p2Para" color="primary">
              set the tone of your game or experience with custom character movement profiles. Choose from one of our presets below or use our fine adjustment tool to create your own.
            </Text>

            <ItemHeader title="select a profile" hasHelpIcon />
            <GraphicSelectorGrid
              items={[
                { id: 'default', icon: <PlaceholderIcon />, label: 'default' },
                { id: 'anti-grav', icon: <PlaceholderIcon />, label: 'anti-grav' },
                { id: 'super-speed', icon: <PlaceholderIcon />, label: 'super-speed' },
                { id: 'climbing', icon: <PlaceholderIcon />, label: 'climbing' },
              ]}
              selectedId={movementProfile}
              onChange={setMovementProfile}
            />

            <ItemHeader
              title="create custom profile"
              description="set up a custom movement profile to suit your experience"
              variant="double"
              hasHelpIcon
            />
            <Button variant="secondary-white">create</Button>
          </Panel>
        )}

        {/* ── Debug ──────────────────────────────────────── */}
        {buildBarActive === 'bugs' && (
          <Panel>
            <PanelHeader title="debug" onClose={handlePanelClose} />

            <TabSwitcher
              tabs={['single', 'multi']}
              activeTab={debugTab}
              onChange={setDebugTab}
            />

            <Text variant="p2" color="muted">click on a task to debug</Text>

            <TaskList
              entries={[
                { id: 't1', name: 'task name', status: 'error' },
                { id: 't2', name: 'task name', status: 'error' },
                { id: 't3', name: 'task name', status: 'error' },
                { id: 't4', name: 'task name', status: 'error' },
                { id: 't5', name: 'task name', status: 'error' },
                { id: 't6', name: 'task name', status: 'error' },
                { id: 't7', name: 'task name', status: 'warning' },
                { id: 't8', name: 'task name', status: 'warning' },
                { id: 't9', name: 'task name', status: 'success' },
                { id: 't10', name: 'task name', status: 'success' },
                { id: 't11', name: 'task name', status: 'success' },
                { id: 't12', name: 'task name', status: 'success' },
              ]}
              onClick={(id) => console.log('debug', id)}
            />
          </Panel>
        )}

        {/* ── Portals Studio ─────────────────────────────── */}
        {buildBarActive === 'studio' && (
          <Panel>
            <PanelHeader title="portals studio" onClose={handlePanelClose} />

            <VideoPlaceholder />

            <Text variant="p2Para" color="primary">
              portals studio allows you to create custom logic and tasks to create fully formed experiences. We need some text here and a video to show how this works
            </Text>
            <Button variant="secondary-white">read the docs</Button>

            <Text variant="h2Divider" color="blue">ready to start?</Text>

            <ItemHeader
              title="add a singleplayer task"
              description="you have 0 tasks?"
              variant="double"
            />
            <Button variant="primary-blue">add a task</Button>
          </Panel>
        )}

      </div>


      {/* ── Chat Panel (right side) ─────────────────────── */}
      {activeMenu.has('chat') && (
        <>
          <div className={styles.chatGradientBackdrop} />
          <div className={styles.chatPanelAnchor}>
            <ChatPanel activeTab={chatTab} onTabChange={setChatTab} />
          </div>
        </>
      )}

      {/* ── Inventory Expanded (full safe-zone overlay) ── */}
      {buildBarActive === 'inventory' && inventoryExpanded && (
        <div className={styles.inventoryExpandedAnchor}>
          <InventoryPanel
            expanded
            onCollapse={() => setInventoryExpanded(false)}
            onClose={() => {
              setInventoryExpanded(false);
              handlePanelClose();
            }}
          />
        </div>
      )}

      {/* ── Static UI: Bottom Left (AccountPanel + MenuBar) ── */}
      <div className={`${styles.bottomLeftAnchor} ${inventoryExpanded ? styles.anchorHidden : ''}`}>
        {activeMenu.has('menu') && (
          <AccountPanel
            onClose={() => setActiveMenu((prev) => {
              const next = new Set(prev);
              next.delete('menu');
              return next;
            })}
            onOpenControls={() => {
              setControlsOpen(true);
              setActiveMenu((prev) => {
                const next = new Set(prev);
                next.delete('menu');
                return next;
              });
            }}
          />
        )}
        <MenuBar
          items={menuItems}
          onItemClick={(id) => setActiveMenu((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
          })}
        />
      </div>

      {/* ── Static UI: Bottom Right ───────────────────── */}
      <div className={`${styles.bottomRightAnchor} ${inventoryExpanded ? styles.anchorHidden : ''}`}>
        <PlayerCounter count={24} />
      </div>

      {/* ── Controls Panel (centered overlay) ────────── */}
      {controlsOpen && (
        <>
          <div className={styles.controlsBackdrop} onClick={() => setControlsOpen(false)} />
          <div className={styles.controlsPanelAnchor}>
            <ControlsPanel onClose={() => setControlsOpen(false)} />
          </div>
        </>
      )}

      {/* ── Right-click Context Menu ────────────────── */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAction={(action) => console.log('context-menu:', action)}
        />
      )}

      {/* ── Notification (top centre) ─────────────────── */}
      {showNotification && (
        <div className={styles.notificationAnchor}>
          <GameNotification
            key={notificationIdx}
            avatarSrc={notifications[notificationIdx].avatarSrc}
            username={notifications[notificationIdx].username}
            message={notifications[notificationIdx].message}
            actionLabel={notifications[notificationIdx].actionLabel}
            onAction={() => console.log('action', notifications[notificationIdx].actionLabel)}
            onDismiss={() => {
              setShowNotification(false);
              setNotificationIdx((i) => (i + 1) % notifications.length);
            }}
          />
        </div>
      )}

    </div>
  );
}
