const palette = {
  palette: {
    primary: {
      light: '#A96EB8',
      main: '#752A87',
      dark: '#480658',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#E083AA',
      main: '#AE3367',
      dark: '#720432',
      // contrastText: '#000000',
    },
    error: {
      main: '#B00020',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
};

export default palette;
