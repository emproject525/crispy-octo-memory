'use client';

import React, { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import client from '@/services/client';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { IComment, IPagingList, IRes } from '@/types';
import FlexBox from '@/components/Box/FlexBox';
import Button from '@/components/Button/Button';
import TextArea from '@/components/Input/TextArea';
import Span from '@/components/Font/Span';
import styles from '@/styles/contens.module.scss';

const CommentAdd = () => {
  const [body, setBody] = useState('');
  const { seq } = useParams();

  // 댓글 조회
  const { data, refetch } = useQuery<IComment[], AxiosError>({
    initialData: [],
    queryKey: ['comment', seq],
    _defaulted: true,
    queryFn: () =>
      client
        .get<IRes<IPagingList<IComment>>>(`/comment/${seq}`)
        .then((res) =>
          res.data.header.success ? res.data.body.list.reverse() : [],
        ),
  });

  // 댓글 등록
  const mutation = useMutation<
    IRes<boolean>,
    AxiosError,
    {
      body: string;
      parentSeq?: number;
    }
  >({
    mutationFn: (data) =>
      client.post(`/comment/${seq}`, data).then((res) => res.data),
    onSuccess: (res) => {
      if (res.header.success) {
        alert('댓글을 등록하였습니다.');
        setBody('');
        refetch();
      } else {
        alert('작성 실패');
      }
    },
  });

  return (
    <div data-desc="comment">
      <FlexBox
        row
        style={{
          columnGap: '0.5em',
        }}
      >
        <FaRegCommentAlt />
        <Span>댓글</Span>
        <Span color="info">0</Span>
      </FlexBox>
      <div className="my-2">
        {data.map((commentItem, idx) => (
          <div
            className={styles.comment_item}
            key={`comment-${seq}-${commentItem.seq}`}
          >
            <div className="mb-1">
              <span className={styles.noname_title}>익명 {idx + 1}</span>
              <span className={styles.noname_regdt}>{commentItem.regDt}</span>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: commentItem.body,
              }}
            />
            <div className="mt-1">
              <Button size="sm" variant="text">
                답글
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="my-2">
        <TextArea
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <Button
        block
        onClick={() => {
          mutation.mutate({
            body,
          });
        }}
      >
        댓글 쓰기
      </Button>
    </div>
  );
};

export default CommentAdd;
