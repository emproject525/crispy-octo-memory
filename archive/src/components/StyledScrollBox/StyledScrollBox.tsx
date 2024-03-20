import { Box, BoxProps, styled } from '@mui/material';

const StyledScrollBox = styled(Box)<BoxProps>(({ theme }) => ({
  '::-webkit-scrollbar': {
    width: 8,
    height: 8,
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.success.main,
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.paper,
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
    // 원래 색상
    // backgroundImage:
    //   'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default StyledScrollBox;
