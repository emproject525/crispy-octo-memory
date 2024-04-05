import React from 'react';
import DraggablePaper from 'components/DraggablePaper';

import VideoDetail, { VideoDetailProps } from './VideoDetail';

/**
 * 영상 상세를 dialog 처럼 노출
 */
const VideoDetailDialog = (
  props: {
    /**
     * unique key
     */
    id: string;
    open: boolean;
    onClose: () => void;
  } & VideoDetailProps,
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
      <VideoDetail contId={contId} highlightText={highlightText} />
    </DraggablePaper>
  );
};

export default VideoDetailDialog;
