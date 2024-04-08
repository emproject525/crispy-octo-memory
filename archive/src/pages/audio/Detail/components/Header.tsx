import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';

import { audioSelector } from '../state';
import { getHighlight } from 'utils/utils';

const AudioHeader = ({
  contId,
  highlight,
}: {
  contId: number;
  highlight?: string;
}) => {
  const { contents, state } = useRecoilValueLoadable(audioSelector(contId));

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
            <Typography
              variant="h3"
              dangerouslySetInnerHTML={{
                __html: getHighlight(body!.title || '', highlight),
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

export default AudioHeader;
