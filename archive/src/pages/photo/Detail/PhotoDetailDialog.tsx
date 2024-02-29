import React from 'react';
import DraggablePaper from 'components/DraggablePaper';

import PhotoDetail from '../Detail/PhotoDetail';

/**
 * 사진 상세를 dialog 처럼 노출
 */
const PhotoDetailDialog = (props: {
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
      <PhotoDetail contId={contId} />
    </DraggablePaper>
  );
};

export default PhotoDetailDialog;
