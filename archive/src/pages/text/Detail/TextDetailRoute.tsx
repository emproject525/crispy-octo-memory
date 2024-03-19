import React from 'react';
import { Paper } from '@mui/material';
import { useParams } from 'react-router';
import TextDetail from './TextDetail';

const TextDetailRoute = () => {
  const { contId } = useParams();

  return (
    <Paper>{contId ? <TextDetail contId={Number(contId)} /> : null}</Paper>
  );
};

export default TextDetailRoute;
