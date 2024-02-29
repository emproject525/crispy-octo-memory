import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, useTheme } from '@mui/material';

/**
 * 허가 O
 * @returns JSX.Element
 */
const Allowed = () => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" color={theme.palette.success.main}>
      <TaskAltIcon
        sx={{
          color: theme.palette.success.main,
          fontSize: 16,
        }}
      />
    </Box>
  );
};

export default Allowed;
