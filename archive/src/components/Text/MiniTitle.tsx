import React from 'react';
import { Box, Typography } from '@mui/material';

const MiniTitle = ({
  text,
  startAdornment,
}: {
  text: string;
  startAdornment?: React.ReactNode;
}) => {
  return (
    <>
      {startAdornment && (
        <Box
          height={20}
          mr={2}
          sx={{
            float: 'left',
          }}
        >
          {startAdornment}
        </Box>
      )}
      <Typography
        component="div"
        variant="fs13"
        color="search.main"
        fontWeight="bold"
        sx={{
          float: 'left',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        {text}
      </Typography>
    </>
  );
};

export default MiniTitle;
