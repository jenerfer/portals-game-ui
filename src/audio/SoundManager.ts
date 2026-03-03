/* =================================================================
 * SoundManager — vanilla TypeScript, zero React dependency
 *
 * Uses the Web Audio API for low-latency, concurrent playback.
 * Each play() call creates a fresh AudioBufferSourceNode so the
 * same sound can overlap itself (e.g. rapid button clicks).
 *
 * Graph:
 *   source → soundGain → categoryGain → masterGain → destination
 * ================================================================= */

import { soundManifest, type SoundCategory, type SoundEvent } from './manifest';

export interface SoundManagerOptions {
  /** Master volume 0-1  (default 1) */
  masterVolume?: number;
  /** Per-category volume overrides 0-1 */
  categoryVolumes?: Partial<Record<SoundCategory, number>>;
}

export class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private categoryGains: Map<SoundCategory, GainNode> = new Map();
  private buffers: Map<SoundEvent, AudioBuffer> = new Map();
  private loadPromises: Map<SoundEvent, Promise<void>> = new Map();
  private _masterVolume: number;
  private _categoryVolumes: Record<SoundCategory, number>;

  constructor(options: SoundManagerOptions = {}) {
    this._masterVolume = options.masterVolume ?? 1;
    this._categoryVolumes = {
      ui: options.categoryVolumes?.ui ?? 1,
      feedback: options.categoryVolumes?.feedback ?? 1,
    };
  }

  /* ── Lazy init ────────────────────────────────────────── */

  /**
   * AudioContext must be created after a user gesture.
   * Call this once (e.g. on first interaction) or let play() handle it.
   */
  async init(): Promise<void> {
    if (this.ctx) return;

    this.ctx = new AudioContext();

    /* Master gain → destination */
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this._masterVolume;
    this.masterGain.connect(this.ctx.destination);

    /* Category gains → master */
    const categories: SoundCategory[] = ['ui', 'feedback'];
    for (const cat of categories) {
      const gain = this.ctx.createGain();
      gain.gain.value = this._categoryVolumes[cat];
      gain.connect(this.masterGain);
      this.categoryGains.set(cat, gain);
    }
  }

  /* ── Preload ──────────────────────────────────────────── */

  /**
   * Fetch + decode a single sound into a reusable AudioBuffer.
   * Safe to call multiple times — deduplicates in-flight requests.
   */
  async preload(event: SoundEvent): Promise<void> {
    if (this.buffers.has(event)) return;
    if (this.loadPromises.has(event)) return this.loadPromises.get(event);

    const promise = this._load(event);
    this.loadPromises.set(event, promise);
    await promise;
  }

  /**
   * Preload every sound in the manifest.
   * Call during an idle moment after first user gesture.
   */
  async preloadAll(): Promise<void> {
    await this.init();
    const events = Object.keys(soundManifest) as SoundEvent[];
    await Promise.allSettled(events.map((e) => this.preload(e)));
  }

  private async _load(event: SoundEvent): Promise<void> {
    await this.init();
    const entry = soundManifest[event];

    try {
      const res = await fetch(entry.src);
      if (!res.ok) {
        console.warn(`[SoundManager] Failed to fetch "${event}" from ${entry.src}`);
        return;
      }
      const arrayBuf = await res.arrayBuffer();
      const audioBuf = await this.ctx!.decodeAudioData(arrayBuf);
      this.buffers.set(event, audioBuf);
    } catch (err) {
      console.warn(`[SoundManager] Could not load "${event}":`, err);
    }
  }

  /* ── Playback ─────────────────────────────────────────── */

  /**
   * Play a sound event.  If the buffer isn't loaded yet it will
   * be fetched on demand (first play may have a tiny delay).
   */
  async play(event: SoundEvent): Promise<void> {
    await this.init();

    /* Resume context if browser suspended it */
    if (this.ctx!.state === 'suspended') {
      await this.ctx!.resume();
    }

    /* On-demand load if not preloaded */
    if (!this.buffers.has(event)) {
      await this.preload(event);
    }

    const buffer = this.buffers.get(event);
    if (!buffer) return; /* file missing — fail silently */

    const entry = soundManifest[event];
    const categoryGain = this.categoryGains.get(entry.category);
    if (!categoryGain) return;

    /* Per-sound gain → category gain (→ master → destination) */
    const soundGain = this.ctx!.createGain();
    soundGain.gain.value = entry.volume;
    soundGain.connect(categoryGain);

    const source = this.ctx!.createBufferSource();
    source.buffer = buffer;
    source.connect(soundGain);
    source.start(0);

    /* Clean up nodes when done */
    source.onended = () => {
      source.disconnect();
      soundGain.disconnect();
    };
  }

  /* ── Volume control ───────────────────────────────────── */

  get masterVolume(): number {
    return this._masterVolume;
  }

  set masterVolume(v: number) {
    this._masterVolume = Math.max(0, Math.min(1, v));
    if (this.masterGain) {
      this.masterGain.gain.value = this._masterVolume;
    }
  }

  getCategoryVolume(category: SoundCategory): number {
    return this._categoryVolumes[category];
  }

  setCategoryVolume(category: SoundCategory, v: number): void {
    this._categoryVolumes[category] = Math.max(0, Math.min(1, v));
    const gain = this.categoryGains.get(category);
    if (gain) {
      gain.gain.value = this._categoryVolumes[category];
    }
  }

  /* ── Teardown ─────────────────────────────────────────── */

  async dispose(): Promise<void> {
    if (this.ctx) {
      await this.ctx.close();
      this.ctx = null;
    }
    this.masterGain = null;
    this.categoryGains.clear();
    this.buffers.clear();
    this.loadPromises.clear();
  }
}
