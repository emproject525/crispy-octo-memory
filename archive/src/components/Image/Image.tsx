import React from 'react';
import { Box, IconButton, Skeleton } from '@mui/material';
import CropFreeIcon from '@mui/icons-material/CropFree';

const Image = React.forwardRef<
  HTMLDivElement,
  {
    // 도메인 붙은 전체 경로
    src: string;
    alt: string;
    width?: React.CSSProperties['width'];
    height?: React.CSSProperties['height'];
  }
>(({ src, alt, width, height }, ref) => {
  const [onload, setOnload] = React.useState(true);

  return (
    <Box ref={ref} position="relative" width={width} height={height}>
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
        onError={() => {
          setOnload(false);
        }}
      />
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
    </Box>
  );
});

Image.displayName = 'Image';

export default Image;
