import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';

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
      width: '85%',
    },
    height: 'auto',
    display: 'inherit',
    margin: '0 auto',
  },
});

const UnknownError = ({ classes }) => {
  const matches = useMediaQuery('(min-width:376px)');
  let src = './mobile-500.svg';
  if (matches) {
    src = './web-500.svg';
  }
  return (
    <div className={classes.root}>
      <img src={src} alt="500 page" className={classes.image} />
    </div>
  );
};

export default withStyles(styles)(UnknownError);
