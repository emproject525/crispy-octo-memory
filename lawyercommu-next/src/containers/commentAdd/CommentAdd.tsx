'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AxiosError } from 'axios';
import client from '@/services/client';
import { FaRegCommentAlt } from 'react-icons/fa';
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
import Spinner from '@/components/Icon/Spinner';

type CommentAddProps = {
  /**
   * 전체 댓글 수
   */
  totalCommentCnt: number;
};

type CommentList = {
  count: number;
  list: ICommentParent[];
  first: number;
};

const CommentAdd = ({ totalCommentCnt }: CommentAddProps) => {
  const [body, setBody] = useState('');
  const { seq } = useParams();
  const [target, setTarget] = useState<ICommentParent[]>([]); // 렌더링 대상
  const [p, setP] = useState({ p: -1, n: -1 }); // 파라미터

  // 댓글 조회
  const { data, isFetching, refetch, isFetched } = useQuery<
    CommentList,
    AxiosError
  >({
    queryKey: ['comment', seq, p],
    initialData: {
      list: target,
      count: target.length,
      first: target[0]?.seq ?? -1,
    },
    _defaulted: true,
    queryFn: () =>
      client
        .get<IRes<CommentList>>(`/comment/${seq}?p=${p.p}&n=${p.n}`)
        .then((res) =>
          res.data.header.success
            ? {
                count: res.data.body.count,
                first: res.data.body.first,
                list: res.data.body.list.reverse(),
              }
            : {
                count: 0,
                first: 0,
                list: [],
              },
        ),
  });

  useEffect(() => {
    if (isFetched) {
      setTarget((b) => {
        const map = new Map(data.list.map((item) => [`${item.seq}`, item]));
        b.forEach((item) => {
          map.set(`${item.seq}`, item);
        });
        return Array.from(map.values()).sort((a, b) =>
          a.regDt < b.regDt ? -1 : a.regDt > b.regDt ? 1 : a.seq - b.seq,
        );
      });
    }
  }, [data.list, isFetched]);

  // 댓글 등록
  const { mutate, isPending } = useMutation<IRes<boolean>, AxiosError, string>({
    mutationKey: [target],
    mutationFn: (body) =>
      client
        .post(`/comment/${seq}`, { body: escapeMySQL(body) })
        .then((res) => res.data),
    onSuccess: (res) => {
      if (res.header.success) {
        setBody('');
        setP({
          p: -1,
          n: target.slice(-1)?.[0]?.seq || -1,
        });
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
        {(target[0]?.seq ?? -1) > data.first && (
          <Button
            block
            flexContents
            color="gray-200"
            onClick={() => setP({ p: data.list[0]!.seq, n: -1 })}
          >
            {isFetching ? <Spinner /> : <IoArrowUpOutline />}
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
      <Button
        block
        flexContents
        onClick={() => {
          setP({
            p: -1,
            n: target.slice(-1)?.[0]?.seq || -1,
          });
          refetch();
        }}
        color="gray-200"
      >
        {isFetching ? <Spinner /> : <RxReload />}
        새로운 댓글 확인
      </Button>
      <div className="my-2">
        <TextArea
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <Button
        block
        flexContents
        onClick={() => mutate(body)}
        disabled={isPending}
      >
        댓글 쓰기
        {isPending && <Spinner />}
      </Button>
    </div>
  );
};

export default CommentAdd;
