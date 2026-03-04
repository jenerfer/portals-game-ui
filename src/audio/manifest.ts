/* =================================================================
 * Sound Manifest — single source of truth for all UI sound events
 *
 * Components never reference file paths directly.
 * They call  play('panel-open')  and the SoundManager resolves
 * the file, category and base volume from this manifest.
 * ================================================================= */

export type SoundCategory = 'ui' | 'feedback';

export interface SoundEntry {
  /** Path relative to /public  (Vite serves from root) */
  src: string;
  /** Volume category — each category has its own gain control */
  category: SoundCategory;
  /** Per-sound base volume 0-1 (before category & master gain) */
  volume: number;
}

/**
 * Semantic sound-event map.
 *
 * Add new entries here when a component needs a new sound.
 * Drop the matching file into  public/sounds/  — no other
 * wiring required.
 */
export const soundManifest = {
  /* ── UI ──────────────────────────────────────────────── */
  'panel-open':    { src: '/sounds/panel-open.mp3',    category: 'ui', volume: 0.6 },
  'panel-close':   { src: '/sounds/panel-close.mp3',   category: 'ui', volume: 0.5 },
  'button-click':  { src: '/sounds/button-click.mp3',  category: 'ui', volume: 0.4 },
  'toggle-on':     { src: '/sounds/toggle-on.mp3',     category: 'ui', volume: 0.5 },
  'toggle-off':    { src: '/sounds/toggle-off.mp3',    category: 'ui', volume: 0.5 },
  'build-select':  { src: '/sounds/build-select.mp3',  category: 'ui', volume: 0.5 },
  'tab-switch':    { src: '/sounds/tab-switch.mp3',   category: 'ui', volume: 0.4 },
  'mic-on':        { src: '/sounds/mic-on.mp3',        category: 'ui', volume: 0.6 },
  'mic-off':       { src: '/sounds/mic-off.mp3',       category: 'ui', volume: 0.6 },

  /* ── Feedback ────────────────────────────────────────── */
  'message-sent':       { src: '/sounds/message-sent.mp3',       category: 'feedback', volume: 0.5 },
  'notification-in':    { src: '/sounds/notification-in.mp3',    category: 'feedback', volume: 0.7 },
  'notification-out':   { src: '/sounds/notification-out.mp3',   category: 'feedback', volume: 0.4 },
  'notification-error': { src: '/sounds/notification-error.mp3', category: 'feedback', volume: 0.8 },
} as const satisfies Record<string, SoundEntry>;

/** Union of every valid sound event name */
export type SoundEvent = keyof typeof soundManifest;
