import React from 'react';
import { Box, Grid, Skeleton, TextField } from '@mui/material';
import { useRecoilValueLoadable } from 'recoil';
import AutosizeBox from 'components/Input/AutosizeBox';
import { asyncAudio } from 'pages/audio/state';

/**
 * 촬영 장소
 */
const AudioShootPlace = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(asyncAudio(contId));

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
              id={`content-${contId}-shootPlace`}
              label="촬영 장소"
              value={body!.shootPlace || ''}
            />
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default AudioShootPlace;
