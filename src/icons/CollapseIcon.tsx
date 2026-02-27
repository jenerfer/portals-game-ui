interface CollapseIconProps {
  size?: number;
  className?: string;
}

export function CollapseIcon({ size = 22, className }: CollapseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top-right inward arrow */}
      <polyline
        points="20,9 13,9 13,2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="13"
        y1="9"
        x2="20"
        y2="2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Bottom-left inward arrow */}
      <polyline
        points="2,13 9,13 9,20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="9"
        y1="13"
        x2="2"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
