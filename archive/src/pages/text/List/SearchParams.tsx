import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/material';
import { IContTextParams } from '@types';
import { codeMap } from 'pages/rootState';
import StartEndDt from 'pages/@components/searchParams/StartEndDt';
import Keyword from 'pages/@components/searchParams/Keyword';
import FormSelect from 'components/Input/FormSelect';

const TextSearchParams = (props: {
  searchParams: IContTextParams;
  changeParams: (newParams: Partial<IContTextParams>) => void;
  disabled?: boolean;
}) => {
  const { changeParams, searchParams, disabled } = props;
  const constants = useRecoilValue(codeMap);

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
          disabled={disabled}
          value={searchParams.textType || ''}
          onChange={(evt) => {
            changeParams({
              page: 1,
              textType: evt.target.value,
            });
          }}
        />
      </Box>
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
        onChange={(newValue) =>
          changeParams({
            page: 1,
            keyword: newValue,
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
};

export default TextSearchParams;
