import { Box, Paper } from '@mui/material';
import React from 'react';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
} from 'recoil';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import MoreButton from 'pages/@components/button/MoreButton';

import { photoListState, photoParamsState, photoListResponse } from './state';
import PhotoItem from './PhotoItem';
import PhotoSearchParams from './SearchParams';
import SearchCount from 'pages/@components/text/SearchCount';
import { IContPhotoParams } from '@types';
import MiniTitle from 'components/Text/MiniTitle';

export type PhotoListProps = {
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
  size?: IContPhotoParams['size'];
};

const Inner = ({
  title,
  suppressMoreButton,
  suppressSearch,
  size,
}: PhotoListProps) => {
  const [params, setParams] = useRecoilState(
    photoParamsState({
      size,
    }),
  );
  const [loadable, changeListState] = useRecoilStateLoadable(
    photoListResponse({
      size,
    }),
  );
  const photos = useRecoilValue(photoListState);
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
      photos.map((item) => ({
        width: item.width || 1,
        height: item.height ? item.height + 46 : item.height || 1,
        src: item.filePath || '',
        key: `${item.contType}-${item.contId}`,
      })),
    [photos],
  );

  // react-photo-gallery component
  const renderImage = React.useCallback(
    (renderImageProps: RenderImageProps) => {
      const originPhoto = photos[renderImageProps.index];

      if (originPhoto) {
        return (
          <PhotoItem
            key={`photo-${renderImageProps.index}`}
            direction="column"
            targetProps={renderImageProps}
            highlight={params.keyword}
            {...originPhoto}
          />
        );
      }

      return null;
    },
    [params.keyword, photos],
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
          <PhotoSearchParams
            disabled={loadable.state === 'loading'}
            searchParams={params}
            changeParams={(newParams) =>
              setParams((b) => ({
                ...b,
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
            width: 'calc(100% + 6px)',
            marginLeft: '-3px',
          }}
        >
          <Gallery
            margin={6}
            photos={galleryPics}
            direction="column"
            renderImage={renderImage}
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

const PhotoList = (props: PhotoListProps) => (
  <RecoilRoot>
    <React.Suspense fallback={<>Loading...</>}>
      <Inner {...props} />
    </React.Suspense>
  </RecoilRoot>
);

export default PhotoList;
