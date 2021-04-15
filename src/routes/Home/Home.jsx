import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
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
  },
});

const Home = ({ classes }) => {
  const matches = useMediaQuery('(min-width:376px)');
  let src = '/mobile-home-icon.svg';
  let variant = 'h5';
  if (matches) {
    src = '/web-home-icon.svg';
    variant = 'h4';
  }

  return (
    <div className={classes.root}>
      <img src={src} alt="Home page" className={classes.image} />
      <Box component="span" display="block" p={1} m={1}>
        <Typography variant={variant}>
          Welcome! The Lavender Book is a community-driven platform built for the
          Black Queer, Black Trans, and Black Gender Non-Binary communities.
        </Typography>
      </Box>
      <Box component="span" display="block" p={1} m={1}>
        <Typography variant={variant}>
          It’s mission is to spread the word about spaces where people can be themselves.
          All spaces and reviews are published by Lavender Book members.
        </Typography>
      </Box>
    </div>
  );
};

export default withStyles(styles)(Home);
