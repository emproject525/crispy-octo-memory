import { IContPhoto } from 'dto';
import React from 'react';
import { RenderImageProps } from 'react-photo-gallery';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import Archived from 'pages/@components/statusIcon/Archived';

import Image from 'components/Image';
import PhotoDetailDialog from '../Detail/PhotoDetailDialog';

const PhotoItem = (
  props: {
    renderImageProps: RenderImageProps;
  } & IContPhoto,
) => {
  const { contId, title, width, height, dpi, archStatus } = props;
  const { index, margin, photo, left, top } = props.renderImageProps;
  const theme = useTheme();

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

  //   컨텐츠 정보
  const shortInfo = React.useMemo(() => {
    const texts: string[] = [];

    if (width && height) {
      texts.push(`${Math.ceil(Number(width))}*${Math.ceil(Number(height))}`);
    }

    if (dpi) {
      texts.push(`${dpi}dpi`);
    }

    return texts.join(' ');
  }, [width, height, dpi]);

  return (
    <React.Fragment key={photo.key}>
      <Box
        id={`item${index}`}
        style={{
          position: 'absolute',
          margin,
          left,
          top,
          height: photo.height,
          width: photo.width,
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
          // border={`1px solid ${theme.palette.divider}`}
        >
          <Image
            width="100%"
            height="100%"
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
          <Box display="flex" justifyContent="space-between">
            <Typography
              component="p"
              variant="fs12"
              color="grey.600"
              sx={{
                userSelect: 'none',
              }}
            >
              {shortInfo}
            </Typography>
            {archStatus === '99' && <Archived />}
          </Box>
        </Box>
      </Box>

      <PhotoDetailDialog
        open={openDetail}
        contId={contId}
        onClose={() => setOpenDetail(false)}
      />
    </React.Fragment>
  );
};

export default PhotoItem;