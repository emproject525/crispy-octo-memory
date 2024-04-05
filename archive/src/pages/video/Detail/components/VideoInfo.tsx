import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Divider, Grid, Skeleton, Typography } from '@mui/material';

import Allowed from 'pages/@components/statusIcon/Allowed';
import Disallowed from 'pages/@components/statusIcon/Disallowed';
import { formatBytes, secondsToTimeText } from 'utils/utils';
import { videoSelector } from '../state';

const VideoInfo = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(videoSelector(contId));

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
              {body!.mediaType === '01' && (
                <>
                  <Typography variant="fs12">유튜브</Typography>
                  <Divider flexItem orientation="vertical" />
                  <Typography
                    variant="fs12"
                    component="a"
                    target="_blank"
                    href={body!.filePath}
                    color="common.black"
                  >
                    {body!.filePath}
                  </Typography>
                </>
              )}
              {body!.mediaType === '00' && (
                <>
                  <Typography variant="fs12">
                    {body!.format?.toLocaleUpperCase() || ''}
                  </Typography>
                  <Divider flexItem orientation="vertical" />
                  <Typography variant="fs12">
                    {secondsToTimeText(body!.duration || 0)}
                  </Typography>
                  <Divider flexItem orientation="vertical" />
                  <Typography variant="fs12">
                    {body!.orgFileName || ''}
                  </Typography>
                  <Divider flexItem orientation="vertical" />
                  <Typography variant="fs12">
                    {formatBytes(body!.fileSize || 0, 2)}
                  </Typography>
                </>
              )}
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

export default VideoInfo;
