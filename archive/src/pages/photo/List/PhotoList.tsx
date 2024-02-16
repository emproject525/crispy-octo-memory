import { Box } from '@mui/material';
import React from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';

import { getPhotoList, photoListState } from './state';

const Inner = () => {
  const call = useRecoilValue(getPhotoList);
  const [photos] = useRecoilState(photoListState);

  return (
    <>
      <Box>성공 여부 :{call.header.success}</Box>
      {photos.map((item, idx) => (
        <Box key={`${idx}-${item.title}`}>{item.title}</Box>
      ))}
    </>
  );
};

const PhotoList = () => (
  <RecoilRoot>
    <React.Suspense>
      <Inner />
    </React.Suspense>
  </RecoilRoot>
);

export default PhotoList;
