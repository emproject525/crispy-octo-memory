import React from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { photoSelector } from 'pages/photo/state';
import { useRecoilValueLoadable } from 'recoil';

/**
 * 사진 등록일, 수정일
 */
const PhotoRegDt = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(photoSelector(contId));

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

      if (body!.modDt) {
        return (
          <>
            <Grid item xs={6}>
              <Box px={4}>
                <Typography
                  variant="fs12"
                  sx={{
                    userSelect: 'none',
                    cursor: 'default',
                  }}
                >
                  등록일 {body!.regDt}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box px={4} textAlign="right">
                <Typography
                  variant="fs12"
                  sx={{
                    userSelect: 'none',
                    cursor: 'default',
                  }}
                >
                  수정일 {body!.modDt}
                </Typography>
              </Box>
            </Grid>
          </>
        );
      }

      return (
        <Grid item xs={12}>
          <Box px={4}>
            <Typography
              variant="fs12"
              sx={{
                userSelect: 'none',
                cursor: 'default',
              }}
            >
              등록일 {body!.regDt}
            </Typography>
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default PhotoRegDt;
