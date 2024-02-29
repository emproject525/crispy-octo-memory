import React from 'react';
import DraggablePaper from 'components/DraggablePaper';

import VideoDetail from './VideoDetail';

/**
 * 영상 상세를 dialog 처럼 노출
 */
const VideoDetailDialog = (props: {
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
      <VideoDetail contId={contId} />
    </DraggablePaper>
  );
};

export default VideoDetailDialog;
