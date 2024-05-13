'use client';

import React from 'react';
import clsx from 'clsx';
import styles from '@/styles/button.module.scss';

export type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  flexContents?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  block?: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'search';
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const { size, variant, color, children, block, flexContents, ...rest } =
    props;
  return (
    <button
      className={clsx(styles.button, {
        [styles[`button_${color}`]]: !!color,
        [styles.button_block]: block,
        [styles.button_contents_flex]: flexContents,
        [styles.button_sm]: size === 'sm',
        [styles.button_text]: variant === 'text',
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
