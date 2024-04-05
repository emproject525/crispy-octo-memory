import React from 'react';
import DraggablePaper from 'components/DraggablePaper';

import TextDetail, { TextDetailProps } from './TextDetail';

/**
 * 문서 상세를 dialog 처럼 노출
 */
const TextDetailDialog = (
  props: {
    /**
     * unique key
     */
    id: string;
    open: boolean;
    onClose: () => void;
  } & TextDetailProps,
) => {
  const { id, contId, open, onClose, highlightText } = props;

  return (
    <DraggablePaper
      key={id}
      open={open}
      onClose={onClose}
      handleId={id}
      sx={{
        width: 600,
      }}
    >
      <TextDetail contId={contId} highlightText={highlightText} />
    </DraggablePaper>
  );
};

export default TextDetailDialog;
