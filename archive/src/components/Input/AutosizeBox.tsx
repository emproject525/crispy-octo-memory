import React from 'react';
import {
  InputLabel,
  filledInputClasses,
  FormControl,
  TextFieldProps,
  Box,
  Typography,
  textFieldClasses,
  inputBaseClasses,
  useTheme,
  Chip,
  Stack,
} from '@mui/material';
import clsx from 'clsx';

const AutosizeBox = ({
  id,
  label,
  variant,
  value,
  size,
  keyword,
  keywordSeperator,
}: { value?: string; keyword?: boolean; keywordSeperator?: string } & Pick<
  TextFieldProps,
  'id' | 'label' | 'variant' | 'size'
>) => {
  const theme = useTheme();

  // 키워드
  const keywords: string[] = React.useMemo(() => {
    if (keyword && value && value !== '') {
      return (value || '').split(keywordSeperator || ' ');
    }

    return [];
  }, [keyword, keywordSeperator, value]);

  return (
    <FormControl
      size={size}
      variant={variant}
      fullWidth
      className={textFieldClasses.root}
      sx={{
        '&:active, &:focus, &:focus-within': {
          [`#${id}-box::before`]: {
            borderBottomColor: theme.palette.primary.main,
            borderWidth: '2px',
          },
          [`#${id}-box::after`]: {
            transform: 'scaleX(1) translateX(0)',
          },
          [`#${id}-box-label`]: {
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      {label && (
        <InputLabel
          id={`${id}-box-label`}
          htmlFor={`${id}-box`}
          size={size === 'small' ? 'small' : 'normal'}
          shrink
        >
          {label}
        </InputLabel>
      )}
      <Box
        id={`${id}-box`}
        className={clsx({
          [inputBaseClasses.root]: true,
          [filledInputClasses.root]: true,
          [filledInputClasses.underline]: true,
          [inputBaseClasses.sizeSmall]: size === 'small',
        })}
        tabIndex={-1}
        sx={{
          padding: '23px 12px 4px',
          lineHeight: '18px',
          bgcolor: 'rgba(255, 255, 255, 0.09)',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          '&::before': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.7)',
            left: 0,
            bottom: 0,
            content: '" "',
            position: 'absolute',
            right: 0,
            PointerEvent: 'none',
            transition:
              'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          },
          '&::after': {
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            left: 0,
            bottom: 0,
            content: '" "',
            position: 'absolute',
            right: 0,
            PointerEvent: 'none',
            transform: 'scaleX(0)',
            transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          },
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.13)',
          },
        }}
      >
        {keyword ? (
          keywords.length > 0 ? (
            <Stack direction="row" spacing={1}>
              {keywords.map((word, idx) => (
                <Chip key={`keyword-${idx}`} label={word} size="small" />
              ))}
            </Stack>
          ) : (
            <Typography
              variant="fs13"
              component="div"
              sx={{
                width: '100%',
                cursor: 'text',
                whiteSpace: 'pre-wrap',
              }}
              dangerouslySetInnerHTML={{
                __html: `&nbsp;`,
              }}
            />
          )
        ) : (
          <Typography
            variant="fs13"
            component="div"
            sx={{
              width: '100%',
              cursor: 'text',
              whiteSpace: 'pre-wrap',
            }}
            dangerouslySetInnerHTML={{
              __html: value || `&nbsp;`,
            }}
          />
        )}
      </Box>
    </FormControl>
  );
};

export default AutosizeBox;
