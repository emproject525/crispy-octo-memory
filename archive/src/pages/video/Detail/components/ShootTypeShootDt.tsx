import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  Box,
  Grid,
  Skeleton,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
} from '@mui/material';

import { codeMap } from 'pages/rootState';
import FormSelect from 'components/Input/FormSelect';
import { videoSelector } from '../state';

/**
 * 촬영 유형, 촬영일
 */
const VideoShootTypeShootDt = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(videoSelector(contId));
  const constants = useRecoilValue(codeMap);
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
              <FormSelect<string>
                variant="filled"
                label="촬영 유형"
                id={`content-${contId}-shootType`}
                value={body!.shootType}
                options={Object.keys(constants.SHOOT_TYPE).map((key) => ({
                  label:
                    constants.SHOOT_TYPE[
                      key as keyof typeof constants.SHOOT_TYPE
                    ],
                  value: key,
                }))}
                readOnly
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box pr={4} pl={matches ? 4 : 0}>
              <TextField
                size="small"
                variant="filled"
                id={`content-${contId}-shootDt`}
                fullWidth
                label="촬영일시"
                value={body!.shootDt || ''}
                InputProps={{
                  readOnly: true,
                }}
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

export default VideoShootTypeShootDt;
