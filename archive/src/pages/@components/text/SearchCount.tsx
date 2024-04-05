import { Box, Typography } from '@mui/material';
import React from 'react';

const SearchCount = ({ count }: { count: number }) => {
  return (
    <Box textAlign="right" mb={1}>
      <Typography variant="fs12">
        검색 결과 : {count.toLocaleString()}개
      </Typography>
    </Box>
  );
};

export default SearchCount;
