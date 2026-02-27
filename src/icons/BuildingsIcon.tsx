export function BuildingsIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Building body */}
      <rect x="3" y="7" width="8" height="11" rx="1" fill="currentColor" />
      {/* Roof */}
      <path d="M2 7.5L7 2.5L12 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Tower */}
      <rect x="12" y="4" width="5" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}
