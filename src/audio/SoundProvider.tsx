/* =================================================================
 * SoundProvider — React context wrapper around SoundManager
 *
 * Mount once near the app root (alongside ThemeProvider).
 * Kicks off preloadAll() on first user interaction so buffers
 * are ready by the time the UI needs them.
 * ================================================================= */

import { createContext, useEffect, useRef, type ReactNode } from 'react';
import { SoundManager, type SoundManagerOptions } from './SoundManager';

export const SoundContext = createContext<SoundManager | null>(null);

interface SoundProviderProps {
  children: ReactNode;
  options?: SoundManagerOptions;
}

export function SoundProvider({ children, options }: SoundProviderProps) {
  const managerRef = useRef<SoundManager | null>(null);

  /* Stable singleton — survives re-renders */
  if (!managerRef.current) {
    managerRef.current = new SoundManager(options);
  }

  /* Preload all sounds on first user gesture */
  useEffect(() => {
    const manager = managerRef.current!;

    const handleGesture = () => {
      manager.preloadAll();
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };

    window.addEventListener('pointerdown', handleGesture, { once: true });
    window.addEventListener('keydown', handleGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      manager.dispose();
    };
  }, []);

  return (
    <SoundContext.Provider value={managerRef.current}>
      {children}
    </SoundContext.Provider>
  );
}
