export function FurnitureIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Seat */}
      <rect x="4" y="8" width="9" height="2.5" rx="1" fill="currentColor" />
      {/* Back */}
      <rect x="11" y="3" width="2.5" height="12" rx="1" fill="currentColor" />
      {/* Front legs */}
      <rect x="4" y="10.5" width="2" height="6" rx="0.5" fill="currentColor" />
      {/* Back legs */}
      <rect x="11.5" y="14" width="2" height="3" rx="0.5" fill="currentColor" />
    </svg>
  );
}
