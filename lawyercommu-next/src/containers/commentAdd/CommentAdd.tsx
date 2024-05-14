'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AxiosError } from 'axios';
import client from '@/services/client';
import { FaRegCommentAlt } from 'react-icons/fa';
import { ImSpinner } from 'react-icons/im';
import { RxReload } from 'react-icons/rx';
import { IoArrowUpOutline } from 'react-icons/io5';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ICommentParent, IRes } from '@/types';
import FlexBox from '@/components/Box/FlexBox';
import Button from '@/components/Button/Button';
import TextArea from '@/components/Input/TextArea';
import Span from '@/components/Font/Span';
import CommentParent from '@/containers/commentAdd/CommentParent';
import { escapeMySQL } from '@/utils/utils';
import styles from '@/styles/contens.module.scss';

type CommentAddProps = {
  /**
   * 전체 댓글 수
   */
  totalCommentCnt: number;
};

type CommentList = {
  count: number;
  list: ICommentParent[];
  total: number;
};

const CommentAdd = ({ totalCommentCnt }: CommentAddProps) => {
  const [body, setBody] = useState('');
  const { seq } = useParams();
  const [target, setTarget] = useState<ICommentParent[]>([]);
  const [page, setPage] = useState(1); // 코멘트의 페이지
  const [total, setTotal] = useState(0); // 캐싱 때문에 total이 자꾸 0으로와서 UI 깜빡거림 -> 별도 state로 관리

  // 댓글 조회
  const { data, refetch, isFetching, isFetched } = useQuery<
    CommentList,
    AxiosError
  >({
    initialData: {
      list: [],
      count: 0,
      total: 0,
    },
    queryKey: ['comment', seq, page],
    _defaulted: true,
    queryFn: () =>
      client
        .get<IRes<CommentList>>(`/comment/${seq}?page=${page}`)
        .then((res) =>
          res.data.header.success
            ? {
                count: res.data.body.count,
                total: res.data.body.total,
                list: res.data.body.list.reverse(),
              }
            : {
                count: 0,
                total: 0,
                list: [],
              },
        ),
  });

  useEffect(() => {
    if (isFetched) {
      setTotal((b) => data.total ?? b);
      if (page === 1) {
        setTarget(data.list);
      } else {
        setTarget((b) => [...data.list, ...b]);
      }
    }
  }, [isFetched, page, data.list, data.total]);

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

  const cnt = useMemo(
    () => data.count || totalCommentCnt || 0,
    [data.count, totalCommentCnt],
  );

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
        <Span color="info">{cnt}</Span>
      </FlexBox>
      <div className="my-2">
        {page < total && (
          <Button
            block
            flexContents
            color="gray-200"
            onClick={() => setPage(page + 1)}
          >
            {isFetching ? (
              <ImSpinner className={styles.spin} />
            ) : (
              <IoArrowUpOutline />
            )}
            이전 댓글 확인
          </Button>
        )}
      </div>
      <div className="my-2">
        {target.map((commentItem, idx) => (
          <CommentParent
            key={`comment-${seq}-${commentItem.seq}`}
            title={`익명 ${cnt - (target.length - idx) + 1}`}
            {...commentItem}
          />
        ))}
      </div>
      <Button block flexContents onClick={() => refetch()} color="gray-200">
        {isFetching ? <ImSpinner className={styles.spin} /> : <RxReload />}
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
