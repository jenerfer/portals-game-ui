import { type ChangeEvent, useRef, useEffect, useCallback, useState } from 'react';
import { useControllable } from '@/hooks/useControllable';
import styles from './Slider.module.css';

export interface SliderProps {
  /** Controlled value */
  value?: number;
  /** Initial value for uncontrolled usage */
  defaultValue?: number;
  /** Callback fired when the slider value changes */
  onChange?: (value: number) => void;
  /** Minimum value (default: 0) */
  min?: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Step increment (default: 1) */
  step?: number;
}

export function Slider({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: SliderProps) {
  const [current, setCurrent] = useControllable(value, defaultValue, onChange);
  const trackRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  /** Listen for mouseup / touchend on window to clear dragging state */
  useEffect(() => {
    if (!dragging) return;
    const stop = () => setDragging(false);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, [dragging]);

  const getProgressPercent = useCallback(
    () => ((current - min) / (max - min)) * 100,
    [current, min, max],
  );

  /** Sync the CSS custom property that drives the fill width */
  useEffect(() => {
    const el = trackRef.current;
    if (el) {
      el.style.setProperty('--slider-progress', `${getProgressPercent()}%`);
    }
  }, [getProgressPercent]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrent(Number(e.target.value));
  };

  return (
    <div className={`${styles.wrapper} ${dragging ? styles.dragging : ''}`}>
      <div className={styles.trackContainer}>
        <input
          ref={trackRef}
          type="range"
          className={styles.range}
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={handleChange}
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
        />
      </div>
      <div className={styles.display}>
        <span className={styles.displayValue}>{current}</span>
      </div>
    </div>
  );
}
