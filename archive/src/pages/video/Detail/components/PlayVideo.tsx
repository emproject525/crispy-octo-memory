import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Box, Grid, Skeleton } from '@mui/material';

import { videoSelector } from '../state';

const PlayVideo = ({ contId }: { contId: number }) => {
  const { contents, state } = useRecoilValueLoadable(videoSelector(contId));
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
                setHeight(width * 0.5625);
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

            if (body!.mediaType === '01') {
              return (
                <iframe
                  src={body!.filePath}
                  title="YouTube video player"
                  frameBorder="0"
                  width={width}
                  height={height}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    display: 'block',
                    margin: 0,
                    padding: 0,
                  }}
                ></iframe>
              );
            } else if (body!.mediaType === '00') {
              // return (
              //   <video
              //     controls
              //     width={width}
              //     height={height}
              //     style={{
              //       backgroundColor: '#141414',
              //       display: 'block',
              //       margin: 0,
              //       padding: 0,
              //     }}
              //   >
              //     <source src={body!.filePath} type={`video/${body!.format}`} />
              //   </video>
              // );

              return (
                <iframe
                  src={`http://localhost:8080/html/stream/${contId}`}
                  title={body!.fileName || ''}
                  frameBorder="0"
                  width={width}
                  height={height}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    display: 'block',
                    margin: 0,
                    padding: 0,
                  }}
                ></iframe>
              );
            }

            return null;
          })()}
      </Box>
    </Grid>
  );
};

export default PlayVideo;
