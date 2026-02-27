export function MouseScrollIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Mouse body outline */}
      <rect x="2" y="4" width="20" height="24" rx="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Divider line at top */}
      <line x1="12" y1="4" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5" />
      {/* Scroll wheel (highlighted) */}
      <rect x="10.5" y="8" width="3" height="5" rx="1.5" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.5" />
      {/* Scroll arrows */}
      <line x1="12" y1="6" x2="12" y2="7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="12" y1="13.5" x2="12" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
