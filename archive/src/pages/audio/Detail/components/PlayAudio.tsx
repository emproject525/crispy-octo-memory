import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton } from '@mui/material';

import { codeMap } from 'pages/rootState';
import MusicPlayer from 'components/MusicPlayer';
import { audioSelector } from '../state';

/**
 * 오디오 재생 컴포넌트
 * @see https://mui.com/material-ui/react-slider/#music-player
 * @returns JSX.Element
 */
const PlayAudio = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(audioSelector(contId));
  const constants = useRecoilValue(codeMap);
  const [width, setWidth] = React.useState(560);
  const [height, setHeight] = React.useState(315);

  return (
    <Grid item xs={12}>
      <Box
        width="100%"
        ref={(ele: HTMLDivElement | null) => {
          if (ele) {
            const observer = new ResizeObserver((entries) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              for (const _entry of entries) {
                const { width } = ele.getBoundingClientRect();

                setWidth(width);
                setHeight(width * 0.3625);
              }
            });

            observer.observe(ele);
          }
        }}
      >
        {state === 'loading' && (
          <Skeleton
            component="div"
            width={width}
            height={height}
            sx={{
              transform: 'scale(1, 1)',
            }}
          />
        )}
        {state === 'hasValue' &&
          (() => {
            const { body, header } = contents;

            if (!header.success) {
              return null;
            }

            return (
              <Box px={4}>
                <MusicPlayer
                  src={body!.filePath || ''}
                  coverImageSrc={body!.thumbFilePath}
                  title={body!.title || ''}
                  subTitle={body!.copyrt || ''}
                  infoTitle={
                    constants.AUDIO_MEDIA_TYPE?.[body!.mediaType!] || ''
                  }
                  duration={body!.duration || 0}
                />
              </Box>
            );
          })()}
      </Box>
    </Grid>
  );
};

export default PlayAudio;
