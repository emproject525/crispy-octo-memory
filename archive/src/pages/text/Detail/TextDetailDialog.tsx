import React from 'react';
import DraggablePaper from 'components/DraggablePaper';

import TextDetail from './TextDetail';

/**
 * 문서 상세를 dialog 처럼 노출
 */
const TextDetailDialog = (props: {
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
      handleId={`photo-${contId}`}
      sx={{
        width: 600,
      }}
    >
      <TextDetail contId={contId} />
    </DraggablePaper>
  );
};

export default TextDetailDialog;
