import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.navBlack.main,
    display: 'flex',
    color: theme.palette.navBlack.contrastText,
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
    paddingRight: 20,
    [theme.breakpoints.up('xs')]: {
      marginRight: 0,
      width: '100%',
    },
    [theme.breakpoints.up('mobile')]: {
      width: 'unset',
    },
    '& a': {
      fontWeight: 'bold',
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
      marginTop: 20,
      marginLeft: 'auto',
    },
  },
  externalLink: {
    // whiteSpace: 'nowrap',
    color: 'inherit',
  },
  link: {
    float: 'right',
    fontSize: 14,
    '& a': {
      color: 'inherit',
      marginRight: 20,
      whiteSpace: 'pre-wrap',
    },
    '& a:last-of-type': {
      marginRight: 0,
    },
  },
  copyright: {
    '&::before': {
      content: '""',
      marginRight: 10,
      marginLeft: 10,
      borderLeft: '1px solid white',
      whiteSpace: 'pre-wrap',
    },
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
      <Typography className={classes.link}>
        <a size="small" href="/community-guidelines" disableRipple disableFocusRipple disableTouchRipple>
          Community Guidelines
        </a>
        <a size="small" href="/terms-of-service" disableRipple disableFocusRipple disableTouchRipple>
          Terms of Services
        </a>
        <a size="small" href="https://nbjc.org/privacy-policy/" rel="noreferrer" target="_blank" disableRipple disableFocusRipple disableTouchRipple>
          Privacy Policy
        </a>
        <Box component="span" className={classes.copyright}>
          Copyright 2021 NBJC
        </Box>
      </Typography>
    </div>
  </div>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default withStyles(styles)(Footer);
