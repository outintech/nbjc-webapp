const palette = {
  palette: {
    primary: {
      light: '#DBC1FA',
      main: '#633AA3',
      dark: '#633AA3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#DBC1FA',
      main: '#8665aE',
      dark: '#8665aE',
      contrastText: '#000000',
    },
    error: {
      main: '#B00020',
    },
    action: {
      selected: '#DBC1FA',
      hover: '#DBC1FA',
    },
    navBlack: {
      light: '#FFFFFF',
      main: '#000000',
      dark: '#000000',
      textDark: '#1E1131',
      contrastText: '#FFFFFF',
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
