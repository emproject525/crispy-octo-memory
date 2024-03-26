import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { constantsState } from 'pages/rootState';
import FormSelect from 'components/Input/FormSelect';
import DateRangePicker from 'components/Input/DateRangePicker';
import { textListParams, textListSelector } from '../state';

const TextSearchParams = () => {
  const constants = useRecoilValue(constantsState);
  const loadable = useRecoilValueLoadable(textListSelector);
  const [params, setParams] = useRecoilState(textListParams);
  const keywordInputRef = React.useRef<HTMLInputElement>(null);

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
      <DateRangePicker
        startDate={params.startDt}
        endDate={params.endDt}
        onChange={(dates) => {
          setParams((before) => ({
            ...before,
            page: 1,
            startDt: dates[0] || undefined,
            endDt: dates[1] || undefined,
          }));
        }}
        disabled={loadable.state === 'loading'}
      />
      <Box flex={1}>
        <TextField
          ref={keywordInputRef}
          fullWidth
          name="keyword"
          id="keyword"
          size="small"
          variant="outlined"
          label="검색어"
          color="search"
          defaultValue={params.keyword}
          onKeyUp={(evt) => {
            if (evt.key === 'Enter') {
              setParams((before) => ({
                ...before,
                page: 1,
                keyword: (evt.target as HTMLInputElement).value,
              }));
            }
          }}
          disabled={loadable.state === 'loading'}
        />
      </Box>
      <Box flexShrink={0}>
        <Button
          variant="contained"
          color="search"
          onClick={() => {
            setParams((before) => ({
              ...before,
              page: 1,
              keyword: keywordInputRef.current?.value || undefined,
            }));
          }}
        >
          검색
        </Button>
      </Box>
    </Box>
  );
};

export default TextSearchParams;
