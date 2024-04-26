'use client';

import React from 'react';
import clsx from 'clsx';
import styles from '@/styles/button.module.scss';

export type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'contained' | 'outlined';
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
  const { size, variant, color, children, block, ...rest } = props;
  return (
    <button
      className={clsx(styles.button, {
        [styles[`button_${color}`]]: !!color,
        [styles.button_block]: block,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
