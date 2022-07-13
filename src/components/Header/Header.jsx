import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import SearchBar from '../SearchBar';
import useMobileDevice from '../../hooks/useMobileDevice';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    color: 'white',
    backgroundImage:
      'linear-gradient(#633AA3CC, #633AA3CC), url("/landing.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    [theme.breakpoints.up('xs')]: {
      height: 145,
    },
    [theme.breakpoints.up('md')]: {
      height: 262,
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
  },
});

const Header = ({ classes }) => {
  const [isMobileOrTablet] = useMobileDevice();
  return (
    <section className="hero-section">
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Typography
            variant={isMobileOrTablet ? 'body1' : 'h4'}
            gutterBottom
          >
            <b>Find spaces for Black Queer Folx</b>
          </Typography>
          <SearchBar />
        </Box>
      </Box>
    </section>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default withStyles(styles)(Header);
