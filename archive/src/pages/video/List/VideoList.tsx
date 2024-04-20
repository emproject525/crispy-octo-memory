import React from 'react';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
} from 'recoil';

import { IContVideoParams } from '@types';
import MoreButton from 'pages/@components/button/MoreButton';
import SearchCount from 'pages/@components/text/SearchCount';
import MiniTitle from 'components/Text/MiniTitle';
import VideoSearchParams from './SearchParams';
import VideoItem from './VideoItem';
import { videoListResponse, videoListState, videoParamsState } from './state';

export type VideoListProps = {
  /**
   * 검색 기능 막기
   */
  suppressSearch?: boolean;
  /**
   * 더보기 기능 막기
   */
  suppressMoreButton?: boolean;
  /**
   * 타이틀
   */
  title?: string;
  /**
   * 목록 한 페이지 개수
   */
  size?: IContVideoParams['size'];
  /**
   * 한 Row의 개수 (정확한 계산 X)
   */
  rowCount?: number;
};

const Inner = ({
  size,
  suppressMoreButton,
  suppressSearch,
  title,
  rowCount,
}: VideoListProps) => {
  const { breakpoints } = useTheme();
  const [params, setParams] = useRecoilState(
    videoParamsState({
      size,
    }),
  );
  const [loadable, changeListState] = useRecoilStateLoadable(
    videoListResponse({
      size,
    }),
  );
  const videos = useRecoilValue(videoListState);
  const isDownXs = useMediaQuery(breakpoints.down('xs'));
  const isUpLg = useMediaQuery(breakpoints.up('lg'));
  const count = React.useMemo(
    () => (loadable.state === 'hasValue' ? loadable.contents.count || 0 : 0),
    [loadable.contents.count, loadable.state],
  );

  React.useEffect(() => {
    if (loadable.state === 'hasValue') {
      changeListState((cur) => cur);
    }
  }, [changeListState, loadable.state]);

  // react-photo-gallery
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

  // react-photo-gallery component
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
    <Paper
      sx={{
        px: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {title && (
        <MiniTitle
          text={title}
          sx={{
            mb: 3,
          }}
        />
      )}

      {!suppressSearch && (
        <>
          <VideoSearchParams
            disabled={loadable.state === 'loading'}
            searchParams={params}
            changeParams={(newParams) =>
              setParams((before) => ({
                ...before,
                ...newParams,
              }))
            }
          />
          <SearchCount count={count} />
        </>
      )}

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
            targetRowHeight={rowCount || isDownXs ? 1 : isUpLg ? 4 : 2}
            limitNodeSearch={rowCount || isDownXs ? 1 : isUpLg ? 4 : 2}
          />
        </Box>
      )}

      {!suppressMoreButton && (
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
      )}
    </Paper>
  );
};

const VideoList = (props: VideoListProps) => (
  <RecoilRoot>
    <Inner {...props} />
  </RecoilRoot>
);

export default VideoList;
