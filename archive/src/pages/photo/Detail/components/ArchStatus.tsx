import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import { asyncPhoto } from 'pages/photo/state';
import Archived from 'pages/@components/statusIcon/Archived';
import { download } from 'api/download';

/**
 * 상태
 */
const PhotoArchStatus = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(asyncPhoto(contId));

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
            <Box px={4} display="flex" gap={4} justifyContent="flex-end">
              <IconButton
                color="info"
                sx={{
                  p: 0.5,
                }}
                title="이미지 다운로드"
                onClick={() => {
                  download({
                    contType: 'P',
                    contId,
                  }).then(({ success, response }) => {});
                }}
              >
                <DownloadRoundedIcon
                  sx={{
                    fontSize: 16,
                  }}
                />
              </IconButton>
            </Box>
          </Grid>
        </>
      );
    }

    default:
      return null;
  }
};

export default PhotoArchStatus;
