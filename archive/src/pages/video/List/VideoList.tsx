import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
} from 'recoil';

import VideoItem from './VideoItem';
import { videoListSelector, videoListState, videoListParams } from '../state';
import MoreButton from 'pages/@components/button/MoreButton';

const Inner = () => {
  const [params, setParams] = useRecoilState(videoListParams);
  const [loadable, setVideoList] = useRecoilStateLoadable(videoListSelector);
  const videos = useRecoilValue(videoListState);
  const { breakpoints } = useTheme();
  const isDownXs = useMediaQuery(breakpoints.down('xs'));
  const isUpLg = useMediaQuery(breakpoints.up('lg'));

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
        src: item.thumbFilePath,
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
            {...origin}
          />
        );
      }

      return null;
    },
    [videos],
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

const VideoList = () => (
  <RecoilRoot>
    <Inner />
  </RecoilRoot>
);

export default VideoList;
