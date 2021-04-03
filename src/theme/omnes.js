import OmnesBoldWoff2 from './fonts/Omnes-Bold.woff2';
import OmnesSemiBoldWoff2 from './fonts/Omnes-SemiBold.woff2';
import OmnesMediumWoff2 from './fonts/Omnes-Medium.woff2';
import OmnesWoff2 from './fonts/Omnes-Regular.woff2';

const omnes = {
  fontFamily: 'Omnes',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Omnes'),
    local('Omnes-Regular'),
    url(${OmnesWoff2}) format('woff2'),
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const omnesBold = {
  fontFamily: 'Omnes',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('Omnes'),
    local('Omnes-Bold'),
    url(${OmnesBoldWoff2}) format('woff2'),
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const omnesSemiBold = {
  fontFamily: 'Omnes',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Omnes'),
    local('Omnes-SemiBold'),
    url(${OmnesSemiBoldWoff2}) format('woff2'),
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const omnesMedium = {
  fontFamily: 'Omnes',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Omnes'),
    local('Omnes-Medium'),
    url(${OmnesMediumWoff2}) format('woff2'),
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export {
  omnesBold,
  omnesSemiBold,
  omnesMedium,
  omnes,
};
