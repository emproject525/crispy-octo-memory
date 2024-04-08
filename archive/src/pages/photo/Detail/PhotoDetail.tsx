import React from 'react';
import { Divider, Grid } from '@mui/material';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';

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
import PhotoRelations from './components/Relations';

import { photoOneState } from './state';

export type PhotoDetailType = {
  contId: number;
  highlight?: string;
};

const Inner = ({ contId, highlight }: PhotoDetailType) => {
  useRecoilValueLoadable(photoOneState(contId));

  return (
    <Grid container spacing={2}>
      <PhotoHeader contId={contId} highlight={highlight} />
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
      <PhotoRelations contId={contId} />
    </Grid>
  );
};

const PhotoDetail = (props: PhotoDetailType) => (
  <RecoilRoot>
    <Inner {...props} />
  </RecoilRoot>
);

export default PhotoDetail;
