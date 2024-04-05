import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
} from 'recoil';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import MoreButton from 'pages/@components/button/MoreButton';

import { photoListSelector, photoListParams, photoListState } from './state';
import PhotoItem from './PhotoItem';
import PhotoSearchParams from './SearchParams';
import SearchCount from 'pages/@components/text/SearchCount';

const Inner = () => {
  const [params, setParams] = useRecoilState(photoListParams);
  const [loadable, setPhotoList] = useRecoilStateLoadable(photoListSelector);
  const photos = useRecoilValue(photoListState);
  const count = React.useMemo(
    () =>
      loadable.state === 'hasValue' ? loadable.contents.body?.count || 0 : 0,
    [loadable.contents.body?.count, loadable.state],
  );

  React.useEffect(() => {
    if (loadable.state === 'hasValue') {
      setPhotoList((cur) => cur);
    }
  }, [loadable.state, setPhotoList]);

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

  const renderImage = React.useCallback(
    (renderImageProps: RenderImageProps) => {
      const originPhoto = photos[renderImageProps.index];

      if (originPhoto) {
        return (
          <PhotoItem
            key={`photo-${renderImageProps.index}`}
            direction="column"
            targetProps={renderImageProps}
            {...originPhoto}
          />
        );
      }

      return null;
    },
    [photos],
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper
          sx={{
            px: 4,
          }}
        >
          <PhotoSearchParams />
          <SearchCount count={count} />
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

const PhotoList = () => (
  <RecoilRoot>
    <React.Suspense fallback={<>Loading...</>}>
      <Inner />
    </React.Suspense>
  </RecoilRoot>
);

export default PhotoList;
