import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';

import { videoSelector } from '../state';
import { getHighlightText } from 'utils/utils';

const VideoHeader = ({
  contId,
  highlightText,
}: {
  contId: number;
  /**
   * 하이라이트 키워드
   */
  highlightText?: string;
}) => {
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

export default VideoHeader;
