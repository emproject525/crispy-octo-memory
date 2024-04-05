import React from 'react';
import { Grid, Paper, useTheme, useMediaQuery, Box } from '@mui/material';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
} from 'recoil';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import MoreButton from 'pages/@components/button/MoreButton';

import AudioSearchParams from './SearchParams';
import AudioItem from './AudioItem';
import { audioListParams, audioListSelector, audioListState } from './state';
import SearchCount from 'pages/@components/text/SearchCount';

const Inner = () => {
  const { breakpoints } = useTheme();
  const [params, setParams] = useRecoilState(audioListParams);
  const [loadable, setAudioList] = useRecoilStateLoadable(audioListSelector);
  const audios = useRecoilValue(audioListState);
  const isDownXs = useMediaQuery(breakpoints.down('xs'));
  const isUpLg = useMediaQuery(breakpoints.up('lg'));
  const count = React.useMemo(
    () =>
      loadable.state === 'hasValue' ? loadable.contents.body?.count || 0 : 0,
    [loadable.contents.body?.count, loadable.state],
  );

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
        src: item.thumbFilePath || '',
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
            highlightText={params.keyword}
            {...origin}
          />
        );
      }

      return null;
    },
    [audios, params.keyword],
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper
          sx={{
            px: 4,
          }}
        >
          <AudioSearchParams />
          <SearchCount count={count} />
          {galleryPics.length > 0 && (
            <Box
              sx={{
                width: 'calc(100% + 12px)',
                marginLeft: '-6px',
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
            </Box>
          )}

          <MoreButton
            loading={loadable.state === 'loading'}
            count={count}
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
