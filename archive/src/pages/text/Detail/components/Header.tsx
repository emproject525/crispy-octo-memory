import React from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { textSelector } from 'pages/text/state';
import { useRecoilValueLoadable } from 'recoil';

/**
 * 문서명
 */
const TextHeader = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(textSelector(contId));

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

export default TextHeader;
