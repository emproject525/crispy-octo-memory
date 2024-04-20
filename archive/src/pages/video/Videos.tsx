import React from 'react';
import { Grid } from '@mui/material';
import VideoList from './List';

const Videos = () => (
  <Grid container spacing={4}>
    <Grid item xs={12}>
      <VideoList />
    </Grid>
  </Grid>
);

export default Videos;
