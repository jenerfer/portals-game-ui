import { useState, useCallback } from 'react';

/**
 * Hook for components that support both controlled and uncontrolled patterns.
 * If `controlledValue` is defined, the component is controlled.
 * Otherwise it uses internal state initialized with `defaultValue`.
 */
export function useControllable<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [value, setValue];
}
