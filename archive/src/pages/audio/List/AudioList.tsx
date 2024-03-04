import React from 'react';
import { Box, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';

import AudioItem from './AudioItem';
import { asyncAudioList } from '../state';

const Inner = () => {
  const { contents, state } = useRecoilValueLoadable(asyncAudioList);
  const { breakpoints } = useTheme();
  const isDownXs = useMediaQuery(breakpoints.down('xs'));
  const isUpLg = useMediaQuery(breakpoints.up('lg'));

  const renderItem = React.useCallback(
    (targetProps: RenderImageProps) => {
      if (state === 'hasValue') {
        const origin = contents.body?.list?.[targetProps.index];

        if (origin) {
          return (
            <AudioItem
              key={`audio-${targetProps.index}`}
              direction="row"
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
        width: 1280,
        height: 900,
        src: item.thumbFilePath,
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
                targetRowHeight={isDownXs ? 1 : isUpLg ? 4 : 2}
                limitNodeSearch={isDownXs ? 1 : isUpLg ? 4 : 2}
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

const AudioList = () => (
  <RecoilRoot>
    <React.Suspense fallback={<Box>Loading...</Box>}>
      <Inner />
    </React.Suspense>
  </RecoilRoot>
);

export default AudioList;
