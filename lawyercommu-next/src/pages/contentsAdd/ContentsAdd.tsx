'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FlexBox from '@/components/Box/FlexBox';
import ContentsEditor from '@/components/Editor/ContentsEditor';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { postContents } from '@/services/contents';

/**
 * app > contents > add > page
 * @returns
 */
const ContentsAdd = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

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

  const escapeBodyHtml = (text: string) => {
    const map = {
      // mysql insert시 ' 때문에 저장이 안됨
      "'": "\\'",
    };

    return text.replace(/[']/g, (m) => map[m as keyof typeof map]);
  };

  return (
    <FlexBox column>
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
        onClick={() => {
          postContents({
            title: escapeBodyHtml(title),
            body: escapeBodyHtml(body),
          }).then((res) => {
            if (res.status === 200 && res.data.header.success) {
              alert('게시글을 등록하였습니다.');
              router.push('/contents');
            } else {
              alert('작성 실패');
            }
          });
        }}
      >
        게시글 등록
      </Button>
    </FlexBox>
  );
};

export default ContentsAdd;
