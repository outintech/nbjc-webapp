import React from 'react';

import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.navWhite.dark,
    display: 'flex',
    color: theme.palette.navWhite.contrastText,
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
  },
  externalLink: {
    color: 'inherit',
    fontWeight: 600,
    textDecoration: 'none',
  },
  buttonLink: {
    color: 'inherit',
    fontWeight: 400,
  },
});

const Footer = ({ classes }) => {
  const history = useHistory();

  return (
    <div
      className={classes.root}
    >
      <Grid container className={classes.info} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <Button
            className={classes.buttonLink}
          >
            Community Guidelines
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.buttonLink}
            onClick={() => {
              history.push({
                pathname: '/terms-of-service',
              });
            }}
          >
            Terms of Service
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.buttonLink}
            onClick={() => {
              history.push({
                pathname: '/infringement-policies',
              });
            }}
          >
            Infringement Policy
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.buttonLink}
            href="https://nbjc.org/privacy-policy/"
            rel="noreferrer"
            target="_blank"
          >
            Privacy Policy
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.buttonLink}
          >
            Donate
          </Button>
        </Grid>
        <Grid item xs={1.5} md={1.5}>
          <Box>
            {`Copyright ${new Date().getFullYear()} NBJC`}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

Footer.propTypes = {};

Footer.defaultProps = {};

export default withStyles(styles)(Footer);
