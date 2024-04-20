import React from 'react';
import { Grid } from '@mui/material';
import TextList from './List/TextList';

const Texts = () => (
  <Grid container spacing={4}>
    <Grid item xs={12}>
      <TextList />
    </Grid>
  </Grid>
);

export default Texts;
