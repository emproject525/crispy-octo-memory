import React from 'react';
import { Box } from '@mui/material';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { codeMap } from 'pages/rootState';
import StartEndDt from 'pages/@components/searchParams/StartEndDt';
import Keyword from 'pages/@components/searchParams/Keyword';
import FormSelect from 'components/Input/FormSelect';
import { textListParams, textListSelector } from './state';

const TextSearchParams = () => {
  const constants = useRecoilValue(codeMap);
  const loadable = useRecoilValueLoadable(textListSelector);
  const [params, setParams] = useRecoilState(textListParams);

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
      <Box width={100} flexShrink={0}>
        <FormSelect
          id="textType"
          name="textType"
          variant="outlined"
          label="문서 종류"
          color="search"
          options={Object.keys(constants.TEXT_TYPE).map((key) => ({
            value: key,
            label: constants.TEXT_TYPE[key as keyof typeof constants.TEXT_TYPE],
          }))}
          disabled={loadable.state === 'loading'}
          value={params.textType || ''}
          onChange={(evt) => {
            setParams((before) => ({
              ...before,
              page: 1,
              textType: evt.target.value,
            }));
          }}
        />
      </Box>
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

export default TextSearchParams;
