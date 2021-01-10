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

const Success = ({
  classes,
  title,
  subtitle,
  primaryButton,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  return (
    <>
      <Typography variant={matches ? 'h2' : 'h4'} align="center" className={classes.pageTitle}>
        {title}
      </Typography>
      <div className={classes.check}>
        <CheckCircleIcon color="primary" className={classes.check} />
      </div>
      <Typography variant={matches ? 'h4' : 'subtitle1'} align="center" className={classes.body}>
        {subtitle}
      </Typography>
      <div className={classes.buttonWrapper}>
        {primaryButton && primaryButton(matches)}
        <Button
          variant="contained"
          color="secondary"
          align="center"
          fullWidth={!matches}
          href="/search"
          disableElevation
        >
          Search for a space
        </Button>
      </div>
    </>
  );
};

Success.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  primaryButton: PropTypes.func,
};

Success.defaultProps = {
  title: 'Space Submitted',
  subtitle: 'Thank you for adding a space to OurGuide. An administrator will review your submission. Check back soon to see your space in the application.',
  primaryButton: undefined,
};
export default withStyles(styles)(Success);
