/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { PhotoProps, RenderImageProps } from 'react-photo-gallery';
import { Box, Divider, Grid, Typography } from '@mui/material';
import {
  ContType,
  IContAudio,
  IContPhoto,
  IContVideo,
  RelationType,
} from 'dto';
import PhotoItem from 'pages/photo/List/PhotoItem';
import VideoItem from 'pages/video/List/VideoItem';
import AudioItem from 'pages/audio/List/AudioItem';
import MiniTitle from 'components/Text/MiniTitle';

const NoRelations = () => (
  <Typography
    component="div"
    variant="fs13"
    textAlign="center"
    width="100%"
    py={3}
    color="grey.600"
    bgcolor="rgba(0, 0, 0, 0.25)"
    sx={{
      userSelect: 'none',
    }}
  >
    관련 컨텐츠가 없습니다.
  </Typography>
);

/**
 * 관련 아이템
 */
const RelationList = ({ relations }: { relations: RelationType[] }) => {
  const [width, setWidth] = React.useState(300);
  const relationsByContType: Record<ContType, RelationType[]> = React.useMemo(
    () => ({
      P: relations.filter((item) => item.contType === 'P'),
      V: relations.filter((item) => item.contType === 'V'),
      A: relations.filter((item) => item.contType === 'A'),
      G: relations.filter((item) => item.contType === 'G'),
      T: relations.filter((item) => item.contType === 'T'),
    }),
    [relations],
  );
  const galleryPics: Record<ContType, PhotoProps[]> = React.useMemo(
    () => ({
      P: relationsByContType.P.map((item) => {
        const parsed = item as IContPhoto;
        return {
          width,
          height: Math.floor((width * 9) / 16) + 46,
          alt: parsed.title,
          src: `http://localhost:8080${item.filePath}`,
          key: `${item.contType}-${item.contId}`,
        };
      }),
      V: relationsByContType.V.map((item) => {
        const parsed = item as IContVideo;
        return {
          width,
          height: Math.floor((width * 9) / 16) + 46,
          alt: parsed.fileName,
          src:
            parsed.mediaType === '00'
              ? `http://localhost:8080${parsed.thumbFilePath}`
              : parsed.thumbFilePath,
          key: `${item.contType}-${item.contId}`,
        };
      }),
      A: relationsByContType.A.map((item) => {
        const parsed = item as IContAudio;
        return {
          width,
          height: Math.floor((width * 9) / 16) + 46,
          alt: parsed.fileName,
          src: parsed.thumbFilePath.startsWith('http')
            ? parsed.thumbFilePath
            : `http://localhost:8080${parsed.thumbFilePath}`,
          key: `${item.contType}-${item.contId}`,
        };
      }),
      G: [],
      T: [],
    }),
    [relationsByContType, width],
  );
  const boxRefCallback = React.useCallback((ele: HTMLDivElement | null) => {
    if (ele) {
      const observer = new ResizeObserver((entries) => {
        for (const _entry of entries) {
          const { width: w } = ele.getBoundingClientRect();
          setWidth(Math.floor((w - 2 * 8 - 16 * 2) / 3));
        }
      });
      observer.observe(ele);
    }
  }, []);

  /**
   * 아이템 => 컨텐츠 렌더링
   */
  const renderItem = React.useCallback(
    (contType: ContType, targetProps: RenderImageProps) => {
      const origin = relationsByContType[contType]?.[targetProps.index];

      if (contType === 'V') {
        const parsed = origin as IContVideo;

        return (
          <VideoItem
            key={`video-${targetProps.index}`}
            direction="row"
            targetProps={targetProps}
            {...parsed}
          />
        );
      } else if (contType === 'A') {
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
    [relationsByContType],
  );

  return (
    <>
      <Grid item xs={12}>
        <Box px={4}>
          <MiniTitle text="관련 사진" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          px={4}
          display="flex"
          gap={2}
          flexWrap="nowrap"
          ref={boxRefCallback}
        >
          {galleryPics.P.map((item, index) =>
            renderItem('P', {
              direction: 'row',
              index,
              onClick: () => {},
              photo: item,
              margin: '0px',
            }),
          )}
          {galleryPics.P.length === 0 && <NoRelations />}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box px={4}>
          <MiniTitle text="관련 영상" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={4} display="flex" gap={2} flexWrap="nowrap">
          {galleryPics.V.map((item, index) =>
            renderItem('V', {
              direction: 'row',
              index,
              onClick: () => {},
              photo: item,
              margin: '0px',
            }),
          )}
          {galleryPics.V.length === 0 && <NoRelations />}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box px={4}>
          <MiniTitle text="관련 오디오" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={4} display="flex" gap={2} flexWrap="nowrap">
          {galleryPics.A.map((item, index) =>
            renderItem('A', {
              direction: 'row',
              index,
              onClick: () => {},
              photo: item,
              margin: '0px',
            }),
          )}
          {galleryPics.A.length === 0 && <NoRelations />}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={4} mt={4} />
      </Grid>
    </>
  );
};

export default RelationList;
