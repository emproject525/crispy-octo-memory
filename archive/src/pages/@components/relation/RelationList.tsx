import { Typography } from '@mui/material';
import { IContAudio, IContPhoto, IContVideo, RelationType } from 'dto';
import PhotoItem from 'pages/photo/List/PhotoItem';
import VideoItem from 'pages/video/List/VideoItem';
import AudioItem from 'pages/audio/List/AudioItem';
import React from 'react';
import Gallery, { PhotoProps, RenderImageProps } from 'react-photo-gallery';

/**
 * 관련 아이템 -> Gallery로 표현
 */
const RelationList = ({ relations }: { relations: RelationType[] }) => {
  const galleryPics: PhotoProps[] = React.useMemo(
    () =>
      relations.map((item) => {
        if (item.contType === 'V') {
          const parsed = item as IContVideo;
          return {
            width: 1280,
            height: 900,
            alt: parsed.fileName,
            src:
              parsed.mediaType === '00'
                ? `http://localhost:8080${parsed.thumbFilePath}`
                : parsed.thumbFilePath,
            key: `${item.contType}-${item.contId}`,
          };
        } else if (item.contType === 'A') {
          const parsed = item as IContAudio;
          return {
            width: 1280,
            height: 900,
            alt: parsed.fileName,
            src: parsed.thumbFilePath,
            key: `${item.contType}-${item.contId}`,
          };
        } else {
          const parsed = item as IContPhoto;
          return {
            // width: parsed.width || 16,
            // height: parsed.height || 9,
            width: 1280,
            height: 900,
            alt: parsed.title,
            src: `http://localhost:8080${item.filePath}`,
            key: `${item.contType}-${item.contId}`,
          };
        }
      }),
    [relations],
  );

  const renderItem = React.useCallback(
    (targetProps: RenderImageProps) => {
      const origin = relations[targetProps.index];

      if (origin.contType === 'V') {
        const parsed = origin as IContVideo;

        return (
          <VideoItem
            key={`video-${targetProps.index}`}
            direction="row"
            targetProps={targetProps}
            {...parsed}
          />
        );
      } else if (origin.contType === 'A') {
        const parsed = origin as IContAudio;

        return (
          <AudioItem
            key={`audio-${targetProps.index}`}
            direction="row"
            targetProps={targetProps}
            {...parsed}
          />
        );
      } else {
        const parsed = origin as IContPhoto;

        return (
          <PhotoItem
            key={`photo-${targetProps.index}`}
            direction="row"
            targetProps={targetProps}
            {...parsed}
          />
        );
      }
    },
    [relations],
  );

  if (relations.length < 1) {
    return (
      <Typography
        component="div"
        variant="fs13"
        textAlign="center"
        px={4}
        py={3}
        fontWeight="bold"
        color="grey.600"
        bgcolor="rgba(0, 0, 0, 0.25)"
      >
        관련 컨텐츠가 없습니다.
      </Typography>
    );
  }

  return (
    <Gallery
      margin={4}
      photos={galleryPics}
      direction="row"
      targetRowHeight={3}
      limitNodeSearch={3}
      renderImage={renderItem}
    />
  );
};

export default RelationList;
