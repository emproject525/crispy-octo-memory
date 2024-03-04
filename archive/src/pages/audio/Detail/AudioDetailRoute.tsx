import { Paper } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router';
import AudioDetail from './AudioDetail';

const AudioDetailRoute = () => {
  const { contId } = useParams();

  return (
    <Paper>{contId ? <AudioDetail contId={Number(contId)} /> : null}</Paper>
  );
};

export default AudioDetailRoute;
