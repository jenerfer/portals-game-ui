export function FireballsIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Flame */}
      <path
        d="M10 2C10 2 5 7 5 12a5 5 0 0 0 10 0C15 7 10 2 10 2Z"
        fill="currentColor"
      />
      {/* Inner glow */}
      <ellipse cx="10" cy="14" rx="2.2" ry="2.8" fill="var(--color-glass-base, #0C1317)" opacity="0.5" />
    </svg>
  );
}
