import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { alpha, Box, Typography, useTheme } from '@mui/material';

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
      {/* <Tooltip
          arrow
          title="사용 시 저작권자에게 허가 요청"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -5],
                  },
                },
              ],
            },
          }}
        ></Tooltip> */}
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
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.error.main, 0.3),
          color: theme.palette.error.main,
          fontSize: 16,
        }}
      />
    </Box>
  );
};

export default Disallowed;
