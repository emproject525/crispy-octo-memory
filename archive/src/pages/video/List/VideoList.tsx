import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';

import VideoItem from './VideoItem';
import { asyncVideoList } from '../state';

const Inner = () => {
  const { contents, state } = useRecoilValueLoadable(asyncVideoList);

  const renderItem = React.useCallback(
    (targetProps: RenderImageProps) => {
      if (state === 'hasValue') {
        const origin = contents.body?.list?.[targetProps.index];

        if (origin) {
          return (
            <VideoItem
              key={`photo-${targetProps.index}`}
              targetProps={targetProps}
              {...origin}
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
        width: 16,
        height: 9,
        src:
          item.mediaType === '00'
            ? `http://localhost:8080${item.thumbFilePath}`
            : item.thumbFilePath,
        key: `${item.contType}-${item.contId}`,
      }));

      return (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper
              sx={{
                px: 4,
              }}
            >
              <Gallery
                margin={6}
                photos={galleryPics}
                direction="row"
                renderImage={renderItem}
                limitNodeSearch={4}
                targetRowHeight={4}
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

const VideoList = () => (
  <RecoilRoot>
    <React.Suspense fallback={<Box>Loading...</Box>}>
      <Inner />
    </React.Suspense>
  </RecoilRoot>
);

export default VideoList;
