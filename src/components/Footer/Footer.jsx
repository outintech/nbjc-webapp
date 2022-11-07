import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.navBlack.dark,
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
  buttonLink: {
    color: 'inherit',
    fontWeight: 400,
  },
});

const Footer = ({ classes }) => {
  const history = useHistory();

  return (
    <div className={classes.root} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
      <div className={classes.info}>
        <Typography className={classes.link} style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            className={classes.buttonLink}
            onClick={() => {
              history.push({
                pathname: '/community-guidelines',
              });
            }}
          >
            Community Guidelines
          </Button>
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
          <Button
            className={classes.buttonLink}
            href="https://nbjc.org/privacy-policy/"
            rel="noreferrer"
            target="_blank"
          >
            Privacy Policy
          </Button>
          <Button
            className={classes.buttonLink}
            onClick={() => {
              history.push({
                pathname: '/infringement-policies',
              });
            }}
          >
            Infringement Policies
          </Button>
          <Box component="span" className={classes.copyright}>
            {`Copyright ${new Date().getFullYear()} NBJC`}
          </Box>
        </Typography>
      </div>
    </div>
  );
};

Footer.propTypes = {};

Footer.defaultProps = {};

export default withStyles(styles)(Footer);
