import React from 'react';
import DraggablePaper from 'components/DraggablePaper';

import PhotoDetail, { PhotoDetailType } from '../Detail/PhotoDetail';

/**
 * 사진 상세를 dialog 처럼 노출
 */
const PhotoDetailDialog = (
  props: {
    /**
     * unique key
     */
    id: string;
    open: boolean;
    onClose: () => void;
  } & PhotoDetailType,
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
      <PhotoDetail contId={contId} highlightText={highlightText} />
    </DraggablePaper>
  );
};

export default PhotoDetailDialog;
