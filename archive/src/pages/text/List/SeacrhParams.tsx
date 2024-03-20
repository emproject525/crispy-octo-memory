import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import FormSelect from 'components/Input/FormSelect';
import { useRecoilValue } from 'recoil';
import { constantsState } from 'pages/rootState';

const TextSearchParams = () => {
  const constants = useRecoilValue(constantsState);

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
        />
      </Box>
      <Box flex={1}>
        <TextField
          fullWidth
          name="keyword"
          id="keyword"
          size="small"
          variant="outlined"
          label="검색어"
          color="search"
        />
      </Box>
      <Box flexShrink={0}>
        <Button variant="contained" color="search">
          검색
        </Button>
      </Box>
    </Box>
  );
};

export default TextSearchParams;
