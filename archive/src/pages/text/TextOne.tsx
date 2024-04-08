import React from 'react';
import { Paper } from '@mui/material';
import { useParams } from 'react-router';
import TextDetail from './Detail';

/**
 * 문서 상세 페이지
 * @returns JSX.Element
 */
const TextOne = (): JSX.Element => {
  const { contId } = useParams();

  return (
    <Paper>{contId ? <TextDetail contId={Number(contId)} /> : null}</Paper>
  );
};

export default TextOne;
