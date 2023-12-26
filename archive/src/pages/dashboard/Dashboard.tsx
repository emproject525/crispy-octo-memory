import { Grid, Paper } from '@mui/material';
import React from 'react';

const Dashboard = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        {/* 8 */}
        <Paper
          sx={{
            height: 1000,
          }}
        >
          본문
        </Paper>
      </Grid>
      <Grid item xs={4}>
        {/* 4 */}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
