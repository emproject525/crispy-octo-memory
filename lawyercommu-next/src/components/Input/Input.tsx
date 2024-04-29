'use client';

import React from 'react';
import clsx from 'clsx';
import styles from '@/styles/input.module.scss';

export type InputProps = {
  error?: boolean;
  disabled?: boolean;
  onlyBorderBottom?: boolean;
  /**
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'size'>;

const Input = (props: InputProps) => {
  const { error, disabled, size, onlyBorderBottom, ...rest } = props;

  return (
    <input
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(styles.input, {
        [styles.input_disabled]: disabled,
        [styles.input_error]: error,
        [styles.input_lg]: size === 'lg',
        [styles.input_border_bottom]: onlyBorderBottom,
      })}
      {...rest}
    />
  );
};

export default Input;
