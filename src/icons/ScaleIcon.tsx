interface ScaleIconProps {
  size?: number;
  className?: string;
}

export function ScaleIcon({ size = 40, className }: ScaleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M33.1504 15.5C33.1504 16.1354 32.6354 16.6504 32 16.6504C31.3646 16.6504 30.8496 16.1354 30.8496 15.5V10.2764L10.7764 30.3496H16C16.6354 30.3496 17.1504 30.8646 17.1504 31.5C17.1504 32.1354 16.6354 32.6504 16 32.6504H7.99805C7.36808 32.6418 6.85821 32.1319 6.84961 31.502V23.5C6.84961 22.8646 7.36465 22.3496 8 22.3496C8.63535 22.3496 9.15039 22.8646 9.15039 23.5V28.7236L29.2236 8.65039H24C23.3646 8.65039 22.8496 8.13535 22.8496 7.5C22.8496 6.86465 23.3646 6.34961 24 6.34961H32.002C32.6319 6.35822 33.1418 6.86807 33.1504 7.49805V15.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.3"
      />
    </svg>
  );
}
