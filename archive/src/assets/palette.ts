import { PaletteMode, PaletteOptions } from '@mui/material';

const grey = {
  100: '#f5f5f5',
  200: '#eaeced',
  300: '#e1e3eb',
  400: '#b9bdc7',
  500: '#9da1ab',
  600: '#5c6887',
  700: '#47516b',
  800: '#313148',
  900: '#232337',
};

/**
 * palette
 */
const palette: Record<PaletteMode, PaletteOptions> = {
  light: {
    mode: 'light',
    background: {
      default: '#fff',
      paper: grey[100],
    },
    action: {
      disabledBackground: '',
      // disabledBorderColor: grey[300],
      // disabledBorderColor: '#d0d1d5',
      // disabled: '#eaeced',
      disabled: '#eceef2',
      disabledOpacity: 1,
      active: '#212529',
    },
    text: {
      disabled: '#313148',
    },
    search: {
      main: '#333348',
      contrastText: '#ffffff',
    },
    primary: {
      main: '#a42082',
      light: 'rgb(179, 136, 255)',
    },
    secondary: {
      main: '#1f8068',
      light: '#1f8068',
    },
    success: {
      main: '#66bb6a',
      contrastText: '#efefef',
    },
    common: {
      black: '#313148',
      white: '#fff',
    },
    grey,
  },
  dark: {
    mode: 'dark',
    background: {
      default: '#1B1B10',
      paper: '#21272E',
    },
    action: {
      disabledBackground: '',
      disabled: '#eaeced',
      disabledOpacity: 1,
    },
    text: {
      disabled: '#eaeced',
    },
    search: {
      main: '#d6d6d6',
      contrastText: '#333348',
    },
    success: {
      main: '#66bb6a',
      contrastText: '#efefef',
    },
    common: {
      black: '#fff',
      white: '#313148',
    },
    grey: {
      100: '#232337',
      200: '#313148',
      300: '#47516b',
      400: '#5c6887',
      500: '#9da1ab',
      600: '#b9bdc7',
      700: '#e1e3eb',
      800: '#eaeced',
      900: '#f5f5f5',
    },
  },
};

export default palette;
