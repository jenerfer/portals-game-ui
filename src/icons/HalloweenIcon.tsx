export function HalloweenIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ghost body */}
      <path
        d="M5 18V10a5 5 0 0 1 10 0v8l-2.5-2-2.5 2-2.5-2L5 18Z"
        fill="currentColor"
      />
      {/* Eyes */}
      <circle cx="8" cy="10" r="1.2" fill="var(--color-glass-base, #0C1317)" />
      <circle cx="12" cy="10" r="1.2" fill="var(--color-glass-base, #0C1317)" />
    </svg>
  );
}
