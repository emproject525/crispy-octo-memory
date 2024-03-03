import React from 'react';
import { IContVideo } from 'dto';
import { RenderImageProps } from 'react-photo-gallery';
import { alpha, Box, Typography, useTheme } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';

import Image from 'components/Image';
import Archived from 'pages/@components/statusIcon/Archived';
import Disallowed from 'pages/@components/statusIcon/Disallowed';
import VideoDetailDialog from '../Detail/VideoDetailDialog';
import { secondsToTimeText } from 'utils/utils';

const VideoItem = (
  props: {
    targetProps: RenderImageProps;
    direction: 'row' | 'column';
  } & IContVideo,
) => {
  const {
    direction,
    contId,
    title,
    mediaType,
    format,
    archStatus,
    permissionYn,
    duration,
  } = props;
  const { index, margin, photo, left, top } = props.targetProps;
  const theme = useTheme();
  const isColumnPic = React.useMemo(() => direction === 'column', [direction]);

  //  hover 체크
  const [hovered, setHovered] = React.useState(false);

  // 상세 dialog 오픈
  const [openDetail, setOpenDetail] = React.useState(false);

  //  HTML 제거한 타이틀
  const plainTitle = React.useMemo(() => {
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', title || '');
    return div.innerText;
  }, [title]);

  return (
    <React.Fragment key={photo.key}>
      <Box
        id={`item${index}`}
        style={{
          margin,
          height: photo.height,
          width: photo.width,
          ...(isColumnPic && {
            position: 'absolute',
            left,
            top,
          }),
        }}
        sx={{
          caretColor: 'transparent',
          cursor: 'pointer',
          overflow: 'hidden',
          ...(hovered && {
            transition: 'none 400s ease 400s',
            boxShadow: `0 0 0 3px ${alpha(theme.palette.success.main, 0.6)}`,
          }),
        }}
        onClick={() => setOpenDetail(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Box
          height="calc(100% - 46px)"
          position="relative"
          id={`item${index}-image`}
        >
          {mediaType === '01' && (
            <Box
              position="absolute"
              sx={{
                top: 12,
                right: 12,
                zIndex: 1,
              }}
            >
              <YouTubeIcon
                sx={{
                  color: '#c4302b',
                }}
              />
            </Box>
          )}
          {mediaType === '00' && (
            <Box
              position="absolute"
              sx={{
                top: 12,
                right: 12,
                zIndex: 1,
              }}
            >
              <PlayCircleRoundedIcon />
            </Box>
          )}
          {mediaType === '00' && (
            <Typography
              variant="fs11"
              component="div"
              sx={{
                position: 'absolute',
                left: 12,
                bottom: 8,
                zIndex: 1,
                borderRadius: 2,
                bgcolor: 'rgba(0, 0, 0, 0.35)',
                px: 2,
                lineHeight: '18px',
              }}
            >
              {secondsToTimeText(duration || 0)}
            </Typography>
          )}
          <Image
            width="100%"
            height="100%"
            absolute={!isColumnPic}
            supressZoom
            src={photo.src}
            alt={photo.alt || title || ''}
          />
        </Box>
        <Box height={46} pt={1} px={1}>
          <Typography
            component="p"
            variant="fs13"
            aria-label={`item${index}`}
            whiteSpace="nowrap"
            overflow="hidden"
            width="100%"
            textOverflow="ellipsis"
            title={plainTitle}
            dangerouslySetInnerHTML={{
              __html: title || '&nbsp;',
            }}
            sx={{
              userSelect: 'none',
            }}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="fs12" color="grey.600">
                {mediaType === '00'
                  ? format?.toLocaleUpperCase() || ''
                  : mediaType === '01'
                    ? '유튜브'
                    : ''}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" gap={0.5}>
              {archStatus === '99' && <Archived />}
              {permissionYn === 'N' && <Disallowed />}
            </Box>
          </Box>
        </Box>
      </Box>

      <VideoDetailDialog
        open={openDetail}
        contId={contId}
        onClose={() => setOpenDetail(false)}
      />
    </React.Fragment>
  );
};

export default VideoItem;
