import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { codeMap } from 'pages/rootState';
import FormSelect from 'components/Input/FormSelect';
import { photoOneState } from '../state';

/**
 * 이미지 유형
 */
const PhotoImgType = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(photoOneState(contId));
  const constants = useRecoilValue(codeMap);

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
            <FormSelect<string>
              variant="filled"
              label="이미지 유형"
              id={`content-${contId}-imgType`}
              value={body!.imgType}
              options={Object.keys(constants.IMG_TYPE).map((key) => ({
                label:
                  constants.IMG_TYPE[key as keyof typeof constants.IMG_TYPE],
                value: key,
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

export default PhotoImgType;
