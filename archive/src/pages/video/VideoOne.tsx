import React from 'react';
import { Paper } from '@mui/material';
import { useParams } from 'react-router';
import VideoDetail from './Detail';

/**
 * 영상 상세 페이지
 * @returns JSX.Element
 */
const VideoOne = (): JSX.Element => {
  const { contId } = useParams();

  return (
    <Paper>{contId ? <VideoDetail contId={Number(contId)} /> : null}</Paper>
  );
};

export default VideoOne;
