import React from 'react';
import { Divider, Grid } from '@mui/material';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
import { asyncVideo } from '../state';

import VideoHeader from './components/Header';
import VideoRegDt from './components/RegDt';
import VideoArchStatus from './components/ArchStatus';
import PlayVideo from './components/PlayVideo';

const Inner = ({ contId }: { contId: number }) => {
  useRecoilValueLoadable(asyncVideo(contId));

  return (
    <Grid container spacing={2}>
      <VideoHeader contId={contId} />
      <VideoRegDt contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <VideoArchStatus contId={contId} />
      <PlayVideo contId={contId} />
    </Grid>
  );
};

const VideoDetail = ({ contId }: { contId: number }) => (
  <RecoilRoot>
    <Inner contId={contId} />
  </RecoilRoot>
);

export default VideoDetail;
