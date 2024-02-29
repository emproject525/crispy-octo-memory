import React from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { asyncPhoto } from 'pages/photo/state';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import FormSelect from 'components/Input/FormSelect';
import { constantsState } from 'pages/rootState';

/**
 * 이미지 유형
 */
const PhotoImgType = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(asyncPhoto(contId));
  const constants = useRecoilValue(constantsState);

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
