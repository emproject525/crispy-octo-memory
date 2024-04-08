import React from 'react';
import { Divider, Grid } from '@mui/material';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';

import { videoSelector } from './state';
import VideoHeader from './components/Header';
import VideoRegDt from './components/RegDt';
import VideoArchStatus from './components/ArchStatus';
import PlayVideo from './components/PlayVideo';
import VideoInfo from './components/VideoInfo';
import VideoTitle from './components/Title';
import VideoCaption from './components/Caption';
import VideoMediaSource from './components/MediaSource';
import VideoDepartment from './components/Department';
import VideoCopyrt from './components/Copyrt';
import VideoShootTypeShootDt from './components/ShootTypeShootDt';
import VideoShootPlace from './components/ShootPlace';
import VideoPayYnAdultYn from './components/PayYnAdultYn';
import VideoRelations from './components/Relations';

export type VideoDetailProps = { contId: number; highlight?: string };

const Inner = ({ contId, highlight }: VideoDetailProps) => {
  useRecoilValueLoadable(videoSelector(contId));

  return (
    <Grid container spacing={2}>
      <VideoHeader contId={contId} highlight={highlight} />
      <VideoRegDt contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <VideoArchStatus contId={contId} />
      <PlayVideo contId={contId} />
      <VideoInfo contId={contId} />
      <VideoTitle contId={contId} />
      <VideoCaption contId={contId} />
      <VideoMediaSource contId={contId} />
      <VideoDepartment contId={contId} />
      <VideoCopyrt contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <VideoShootTypeShootDt contId={contId} />
      <VideoShootPlace contId={contId} />
      <VideoPayYnAdultYn contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <VideoRelations contId={contId} />
    </Grid>
  );
};

const VideoDetail = (props: VideoDetailProps) => (
  <RecoilRoot>
    <Inner {...props} />
  </RecoilRoot>
);

export default VideoDetail;
