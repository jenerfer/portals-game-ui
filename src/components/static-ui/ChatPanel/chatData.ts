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

/** Random usernames for simulated chat */
export const RANDOM_USERNAMES = [
  'Hugh', 'Dallas', 'Gomez', 'jayne', 'Bus', 'Jan', 'Kai', 'Mika',
  'sol_surfer', 'pixel_witch', 'neon_ghost', 'void_runner', 'frostbyte',
  'ember_lord', 'aqua_punk', 'drift_king', 'nova_spark', 'shadow_mint',
  'coral_dusk', 'iron_bloom', 'velvet_hex', 'lunar_fox', 'blaze_echo',
];

/** Random messages for simulated chat */
export const RANDOM_MESSAGES = [
  'anyone wanna explore the new zone?',
  'just found a secret room behind the waterfall',
  'gg everyone',
  'brb',
  'wait how do I open inventory again?',
  'this lighting update is insane',
  'who built this portal? its amazing',
  'lol',
  'has anyone seen the new emotes?',
  'I keep getting lost in here',
  'the music in this area is so good',
  'can someone help me with the puzzle?',
  'first time here, this is wild',
  'nice build!',
  'how do you get to the rooftop?',
  'is there a way to save my progress?',
  'yo the fog looks crazy from up here',
  'anyone else lagging or just me?',
  'I love this game so much',
  'lets gooo',
  'where is everyone?',
  'the skybox at night is beautiful',
  'just placed my first building 🏗️',
  'portal squad assemble',
  'whos the mod here?',
  '🔥🔥🔥',
  'this is giving me minecraft vibes',
  'wait you can fly??',
  'need more inventory slots tbh',
  'that obstacle course is brutal',
  'gg wp',
  'anyone trading?',
  'the new update is chef kiss',
  'how long has this server been up?',
  'I just fell off the map lmao',
  'these particle effects tho',
  'whats the best build material?',
  'someone should make a maze',
  'this chat is popping off',
  'see yall tomorrow ✌️',
];

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
