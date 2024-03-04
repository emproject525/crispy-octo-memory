import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton } from '@mui/material';

import RelationList from 'pages/@components/relation/RelationList';
import { asyncAudio } from 'pages/audio/state';

/**
 * 관련 컨텐츠
 */
const AudioRelations = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(asyncAudio(contId));

  switch (state) {
    case 'loading':
      return (
        <Grid item xs={12}>
          <Box px={4}>
            <Skeleton width="100%">
              <Box height={300} />
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
            <RelationList relations={body!.relations} />
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default AudioRelations;
