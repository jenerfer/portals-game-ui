import { type ChangeEvent } from 'react';
import { useControllable } from '@/hooks/useControllable';
import styles from './Coordinates.module.css';

export interface CoordinateValue {
  x: number;
  y: number;
  z: number;
}

export interface CoordinatesProps {
  /** Controlled value */
  value?: CoordinateValue;
  /** Initial value for uncontrolled usage */
  defaultValue?: CoordinateValue;
  /** Callback fired when any coordinate changes */
  onChange?: (value: CoordinateValue) => void;
  /** Whether all inputs are disabled */
  disabled?: boolean;
}

const DEFAULT_VALUE: CoordinateValue = { x: 0, y: 0, z: 0 };

const AXES = ['x', 'y', 'z'] as const;

export function Coordinates({
  value,
  defaultValue = DEFAULT_VALUE,
  onChange,
  disabled = false,
}: CoordinatesProps) {
  const [current, setCurrent] = useControllable(value, defaultValue, onChange);

  const handleChange = (axis: keyof CoordinateValue) => (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow empty, minus sign, or valid number while typing
    const num = raw === '' || raw === '-' ? 0 : Number(raw);
    if (!Number.isNaN(num)) {
      setCurrent({ ...current, [axis]: num });
    }
  };

  return (
    <div className={styles.wrapper}>
      {AXES.map((axis) => (
        <div key={axis} className={styles.field}>
          <label className={styles.label}>{axis.toUpperCase()}</label>
          <input
            type="number"
            className={styles.input}
            value={current[axis]}
            onChange={handleChange(axis)}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
}
