import { Paper } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router';
import VideoDetail from './VideoDetail';

const VideoDetailRoute = () => {
  const { contId } = useParams();

  return (
    <Paper>{contId ? <VideoDetail contId={Number(contId)} /> : null}</Paper>
  );
};

export default VideoDetailRoute;
