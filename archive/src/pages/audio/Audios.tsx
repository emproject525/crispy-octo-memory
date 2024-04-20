import { Grid } from '@mui/material';
import AudioList from './List';

const Audios = () => (
  <Grid container spacing={4}>
    <Grid item xs={12}>
      <AudioList />
    </Grid>
  </Grid>
);

export default Audios;
