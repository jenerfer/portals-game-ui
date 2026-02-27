export function ParticlesIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="6" cy="5" r="2" fill="currentColor" />
      <circle cx="14" cy="7" r="1.5" fill="currentColor" />
      <circle cx="10" cy="12" r="2.5" fill="currentColor" />
      <circle cx="5" cy="15" r="1.2" fill="currentColor" />
      <circle cx="15" cy="14" r="1.8" fill="currentColor" />
    </svg>
  );
}
