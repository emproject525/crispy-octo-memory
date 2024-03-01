import { Typography } from '@mui/material';
import React from 'react';

const MiniTitle = ({ text }: { text: string }) => {
  return (
    <Typography
      component="div"
      variant="fs14"
      color="info.main"
      fontWeight="bold"
      sx={{
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {text}
    </Typography>
  );
};

export default MiniTitle;
