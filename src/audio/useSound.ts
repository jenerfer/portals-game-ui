/* =================================================================
 * useSound — the hook components actually call
 *
 * Usage:
 *   const { play } = useSound();
 *   play('panel-open');
 * ================================================================= */

import { useContext, useCallback } from 'react';
import { SoundContext } from './SoundProvider';
import type { SoundEvent } from './manifest';

export function useSound() {
  const manager = useContext(SoundContext);

  const play = useCallback(
    (event: SoundEvent) => {
      if (!manager) {
        console.warn('[useSound] No SoundProvider found — sound will not play.');
        return;
      }
      manager.play(event);
    },
    [manager],
  );

  return { play };
}
