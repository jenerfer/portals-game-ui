import { Button } from '@/components/primitives/Button';
import styles from './ColorSwatchPicker.module.css';

export interface ColorSwatchPickerProps {
  /** Recent colors to display as swatches */
  colors: string[];
  /** Currently selected color */
  activeColor?: string;
  /** Fired when a swatch is clicked */
  onSelect?: (color: string) => void;
  /** Fired when "pick color" is clicked */
  onPickColor?: () => void;
}

export function ColorSwatchPicker({
  colors,
  activeColor,
  onSelect,
  onPickColor,
}: ColorSwatchPickerProps) {
  return (
    <div className={styles.picker}>
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
      <Button variant="secondary-white" size="micro" onClick={onPickColor}>
        pick color
      </Button>
    </div>
  );
}
