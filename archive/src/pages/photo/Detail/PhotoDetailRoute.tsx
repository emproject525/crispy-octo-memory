import React from 'react';
import { Paper } from '@mui/material';
import { useParams } from 'react-router';
import PhotoDetail from './PhotoDetail';

const PhotoDetailRoute = () => {
  const { contId } = useParams();

  return (
    <Paper>{contId ? <PhotoDetail contId={Number(contId)} /> : null}</Paper>
  );
};

export default PhotoDetailRoute;
