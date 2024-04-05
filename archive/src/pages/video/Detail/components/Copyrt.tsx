import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, TextField } from '@mui/material';

import { videoSelector } from '../state';

/**
 * 저작권
 */
const VideoCopyrt = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(videoSelector(contId));

  switch (state) {
    case 'loading':
      return (
        <Grid item xs={12}>
          <Box px={4}>
            <Skeleton width="100%">
              <TextField />
            </Skeleton>
          </Box>
        </Grid>
      );

    case 'hasValue': {
      const { body, header } = contents;

      if (!header.success) {
        return null;
      }

      return (
        <Grid item xs={12}>
          <Box px={4}>
            <TextField
              size="small"
              variant="filled"
              id={`content-${contId}-copyrt`}
              fullWidth
              label="저작권"
              value={body!.copyrt || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default VideoCopyrt;
