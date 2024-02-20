import React from 'react';
import { Box, Divider, Grid, Skeleton, Typography } from '@mui/material';

const PhotoLoadingAll = () => (
  <Grid container spacing={2}>
    {/* 타이틀 */}
    <Grid item xs={12}>
      <Box px={4}>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </Grid>
    {/* 등록일&수정일 */}
    <Grid item xs={12}>
      <Box px={4}>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </Grid>
    {/* Divider */}
    <Grid item xs={12}>
      <Divider />
    </Grid>
    {/* 마크 + 컨텐츠ID */}
    <Grid item xs={12}>
      <Box px={4}>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </Grid>
    {/* 사진 */}
    <Grid item xs={12}>
      <Skeleton variant="rectangular" width="100%">
        <div style={{ paddingTop: '57%' }} />
      </Skeleton>
    </Grid>
  </Grid>
);

export default PhotoLoadingAll;
