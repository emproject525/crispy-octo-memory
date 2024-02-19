import React from 'react';
import { Typography } from '@mui/material';
import DraggablePaper from 'components/DraggablePaper';
import { IContPhoto } from 'dto';

/**
 * 사진 컨텐츠 클릭 시 연결 (PhotoItem과 연결)
 */
const PhotoDetailDialog = (props: {
  contId?: IContPhoto['contId'];
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
      <Typography component="div">{contId}</Typography>
    </DraggablePaper>
  );
};

export default PhotoDetailDialog;
