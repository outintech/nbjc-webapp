import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, NavLink } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { useMediaQuery, withStyles } from '@material-ui/core';

import MaterialAppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LogoutIcon from '@material-ui/icons/ExitToApp';

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
    backgroundColor: theme.palette.navWhite.light,
    color: theme.palette.navWhite.contrastText,
  },
  links: {
    marginRight: '1rem',
    color: theme.palette.navWhite.textDark,
    fontWeight: 600,
    backgroundColor: 'transparent',
    textTransform: 'none',
    textDecoration: 'none',
  },
  icons: {
    color: '#000',
  },
  logo: {
    flexGrow: 1,
    textAlign: 'left',
    marginRight: '0.3rem',
  },
  navLinkBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    alignItems: 'center',
    alignSelf: 'right',
  },
});

const AppBar = ({
  classes,
  isLoading,
}) => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const { logout } = useAuth0();

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

  const PositionedMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const navigateToProfile = () => {
      history.push({
        pathname: '/profile',
      });
    };
    const signOut = () => {
      logout({
        returnTo: window.location.origin,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        federated: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?federated`,
      });
    };

    return (
      <div>
        <Button
          id="log-in-positioned-button"
          aria-controls={open ? 'log-in-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className={classes.links}
          onClick={handleClick}
        >
          {TruncateUserName(userContext.userProfile.username)}
        </Button>
        <Menu
          id="log-in-positioned-menu"
          aria-labelledby="log-in-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          PaperProps={{
            style: {
              background: '#EBE5F6',
            },
          }}
        >
          <MenuItem onClick={navigateToProfile}>
            <AccountCircleIcon />
            My Profile
          </MenuItem>
          <MenuItem onClick={signOut}>
            <LogoutIcon />
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const AddASpace = () => {
    const matches = useMediaQuery('(min-width:495px)');
    return matches ? (
      <div className={classes.navLinkBar}>
        <NavLink to="/spaces/new" className={classes.links} style={{ display: 'flex' }}>
          <AddCircleOutlineIcon className={classes.icons} fontSize="small" />
          Add a Space
        </NavLink>
      </div>
    ) : (
      <div className={classes.navLinkBar}>
        <NavLink to="/spaces/new" className={classes.links} style={{ display: 'flex' }}>
          <AddCircleOutlineIcon className={classes.icons} fontSize="small" />
        </NavLink>
      </div>
    );
  };

  const LogIn = () => (
    <div className={classes.navLinkBar}>
      <NavLink to="/profile" className={classes.links}>
        Log In
      </NavLink>
    </div>
  );

  return (
    <>
      <div className={classes.root} data-testid="app-bar">
        <MaterialAppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {!isLoading ? (<Logo />) : null}
            <div className={classes.navLinkBar}>
              <AddASpace />
              {userContext.userProfile.username ? <PositionedMenu /> : <LogIn />}
              <NavLink to="/" className={classes.links}>
                Home
              </NavLink>
              <Button
                className={classes.links}
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
