import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

// todo: change this to tertiary color (black)
const styles = (theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    color: theme.palette.primary.contrastText,
    minHeight: 75,
    width: '100%',
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
    [theme.breakpoints.up('xs')]: {
      marginRight: 0,
      width: '100%',
    },
    [theme.breakpoints.up('mobile')]: {
      width: 'unset',
    },
  },
  links: {
    display: 'flex',
    marginRight: 20,
    [theme.breakpoints.up('xs')]: {
      marginTop: 10,
      marginLeft: 20,
    },
    [theme.breakpoints.up('mobile')]: {
      marginTop: 0,
      marginLeft: 'auto',
    },
  },
  externalLink: {
    // whiteSpace: 'nowrap',
    color: 'inherit',
  },
  link: {
    float: 'right',
    '& a': {
      color: 'inherit',
      marginRight: 20,
    },
  },
  divider: {
    height: 20,
    marginRight: 5,
    backgroundColor: theme.palette.primary.contrastText,
    display: 'inline',
  },
  copyright: {
    whiteSpace: 'nowrap',
  },
});

const Footer = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.info}>
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
    </div>
    <div className={classes.links}>
      <Typography variant="overline" className={classes.link}>
        <a size="small" href="/community-guidelines" disableRipple disableFocusRipple disableTouchRipple>
          Community Guidelines
        </a>
        <a size="small" href="/tos" disableRipple disableFocusRipple disableTouchRipple>
          Terms of Services
        </a>
        <a size="small" href="/privacy-policy" disableRipple disableFocusRipple disableTouchRipple>
          Privacy Policy
        </a>
        <Divider orientation="vertical" className={classes.divider} />
        Copyright 2021 NBJC
      </Typography>
    </div>
  </div>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default withStyles(styles)(Footer);
