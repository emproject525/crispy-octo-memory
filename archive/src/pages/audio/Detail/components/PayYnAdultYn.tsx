import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Skeleton,
} from '@mui/material';

import { audioSelector } from '../state';

/**
 * 결제
 */
const AudioPayYnAdultYn = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(audioSelector(contId));

  switch (state) {
    case 'loading':
      return (
        <Grid item xs={12}>
          <Box px={4}>
            <Skeleton width="100%">
              <Checkbox readOnly />
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
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={body!.payYn === 'Y'}
                    readOnly
                    size="small"
                    disableRipple
                  />
                }
                label="유료 컨텐츠"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={body!.adultYn === 'Y'}
                    readOnly
                    size="small"
                    disableRipple
                  />
                }
                label="성인 컨텐츠"
              />
            </FormGroup>
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default AudioPayYnAdultYn;
