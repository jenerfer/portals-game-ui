/* =============================================================
 * Chat data — types, username colors, seed messages
 * ============================================================= */

export interface ChatMessage {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  colorIndex: number; // 0-15, indexes USERNAME_COLORS
}

/** 16 distinct username colors */
export const USERNAME_COLORS = [
  '#65C0E4', // cyan
  '#FF9085', // salmon
  '#F27EEE', // pink
  '#49D7BD', // teal
  '#FFD400', // gold
  '#416AFF', // blue
  '#FF8FD0', // rose
  '#9F39FF', // purple
  '#FF6B4A', // warm orange
  '#4AFF8F', // mint green
  '#FFA24A', // amber
  '#4ADFFF', // sky blue
  '#D4FF4A', // lime
  '#FF4A8F', // hot pink
  '#8F4AFF', // violet
  '#4AFF4A', // green
] as const;

let _nextId = 100;
export function getNextId(): string {
  return `msg-${_nextId++}`;
}

/** Pre-populated messages for visual testing */
export const SEED_MESSAGES: ChatMessage[] = [
  { id: 'msg-1', username: 'Hugh', text: 'Is this thing working?', timestamp: '16:35', colorIndex: 0 },
  { id: 'msg-2', username: 'Dallas', text: 'Yes, sorry thats correct way if you want that approach', timestamp: '17:20', colorIndex: 1 },
  { id: 'msg-3', username: 'Gomez', text: 'high level goal is to get these new gameified features into playtest groups hands as soon as possible', timestamp: '17:20', colorIndex: 2 },
  { id: 'msg-4', username: 'jayne', text: 'agreed, lets push for next week', timestamp: '17:21', colorIndex: 3 },
  { id: 'msg-5', username: 'jenerfer (mod)', text: 'Apparently we\'re one of very few solana collections doing this', timestamp: '17:22', colorIndex: 4 },
  { id: 'msg-6', username: 'Bus', text: 'has anyone tested the new portal near spawn?', timestamp: '17:23', colorIndex: 5 },
  { id: 'msg-7', username: 'Jan', text: 'Yea thats ready now', timestamp: '17:24', colorIndex: 6 },
  { id: 'msg-8', username: 'Gomez', text: 'nice work everyone, lets keep the momentum going', timestamp: '17:25', colorIndex: 2 },
  { id: 'msg-9', username: 'Hugh', text: 'quick question — is the lighting update live?', timestamp: '17:26', colorIndex: 0 },
  { id: 'msg-10', username: 'Dallas', text: 'yeah it went out this morning, check the atmospherics panel', timestamp: '17:27', colorIndex: 1 },
];
