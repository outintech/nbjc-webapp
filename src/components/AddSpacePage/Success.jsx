import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = () => ({
  pageTitle: {
    marginTop: 60,
    marginBottom: 28,
  },
  check: {
    width: 63,
    height: 63,
    margin: '0 auto',
  },
  body: {
    marginTop: 28,
    marginBottom: 60,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const Success = ({ classes }) => (
  <>
    <Typography variant="h4" align="center" className={classes.pageTitle}>
      Space Submitted
    </Typography>
    <div className={classes.check}>
      <CheckCircleIcon color="primary" className={classes.check} />
    </div>
    <Typography variant="subtitle1" align="center" className={classes.body}>
      Thank you for adding a space to OurGuide. An administrator will review
      your submission. Check back soon to see your space in the application.
    </Typography>
    <div className={classes.buttonWrapper}>
      <Button
        variant="contained"
        color="secondary"
        align="center"
        fullWidth={!useMediaQuery('(min-width:376px)')}
        href="/search"
        disableElevation
      >
        Search for a space
      </Button>
    </div>
  </>
);

Success.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Success.defaultProps = {};
export default withStyles(styles)(Success);
