import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useControllable } from '@/hooks/useControllable';
import styles from './Dropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
  /** Optional icon rendered left of the label */
  icon?: ReactNode;
}

export interface DropdownProps {
  /** Available options */
  options: DropdownOption[];
  /** Controlled selected value */
  value?: string;
  /** Initial value for uncontrolled usage */
  defaultValue?: string;
  /** Callback fired when the selected value changes */
  onChange?: (value: string) => void;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
}

export function Dropdown({
  options,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Select…',
  disabled = false,
}: DropdownProps) {
  const [selected, setSelected] = useControllable(value, defaultValue, onChange);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === selected);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [],
  );

  /** Close the menu when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.triggerContent}>
          {selectedOption?.icon && <span className={styles.optionIcon}>{selectedOption.icon}</span>}
          <span className={selectedOption ? styles.value : styles.placeholder}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <span className={styles.chevron} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === selected}
              className={`${styles.option} ${option.value === selected ? styles.selected : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.icon && <span className={styles.optionIcon}>{option.icon}</span>}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
