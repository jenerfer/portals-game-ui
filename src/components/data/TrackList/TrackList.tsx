import { useState, useRef } from 'react';
import styles from './TrackList.module.css';

export interface TrackEntry {
  id: string;
  name: string;
}

export interface TrackListProps {
  entries: TrackEntry[];
  onMore?: (id: string) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
}

export function TrackList({ entries, onMore, onReorder }: TrackListProps) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const canDragRef = useRef(false);

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    if (!canDragRef.current) {
      e.preventDefault();
      return;
    }
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOverIdx(idx);
  };

  const handleDragEnd = () => {
    if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx) {
      onReorder?.(dragIdx, overIdx);
    }
    setDragIdx(null);
    setOverIdx(null);
    canDragRef.current = false;
  };

  return (
    <div className={styles.list}>
      {entries.map((entry, idx) => (
        <div
          key={entry.id}
          className={`${styles.row} ${dragIdx === idx ? styles.dragging : ''} ${overIdx === idx && dragIdx !== idx ? styles.dropTarget : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDragLeave={() => setOverIdx(null)}
          onDragEnd={handleDragEnd}
        >
          {/* Drag handle — only this initiates drag */}
          <span
            className={styles.dragHandle}
            onMouseDown={() => { canDragRef.current = true; }}
            onMouseUp={() => { canDragRef.current = false; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="2" y="3" width="12" height="1.5" rx="0.75" />
              <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" />
              <rect x="2" y="11.5" width="12" height="1.5" rx="0.75" />
            </svg>
          </span>

          <span className={styles.name}>{entry.name}</span>

          {/* More button */}
          <button
            type="button"
            className={styles.moreBtn}
            onClick={() => onMore?.(entry.id)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="4" cy="10" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="16" cy="10" r="2" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
