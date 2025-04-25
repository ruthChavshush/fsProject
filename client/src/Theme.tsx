import { alpha, createTheme } from '@mui/material';
const CREAM = '#F7F3D9';
const PINK = '#FEAB97';
const BLUE = '#58C2C7';
export const LIGHT_CREAM = '#FBF8E3';

const theme = createTheme({
  breakpoints: {
    values: {
      lg: 1300,
      md: 900,
      sm: 600,
      xl: 1920,
      xs: 0,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '13px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: themeStyle => ({
        '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
          backgroundColor: alpha(themeStyle.palette.primary.main, 0.7),
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(themeStyle.palette.primary.main, 0.5),
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
          backgroundColor: alpha(themeStyle.palette.primary.main, 0.7),
        },
        '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
          backgroundColor: alpha(themeStyle.palette.primary.main, 0.7),
        },
        '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
          backgroundColor: alpha(themeStyle.palette.primary.main, 0.7),
        },
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          backgroundColor: themeStyle.palette.grey[200],
          height: '0.5rem',
          width: '0.5rem',
        },
      }),
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: LIGHT_CREAM,
        },
      },
    },
  },
  palette: {
    background: {
      default: CREAM,
      paper: CREAM,
    },
    error: {
      main: 'rgba(255, 84, 84, 1)',
    },
    grey: {
      '100': 'rgba(249, 250, 252, 1)',
      '200': 'rgba(245, 247, 253, 1)',
      '300': 'rgba(235, 238, 244, 1)',
      '400': 'rgba(194, 204, 223, 1)',
      '500': 'rgba(137, 137, 148, 1)',
      '600': 'rgba(108, 108, 122, 1)',
      '700': 'rgba(59, 59, 77, 1)',
    },
    primary: {
      // light: LIGHT_CREAM,
      main: PINK,
      contrastText: CREAM,
    },
    secondary: {
      main: BLUE,
    },
    success: {
      main: '#74E69B',
    },
    text: {
      disabled: 'rgba(137, 137, 148, 1)',
      primary: BLUE,
      secondary: 'rgba(108, 108, 122, 1)',
    },
    warning: {
      main: 'rgba(253, 205, 35, 1)',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'monospace',
    },
    body1: {
      fontSize: '1.1rem',
      fontWeight: '400',
      lineHeight: '1',
    },
    body2: {
      fontSize: '0.8em',
      fontWeight: '400',
    },
    caption: {
      fontSize: '0.8rem',
      fontWeight: '400',
    },
    h1: {
      fontSize: '1.6rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    h3: {
      fontSize: '1.4rem',
    },
    h4: {
      fontSize: '1.3rem',
    },
    h5: {
      fontSize: '1.2rem',
    },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: '500',
    },
  },
});

export default theme;
