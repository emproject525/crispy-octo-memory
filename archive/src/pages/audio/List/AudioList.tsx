import React from 'react';
import { Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
} from 'recoil';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import MoreButton from 'pages/@components/button/MoreButton';

import AudioItem from './AudioItem';
import { audioListParams, audioListSelector, audioListState } from '../state';

const Inner = () => {
  const [params, setParams] = useRecoilState(audioListParams);
  const [loadable, setAudioList] = useRecoilStateLoadable(audioListSelector);
  const audios = useRecoilValue(audioListState);
  const { breakpoints } = useTheme();
  const isDownXs = useMediaQuery(breakpoints.down('xs'));
  const isUpLg = useMediaQuery(breakpoints.up('lg'));

  React.useEffect(() => {
    if (loadable.state === 'hasValue') {
      setAudioList((cur) => cur);
    }
  }, [loadable.state, setAudioList]);

  const galleryPics = React.useMemo(
    () =>
      audios.map((item) => ({
        width: 1280,
        height: 900,
        src: item.thumbFilePath,
        key: `${item.contType}-${item.contId}`,
      })),
    [audios],
  );

  const renderItem = React.useCallback(
    (targetProps: RenderImageProps) => {
      const origin = audios[targetProps.index];

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
    },
    [audios],
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper
          sx={{
            px: 4,
          }}
        >
          {galleryPics.length > 0 && (
            <Gallery
              margin={6}
              photos={galleryPics}
              direction="row"
              renderImage={renderItem}
              targetRowHeight={isDownXs ? 1 : isUpLg ? 4 : 2}
              limitNodeSearch={isDownXs ? 1 : isUpLg ? 4 : 2}
            />
          )}

          <MoreButton
            loading={loadable.state === 'loading'}
            count={
              loadable.state === 'hasValue'
                ? loadable.contents.body?.count || 0
                : 0
            }
            size={params.size}
            page={params.page}
            onClick={(nextPage) =>
              setParams((p) => ({
                ...p,
                page: nextPage,
              }))
            }
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const AudioList = () => (
  <RecoilRoot>
    <Inner />
  </RecoilRoot>
);

export default AudioList;
