'use client';

import React, { useState } from 'react';
import ContentsEditor from '@/components/Editor/ContentsEditor';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

/**
 * app > contents > add > page
 * @returns
 */
const ContentsAdd = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <div>
      <Input
        name="title"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ContentsEditor value={body} onChange={(value) => setBody(value)} />
      <Button block>게시글 등록</Button>
    </div>
  );
};

export default ContentsAdd;
