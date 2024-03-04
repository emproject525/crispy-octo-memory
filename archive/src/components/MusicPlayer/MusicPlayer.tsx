/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import Image from 'components/Image';

// const WallPaper = styled('div')({
//   position: 'absolute',
//   width: '100%',
//   height: '100%',
//   top: 0,
//   left: 0,
//   overflow: 'hidden',
//   background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
//   transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
//   '&::before': {
//     content: '""',
//     width: '140%',
//     height: '140%',
//     position: 'absolute',
//     top: '-40%',
//     right: '-50%',
//     background:
//       'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
//   },
//   '&::after': {
//     content: '""',
//     width: '140%',
//     height: '140%',
//     position: 'absolute',
//     bottom: '-50%',
//     left: '-30%',
//     background:
//       'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
//     transform: 'rotate(30deg)',
//   },
// });

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  position: 'relative',
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

/**
 * Music Player
 * @returns JSX.Element
 */
const MusicPlayer = ({
  src,
  coverImageSrc,
  infoTitle,
  title,
  subTitle,
  duration,
  onPressForward,
  onPressNext,
}: {
  // 오디오 경로
  src: string;
  // 커버 이미지
  coverImageSrc?: string;
  infoTitle?: string;
  title: string;
  subTitle: string;
  duration: number;
  // 이전곡
  onPressForward?: () => void;
  // 다음곡
  onPressNext?: () => void;
}) => {
  const theme = useTheme();
  // 현재 재생 중인 초
  const [position, setPosition] = React.useState(0);
  // 중지 여부
  const [paused, setPaused] = React.useState(true);
  // 음악 load 상태
  const [loaded, setLoaded] = React.useState(false);
  const [titleWidth, setTitleWidth] = React.useState(0);
  const [ratio, setRatio] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const audioRefCallback = React.useCallback((ele: HTMLAudioElement | null) => {
    if (ele) {
      // eslint-disable-next-line no-param-reassign
      ele.volume = 0.3;
      audioRef.current = ele;
    }
  }, []);
  const titleRefCallback = React.useCallback((ele: HTMLSpanElement | null) => {
    if (ele) {
      const observer = new ResizeObserver((entires) => {
        for (const _entry of entires) {
          const { width } = ele.getBoundingClientRect();
          setTitleWidth(width);
        }
      });
      observer.observe(ele);
    }
  }, []);
  const titleWrapperRefCallback = React.useCallback(
    (ele: HTMLDivElement | null) => {
      if (ele) {
        const observer = new ResizeObserver((entires) => {
          for (const _entry of entires) {
            const { width } = ele.getBoundingClientRect();

            if (titleWidth > width) {
              setRatio(Math.floor((titleWidth / width) * 100 - 100));
            } else {
              setRatio(0);
            }
          }
        });

        observer.observe(ele);
      }
    },
    [titleWidth],
  );

  function formatDuration(seconds: number) {
    const minute = Math.floor(seconds / 60);
    const secondLeft = seconds - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  React.useEffect(() => {
    return () => {
      setPosition(0);
      setPaused(true);
      setLoaded(false);
    };
  }, []);

  return (
    <Box width="100%" overflow="hidden">
      <audio
        ref={audioRefCallback}
        autoPlay={false}
        controls
        style={{ display: 'none' }}
        onCanPlay={() => setLoaded(true)}
        onTimeUpdate={(evt) => {
          setPosition(Math.floor(evt.currentTarget.currentTime));
        }}
        onEnded={() => {
          setPaused(true);
          setPosition(0);
        }}
      >
        <source src={src} />
      </audio>
      <Widget>
        <Box display="flex" alignItems="center">
          <CoverImage>
            <Image
              absolute
              supressZoom
              width={100}
              height={100}
              alt={title}
              src={coverImageSrc || ''}
              boxSx={{
                background:
                  'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
              }}
            />
          </CoverImage>
          <Box ml={3} minWidth={0} width="100%">
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {infoTitle || ''}
            </Typography>
            <Box
              ref={titleWrapperRefCallback}
              width="100%"
              overflow="hidden"
              sx={{
                verticalAlign: 'middle',
                '@keyframes backandforth': {
                  '0%': { left: '0%' },
                  '50%': { left: `-${ratio}%` },
                  '100%': { left: '0%' },
                  // '100%': { tranform: 'translateX(-100%)' },
                },
              }}
            >
              <Typography
                ref={titleRefCallback}
                component="span"
                noWrap
                fontWeight="bold"
                title={title}
                sx={{
                  position: 'relative',
                  // animation: 'infinite backandforth 10s linear',
                  // transform: 'translateX(0)',
                  animation:
                    ratio !== 0
                      ? `backandforth ${Math.ceil(
                          (ratio * 4) / 10,
                        )}s infinite linear`
                      : undefined,
                }}
              >
                {title || ''}
              </Typography>
            </Box>
            <Typography noWrap letterSpacing={-0.25} title={subTitle}>
              {subTitle || ''}
            </Typography>
          </Box>
        </Box>
        <Slider
          disabled={!loaded}
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => {
            setPosition(value as number);
            if (typeof audioRef.current?.currentTime === 'number') {
              audioRef.current.currentTime = value as number;
            }
          }}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          {onPressForward && (
            <IconButton aria-label="previous song" onClick={onPressForward}>
              <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
          )}
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            disabled={!loaded}
            onClick={() => {
              setPaused((cur) => {
                if (cur) {
                  audioRef.current?.play();
                } else {
                  audioRef.current?.pause();
                }

                return !cur;
              });
            }}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          {onPressNext && (
            <IconButton aria-label="next song" onClick={onPressNext}>
              <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
          )}
        </Box>
        <Stack
          spacing={3}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            onChange={(_, newValue) => {
              if (audioRef.current?.volume) {
                if (newValue === 0) {
                  audioRef.current.muted = true;
                } else {
                  audioRef.current.muted = false;
                  audioRef.current.volume = (newValue as number) / 100;
                }
              }
            }}
            sx={{
              color:
                theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&::before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
      {/* <WallPaper /> */}
    </Box>
  );
};

export default MusicPlayer;
