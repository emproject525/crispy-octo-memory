'use client';

import { CSSProperties } from 'react';
import clsx from 'clsx';
import styles from '@/styles/font.module.scss';

export type SpanProps = {
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'search'
    | 'gray-100'
    | 'gray-200'
    | 'gray-300'
    | 'gray-400'
    | 'gray-500'
    | 'gray-600'
    | 'gray-700'
    | 'gray-800'
    | 'gray-900';
  fontSize?: CSSProperties['fontSize'];
} & React.HTMLAttributes<HTMLSpanElement>;

const Span = (props: SpanProps) => {
  const { color, children, fontSize, style, ...rest } = props;

  return (
    <span
      className={clsx({
        [styles[`font_color_${color}`]]: !!color,
      })}
      style={{
        fontSize,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Span;
