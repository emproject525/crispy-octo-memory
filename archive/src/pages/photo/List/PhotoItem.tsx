import React from 'react';
import { IContPhoto } from '@types';
import { RenderImageProps } from 'react-photo-gallery';
import { Box, Typography, useTheme, alpha, Divider } from '@mui/material';
import Archived from 'pages/@components/statusIcon/Archived';
import Disallowed from 'pages/@components/statusIcon/Disallowed';
import DraggablePaper, { clickTrigger } from 'components/DraggablePaper';
import Image from 'components/Image';
import { getHighlight } from 'utils/utils';
import PhotoDetail from '../Detail';

export type PhotoItemProps = {
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
} & IContPhoto;

/**
 * 사진 아이템 1개
 * @param props PhotoItemProps
 * @returns JSX.Element
 */
const PhotoItem = (props: PhotoItemProps): JSX.Element => {
  const {
    direction,
    contType,
    contId,
    title,
    width,
    height,
    dpi,
    archStatus,
    permissionYn,
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
          width: photo.width,
          height: photo.height,
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
          // border={`1px solid ${theme.palette.divider}`}
        >
          <Image
            width="100%"
            height="100%"
            src={photo.src}
            alt={photo.alt || title || ''}
            absolute={!isColumnPic}
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
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              height={16}
            >
              <Typography
                variant="fs12"
                color="grey.600"
                sx={{
                  userSelect: 'none',
                }}
              >{`${width || 0}x${height || 0}`}</Typography>
              <Divider
                flexItem
                orientation="vertical"
                sx={{
                  height: 14,
                }}
              />
              <Typography
                variant="fs12"
                color="grey.600"
                sx={{
                  userSelect: 'none',
                }}
              >
                {`${dpi || 72}dpi`}
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
          <PhotoDetail contId={contId} highlight={highlight} />
        </DraggablePaper>
      )}
    </React.Fragment>
  );
};

export default PhotoItem;
