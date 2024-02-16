import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Gallery, { RenderImageProps, GalleryProps } from 'react-photo-gallery';

import { asyncPhotoList } from './state';

const Inner = () => {
  const photos = useRecoilValue(asyncPhotoList);
  const galleryPics = React.useMemo(
    () =>
      (photos.body?.list || []).map((item) => ({
        width: item.width || 16,
        height: item.height || 9,
        src: `http://localhost:8080${item.filePath}`,
        key: `${item.contType}-${item.contId}`,
      })),
    [photos],
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper>
          <Gallery margin={6} photos={galleryPics} />
          {/* {photos.body?.list?.map((item, idx) => (
            <Box key={`${idx}-${item.title}`}>{item.title}</Box>
          ))} */}
        </Paper>
      </Grid>
    </Grid>
  );
};

const PhotoList = () => (
  <RecoilRoot>
    <React.Suspense fallback={<Box>Loading...</Box>}>
      <Inner />
    </React.Suspense>
  </RecoilRoot>
);

export default PhotoList;
