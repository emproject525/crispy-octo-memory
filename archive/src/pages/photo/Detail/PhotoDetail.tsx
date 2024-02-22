import React from 'react';
import { Divider, Grid } from '@mui/material';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';

import PhotoTitle from './components/Title';
import PhotoRegDt from './components/RegDt';
import PhotoArchStatus from './components/ArchStatus';
import PhotoFileImage from './components/FileImage';

import { asyncPhoto } from '../state';

const Inner = ({ contId }: { contId: number }) => {
  useRecoilValueLoadable(asyncPhoto(contId));

  return (
    <Grid container spacing={2}>
      <PhotoTitle contId={contId} />
      <PhotoRegDt contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <PhotoArchStatus contId={contId} />
      <PhotoFileImage contId={contId} />
    </Grid>
  );
};

const PhotoDetail = ({ contId }: { contId: number }) => (
  <RecoilRoot>
    <Inner contId={contId} />
  </RecoilRoot>
);

export default PhotoDetail;
