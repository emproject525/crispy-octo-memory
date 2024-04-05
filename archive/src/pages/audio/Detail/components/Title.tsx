import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, TextField } from '@mui/material';

import AutosizeBox from 'components/Input/AutosizeBox';
import { audioSelector } from '../state';

/**
 * 제목
 */
const AudioTitle = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(audioSelector(contId));

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
            <AutosizeBox
              variant="filled"
              id={`content-${contId}-title`}
              label="제목"
              value={body!.title || ''}
            />
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default AudioTitle;
