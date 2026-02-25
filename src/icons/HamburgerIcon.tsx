interface Props {
  size?: number;
  className?: string;
}

export function HamburgerIcon({ size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 5.01333C4 4.45368 4.44772 4 5 4H19C19.5523 4 20 4.45368 20 5.01333C20 5.57298 19.5523 6.02667 19 6.02667H5C4.44772 6.02667 4 5.57298 4 5.01333Z"
        fill="currentColor"
      />
      <path
        d="M4 11.6C4 11.0404 4.44772 10.5867 5 10.5867H19C19.5523 10.5867 20 11.0404 20 11.6C20 12.1596 19.5523 12.6133 19 12.6133H5C4.44772 12.6133 4 12.1596 4 11.6Z"
        fill="currentColor"
      />
      <path
        d="M4 18.1867C4 17.627 4.44772 17.1733 5 17.1733H19C19.5523 17.1733 20 17.627 20 18.1867C20 18.7463 19.5523 19.2 19 19.2H5C4.44772 19.2 4 18.7463 4 18.1867Z"
        fill="currentColor"
      />
    </svg>
  );
}
