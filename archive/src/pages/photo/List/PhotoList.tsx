import { Grid, Paper } from '@mui/material';
import React from 'react';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
} from 'recoil';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import MoreButton from 'pages/@components/button/MoreButton';

import { photoListSelector, photoListParams, photoListState } from '../state';
import PhotoItem from './PhotoItem';

const Inner = () => {
  const [params, setParams] = useRecoilState(photoListParams);
  const [loadable, setPhotoList] = useRecoilStateLoadable(photoListSelector);
  const photos = useRecoilValue(photoListState);

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
        <Paper>상태 검색</Paper>
      </Grid>
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
              direction="column"
              renderImage={renderImage}
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

const PhotoList = () => (
  <RecoilRoot>
    <React.Suspense fallback={<>Loading...</>}>
      <Inner />
    </React.Suspense>
  </RecoilRoot>
);

export default PhotoList;
