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

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { error, disabled, size, onlyBorderBottom, ...rest } = props;

  return (
    <input
      ref={ref}
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
});

Input.displayName = 'Input';

export default Input;
