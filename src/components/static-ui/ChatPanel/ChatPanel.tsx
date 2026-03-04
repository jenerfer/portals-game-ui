import { useState, useRef, useEffect, useCallback } from 'react';
import { useSound } from '@/audio';
import { TabNav } from '@/components/navigation/TabNav';
import { Text } from '@/components/primitives/Text';
import { TextEntry } from '@/components/inputs/TextEntry';
import { EmoteIcon } from '@/icons/EmoteIcon';
import { USERNAME_COLORS, SEED_MESSAGES, RANDOM_USERNAMES, RANDOM_MESSAGES, getNextId } from './chatData';
import type { ChatMessage } from './chatData';
import styles from './ChatPanel.module.css';

/* ── Emoji set (8 columns × 5 rows = 40) ──────────────── */

const EMOJI_SET = [
  '😀','😂','🥹','😎','🤩','🥳','😤','💀',
  '👋','👍','👎','👏','🙌','🤝','✌️','🫡',
  '❤️','🔥','⭐','💎','🎉','🏆','⚡','💥',
  '🗡️','🛡️','🎯','🧱','🌿','🎃','💣','🚀',
  '👀','💬','❓','✅','❌','🔔','🎵','👑',
];

/* ── Emoji-only detection ──────────────────────────────── */

const EMOJI_ONLY_RE = /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\u200D\s]+$/u;

function isEmojiOnly(text: string): boolean {
  return EMOJI_ONLY_RE.test(text.trim());
}

/* ── Component ──────────────────────────────────────────── */

export interface ChatPanelProps {
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

const TAB_ITEMS = [
  { id: 'global', label: 'global' },
  { id: 'space', label: 'space chat' },
];

export function ChatPanel({
  activeTab = 'global',
  onTabChange,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [emoteOpen, setEmoteOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const emoteAreaRef = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // Simulated incoming messages every ~3s
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 80) { clearInterval(interval); return; }
      const username = RANDOM_USERNAMES[Math.floor(Math.random() * RANDOM_USERNAMES.length)];
      const text = RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
      const colorIndex = Math.floor(Math.random() * USERNAME_COLORS.length);
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      setMessages((prev) => [...prev, { id: getNextId(), username, text, timestamp, colorIndex }]);
      count++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Click-outside to close emoji tray
  useEffect(() => {
    if (!emoteOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (emoteAreaRef.current && !emoteAreaRef.current.contains(e.target as Node)) {
        setEmoteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [emoteOpen]);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;

    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setMessages((prev) => [
      ...prev,
      {
        id: getNextId(),
        username: 'you',
        text,
        timestamp,
        colorIndex: 4, // gold
      },
    ]);
    setInputValue('');
    play('message-sent');
  }, [inputValue, play]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputValue((v) => v + emoji);
    setEmoteOpen(false);
    // Re-focus the chat input after emoji selection
    requestAnimationFrame(() => {
      const input = emoteAreaRef.current?.querySelector('input');
      input?.focus();
    });
  };

  const emoteButton = (
    <button
      type="button"
      className={`${styles.emoteButton} ${emoteOpen ? styles.emoteButtonActive : ''}`}
      onClick={() => setEmoteOpen((prev) => !prev)}
    >
      <EmoteIcon size={16} />
    </button>
  );

  return (
    <div className={styles.chatPanel}>
      {/* ── Filter tabs ──────────────────────────── */}
      <div className={styles.header}>
        <TabNav
          items={TAB_ITEMS}
          activeId={activeTab}
          onChange={onTabChange ?? (() => {})}
        />
      </div>

      {/* ── Messages ─────────────────────────────── */}
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.message}>
            <div className={styles.messageHeader}>
              <span
                className={styles.username}
                style={{ color: USERNAME_COLORS[msg.colorIndex] }}
              >
                {msg.username}
              </span>
              <span className={styles.timestamp}>{msg.timestamp}</span>
            </div>
            {isEmojiOnly(msg.text) ? (
              <span className={styles.emojiOnlyText}>{msg.text}</span>
            ) : (
              <Text variant="p3Para" color="primary">{msg.text}</Text>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar + emoji tray ─────────────── */}
      <div className={styles.inputArea} ref={emoteAreaRef}>
        {emoteOpen && (
          <div className={styles.emojiTray}>
            {EMOJI_SET.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={styles.emojiButton}
                onClick={() => handleEmojiSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        <TextEntry
          value={inputValue}
          onChange={setInputValue}
          onKeyDown={handleKeyDown}
          placeholder="type a message..."
          spellCheck={false}
          variant="pill"
          endAddon={emoteButton}
        />
      </div>
    </div>
  );
}
