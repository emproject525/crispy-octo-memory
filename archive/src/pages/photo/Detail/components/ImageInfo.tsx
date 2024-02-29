import React from 'react';
import { asyncPhoto } from 'pages/photo/state';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Divider, Grid, Skeleton, Typography } from '@mui/material';
import Allowed from 'pages/@components/statusIcon/Allowed';
import Disallowed from 'pages/@components/statusIcon/Disallowed';

/**
 * 이미지 정보
 */
const PhotoImageInfo = ({ contId }: { contId: number }) => {
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
            <Box px={4} display="flex" alignItems="center" gap={2}>
              <Typography variant="fs12">{`${body!.width || 0}x${
                body!.height || 0
              }`}</Typography>
              <Divider flexItem orientation="vertical" />
              <Typography variant="fs12">{`${body!.dpi || 72}dpi`}</Typography>
              <Divider flexItem orientation="vertical" />
              <Typography variant="fs12">
                {body!.format?.toLocaleUpperCase() || ''}
              </Typography>
              <Divider flexItem orientation="vertical" />
              <Typography variant="fs12">{body!.orgFileName || ''}</Typography>
              <Divider flexItem orientation="vertical" />
              <Typography variant="fs12">{`${(
                body!.fileSize || 0
              ).toLocaleString()}KB`}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
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

export default PhotoImageInfo;
