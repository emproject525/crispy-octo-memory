import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import copy from 'copy-to-clipboard';
import { Box, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { videoSelector } from 'pages/video/state';
import Archived from 'pages/@components/statusIcon/Archived';
import DownloadContButton from 'pages/@components/button/DownloadContButton';

/**
 * 상태
 */
const VideoArchStatus = ({ contId }: { contId: number }) => {
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
              <IconButton
                sx={{
                  width: 20,
                  height: 20,
                  p: 0.6,
                }}
                title="URL 복사"
                onClick={() => {
                  copy(`${window.location.origin}/videos/${contId}`);
                }}
              >
                <ContentCopyIcon
                  sx={{
                    fontSize: 14,
                  }}
                />
              </IconButton>
              {body!.permissionYn === 'Y' && (
                <DownloadContButton
                  contType="V"
                  contId={contId}
                  title="영상 다운로드"
                />
              )}
            </Box>
          </Grid>
        </>
      );
    }

    default:
      return null;
  }
};

export default VideoArchStatus;
