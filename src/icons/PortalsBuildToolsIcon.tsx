export function PortalsBuildToolsIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="10" cy="10" r="1.2" fill="currentColor" />
    </svg>
  );
}
