import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  alert: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
  alertMessage: {
    display: 'flex',
    width: 344,
  },
  alertText: {
    display: 'inline-block',
  },
  supportButton: {
    display: 'inline-block',
    float: 'right',
    color: 'white',
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
});

const ErrorSnackbar = ({
  snackbarOpen,
  onClose,
  body,
  classes,
  showSupport,
}) => (
  <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={onClose}>
    <Alert
      onClose={onClose}
      severity="error"
      className={classes.alert}
      icon={false}
      classes={{ message: classes.alertMessage }}
    >
      <Typography variant="body2">{body}</Typography>
      {showSupport
        && (
        <Button
          className={classes.supportButton}
          href="/support"
          disableElevation
          disableRipple
        >
          Support
        </Button>
        )}
    </Alert>
  </Snackbar>
);

ErrorSnackbar.propTypes = {
  snackbarOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  showSupport: PropTypes.bool,
};

ErrorSnackbar.defaultProps = {
  showSupport: true,
};

export default withStyles(styles)(ErrorSnackbar);
