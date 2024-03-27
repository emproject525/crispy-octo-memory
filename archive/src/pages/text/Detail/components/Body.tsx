import React from 'react';
import { Grid, Skeleton, Typography, Box } from '@mui/material';
import { useRecoilValueLoadable } from 'recoil';
import { textOneState } from '../state';

/**
 * 본문
 */
const TextBody = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(textOneState(contId));

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
            {body!.body.split(/\n/).map((paragraph, idx) => (
              <Typography
                mb={4}
                key={`text-${body!.contId}-body-paragraph-${idx}`}
                variant="fs15"
                component="p"
                dangerouslySetInnerHTML={{
                  __html: paragraph,
                }}
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              />
            ))}
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default TextBody;
