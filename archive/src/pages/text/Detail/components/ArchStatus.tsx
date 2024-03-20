import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import CopyIconButton from 'components/Button/CopyIconButton';

import { textSelector } from 'pages/text/state';
import Archived from 'pages/@components/statusIcon/Archived';

/**
 * 상태
 */
const TextArchStatus = ({ contId }: { contId: number }) => {
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
        <>
          <Grid item xs={6}>
            <Box
              px={4}
              display="flex"
              alignItems="center"
              gap={4}
              height="100%"
            >
              {body!.archStatus === '99' && <Archived />}
              <Typography variant="fs12">{contId}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box px={4} display="flex" gap={1} justifyContent="flex-end">
              <CopyIconButton
                title="URL 복사"
                copyText={`${window.location.origin}/texts/${contId}`}
              />
            </Box>
          </Grid>
        </>
      );
    }

    default:
      return null;
  }
};

export default TextArchStatus;
