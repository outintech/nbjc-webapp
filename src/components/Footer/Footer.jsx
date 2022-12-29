import React from 'react';

import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    backgroundColor: '#351F57',
    display: 'flex',
    color: '#FFFFFF',
    minHeight: 75,
    backgroundClip: 'padding-box',
    [theme.breakpoints.up('xs')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.up('mobile')]: {
      flexWrap: 'nowrap',
    },
  },
  info: {
    marginTop: 10,
    marginLeft: 20,
    paddingRight: 20,
    [theme.breakpoints.up('xs')]: {
      marginRight: 0,
      width: '100%',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  externalLink: {
    color: 'inherit',
    fontWeight: 600,
  },
  buttonLink: {
    color: 'inherit',
    fontWeight: 400,
    marginLeft: 10,
    marginRight: 10,
  },
});

const Footer = ({ classes }) => (
  <div className={classes.root}>
    <Grid container className={classes.info}>
      <Grid item xs={12} md={5}>
        <Typography variant="subtitle2">
          The Lavender Book is a crowd-sourced application created
          by the team at &nbsp;
          <a href="https://nbjc.org/" target="_blank" rel="noreferrer" className={classes.externalLink}>
            National Black Justice Coalition
          </a>
          &nbsp; and &nbsp;
          <a href="https://outintech.com/" target="_blank" rel="noreferrer" className={classes.externalLink}>
            Out in Tech
          </a>
        </Typography>
      </Grid>
      <Grid item>
        <NavLink to="/community-guidelines" className={classes.buttonLink}>
          Community Guidelines
        </NavLink>
      </Grid>
      <Grid item>
        <NavLink to="/terms-of-service" className={classes.buttonLink}>
          Terms of Service
        </NavLink>
      </Grid>
      <Grid item>
        <NavLink to="/infringement-policies" className={classes.buttonLink}>
          Infringement Policies
        </NavLink>
      </Grid>
      <Grid item>
        <a href="https://nbjc.org/privacy-policy/" rel="noreferrer" target="_blank" className={classes.buttonLink}>
          Privacy Policy
        </a>
      </Grid>
      <Grid item>
        <NavLink to="/donate" className={classes.buttonLink}>
          Donate
        </NavLink>
      </Grid>
      <Grid item>
        <Box>
          {`Copyright ${new Date().getFullYear()} NBJC`}
        </Box>
      </Grid>
    </Grid>
  </div>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default withStyles(styles)(Footer);
