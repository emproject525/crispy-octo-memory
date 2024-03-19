import { alpha, PaletteMode, tableRowClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import palette from './palette';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // 0px ~ 599px
    sm: true; // 600px ~ 899px
    md: true; // 900px ~ 1399px
    lg: true; // 1400px ~ 1919px
    xl: true; // 1920px ~
  }
  interface TypographyVariants {
    fs10: React.CSSProperties;
    fs11: React.CSSProperties;
    fs12: React.CSSProperties;
    fs13: React.CSSProperties;
    fs14: React.CSSProperties;
    fs15: React.CSSProperties;
    fs16: React.CSSProperties;
    fs17: React.CSSProperties;
    fs18: React.CSSProperties;
    fs19: React.CSSProperties;
    fs20: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    fs10?: React.CSSProperties;
    fs11?: React.CSSProperties;
    fs12?: React.CSSProperties;
    fs13?: React.CSSProperties;
    fs14?: React.CSSProperties;
    fs15?: React.CSSProperties;
    fs16?: React.CSSProperties;
    fs17?: React.CSSProperties;
    fs18?: React.CSSProperties;
    fs19?: React.CSSProperties;
    fs20?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    fs10: true;
    fs11: true;
    fs12: true;
    fs13: true;
    fs14: true;
    fs15: true;
    fs16: true;
    fs17: true;
    fs18: true;
    fs19: true;
    fs20: true;
  }
}

/**
 * Theme
 */
const theme = (mode: PaletteMode) => {
  const color = createTheme({ palette: palette[mode] }).palette;

  return createTheme({
    spacing: 4,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1400,
        xl: 1920,
      },
    },
    typography: {
      fontFamily: [
        'Pretendard',
        'sans-serif',
        '-apple-system',
        '맑은 고딕',
      ].join(','),
      h3: {
        fontSize: 16,
        lineHeight: 'normal',
      },
      fs10: {
        fontFamily: 'Pretendard',
        fontSize: 10,
      },
      fs11: {
        fontFamily: 'Pretendard',
        fontSize: 11,
      },
      fs12: {
        fontFamily: 'Pretendard',
        fontSize: 12,
      },
      fs13: {
        fontFamily: 'Pretendard',
        fontSize: 13,
      },
      fs14: {
        fontFamily: 'Pretendard',
        fontSize: 14,
      },
      fs15: {
        fontFamily: 'Pretendard',
        fontSize: 15,
      },
      fs16: {
        fontFamily: 'Pretendard',
        fontSize: 16,
      },
      fs17: {
        fontFamily: 'Pretendard',
        fontSize: 17,
      },
      fs18: {
        fontFamily: 'Pretendard',
        fontSize: 18,
        lineHeight: '18px',
      },
      fs19: {
        fontFamily: 'Pretendard',
        fontSize: 19,
        lineHeight: '18px',
      },
      fs20: {
        fontFamily: 'Pretendard',
        fontSize: 20,
        lineHeight: '18px',
      },
      allVariants: {
        fontFamily: 'Pretendard',
        letterSpacing: 0,
      },
    },
    palette: palette[mode],
    components: {
      /**
       * MuiPaper
       */
      MuiPaper: {
        styleOverrides: {
          root: {},
          rounded: {
            borderRadius: 20,
            padding: 20,
          },
        },
      },
      /**
       * MuiTypography
       */
      MuiTypography: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              '::selection': {
                backgroundColor: '#c68146',
              },
            }),
          },
        },
      },
      /**
       * MuiInputBase
       */
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: 13,
          },
        },
      },
      /**
       * MuiFilledInput
       */
      MuiFilledInput: {
        styleOverrides: {
          root: {
            lineHeight: '18px',
          },
        },
      },
      /**
       * MuiInputLabel
       */
      MuiInputLabel: {
        styleOverrides: {
          filled: {
            color: 'success.main',
            ':not(.MuiInputLabel-shrink)': {
              fontSize: '13px',
            },
          },
        },
      },
      /**
       * MuiFormControlLabel
       */
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
          label: {
            fontSize: 13,
          },
        },
      },
      /**
       * MuiCheckbox
       */
      MuiCheckbox: {
        styleOverrides: {
          sizeSmall: {
            padding: 6,
          },
        },
      },
      /**
       * MuiTooltip
       */
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 12,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            color: 'white',
          },
          arrow: {
            color: 'rgba(0, 0, 0, 0.65)',
          },
        },
      },
      /**
       * MuiTableRow
       */
      MuiTableRow: {
        styleOverrides: {
          root: {
            [`&:nth-of-type(odd):not(.${tableRowClasses.head}, :hover)`]: {
              backgroundColor: alpha(color.action?.hover, 0.03),
            },
            // hide last border
            // '&:last-child td, &:last-child th': {
            //   border: 0,
            // },
          },
        },
      },
      /**
       * MuiTableCell
       */
      MuiTableCell: {
        styleOverrides: {
          root: {
            // backgroundColor: color.background?.paper,
          },
        },
      },
    },
  });
};

export default theme;
