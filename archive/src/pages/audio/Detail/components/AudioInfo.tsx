import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Box, Divider, Grid, Skeleton, Typography } from '@mui/material';

import Allowed from 'pages/@components/statusIcon/Allowed';
import Disallowed from 'pages/@components/statusIcon/Disallowed';
import { formatBytes, secondsToTimeText } from 'utils/utils';
import { codeMap } from 'pages/rootState';
import { audioSelector } from '../state';

const AudioInfo = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(audioSelector(contId));
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
          <Grid item xs={10}>
            <Box px={4} display="flex" alignItems="center" gap={2}>
              <Typography variant="fs12">
                {constants.AUDIO_MEDIA_TYPE[body!.mediaType!] || ''}
              </Typography>
              <Divider flexItem orientation="vertical" />
              <Typography variant="fs12">
                {body!.format?.toLocaleUpperCase() || ''}
              </Typography>
              <Divider flexItem orientation="vertical" />
              <Typography variant="fs12">
                {secondsToTimeText(body!.duration || 0)}
              </Typography>
              <Divider flexItem orientation="vertical" />
              <Typography variant="fs12">{body!.orgFileName || ''}</Typography>
              <Divider flexItem orientation="vertical" />
              <Typography variant="fs12">
                {formatBytes(body!.fileSize || 0, 2)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              px={4}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              {body!.permissionYn === 'Y' && <Allowed />}
              {body!.permissionYn === 'N' && <Disallowed />}
            </Box>
          </Grid>
        </>
      );
    }

    default:
      return null;
  }
};

export default AudioInfo;
