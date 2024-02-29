import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { Box, Typography, useTheme } from '@mui/material';

/**
 * 허가 X
 * @returns JSX.Element
 */
const Disallowed = ({ showText }: { showText?: boolean }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      gap={1}
      alignItems="center"
      color={theme.palette.error.main}
    >
      {showText && (
        <Typography
          variant="fs12"
          fontWeight="bold"
          sx={{
            cursor: 'default',
            userSelect: 'none',
          }}
        >
          사용 허가받지 않음
        </Typography>
      )}
      <DoNotDisturbAltOutlinedIcon
        sx={{
          color: theme.palette.error.main,
          fontSize: 16,
        }}
      />
    </Box>
  );
};

export default Disallowed;
