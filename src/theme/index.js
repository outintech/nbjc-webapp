import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import buttons from './buttons';

const theme = createMuiTheme({
  ...palette,
  ...typography,
  ...breakpoints,
  ...buttons,
});

export default theme;
