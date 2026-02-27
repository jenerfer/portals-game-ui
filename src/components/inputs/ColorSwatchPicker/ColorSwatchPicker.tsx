import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/primitives/Button';
import styles from './ColorSwatchPicker.module.css';

/* ── HSV ↔ Hex helpers ──────────────────────────────────── */

function hsvToHex(h: number, s: number, v: number): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(f(5))}${toHex(f(3))}${toHex(f(1))}`;
}

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m) return { h: 0, s: 0, v: 1 };
  const [r, g, b] = m.map((c) => parseInt(c, 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

function hueToHex(h: number): string {
  return hsvToHex(h, 1, 1);
}

/* ── Component ──────────────────────────────────────────── */

export interface ColorSwatchPickerProps {
  colors: string[];
  activeColor?: string;
  onSelect?: (color: string) => void;
  onPickColor?: () => void;
}

export function ColorSwatchPicker({
  colors,
  activeColor,
  onSelect,
  onPickColor,
}: ColorSwatchPickerProps) {
  const initial = activeColor ? hexToHsv(activeColor) : { h: 220, s: 0.8, v: 0.9 };
  const [hue, setHue] = useState(initial.h);
  const [sat, setSat] = useState(initial.s);
  const [val, setVal] = useState(initial.v);
  const [hexValue, setHexValue] = useState(activeColor ?? hsvToHex(initial.h, initial.s, initial.v));
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });

  const popoverRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const satAreaRef = useRef<HTMLDivElement>(null);
  const hueTrackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<'sat' | 'hue' | null>(null);

  // Derive hex from HSV
  const currentHex = hsvToHex(hue, sat, val);

  // Keep hex input in sync when picking
  useEffect(() => {
    setHexValue(currentHex);
  }, [currentHex]);

  // Sync from activeColor prop
  useEffect(() => {
    if (activeColor) {
      const hsv = hexToHsv(activeColor);
      setHue(hsv.h);
      setSat(hsv.s);
      setVal(hsv.v);
      setHexValue(activeColor);
    }
  }, [activeColor]);

  // ── Popover positioning ──────────────────────────────── */
  const updatePosition = useCallback(() => {
    if (!anchorRef.current) return;
    let panel: HTMLElement | null = anchorRef.current;
    while (panel && !panel.classList.toString().includes('panel')) {
      panel = panel.parentElement;
    }
    if (panel) {
      const panelRect = panel.getBoundingClientRect();
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const anchorCenterY = anchorRect.top + anchorRect.height / 2;
      setPopoverPos({
        top: anchorCenterY,
        left: panelRect.right + 5,
      });
      // After render, measure popover and set final top-edge position
      requestAnimationFrame(() => {
        if (!popoverRef.current) return;
        const popRect = popoverRef.current.getBoundingClientRect();
        const margin = 10;
        // top is the actual top edge — centre on anchor
        let finalTop = anchorCenterY - popRect.height / 2;
        // Clamp bottom
        if (finalTop + popRect.height > window.innerHeight - margin) {
          finalTop = window.innerHeight - margin - popRect.height;
        }
        // Clamp top
        if (finalTop < margin) {
          finalTop = margin;
        }
        setPopoverPos((prev) => ({ ...prev, top: finalTop }));
      });
    }
  }, []);

  useEffect(() => {
    if (!popoverOpen) return;
    updatePosition();
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        anchorRef.current && !anchorRef.current.contains(e.target as Node)
      ) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [popoverOpen, updatePosition]);

  // ── Saturation area drag ─────────────────────────────── */
  const updateSat = useCallback((clientX: number, clientY: number) => {
    if (!satAreaRef.current) return;
    const rect = satAreaRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    setSat(x);
    setVal(1 - y);
  }, []);

  // ── Hue track drag ──────────────────────────────────── */
  const updateHue = useCallback((clientX: number) => {
    if (!hueTrackRef.current) return;
    const rect = hueTrackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setHue(x * 360);
  }, []);

  // ── Global mouse move / up ──────────────────────────── */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (draggingRef.current === 'sat') updateSat(e.clientX, e.clientY);
      else if (draggingRef.current === 'hue') updateHue(e.clientX);
    };
    const handleUp = () => {
      draggingRef.current = null;
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [updateSat, updateHue]);

  const handlePickClick = () => {
    if (onPickColor) {
      onPickColor();
      return;
    }
    setPopoverOpen((prev) => !prev);
  };

  const handleHexCommit = () => {
    if (/^#[0-9a-fA-F]{6}$/.test(hexValue)) {
      const hsv = hexToHsv(hexValue);
      setHue(hsv.h);
      setSat(hsv.s);
      setVal(hsv.v);
    }
  };

  const handleApply = () => {
    onSelect?.(currentHex);
    setPopoverOpen(false);
  };

  return (
    <div className={styles.picker} ref={anchorRef}>
      <div className={styles.swatches}>
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            className={`${styles.swatch} ${color === activeColor ? styles.active : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onSelect?.(color)}
          />
        ))}
      </div>

      <Button variant="secondary-white" size="micro" onClick={handlePickClick}>
        pick color
      </Button>

      {popoverOpen &&
        createPortal(
          <div
            ref={popoverRef}
            className={styles.popover}
            style={{ top: popoverPos.top, left: popoverPos.left }}
          >
            {/* Saturation / Brightness area */}
            <div
              ref={satAreaRef}
              className={styles.satArea}
              style={{ backgroundColor: hueToHex(hue) }}
              onMouseDown={(e) => {
                draggingRef.current = 'sat';
                updateSat(e.clientX, e.clientY);
              }}
            >
              <div className={styles.satWhite} />
              <div className={styles.satBlack} />
              <div
                className={styles.satCursor}
                style={{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%` }}
              />
            </div>

            {/* Hue slider */}
            <div
              ref={hueTrackRef}
              className={styles.hueTrack}
              onMouseDown={(e) => {
                draggingRef.current = 'hue';
                updateHue(e.clientX);
              }}
            >
              <div
                className={styles.hueThumb}
                style={{
                  left: `${(hue / 360) * 100}%`,
                  backgroundColor: hueToHex(hue),
                }}
              />
            </div>

            {/* Hex input */}
            <div className={styles.hexRow}>
              <span className={styles.hexLabel}>hex</span>
              <input
                type="text"
                className={styles.hexInput}
                value={hexValue}
                onChange={(e) => setHexValue(e.target.value)}
                onBlur={handleHexCommit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleHexCommit();
                    handleApply();
                  }
                }}
                spellCheck={false}
              />
            </div>

            <Button variant="primary-blue" size="micro" onClick={handleApply}>
              apply
            </Button>
          </div>,
          document.body,
        )}
    </div>
  );
}
