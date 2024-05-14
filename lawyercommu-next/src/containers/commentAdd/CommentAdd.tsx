'use client';

import React, { useState } from 'react';
import { AxiosError } from 'axios';
import client from '@/services/client';
import { FaRegCommentAlt } from 'react-icons/fa';
import { RxReload } from 'react-icons/rx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ICommentParent, IPagingList, IRes } from '@/types';
import FlexBox from '@/components/Box/FlexBox';
import Button from '@/components/Button/Button';
import TextArea from '@/components/Input/TextArea';
import Span from '@/components/Font/Span';
import CommentParent from '@/containers/commentAdd/CommentParent';
import { escapeMySQL } from '@/utils/utils';

type CommentAddProps = {
  /**
   * 전체 댓글 수
   */
  totalCommentCnt: number;
};

const CommentAdd = ({ totalCommentCnt }: CommentAddProps) => {
  const [body, setBody] = useState('');
  const { seq } = useParams();

  // 댓글 조회
  const { data, refetch } = useQuery<IPagingList<ICommentParent>, AxiosError>({
    initialData: {
      list: [],
      count: 0,
    },
    queryKey: ['comment', seq],
    _defaulted: true,
    queryFn: () =>
      client
        .get<IRes<IPagingList<ICommentParent>>>(`/comment/${seq}`)
        .then((res) =>
          res.data.header.success
            ? {
                count: res.data.body.count,
                list: res.data.body.list.reverse(),
              }
            : {
                count: 0,
                list: [],
              },
        ),
  });

  // 댓글 등록
  const addComment = useMutation<IRes<boolean>, AxiosError, string>({
    mutationFn: (body) =>
      client
        .post(`/comment/${seq}`, { body: escapeMySQL(body) })
        .then((res) => res.data),
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
        <Span color="info">{data.count || totalCommentCnt || 0}</Span>
      </FlexBox>
      <div className="my-2">
        {data.list.map((commentItem, idx) => (
          <CommentParent
            key={`comment-${seq}-${commentItem.seq}`}
            title={`익명 ${idx + 1}`}
            {...commentItem}
          />
        ))}
      </div>
      <Button block flexContents onClick={() => refetch()}>
        <RxReload />
        새로운 댓글 확인
      </Button>
      <div className="my-2">
        <TextArea
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <Button block onClick={() => addComment.mutate(body)}>
        댓글 쓰기
      </Button>
    </div>
  );
};

export default CommentAdd;
