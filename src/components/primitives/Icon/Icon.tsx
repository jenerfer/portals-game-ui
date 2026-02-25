import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

const Icon: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  className,
  children,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={className}
  >
    {children}
  </svg>
);

export { Icon };
export type { IconProps };
