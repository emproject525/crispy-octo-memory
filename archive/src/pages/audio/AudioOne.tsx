import React from 'react';
import { Paper } from '@mui/material';
import { useParams } from 'react-router';
import AudioDetail from './Detail/AudioDetail';

/**
 * 오디오 상세 페이지
 * @returns JSX.Element
 */
const AudioOne = (): JSX.Element => {
  const { contId } = useParams();

  return (
    <Paper>{contId ? <AudioDetail contId={Number(contId)} /> : null}</Paper>
  );
};

export default AudioOne;
