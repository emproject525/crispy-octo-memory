import React from 'react';
import { alpha, Box, CircularProgress, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';

/**
 * 더보기 버튼
 * @param param0
 * @returns
 */
const MoreButton = ({
  count,
  page,
  size,
  onClick,
  loading,
}: {
  count: number;
  page: number;
  size: number;
  onClick?: (nextPage: number) => void;
  loading?: boolean;
}) => {
  const theme = useTheme();

  const isLastPage = React.useMemo(
    () => page * size >= count,
    [count, page, size],
  );

  if (!loading && isLastPage === true) {
    return null;
  }

  return page === 1 && loading ? (
    <Box display="flex" justifyContent="center" py={13}>
      <CircularProgress color="success" />
    </Box>
  ) : (
    <Box display="flex" justifyContent="center" pt={6} pb={4}>
      <LoadingButton
        loading={loading}
        variant="outlined"
        color="success"
        size="large"
        onClick={() => onClick?.(page + 1)}
        fullWidth
        sx={{
          bgcolor: alpha(theme.palette.success.main, 0.15),
        }}
      >
        더보기
      </LoadingButton>
    </Box>
  );
};

export default MoreButton;
