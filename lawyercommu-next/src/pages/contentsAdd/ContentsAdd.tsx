'use client';

import React, { useState, useRef } from 'react';
import FlexBox from '@/components/Box/FlexBox';
import ContentsEditor from '@/components/Editor/ContentsEditor';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { postContent } from '@/services/contents';

/**
 * app > contents > add > page
 * @returns
 */
const ContentsAdd = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <FlexBox column>
      <Input
        size="lg"
        id="title"
        name="title"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value.slice(0, 45))}
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
          //

          postContent({
            title,
            body,
          }).then((res) => {
            debugger;
          });
        }}
      >
        게시글 등록
      </Button>
    </FlexBox>
  );
};

export default ContentsAdd;
