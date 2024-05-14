'use client';

import React from 'react';
import styles from '@/styles/contens.module.scss';

export type CommentProps = {
  title: string;
  regDt: string;
  body: string;
  children?: React.ReactNode;
};

/**
 * 댓글 기본 UI
 * @param param0
 * @returns
 */
const Comment = ({ title, regDt, body, children }: CommentProps) => {
  return (
    <div className={styles.comment_item}>
      <div className="mb-1">
        <span className={styles.noname_title}>{title}</span>
        <span className={styles.noname_regdt}>{regDt}</span>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
      {children}
    </div>
  );
};

export default Comment;
