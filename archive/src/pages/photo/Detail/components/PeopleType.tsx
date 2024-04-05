import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { codeMap } from 'pages/rootState';
import FormSelect from 'components/Input/FormSelect';
import { photoOneState } from '../state';

/**
 * 인물 유형
 */
const PhotoPeopleType = ({ contId }: { contId: number }) => {
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
              label="인물 유형"
              id={`content-${contId}-peopleType`}
              value={body!.peopleType || ''}
              options={Object.keys(constants.PEOPLE_TYPE).map((key) => ({
                label:
                  constants.PEOPLE_TYPE[
                    key as keyof typeof constants.PEOPLE_TYPE
                  ],
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

export default PhotoPeopleType;
