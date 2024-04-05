import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import Allowed from 'pages/@components/statusIcon/Allowed';
import Disallowed from 'pages/@components/statusIcon/Disallowed';
import { codeMap } from 'pages/rootState';
import { textOneState } from '../state';

/**
 * 정보
 */
const TextInfo = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(textOneState(contId));
  const constants = useRecoilValue(codeMap);

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
          <Grid item xs={8}>
            <Box px={4} display="flex" alignItems="center" gap={2}>
              <Typography variant="fs12">
                {constants.TEXT_TYPE[body!.textType!] || '기타'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              px={4}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              {body!.permissionYn === 'Y' && <Allowed />}
              {body!.permissionYn === 'N' && <Disallowed showText />}
            </Box>
          </Grid>
        </>
      );
    }

    default:
      return null;
  }
};

export default TextInfo;
