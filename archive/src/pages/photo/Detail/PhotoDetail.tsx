import React from 'react';
import { Box, Divider, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
import Image from 'components/Image';

import PhotoLoadingAll from './components/LoadingAll';

import { asyncPhoto } from '../state';
import Archived from 'pages/@components/statusIcon/Archived';

const Inner = ({ contId }: { contId: number }) => {
  const { state, contents } = useRecoilValueLoadable(asyncPhoto(contId));

  switch (state) {
    case 'loading':
      return <PhotoLoadingAll />;
    case 'hasValue': {
      const { body, header } = contents;

      if (!header.success) {
        return <PhotoLoadingAll />;
      }

      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box px={4}>
              <Typography variant="h3">{body!.title}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box px={4}>
              <Typography variant="fs12">등록일 {body!.regDt}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Box px={4} display="flex" gap={4}>
              {body!.archStatus === '99' && <Archived />}
              <Typography variant="fs12">{contId}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={12}>
            <Image
              width="100%"
              alt={body!.title || ''}
              src={body!.filePath || ''}
            />
          </Grid>
        </Grid>
      );
    }
    default:
      return <PhotoLoadingAll />;
  }
};

const PhotoDetail = ({ contId }: { contId: number }) => (
  <RecoilRoot>
    <Inner contId={contId} />
  </RecoilRoot>
);

export default PhotoDetail;
