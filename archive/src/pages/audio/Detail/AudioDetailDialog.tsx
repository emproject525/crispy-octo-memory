import React from 'react';
import DraggablePaper from 'components/DraggablePaper';

import AudioDetail from './AudioDetail';

/**
 * 상세를 dialog 처럼 노출
 */
const AudioDetailDialog = (props: {
  contId?: number;
  open: boolean;
  onClose: () => void;
}) => {
  const { contId, open, onClose } = props;

  if (!contId) {
    return null;
  }

  return (
    <DraggablePaper
      open={open}
      onClose={onClose}
      handleId={`audio-${contId}`}
      sx={{
        width: 600,
      }}
    >
      <AudioDetail contId={contId} />
    </DraggablePaper>
  );
};

export default AudioDetailDialog;
