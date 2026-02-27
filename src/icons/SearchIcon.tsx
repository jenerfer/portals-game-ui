interface SearchIconProps {
  size?: number;
  className?: string;
}

export function SearchIcon({ size = 22, className }: SearchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="9.5"
        cy="9.5"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <line
        x1="14.5"
        y1="14.5"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
