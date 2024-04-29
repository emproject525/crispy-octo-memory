'use client';

import React from 'react';
import clsx from 'clsx';
import styles from '@/styles/box.module.scss';

export type FlexBoxProps = {
  /**
   * @default false
   */
  column?: boolean;
  /**
   * @default row
   */
  row?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const FlexBox = (props: FlexBoxProps) => {
  const { children, className, column, row, ...rest } = props;
  return (
    <div
      className={clsx(styles.flex_box, className, {
        [styles.flex_box_column]: column,
        [styles.flex_box_row]: row,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};

export default FlexBox;
