import React from 'react';
import { Box, BoxProps, IconButton, Skeleton } from '@mui/material';
import CropFreeIcon from '@mui/icons-material/CropFree';

/**
 * <img /> 대체 컴포넌트
 */
const Image = React.forwardRef<
  HTMLDivElement,
  {
    // 도메인 붙은 전체 경로
    src: string;
    alt: string;
    // 이미지를 absolute로 영역에 맞출지
    absolute?: boolean;
    width?: React.CSSProperties['width'];
    height?: React.CSSProperties['height'];
    // 확대 기능 막기
    supressZoom?: boolean;
    boxSx?: BoxProps['sx'];
  }
>(({ absolute, src, alt, width, height, supressZoom, boxSx }, ref) => {
  const [onload, setOnload] = React.useState(true);

  return (
    <Box
      ref={ref}
      position="relative"
      width={width}
      height={height}
      sx={{
        // background: `linear-gradient(90deg, #47516b 14px, transparent 1%) center, linear-gradient(#47516b 14px, transparent 1%) center, #505050;`,
        // backgroundSize: `${spacing(4)} ${spacing(4)}`,
        // background: 'linear-gradient(to right, #47516b, #323846)',
        // background: `url(${bgimg})`,
        // backgroundSize: 'cover',
        backgroundColor: '#141414',
        ...boxSx,
      }}
    >
      {onload && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 1,
            bgcolor: 'grey.300',
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={(evt) => {
          if (evt.currentTarget.src === src && evt.currentTarget.complete) {
            setOnload(false);
          } else {
            setTimeout(() => {
              setOnload(false);
            }, 3000);
          }
        }}
        style={{
          display: 'block',
          margin: 0,
          padding: 0,
          ...(absolute && {
            position: 'absolute',
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            margin: 'auto',
            inset: 0,
          }),
        }}
        onError={() => {
          setOnload(false);
        }}
      />
      {!supressZoom && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            top: 8,
            right: 8,
          }}
        >
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(src);
            }}
          >
            <CropFreeIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
});

Image.displayName = 'Image';

export default Image;
