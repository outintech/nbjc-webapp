import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  pageTitle: {
    marginTop: 60,
    marginBottom: 28,
  },
  check: {
    [theme.breakpoints.up('xs')]: {
      width: 320,
    },
    [theme.breakpoints.up('mobile')]: {
      width: 480,
    },
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
  image: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('mobile')]: {
      width: '70%',
    },
    height: 'auto',
    display: 'inherit',
    margin: '0 auto',
  },
});

const Success = ({
  classes,
  title,
  subtitle,
  primaryButton,
  overrideClasses,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  return (
    <>
      <Typography variant={matches ? 'h2' : 'h4'} align="center" className={classes.pageTitle}>
        {title}
      </Typography>
      <div className={classes.check}>
        <img src="/success.svg" alt="Submisison Success" className={classes.image} />
      </div>
      <Typography variant={matches ? 'h4' : 'subtitle1'} align="center" className={classes.body}>
        {subtitle}
      </Typography>
      <div className={cx(classes.buttonWrapper, overrideClasses.buttonWrapper)}>
        {primaryButton && primaryButton(matches)}
        <Button
          variant={primaryButton ? 'outlined' : 'contained'}
          color="secondary"
          align="center"
          fullWidth={!matches}
          href="/search"
          disableElevation
          className={overrideClasses.secondaryButton}
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
  overrideClasses: PropTypes.shape({}),
};

Success.defaultProps = {
  title: 'Space Submitted',
  subtitle: 'Thank you for adding a space to OurGuide. An administrator will review your submission. Check back soon to see your space in the application.',
  primaryButton: undefined,
  overrideClasses: {},
};
export default withStyles(styles)(Success);
