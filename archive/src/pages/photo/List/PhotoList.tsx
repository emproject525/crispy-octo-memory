import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
import Gallery, { RenderImageProps } from 'react-photo-gallery';

import { asyncPhotoList } from '../state';
import PhotoItem from './PhotoItem';

const Inner = () => {
  const { contents, state } = useRecoilValueLoadable(asyncPhotoList);

  const renderImage = React.useCallback(
    (renderImageProps: RenderImageProps) => {
      if (state === 'hasValue') {
        const originPhoto = contents.body?.list?.[renderImageProps.index];

        if (originPhoto) {
          return (
            <PhotoItem
              key={`photo-${renderImageProps.index}`}
              renderImageProps={renderImageProps}
              {...originPhoto}
            />
          );
        }

        return null;
      }

      return null;
    },
    [state, contents],
  );

  switch (state) {
    case 'hasValue': {
      const galleryPics = (contents.body?.list || []).map((item) => ({
        width: item.width || 1,
        height: item.height ? item.height + 46 : item.height || 1,
        src: `http://localhost:8080${item.filePath}`,
        key: `${item.contType}-${item.contId}`,
      }));

      return (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper>상태 검색</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                px: 4,
              }}
            >
              <Gallery
                margin={6}
                photos={galleryPics}
                direction="column"
                renderImage={renderImage}
              />
            </Paper>
          </Grid>
        </Grid>
      );
    }

    default:
      return null;
  }
};

const PhotoList = () => (
  <RecoilRoot>
    <React.Suspense fallback={<Box>Loading...</Box>}>
      <Inner />
    </React.Suspense>
  </RecoilRoot>
);

export default PhotoList;
