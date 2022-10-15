import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
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
      maxWidth: '500px',
    },
    height: 'auto',
    display: 'inherit',
    margin: '0 auto',
  },
  buttonWrapper: {
    [theme.breakpoints.up('xs')]: {
      flexWrap: 'wrap-reverse',
    },
    [theme.breakpoints.up('mobile')]: {
      flexWrap: 'no-wrap',
    },
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'space-evenly',
  },
  button: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: '25px',
    },
    [theme.breakpoints.up('mobile')]: {
      marginBottom: '0px',
    },
    width: '250px',
  },
  break: {
    [theme.breakpoints.up('xs')]: {
      width: '0px',
    },
    [theme.breakpoints.up('mobile')]: {
      width: '25px',
    },
  },
});

const Home = ({ classes }) => {
  // since this is a copy heavy page
  // switch to smaller dimensions sooner
  const matches = useMediaQuery('(min-width:500px)');
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
        <Typography variant={variant} align="center">
          Welcome! The Lavender Book is a community-driven platform built for
          the Black Queer, Black Trans, and Black Gender Non-Binary
          communities.
        </Typography>
      </Box>
      <Box component="span" display="block" p={1} m={1}>
        <Typography variant={variant} align="center">
          Its mission is to spread the word about spaces where people can be
          themselves. All spaces and reviews are published by Lavender Book
          members.
        </Typography>
      </Box>
      <div className={classes.buttonWrapper}>
        <Button
          variant="outlined"
          color="primary"
          align="center"
          fullWidth={!matches}
          href="/spaces/new"
          className={classes.button}
          disableElevation
        >
          Add a Space
        </Button>
        <div className={classes.break} />
        <Button
          variant="contained"
          color="primary"
          align="center"
          fullWidth={!matches}
          href="/search"
          className={classes.button}
          disableElevation
        >
          Search for a Space
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
