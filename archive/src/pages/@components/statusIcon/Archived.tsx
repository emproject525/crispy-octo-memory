import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, useTheme } from '@mui/material';

/**
 * 아카이브됨
 * @returns JSX.Element
 */
const Archived = () => {
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

export default Archived;
