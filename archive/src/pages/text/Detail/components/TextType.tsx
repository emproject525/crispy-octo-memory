import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { codeMap } from 'pages/rootState';
import FormSelect from 'components/Input/FormSelect';
import { textOneState } from '../state';

/**
 * 문서 유형
 * @deprecated
 */
const TextTextType = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(textOneState(contId));
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
              label="문서 유형"
              id={`content-${contId}-textType`}
              value={body!.textType}
              options={Object.keys(constants.TEXT_TYPE).map((key) => ({
                label:
                  constants.TEXT_TYPE[key as keyof typeof constants.TEXT_TYPE],
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

export default TextTextType;
