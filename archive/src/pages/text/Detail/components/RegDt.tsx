import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { textOneState } from '../state';

/**
 * 등록일, 수정일
 */
const TextRegDt = ({ contId }: { contId: number }) => {
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
          <Box
            px={4}
            display="flex"
            gap={4}
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Typography
              variant="fs12"
              sx={{
                userSelect: 'none',
                cursor: 'default',
              }}
            >
              등록일 {body!.regDt}
            </Typography>
            {body!.modDt && (
              <Typography
                variant="fs12"
                sx={{
                  userSelect: 'none',
                  cursor: 'default',
                }}
              >
                수정일 {body!.modDt}
              </Typography>
            )}
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default TextRegDt;
