import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Box, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { serverCodeMap } from 'pages/rootState';
import { textOneState } from '../state';

/**
 * 작가
 */
const TextWriters = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(textOneState(contId));
  const codeMap = useRecoilValue(serverCodeMap);

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
          <Box px={4} display="flex" columnGap={4} rowGap={1} flexWrap="wrap">
            {body!.writers?.map((item, idx) => {
              const dep = codeMap['DEPARTMENT'][item.department!];

              return (
                <Box
                  key={`text-${body!.contId}-writer-${idx}`}
                  display="flex"
                  gap={1}
                  sx={{
                    cursor: 'default',
                  }}
                >
                  {dep && (
                    <>
                      <Typography variant="fs12">{dep.cdNm}</Typography>
                      <Divider orientation="vertical" flexItem />
                    </>
                  )}
                  <Typography variant="fs12">
                    {item.name}({item.id})
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
      );
    }

    default:
      return null;
  }
};

export default TextWriters;
