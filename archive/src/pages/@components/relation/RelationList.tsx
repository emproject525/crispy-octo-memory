import React from 'react';
import { PhotoProps, RenderImageProps } from 'react-photo-gallery';
import {
  Box,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

import { ContType } from 'archive-types';
import {
  IContAudio,
  IContPhoto,
  IContText,
  IContVideo,
  RelationType,
} from '@types';

import PhotoItem from 'pages/photo/List/PhotoItem';
import VideoItem from 'pages/video/List/VideoItem';
import AudioItem from 'pages/audio/List/AudioItem';
import MiniTitle from 'components/Text/MiniTitle';
import TextItemHead from 'pages/text/List/TextItemHead';
import TextItemRow from 'pages/text/List/TextItemRow';

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

  // 타입별 관련데이터
  const relsByType: Record<ContType, RelationType[]> = React.useMemo(
    () => ({
      P: relations.filter((item) => item.contType === 'P'),
      V: relations.filter((item) => item.contType === 'V'),
      A: relations.filter((item) => item.contType === 'A'),
      T: relations.filter((item) => item.contType === 'T'),
    }),
    [relations],
  );

  // 타입별 이미지
  const picsByType: Record<ContType, PhotoProps[]> = React.useMemo(
    () => ({
      P: relsByType.P.map((item) => {
        const parsed = item as IContPhoto;
        return {
          width,
          height: Math.floor((width * 9) / 16) + 46,
          alt: parsed.title,
          src: `http://localhost:8080${parsed.filePath}`,
          key: `${item.contType}-rel-${item.contId}`,
        };
      }),
      V: relsByType.V.map((item) => {
        const parsed = item as IContVideo;
        return {
          width,
          height: Math.floor((width * 9) / 16) + 46,
          alt: parsed.fileName,
          src:
            parsed.mediaType === '00'
              ? `http://localhost:8080${parsed.thumbFilePath}`
              : parsed.thumbFilePath || '',
          key: `${item.contType}-rel-${item.contId}`,
        };
      }),
      A: relsByType.A.map((item) => {
        const parsed = item as IContAudio;
        return {
          width,
          height: Math.floor((width * 9) / 16) + 46,
          alt: parsed.fileName,
          src: (parsed.thumbFilePath || '').startsWith('http')
            ? parsed.thumbFilePath || ''
            : `http://localhost:8080${parsed.thumbFilePath}`,
          key: `${item.contType}-rel-${item.contId}`,
        };
      }),
      T: [],
    }),
    [relsByType, width],
  );

  const boxRefCallback = React.useCallback((ele: HTMLDivElement | null) => {
    if (ele) {
      const observer = new ResizeObserver((entries) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      const origin = relsByType[contType]?.[targetProps.index];

      if (contType === 'V') {
        const parsed = origin as IContVideo;

        return (
          <VideoItem
            relItem
            key={`${contType}-rel-${targetProps.index}`}
            direction="row"
            targetProps={targetProps}
            {...parsed}
          />
        );
      } else if (contType === 'A') {
        const parsed = origin as IContAudio;

        return (
          <AudioItem
            relItem
            key={`${contType}-rel-${targetProps.index}`}
            direction="row"
            targetProps={targetProps}
            {...parsed}
          />
        );
      } else {
        const parsed = origin as IContPhoto;

        return (
          <PhotoItem
            relItem
            key={`${contType}-rel-${targetProps.index}`}
            direction="row"
            targetProps={targetProps}
            {...parsed}
          />
        );
      }
    },
    [relsByType],
  );

  return (
    <>
      <Grid item xs={12}>
        <Box px={4}>
          <MiniTitle
            text="관련 사진"
            startAdornment={
              <PhotoLibraryIcon
                sx={{
                  fontSize: 14,
                }}
              />
            }
          />
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
          {picsByType.P.map((item, index) =>
            renderItem('P', {
              direction: 'row',
              index,
              onClick: () => {},
              photo: item,
              margin: '0px',
            }),
          )}
          {picsByType.P.length === 0 && <NoRelations />}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box px={4}>
          <MiniTitle
            text="관련 문서"
            startAdornment={
              <FeedRoundedIcon
                sx={{
                  fontSize: 14,
                }}
              />
            }
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={4} ref={boxRefCallback}>
          {relsByType.T.length > 0 && (
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{
                p: 0,
                bgcolor: 'transparent',
              }}
              square
            >
              <Table>
                <TextItemHead
                  useCheckboxCell={false}
                  indeterminate={false}
                  checked={false}
                  onCheck={() => {}}
                />
                <TableBody>
                  {relsByType.T.map((item) => (
                    <TextItemRow
                      relItem
                      useCheckboxCell={false}
                      key={`rel-content-text-${item.contId}`}
                      checked={false}
                      onCheck={() => {}}
                      {...(item as IContText)}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {relsByType.T.length === 0 && <NoRelations />}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box px={4}>
          <MiniTitle
            text="관련 영상"
            startAdornment={
              <VideoLibraryIcon
                sx={{
                  fontSize: 14,
                }}
              />
            }
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={4} display="flex" gap={2} flexWrap="nowrap">
          {picsByType.V.map((item, index) =>
            renderItem('V', {
              direction: 'row',
              index,
              onClick: () => {},
              photo: item,
              margin: '0px',
            }),
          )}
          {picsByType.V.length === 0 && <NoRelations />}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box px={4}>
          <MiniTitle
            text="관련 오디오"
            startAdornment={
              <LibraryMusicIcon
                sx={{
                  fontSize: 14,
                }}
              />
            }
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={4} display="flex" gap={2} flexWrap="nowrap">
          {picsByType.A.map((item, index) =>
            renderItem('A', {
              direction: 'row',
              index,
              onClick: () => {},
              photo: item,
              margin: '0px',
            }),
          )}
          {picsByType.A.length === 0 && <NoRelations />}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={4} mt={4} />
      </Grid>
    </>
  );
};

export default RelationList;
