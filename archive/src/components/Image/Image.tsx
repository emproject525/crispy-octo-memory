import React from 'react';
import { Box, IconButton, Skeleton, useTheme } from '@mui/material';
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
  }
>(({ absolute, src, alt, width, height, supressZoom }, ref) => {
  const [onload, setOnload] = React.useState(true);
  const { palette, spacing } = useTheme();

  return (
    <Box
      ref={ref}
      position="relative"
      width={width}
      height={height}
      sx={{
        background: `linear-gradient(90deg, ${palette.grey[600]} ${spacing(
          3,
        )}, transparent 1%) center, linear-gradient(${
          palette.grey[600]
        }  ${spacing(3)}, transparent 1%) center, ${palette.grey[500]};`,
        backgroundSize: `${spacing(4)} ${spacing(4)}`,
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
