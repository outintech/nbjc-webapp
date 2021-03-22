import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
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
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    width: 200,
  },
  break: {
    flexBasis: '100%',
    height: 25,
  },
});

const NotFound = ({ classes }) => {
  const matches = useMediaQuery('(min-width:376px)');
  let src = '/mobile-404.svg';
  if (matches) {
    src = '/web-404.svg';
  }
  return (
    <div className={classes.root}>
      <img src={src} alt="404 page" className={classes.image} />
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="secondary"
          align="center"
          fullWidth={!matches}
          href="/search"
          className={classes.button}
          disableElevation
        >
          Search for a space
        </Button>
        <div className={classes.break} />
        <Button
          variant="outlined"
          color="secondary"
          align="center"
          fullWidth={!matches}
          href="/"
          className={classes.button}
          disableElevation
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(NotFound);
