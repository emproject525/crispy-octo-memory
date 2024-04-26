'use client';

import React from 'react';
import clsx from 'clsx';
import styles from '@/styles/input.module.scss';

export type InputProps = {
  error?: boolean;
  disabled?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>;

const Input = (props: InputProps) => {
  const { error, disabled, ...rest } = props;

  return (
    <input
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(styles.input, {
        [styles.input_disabled]: disabled,
        [styles.input_error]: error,
      })}
      {...rest}
    />
  );
};

export default Input;
