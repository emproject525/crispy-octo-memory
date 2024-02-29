import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';

import MiniTitle from 'components/Text/MiniTitle';
import PhotoHeader from './components/Header';
import PhotoRegDt from './components/RegDt';
import PhotoArchStatus from './components/ArchStatus';
import PhotoFileImage from './components/FileImage';
import PhotoImageInfo from './components/ImageInfo';
import PhotoTitle from './components/Title';
import PhotoCaption from './components/Caption';
import PhotoMediaSource from './components/MediaSource';
import PhotoDepartment from './components/Department';
import PhotoCopyrt from './components/Copyrt';
import PhotoImgType from './components/ImgType';
import PhotoShootTypeShootDt from './components/ShootTypeShootDt';
import PhotoShootPlace from './components/ShootPlace';
import PhotoPayYnAdultYn from './components/PayYnAdultYn';
import PhotoPeopleType from './components/PeopleType';

import { asyncPhoto } from '../state';

const Inner = ({ contId }: { contId: number }) => {
  useRecoilValueLoadable(asyncPhoto(contId));

  return (
    <Grid container spacing={2}>
      <PhotoHeader contId={contId} />
      <PhotoRegDt contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <PhotoArchStatus contId={contId} />
      <PhotoFileImage contId={contId} />
      <PhotoImageInfo contId={contId} />
      <PhotoTitle contId={contId} />
      <PhotoCaption contId={contId} />
      <PhotoMediaSource contId={contId} />
      <PhotoDepartment contId={contId} />
      <PhotoCopyrt contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <PhotoImgType contId={contId} />
      <PhotoShootTypeShootDt contId={contId} />
      <PhotoShootPlace contId={contId} />
      <PhotoPayYnAdultYn contId={contId} />
      <PhotoPeopleType contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box px={4}>
          <MiniTitle text="관련 컨텐츠" />
        </Box>
      </Grid>
    </Grid>
  );
};

const PhotoDetail = ({ contId }: { contId: number }) => (
  <RecoilRoot>
    <Inner contId={contId} />
  </RecoilRoot>
);

export default PhotoDetail;
