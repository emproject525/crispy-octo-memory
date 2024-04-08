import { Box, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
} from 'recoil';

import MoreButton from 'pages/@components/button/MoreButton';
import VideoSearchParams from './SearchParams';
import VideoItem from './VideoItem';
import { videoListSelector, videoListState, videoListParams } from './state';
import SearchCount from 'pages/@components/text/SearchCount';

const Inner = () => {
  const { breakpoints } = useTheme();
  const [params, setParams] = useRecoilState(videoListParams);
  const [loadable, setVideoList] = useRecoilStateLoadable(videoListSelector);
  const videos = useRecoilValue(videoListState);
  const isDownXs = useMediaQuery(breakpoints.down('xs'));
  const isUpLg = useMediaQuery(breakpoints.up('lg'));
  const count = React.useMemo(
    () =>
      loadable.state === 'hasValue' ? loadable.contents.body?.count || 0 : 0,
    [loadable.contents.body?.count, loadable.state],
  );

  React.useEffect(() => {
    if (loadable.state === 'hasValue') {
      setVideoList((cur) => cur);
    }
  }, [loadable.state, setVideoList]);

  const galleryPics = React.useMemo(
    () =>
      videos.map((item) => ({
        width: 1280,
        // height: 720
        height: 900,
        src: item.thumbFilePath || '',
        key: `${item.contType}-${item.contId}`,
      })),
    [videos],
  );

  const renderItem = React.useCallback(
    (targetProps: RenderImageProps) => {
      const origin = videos[targetProps.index];

      if (origin) {
        return (
          <VideoItem
            key={`video-${targetProps.index}`}
            direction="row"
            targetProps={targetProps}
            highlight={params.keyword}
            {...origin}
          />
        );
      }

      return null;
    },
    [params.keyword, videos],
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper
          sx={{
            px: 4,
          }}
        >
          <VideoSearchParams />
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

const VideoList = () => (
  <RecoilRoot>
    <Inner />
  </RecoilRoot>
);

export default VideoList;
