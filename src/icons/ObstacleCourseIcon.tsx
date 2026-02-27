export function ObstacleCourseIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left post */}
      <rect x="3" y="3" width="2.2" height="14" rx="1" fill="currentColor" />
      {/* Right post */}
      <rect x="14.8" y="3" width="2.2" height="14" rx="1" fill="currentColor" />
      {/* Top bar */}
      <rect x="3" y="5" width="14" height="2.2" rx="1" fill="currentColor" />
      {/* Bottom bar */}
      <rect x="3" y="11" width="14" height="2.2" rx="1" fill="currentColor" />
    </svg>
  );
}
