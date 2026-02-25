export function BackIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.073 2.27403C13.312 2.02009 13.7116 2.00766 13.9656 2.24669C14.2194 2.48563 14.2316 2.88529 13.9929 3.13927L7.18237 10.3746L13.9929 17.6109C14.2316 17.8649 14.2194 18.2646 13.9656 18.5035C13.7116 18.7426 13.312 18.7301 13.073 18.4762L5.448 10.3756L5.85522 9.942L13.073 2.27403Z"
        fill="currentColor"
      />
    </svg>
  );
}
