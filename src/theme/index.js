import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';

const theme = createMuiTheme({
  ...palette,
  ...typography,
  ...breakpoints,
});

export default theme;
