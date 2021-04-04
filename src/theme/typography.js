import {
  omnesBold,
  omnesSemiBold,
  omnesMedium,
  omnes,
} from './omnes';

const typography = {
  typography: {
    fontFamily: 'Omnes',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          omnesBold,
          omnesSemiBold,
          omnesMedium,
          omnes,
        ],
      },
    },
  },
  h1: {
    fontWeight: 800,
    fontSize: 96,
  },
  h2: {
    fontWeight: 700,
    fontSize: 60,
  },
  h3: {
    fontWeight: 600,
    fontSize: 48,
  },
  h4: {
    fontWeight: 500,
    fontSize: 34,
  },
  h5: {
    fontWeight: 600,
    fontSize: 24,
  },
  h6: {
    fontWeight: 600,
    fontSize: 20,
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: 16,
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: 14,
  },
  body1: {
    fontWeight: 500,
    fontSize: 16,
  },
  body2: {
    fontWeight: 500,
    fontSize: 14,
  },
  button: {
    fontWeight: 600,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  allCaps: {
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  caption: {
    fontWeight: 500,
    fontSize: 12,
  },
  overline: {
    fontWeight: 500,
    fontSize: 10,
  },
};

export default typography;
