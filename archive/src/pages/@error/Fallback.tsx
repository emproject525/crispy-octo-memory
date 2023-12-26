import { Box, Typography } from '@mui/material';
import React from 'react';

const Fallback = () => {
  // const theme = useTheme();

  return (
    <Box position="relative" width="100%" height="100%">
      {/* <Loader
        circular
        opacity
        sx={{
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <Typography marginTop={7}>페이지를 로딩하는 중입니다.</Typography>
      </Loader> */}
      <Typography marginTop={7}>페이지를 로딩하는 중입니다.</Typography>
    </Box>
  );
};

export default Fallback;
