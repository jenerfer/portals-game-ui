export function CloseIcon({ size = 22, className }: { size?: number; className?: string }) {
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
        d="M18.3813 3.2644L11.3159 10.3298L18.4282 17.4421L17.4878 18.3826L10.3755 11.2703L3.26416 18.3826L2.32373 17.4421L9.43506 10.3298L2.36963 3.2644L3.31006 2.32397L10.3755 9.3894L17.4409 2.32397L18.3813 3.2644Z"
        fill="currentColor"
      />
    </svg>
  );
}
