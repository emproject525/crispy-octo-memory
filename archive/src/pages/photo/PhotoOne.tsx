import React from 'react';
import { Paper } from '@mui/material';
import { useParams } from 'react-router';
import PhotoDetail from './Detail';

/**
 * 포토 상세 페이지
 * @returns JSX.Element
 */
const PhotoOne = (): JSX.Element => {
  const { contId } = useParams();

  return (
    <Paper>{contId ? <PhotoDetail contId={Number(contId)} /> : null}</Paper>
  );
};

export default PhotoOne;
