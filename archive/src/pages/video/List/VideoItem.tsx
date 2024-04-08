import React from 'react';
import { IContVideo } from '@types';
import { RenderImageProps } from 'react-photo-gallery';
import { alpha, Box, Typography, useTheme } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import DraggablePaper, { clickTrigger } from 'components/DraggablePaper';
import Image from 'components/Image';
import Archived from 'pages/@components/statusIcon/Archived';
import Disallowed from 'pages/@components/statusIcon/Disallowed';
import { getHighlight, secondsToTimeText } from 'utils/utils';
import VideoDetail from '../Detail';

export type VideoItemProps = {
  targetProps: RenderImageProps;
  direction: 'row' | 'column';
  /**
   * 하이라이트 키워드
   */
  highlight?: string;
  /**
   * 관련 아이템 여부
   */
  relItem?: boolean;
} & IContVideo;

/**
 * 영상 아이템 1개
 * @param props VideoItemProps
 * @returns JSX.Element
 */
const VideoItem = (props: VideoItemProps): JSX.Element => {
  const {
    direction,
    contType,
    contId,
    title,
    mediaType,
    format,
    archStatus,
    permissionYn,
    duration,
    highlight,
    relItem,
  } = props;
  const { index, margin, photo, left, top } = props.targetProps;
  const theme = useTheme();
  const id = React.useMemo(() => `${contType}-${contId}`, [contId, contType]);
  const isColumnPic = React.useMemo(() => direction === 'column', [direction]);

  //  hover 체크
  const [hovered, setHovered] = React.useState(false);

  // 상세 dialog 오픈
  const [open, setOpen] = React.useState(false);

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
        onClick={(e) => {
          const ele = document.getElementById(id);
          if (ele) {
            e.preventDefault();
            e.stopPropagation();
            if (relItem) {
              ele.dispatchEvent(clickTrigger);
            } else {
              ele.click();
            }
          } else {
            setOpen(true);
          }
        }}
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
                inset: 0,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <YouTubeIcon
                sx={{
                  color: '#c4302b',
                  fontSize: '2.5rem',
                }}
              />
            </Box>
          )}
          {mediaType === '00' && (
            <Box
              position="absolute"
              sx={{
                inset: 0,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PlayCircleRoundedIcon
                sx={{
                  fontSize: '2.5rem',
                }}
              />
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
              __html: getHighlight(title || '', highlight) || '&nbsp;',
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

      {contId && (
        <DraggablePaper
          open={open}
          onClose={() => setOpen(false)}
          handleId={id}
          sx={{
            width: 600,
          }}
        >
          <VideoDetail contId={contId} highlight={highlight} />
        </DraggablePaper>
      )}
    </React.Fragment>
  );
};

export default VideoItem;
