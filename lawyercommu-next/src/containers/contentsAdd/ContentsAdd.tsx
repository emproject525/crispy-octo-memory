'use client';

import React, { useState } from 'react';
import client from '@/services/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { IRes } from '@/types';
import FlexBox from '@/components/Box/FlexBox';
import ContentsEditor from '@/components/Editor/ContentsEditor';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Spinner from '@/components/Icon/Spinner';
import { AxiosError, AxiosResponse } from 'axios';
import { escapeMySQL } from '@/utils/utils';

/**
 * app > contents > add > page
 * @returns
 */
const ContentsAdd = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const { mutate, isPending } = useMutation<
    AxiosResponse<IRes<boolean>>,
    AxiosError,
    {
      title: string;
      body: string;
    }
  >({
    mutationFn: (data) => client.post('/contents/add', data),
    onSuccess: (res) => {
      if (res.status === 200 && res.data.header.success) {
        alert('게시글을 등록하였습니다.');
        router.push('/contents');
      } else {
        alert('작성 실패');
      }
    },
  });

  // 처리하지 않는 것으로. 입력한 값 그대로 저장, '만 values 입력 시 걸려서 걔만 replace
  // const escapeTitleHtml = (text: string) => {
  //   const map = {
  //     '&': '&amp;',
  //     '<': '&lt;',
  //     '>': '&gt;',
  //     '"': '&quot;',
  //     "'": '&#039;',
  //   };

  //   return text.replace(/[&<>"']/g, (m) => map[m as keyof typeof map]);
  // };

  return (
    <FlexBox
      column
      style={{
        rowGap: '1em',
      }}
    >
      <Input
        size="lg"
        id="title"
        name="title"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value.slice(0, 100))}
        onlyBorderBottom
      />
      <ContentsEditor
        autoHeight
        value={body}
        onChange={(value) => setBody(value)}
      />
      <Button
        block
        flexContents
        disabled={isPending}
        onClick={() =>
          mutate({
            title: escapeMySQL(title),
            body: escapeMySQL(body),
          })
        }
      >
        게시글 등록
        {isPending && <Spinner />}
      </Button>
    </FlexBox>
  );
};

export default ContentsAdd;
