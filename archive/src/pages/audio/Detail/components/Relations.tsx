import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton } from '@mui/material';

import RelationList from 'pages/@components/relation/RelationList';
import { audioSelector } from '../state';

/**
 * 관련 컨텐츠
 */
const AudioRelations = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(audioSelector(contId));

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

      return <RelationList relations={body!.relations} />;
    }

    default:
      return null;
  }
};

export default AudioRelations;
