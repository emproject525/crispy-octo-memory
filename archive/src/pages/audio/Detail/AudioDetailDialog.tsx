import React from 'react';
import DraggablePaper from 'components/DraggablePaper';

import AudioDetail, { AudioDetailProps } from './AudioDetail';

/**
 * 상세를 dialog 처럼 노출
 */
const AudioDetailDialog = (
  props: {
    /**
     * unique key
     */
    id: string;
    open: boolean;
    onClose: () => void;
    highlightText?: string;
  } & AudioDetailProps,
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
      <AudioDetail contId={contId} highlightText={highlightText} />
    </DraggablePaper>
  );
};

export default AudioDetailDialog;
