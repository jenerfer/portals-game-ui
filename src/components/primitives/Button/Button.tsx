import React from 'react';
import styles from './Button.module.css';

type ButtonVariant =
  | 'primary-blue'
  | 'secondary-white'
  | 'tertiary'
  | 'outline'
  | 'disabled';

type ButtonSize = 'default' | 'micro';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary-blue',
  size = 'default',
  className,
  disabled,
  children,
  ...rest
}) => {
  const resolvedVariant = disabled ? 'disabled' : variant;

  const classNames = [
    styles.button,
    styles[`variant-${resolvedVariant}`],
    styles[`size-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled || variant === 'disabled'}
      {...rest}
    >
      {children}
    </button>
  );
};

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
