import { useEffect } from 'react';

/**
 * Hook that listens for a specific key press and calls the handler.
 * Useful for Escape key to close overlays/panels.
 */
export function useKeyboard(key: string, handler: () => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        e.preventDefault();
        handler();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, handler, enabled]);
}
