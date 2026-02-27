/**
 * Static shortcut data for the Controls panel.
 *
 * `keys` entries:
 *  - plain strings → rendered as <Keycap>
 *  - strings prefixed with `mouse-` → rendered as mouse icons
 *  - `"+"` between items handled by `separator` on ShortcutRow
 */

export interface ShortcutEntry {
  label: string;
  keys: string[];
  separator?: string;
}

export interface ControlSection {
  title: string;
  hasIcon?: boolean;
  shortcuts: ShortcutEntry[];
}

export interface TabData {
  sections: ControlSection[];
}

/* ── Character ──────────────────────────────────────────────── */

export const characterTab: TabData = {
  sections: [
    {
      title: 'Basic Movement',
      shortcuts: [
        { label: 'Respawn', keys: ['H'] },
        { label: 'Walk', keys: ['W', 'A', 'S', 'D'] },
        { label: 'Jump', keys: ['space'] },
        { label: 'Run', keys: ['shift', 'W', 'A', 'S', 'D'], separator: '+' },
        { label: 'Sit', keys: ['L'] },
      ],
    },
    {
      title: 'Emotes & Gestures',
      shortcuts: [
        { label: 'Wave', keys: ['O'] },
        { label: 'Salute', keys: ['I'] },
        { label: 'Raise Hand', keys: ['U'] },
        { label: 'Dance', keys: ['P'] },
      ],
    },
  ],
};

/* ── Building ───────────────────────────────────────────────── */

export const buildingTab: TabData = {
  sections: [
    {
      title: 'Basic Build Controls',
      shortcuts: [
        { label: 'Enable/Disable Edit Mode', keys: ['Y'] },
        { label: 'Select Item', keys: ['mouse-left'] },
        { label: 'Move Item', keys: ['mouse-left', 'mouse-drag'], separator: '+' },
        { label: 'Resize Image Frames', keys: ['Q', 'E'], separator: '+' },
        { label: 'Place Item (after selection)', keys: ['mouse-left'] },
        { label: 'Rotate Item', keys: ['Q', 'E'], separator: '+' },
        { label: 'Item Settings', keys: ['mouse-left'] },
      ],
    },
    {
      title: 'Advanced Build Controls',
      shortcuts: [
        { label: 'Enable/Disable Adv. Build', keys: ['X'] },
        { label: 'Adjust Object Position', keys: ['shift', 'X'], separator: '+' },
        { label: 'Adjust Object Rotation', keys: ['shift', 'C'], separator: '+' },
        { label: 'Adjust Object Scale', keys: ['shift', 'V'], separator: '+' },
      ],
    },
  ],
};

/* ── Camera & UI ────────────────────────────────────────────── */

export const cameraUiTab: TabData = {
  sections: [
    {
      title: 'Default Camera',
      shortcuts: [
        { label: 'Camera Pan', keys: ['mouse-right', 'mouse-drag'], separator: '+' },
        { label: 'Lock Cursor', keys: ['R'] },
        { label: 'Camera Zoom', keys: ['mouse-scroll'] },
      ],
    },
    {
      title: 'Freecam',
      shortcuts: [
        { label: 'Enable Freecam', keys: ['B'] },
        { label: 'Move Camera', keys: ['W', 'A', 'S', 'D'] },
        { label: 'Raise/Lower Camera', keys: ['C', 'space'], separator: '+' },
        { label: 'Camera Speed', keys: ['hold shift'] },
      ],
    },
    {
      title: 'Ui',
      shortcuts: [
        { label: 'Hide/Show Ui', keys: ['shift', 'M'], separator: '+' },
      ],
    },
  ],
};
