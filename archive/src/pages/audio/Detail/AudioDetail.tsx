import React from 'react';
import { Divider, Grid } from '@mui/material';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
import { audioSelector } from './state';

import AudioHeader from './components/Header';
import AudioRegDt from './components/RegDt';
import AudioArchStatus from './components/ArchStatus';
import PlayAudio from './components/PlayAudio';
import AudioInfo from './components/AudioInfo';
import AudioTitle from './components/Title';
import AudioCaption from './components/Caption';
import AudioMediaSource from './components/MediaSource';
import AudioDepartment from './components/Department';
import AudioCopyrt from './components/Copyrt';
import AudioShootTypeShootDt from './components/ShootTypeShootDt';
import AudioShootPlace from './components/ShootPlace';
import AudioPayYnAdultYn from './components/PayYnAdultYn';
import AudioRelations from './components/Relations';

export type AudioDetailProps = {
  contId: number;
  highlight?: string;
};

const Inner = ({ contId, highlight }: AudioDetailProps) => {
  useRecoilValueLoadable(audioSelector(contId));

  return (
    <Grid container spacing={2}>
      <AudioHeader contId={contId} highlight={highlight} />
      <AudioRegDt contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <AudioArchStatus contId={contId} />
      <PlayAudio contId={contId} />
      <AudioInfo contId={contId} />
      <AudioTitle contId={contId} />
      <AudioCaption contId={contId} />
      <AudioMediaSource contId={contId} />
      <AudioDepartment contId={contId} />
      <AudioCopyrt contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <AudioShootTypeShootDt contId={contId} />
      <AudioShootPlace contId={contId} />
      <AudioPayYnAdultYn contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <AudioRelations contId={contId} />
    </Grid>
  );
};

const AudioDetail = (props: AudioDetailProps) => (
  <RecoilRoot>
    <Inner {...props} />
  </RecoilRoot>
);

export default AudioDetail;
