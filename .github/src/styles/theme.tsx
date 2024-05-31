import { createTheme } from '@mui/material/styles';

// themePalette is used for inline style (e.g. style configuration in <DeepChat/>)
export const themePalette = {
  primary: {
    light: '#33AB9F',
    main: '#009688',
    dark: '#00695F',
  },
  secondary: {
    light: '#FFCF33',
    main: '#FFC400',
    dark: '#B28900',
  },
  grey: {
    100: '#F8F9FA',
    500: '#6C737F',
  },
};

const theme = createTheme({
  palette: themePalette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Default styles for the Button component
          borderRadius: '24px',
        },
      },
    },
  },
});

export default theme;

export const LIKE_BUTTON_COLOR = '#ff6d75';
