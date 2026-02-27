export function DragIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Four-way arrow / move icon */}
      {/* Up arrow */}
      <path d="M10 2L13 5H7L10 2Z" fill="currentColor" />
      {/* Down arrow */}
      <path d="M10 18L7 15H13L10 18Z" fill="currentColor" />
      {/* Left arrow */}
      <path d="M2 10L5 7V13L2 10Z" fill="currentColor" />
      {/* Right arrow */}
      <path d="M18 10L15 13V7L18 10Z" fill="currentColor" />
      {/* Center cross */}
      <line x1="10" y1="5" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
