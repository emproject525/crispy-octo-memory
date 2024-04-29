'use client';

import React, { useState } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import clsx from 'clsx';
import styles from '@/styles/editor.module.scss';

export type ContentsEditorProps = {
  /**
   * flex 영역 안에서 꽉 채움
   */
  autoHeight?: boolean;
} & ReactQuillProps;

/**
 * @see https://quilljs.com/
 * @returns
 */
const ContentsEditor = (props: ContentsEditorProps) => {
  const { autoHeight, onChange, ...rest } = props;
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    // 'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'color',
    'direction',
    'align',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  return (
    <div
      className={clsx({
        [styles.flex_auto_height]: autoHeight,
      })}
    >
      <ReactQuill
        theme="snow"
        modules={modules}
        // formats={formats}
        placeholder="내용을 입력하세요."
        onChange={(content, delta, source, editor) => {
          onChange?.(content, delta, source, editor);
          setValue(content);
        }}
        {...rest}
        // value={value || ''}
        // onChange={(content, delta, source, editor) =>
        //   onChange(editor.getHTML())
        // }
      />

      <input type="hidden" id="body" name="body" value={value} readOnly />
    </div>
  );
};

export default ContentsEditor;
