import React from 'react';
import { Box } from '@mui/material';

import { IContPhotoParams } from '@types';

import ImgType from 'pages/@components/searchParams/ImgType';
import ShootType from 'pages/@components/searchParams/ShootType';
import StartEndDt from 'pages/@components/searchParams/StartEndDt';
import Keyword from 'pages/@components/searchParams/Keyword';

const PhotoSearchParams = ({
  searchParams,
  changeParams,
  disabled,
}: {
  searchParams: IContPhotoParams;
  changeParams: (newParams: Partial<IContPhotoParams>) => void;
  disabled?: boolean;
}) => (
  <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
    <ImgType
      disabled={disabled}
      value={searchParams.imgType || ''}
      onChange={(imgType) =>
        changeParams({
          page: 1,
          imgType,
        })
      }
    />
    <ShootType
      disabled={disabled}
      value={searchParams.shootType || ''}
      onChange={(shootType) =>
        changeParams({
          page: 1,
          shootType,
        })
      }
    />
    <StartEndDt
      disabled={disabled}
      startDt={searchParams.startDt}
      endDt={searchParams.endDt}
      onChange={(dates) =>
        changeParams({
          page: 1,
          startDt: dates[0],
          endDt: dates[1],
        })
      }
    />
    <Keyword
      value={searchParams.keyword}
      onChange={(keyword) =>
        changeParams({
          page: 1,
          keyword,
        })
      }
      disabled={disabled}
      useSearchButton
      onSearch={(keyword) =>
        changeParams({
          page: 1,
          keyword,
        })
      }
    />
  </Box>
);

export default PhotoSearchParams;
