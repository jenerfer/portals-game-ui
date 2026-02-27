export function MouseLeftClickIcon({ size = 24, className }: { size?: number; className?: string }) {
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
      {/* Left button fill (highlighted) */}
      <path d="M2.75 14V14C2.75 8.89 6.89 4.75 12 4.75V14H2.75Z" fill="currentColor" opacity="0.5" />
      {/* Scroll wheel */}
      <rect x="10.5" y="8" width="3" height="5" rx="1.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}
