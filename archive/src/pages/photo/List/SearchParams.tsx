import React from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Box } from '@mui/material';
import ImgType from 'pages/@components/searchParams/ImgType';
import ShootType from 'pages/@components/searchParams/ShootType';
import StartEndDt from 'pages/@components/searchParams/StartEndDt';
import Keyword from 'pages/@components/searchParams/Keyword';
import { constantsState } from 'pages/rootState';
import { photoListParams, photoListSelector } from './state';

const PhotoSearchParams = () => {
  const constants = useRecoilValue(constantsState);
  const loadable = useRecoilValueLoadable(photoListSelector);
  const [params, setParams] = useRecoilState(photoListParams);

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
      <ImgType
        disabled={loadable.state === 'loading'}
        value={params.imgType || ''}
        onChange={(newValue) =>
          setParams((before) => ({
            ...before,
            page: 1,
            imgType: newValue,
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

export default PhotoSearchParams;
