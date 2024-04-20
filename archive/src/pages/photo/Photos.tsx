import React from 'react';
import { Grid } from '@mui/material';
import PhotoList from './List';

const Photos = () => (
  <Grid container spacing={4}>
    <Grid item xs={12}>
      <PhotoList />
    </Grid>
  </Grid>
);

export default Photos;
