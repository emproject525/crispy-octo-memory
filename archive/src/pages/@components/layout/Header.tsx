import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArchiveIcon from '@mui/icons-material/Archive';
import {
  Box,
  Typography,
  Grid,
  Paper,
  InputBase,
  IconButton,
  useTheme,
} from '@mui/material';

const Header = () => {
  const theme = useTheme();

  return (
    <Box width="100%" height={100}>
      <Grid height={100} container gap={4}>
        <Grid item sm={0} md="auto">
          <Box
            display="flex"
            alignItems="center"
            width={180}
            height="100%"
            gap={3}
          >
            <ArchiveIcon color="success" fontSize="large" />
            <Typography
              variant="fs14"
              color="grey.700"
              lineHeight="12px"
              sx={{
                fontStyle: 'italic',
                userSelect: 'none',
              }}
            >
              Data Archiving System
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            gap={4}
          >
            {theme.breakpoints.up('md') && (
              <Typography variant="fs16" color="common.black">
                통합검색
              </Typography>
            )}
            <Paper
              component="form"
              sx={{
                display: 'flex',
                flex: 1,
                py: 1,
                pl: 6,
                pr: 2,
              }}
            >
              <InputBase
                sx={{
                  flex: 1,
                }}
                placeholder="검색어를 입력하세요."
              />
              <IconButton>
                <SearchRoundedIcon />
              </IconButton>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
