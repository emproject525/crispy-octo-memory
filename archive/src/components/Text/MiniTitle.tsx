import React from 'react';
import { Box, Typography, TypographyProps } from '@mui/material';

const MiniTitle = ({
  text,
  startAdornment,
  sx,
}: {
  text: string;
  startAdornment?: React.ReactNode;
  sx?: TypographyProps['sx'];
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
          width: '100%',
          overflow: 'hidden',
          float: 'left',
          cursor: 'default',
          userSelect: 'none',
          ...sx,
        }}
      >
        {text}
      </Typography>
    </>
  );
};

export default MiniTitle;
