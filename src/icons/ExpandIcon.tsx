interface ExpandIconProps {
  size?: number;
  className?: string;
}

export function ExpandIcon({ size = 22, className }: ExpandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top-right corner arrow */}
      <polyline
        points="13,2 20,2 20,9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="20"
        y1="2"
        x2="13"
        y2="9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Bottom-left corner arrow */}
      <polyline
        points="9,20 2,20 2,13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="2"
        y1="20"
        x2="9"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
