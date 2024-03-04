import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
import { asyncAudio } from '../state';

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
import MiniTitle from 'components/Text/MiniTitle';
import AudioRelations from './components/Relations';

const Inner = ({ contId }: { contId: number }) => {
  useRecoilValueLoadable(asyncAudio(contId));

  return (
    <Grid container spacing={2}>
      <AudioHeader contId={contId} />
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
      <Grid item xs={12}>
        <Box px={4}>
          <MiniTitle text="관련 컨텐츠" />
        </Box>
      </Grid>
      <AudioRelations contId={contId} />
    </Grid>
  );
};

const AudioDetail = ({ contId }: { contId: number }) => (
  <RecoilRoot>
    <Inner contId={contId} />
  </RecoilRoot>
);

export default AudioDetail;
