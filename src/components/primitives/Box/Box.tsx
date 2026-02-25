import React from 'react';
import styles from './Box.module.css';

interface BoxProps {
  as?: React.ElementType;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  gap?: string | number;
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const alignMap: Record<NonNullable<BoxProps['align']>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const justifyMap: Record<NonNullable<BoxProps['justify']>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
};

const Box: React.FC<BoxProps> = ({
  as: Component = 'div',
  direction = 'row',
  align,
  justify,
  gap,
  wrap = false,
  className,
  style,
  children,
}) => {
  const inlineStyle: React.CSSProperties = {
    flexDirection: direction,
    ...(align != null && { alignItems: alignMap[align] }),
    ...(justify != null && { justifyContent: justifyMap[justify] }),
    ...(gap != null && { gap }),
    ...(wrap && { flexWrap: 'wrap' }),
    ...style,
  };

  const classNames = [styles.box, className].filter(Boolean).join(' ');

  return (
    <Component className={classNames} style={inlineStyle}>
      {children}
    </Component>
  );
};

export { Box };
export type { BoxProps };
