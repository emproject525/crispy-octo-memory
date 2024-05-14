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
  children?: React.ReactNode;
  disabled?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;

const Button = ({
  size,
  variant,
  color,
  children,
  block,
  flexContents,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles[`button_${color}`]]: !!color,
        [styles.button_block]: block,
        [styles.button_contents_flex]: flexContents,
        [styles.button_sm]: size === 'sm',
        [styles.button_text]: variant === 'text',
        [styles.button_disabled]: disabled,
      })}
      disabled={disabled || false}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
