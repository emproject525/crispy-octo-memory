import React from 'react';
import { Box } from '@mui/material';
import VideoMediaType from 'pages/@components/searchParams/VideoMediaType';
import ShootType from 'pages/@components/searchParams/ShootType';
import StartEndDt from 'pages/@components/searchParams/StartEndDt';
import Keyword from 'pages/@components/searchParams/Keyword';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { videoListParams, videoListSelector } from './state';

const VideoSearchParams = () => {
  const loadable = useRecoilValueLoadable(videoListSelector);
  const [params, setParams] = useRecoilState(videoListParams);

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
      <VideoMediaType
        disabled={loadable.state === 'loading'}
        value={params.mediaType || ''}
        onChange={(newValue) =>
          setParams((before) => ({
            ...before,
            page: 1,
            mediaType: newValue,
          }))
        }
      />
      <ShootType
        disabled={loadable.state === 'loading'}
        value={params.shootType || ''}
        onChange={(newValue) =>
          setParams((before) => ({
            ...before,
            page: 1,
            shootType: newValue,
          }))
        }
      />
      <StartEndDt
        disabled={loadable.state === 'loading'}
        startDt={params.startDt}
        endDt={params.endDt}
        onChange={(dates) =>
          setParams((before) => ({
            ...before,
            page: 1,
            startDt: dates[0],
            endDt: dates[1],
          }))
        }
      />
      <Keyword
        value={params.keyword}
        onChange={(newValue) =>
          setParams((before) => ({
            ...before,
            page: 1,
            keyword: newValue,
          }))
        }
        disabled={loadable.state === 'loading'}
        useSearchButton
        onSearch={(keyword) =>
          setParams((before) => ({
            ...before,
            page: 1,
            keyword,
          }))
        }
      />
    </Box>
  );
};

export default VideoSearchParams;
