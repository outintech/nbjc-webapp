import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { useMediaQuery, withStyles } from '@material-ui/core';

import MaterialAppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { UserContext } from '../../context/UserContext';

const styles = (theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      height: 56,
    },
    [theme.breakpoints.up('md')]: {
      height: 64,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.navBlack.light,
    color: theme.palette.navBlack.contrastText,
  },
  links: {
    marginRight: '0.15rem',
    color: theme.palette.navBlack.textDark,
  },
  icons: {
    color: '#000',
  },
  logo: {
    flexGrow: 1,
    textAlign: 'left',
    marginRight: '0.3rem',
  },
});

const AppBar = ({
  classes,
  isLoading,
}) => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const Logo = () => {
    const matches = useMediaQuery('(min-width:422px)');
    let logoSrc = '/mobile-appBar-logo.svg';
    if (matches) {
      logoSrc = '/web-appBar-logo.svg';
    }
    return (
      <div className={classes.logo}>
        <img src={logoSrc} alt="logo" />
      </div>
    );
  };

  const TruncateUserName = (userName) => {
    if (userName.length > 10) {
      return `${userName.slice(0, 10)}....`;
    }
    return userName;
  };

  const AddASpace = () => {
    const matches = useMediaQuery('(min-width:519px)');
    return matches ? (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        alignItems: 'center',
        alignSelf: 'right',
      }}
      >
        <AddCircleOutlineIcon className={classes.icons} fontSize="small" />
        <Button
          className={classes.links}
          style={{ backgroundColor: 'transparent', textTransform: 'none' }}
          onClick={() => {
            history.push({
              pathname: '/spaces/new',
            });
          }}
        >
          Add a Space
        </Button>
      </div>
    ) : (
      <Button
        className={classes.links}
        style={{ backgroundColor: 'transparent', textTransform: 'none' }}
        onClick={() => {
          history.push({
            pathname: '/spaces/new',
          });
        }}
      >
        <AddCircleOutlineIcon className={classes.icons} fontSize="small" />
      </Button>
    );
  };

  const LogIn = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right',
      alignItems: 'center',
      alignSelf: 'right',
    }}
    >
      <Button
        className={classes.links}
        style={{ backgroundColor: 'transparent', textTransform: 'none' }}
        onClick={() => {
          history.push({
            pathname: '/profile',
          });
        }}
      >
        {userContext.userProfile.username ? TruncateUserName(userContext.userProfile.username) : 'Log In'}
      </Button>
    </div>
  );

  return (
    <>
      <div className={classes.root} data-testid="app-bar">
        <MaterialAppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {!isLoading ? (
              <Logo />
            ) : null}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'right',
              alignItems: 'center',
              alignSelf: 'right',
            }}
            >
              <AddASpace />
              <LogIn />
              <Button
                className={classes.links}
                style={{ backgroundColor: 'transparent', textTransform: 'none' }}
                onClick={() => {
                  history.push({
                    pathname: '/',
                  });
                }}
              >
                Home
              </Button>
              <Button
                className={classes.links}
                style={{ backgroundColor: 'transparent', textTransform: 'none' }}
                onClick={() => {
                  setShowSupportDialog(true);
                }}
              >
                Support
              </Button>
            </div>
          </Toolbar>
        </MaterialAppBar>
      </div>
      <Dialog
        open={showSupportDialog}
        onClose={() => setShowSupportDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Leave The Lavender Book?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to leave The Lavender Book? You will be taken
            to Google Forms to contact Support.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSupportDialog(false)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              window.open('https://forms.gle/mLDNTMGxMojuiKKLA', '_blank');
              setShowSupportDialog(false);
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AppBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool,
};

AppBar.defaultProps = {
  isLoading: false,
};

export default withStyles(styles)(AppBar);
