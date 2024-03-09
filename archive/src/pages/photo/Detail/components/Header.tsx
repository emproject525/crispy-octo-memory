import React from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { photoSelector } from 'pages/photo/state';
import { useRecoilValueLoadable } from 'recoil';

/**
 * 사진명
 */
const PhotoHeader = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(photoSelector(contId));

  switch (state) {
    case 'loading':
      return (
        <Grid item xs={12}>
          <Box px={4}>
            <Skeleton width="100%">
              <Typography>.</Typography>
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
            <Typography variant="h3">{body!.title}</Typography>
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default PhotoHeader;
