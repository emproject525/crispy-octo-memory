import React from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';

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
      <Paper>
        <Box display="flex" justifyContent="center" py={13}>
          <CircularProgress color="success" />
        </Box>
      </Paper>
    </Box>
  );
};

export default Fallback;
