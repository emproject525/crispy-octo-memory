import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import { asyncPhoto } from 'pages/photo/state';
import { useRecoilValueLoadable } from 'recoil';
import Image from 'components/Image';

/**
 * 사진
 */
const PhotoFileImage = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(asyncPhoto(contId));

  switch (state) {
    case 'loading':
      return (
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: '57%' }} />
          </Skeleton>
        </Grid>
      );

    case 'hasValue': {
      const { body, header } = contents;

      if (!header.success) {
        return null;
      }

      return (
        <Grid item xs={12}>
          <Image
            width="100%"
            alt={body!.title || ''}
            src={body!.filePath || ''}
          />
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default PhotoFileImage;
