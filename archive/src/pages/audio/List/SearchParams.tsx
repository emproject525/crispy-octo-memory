import React from 'react';
import { Box } from '@mui/material';
import { IContAudioParams } from '@types';
import AudioMediaType from 'pages/@components/searchParams/AudioMediaType';
import ShootType from 'pages/@components/searchParams/ShootType';
import StartEndDt from 'pages/@components/searchParams/StartEndDt';
import Keyword from 'pages/@components/searchParams/Keyword';

const AudioSearchParams = ({
  searchParams,
  changeParams,
  disabled,
}: {
  searchParams: IContAudioParams;
  changeParams: (newParams: Partial<IContAudioParams>) => void;
  disabled?: boolean;
}) => (
  <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
    <AudioMediaType
      disabled={disabled}
      value={searchParams.mediaType || ''}
      onChange={(mediaType) => changeParams({ page: 1, mediaType })}
    />
    <ShootType
      disabled={disabled}
      value={searchParams.shootType || ''}
      onChange={(shootType) => changeParams({ page: 1, shootType })}
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
      onChange={(keyword) => changeParams({ page: 1, keyword })}
      disabled={disabled}
      useSearchButton
      onSearch={(keyword) => changeParams({ page: 1, keyword })}
    />
  </Box>
);

export default AudioSearchParams;
