import React from 'react';
import { Paper, useTheme, useMediaQuery, Box } from '@mui/material';
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
import { audioListResponse, audioListState, audioParamsState } from './state';
import SearchCount from 'pages/@components/text/SearchCount';
import { IContAudioParams } from '@types';
import MiniTitle from 'components/Text/MiniTitle';

export type AudioListProps = {
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
  size?: IContAudioParams['size'];
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
}: AudioListProps) => {
  const { breakpoints } = useTheme();
  const [params, setParams] = useRecoilState(
    audioParamsState({
      size,
    }),
  );
  const [loadable, changeListState] = useRecoilStateLoadable(
    audioListResponse({
      size,
    }),
  );
  const audios = useRecoilValue(audioListState);
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
      audios.map((item) => ({
        width: 1280,
        height: 900,
        src: item.thumbFilePath || '',
        key: `${item.contType}-${item.contId}`,
      })),
    [audios],
  );

  // react-photo-gallery component
  const renderItem = React.useCallback(
    (targetProps: RenderImageProps) => {
      const origin = audios[targetProps.index];

      if (origin) {
        return (
          <AudioItem
            key={`audio-${targetProps.index}`}
            direction="row"
            targetProps={targetProps}
            highlight={params.keyword}
            {...origin}
          />
        );
      }

      return null;
    },
    [audios, params.keyword],
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
          <AudioSearchParams
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

const AudioList = (props: AudioListProps) => (
  <RecoilRoot>
    <Inner {...props} />
  </RecoilRoot>
);

export default AudioList;
