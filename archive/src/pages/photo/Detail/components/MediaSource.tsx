import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  Box,
  Grid,
  Skeleton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { serverCodeMap } from 'pages/rootState';
import FormSelect from 'components/Input/FormSelect';
import { photoOneState } from '../state';

/**
 * 매체, 출처
 */
const PhotoMediaSource = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(photoOneState(contId));
  const code = useRecoilValue(serverCodeMap);
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down('md'));

  switch (state) {
    case 'loading':
      return (
        <>
          <Grid item xs={12} md={6}>
            <Box px={4}>
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box px={4}>
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            </Box>
          </Grid>
        </>
      );

    case 'hasValue': {
      const { body, header } = contents;

      if (!header.success) {
        return null;
      }

      return (
        <>
          <Grid item xs={12} md={6}>
            <Box pl={4} pr={matches ? 4 : 0}>
              <FormSelect<number>
                variant="filled"
                label="출처"
                id={`content-${contId}-source`}
                value={body!.source}
                options={code.SOURCE.map((item) => ({
                  label: item.cdNm,
                  value: item.seq,
                }))}
                readOnly
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box pr={4} pl={matches ? 4 : 0}>
              <FormSelect<number>
                variant="filled"
                label="매체"
                id={`content-${contId}-media`}
                value={body!.media}
                options={code.MEDIA.map((item) => ({
                  label: item.cdNm,
                  value: item.seq,
                }))}
                readOnly
              />
            </Box>
          </Grid>
        </>
      );
    }

    default:
      return null;
  }
};

export default PhotoMediaSource;
