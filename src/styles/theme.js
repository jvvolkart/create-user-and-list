import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: "#00a335",
    },
    background: {
      default: '#1E2141',
    },
  },
  colors: {
    primary: '#00a335',
  },
});

export default theme = responsiveFontSizes(theme);