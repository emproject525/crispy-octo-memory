import React from 'react';
import { Box, Grid, Skeleton, TextField } from '@mui/material';
import { textSelector } from 'pages/text/state';
import { useRecoilValueLoadable } from 'recoil';
import AutosizeBox from 'components/Input/AutosizeBox';

const TextKeyword = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(textSelector(contId));

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
              id={`content-${contId}-keyword`}
              label="키워드"
              value={body!.keyword || ''}
              keyword
            />
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default TextKeyword;
