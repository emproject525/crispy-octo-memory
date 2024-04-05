import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { photoOneState } from '../state';
import { getHighlightText } from 'utils/utils';

/**
 * 사진명
 */
const PhotoHeader = ({
  contId,
  highlightText,
}: {
  contId: number;
  highlightText?: string;
}) => {
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
        <Grid item xs={12}>
          <Box px={4}>
            <Typography
              variant="h3"
              dangerouslySetInnerHTML={{
                __html: getHighlightText(body!.title || '', highlightText),
              }}
            />
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default PhotoHeader;
