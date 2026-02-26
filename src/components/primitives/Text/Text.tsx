import React from 'react';
import styles from './Text.module.css';

type TextVariant =
  | 'h1Xl'
  | 'h1'
  | 'h2'
  | 'h2Divider'
  | 'p1'
  | 'p1Bold'
  | 'p1Para'
  | 'p2'
  | 'p2Bold'
  | 'p2Para'
  | 'p3'
  | 'p3Bold'
  | 'p3Para';

type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'disabled'
  | 'blue'
  | 'inverse'
  | 'ice'
  | 'lightIce'
  | 'inherit';

interface TextProps {
  variant: TextVariant;
  color?: TextColor;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

const defaultElementMap: Record<TextVariant, React.ElementType> = {
  h1Xl: 'h1',
  h1: 'h1',
  h2: 'h2',
  h2Divider: 'h2',
  p1: 'p',
  p1Bold: 'p',
  p1Para: 'p',
  p2: 'p',
  p2Bold: 'p',
  p2Para: 'p',
  p3: 'p',
  p3Bold: 'p',
  p3Para: 'p',
};

const Text: React.FC<TextProps> = ({
  variant,
  color = 'primary',
  as,
  className,
  children,
}) => {
  const Component = as ?? defaultElementMap[variant];

  const classNames = [
    styles.base,
    styles[variant],
    styles[`color-${color}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classNames}>{children}</Component>;
};

export { Text };
export type { TextProps, TextVariant, TextColor };
