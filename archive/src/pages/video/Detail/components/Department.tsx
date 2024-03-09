import React from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { asyncCodeMap } from 'pages/rootState';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import FormSelect from 'components/Input/FormSelect';
import { videoSelector } from 'pages/video/state';

/**
 * 부서
 */
const VideoDepartment = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(videoSelector(contId));
  const code = useRecoilValue(asyncCodeMap);

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
            <FormSelect<number>
              variant="filled"
              label="부서"
              id={`content-${contId}-department`}
              value={body!.department}
              options={code.DEPARTMENT.map((item) => ({
                label: item.cdNm,
                value: item.seq,
              }))}
              readOnly
            />
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default VideoDepartment;
