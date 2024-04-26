'use client';

import React from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';

export type ContentsEditorProps = {} & ReactQuillProps;

/**
 * @see https://quilljs.com/
 * @returns
 */
const ContentsEditor = (props: ContentsEditorProps) => {
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
      //["clean"],
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
    <div className="my-4">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="내용을 입력하세요..."
        {...props}
        // value={value || ''}
        // onChange={(content, delta, source, editor) =>
        //   onChange(editor.getHTML())
        // }
      />

      <input type="hidden" name="body" />
    </div>
  );
};

export default ContentsEditor;
