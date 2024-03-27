import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import Archived from 'pages/@components/statusIcon/Archived';
import DownloadContButton from 'pages/@components/button/DownloadContButton';
import CopyIconButton from 'components/Button/CopyIconButton';
import { photoOneState } from '../state';

/**
 * 상태
 */
const PhotoArchStatus = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(photoOneState(contId));

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
                copyText={`${window.location.origin}/photos/${contId}`}
              />
              {body!.permissionYn === 'Y' && (
                <DownloadContButton
                  contType="P"
                  contId={contId}
                  title="이미지 다운로드"
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

export default PhotoArchStatus;
