import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import SearchBar from '../SearchBar';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    color: 'white',
    backgroundImage:
      'linear-gradient(#633AA3CC, #633AA3CC), url("/landing.png")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',

    [theme.breakpoints.up('xs')]: {
      height: 190,
    },
    [theme.breakpoints.up('md')]: {
      height: 262,
    },
    [theme.breakpoints.down('xs')]: {
      height: 145,
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
  },
  title: {
    [theme.breakpoints.up('xs')]: {
      fontSize: '2.125rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.875rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '20.5px',
    },
    fontWeight: 700,
    lineHeight: '1.235',
    marginBottom: '.6em',
    width: 'auto',
    textAlign: 'center',
  },
});

const Header = ({ classes }) => (
  <section>
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography
          variant="h1"
          gutterBottom
          className={classes.title}
        >
          Find Affirming Spaces for Black Queer, Trans, and Non-Binary/Non-Conforming Folx
        </Typography>
        <SearchBar />
      </Box>
    </Box>
  </section>
);

Header.propTypes = {};

Header.defaultProps = {};

export default withStyles(styles)(Header);
