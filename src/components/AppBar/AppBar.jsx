import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, NavLink, useLocation } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { useMediaQuery, withStyles } from '@material-ui/core';
import MaterialAppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import SearchBar from '../SearchBar';
import { UserContext } from '../../context/UserContext';

const styles = (theme) => ({
  root: {
    display: 'flex',
    height: 64,
  },
  expandAppBar: {
    height: 128,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#FFFFFF',
    color: '#FFFFFF',
  },
  muiBreakpointWorkaround: {
    minHeight: 64,
  },
  links: {
    marginRight: '1rem',
    color: '#1E1131',
    fontSize: '1.1rem',
    fontWeight: 600,
    backgroundColor: 'transparent',
    textTransform: 'none',
    textDecoration: 'none',
  },
  icons: {
    color: '#000',
    fontSize: '1.5rem',
  },
  logo: {
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
  expandedContent: {
    flex: 1,
  },
});

const AppBar = ({
  classes,
  isLoading,
}) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const userContext = useContext(UserContext);
  const location = useLocation();
  const path = location.pathname;
  const history = useHistory();
  const isDesktopWidth = useMediaQuery('(min-width: 655px)');

  const { logout } = useAuth0();

  useEffect(() => {
    if (path === '/') {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
  }, [path]);

  const Logo = () => {
    const logoSrc = '/web-appBar-logo.svg';
    return (
      <Box className={(path === '/' || (!isDesktopWidth && showSearchBar))
        ? [classes.logo, classes.expandedContent] : classes.logo}
      >
        <NavLink to="/">
          <img src={logoSrc} alt="logo" />
        </NavLink>
      </Box>
    );
  };

  const TruncateUserName = (userName = 'Account') => {
    if (userName?.length > 10) {
      return `${userName.slice(0, 10)}....`;
    }
    return userName;
  };

  const LoggedInDropdown = () => {
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
      <Box>
        <Button
          id="log-in-positioned-button"
          aria-controls={open ? 'log-in-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className={classes.links}
          onClick={handleClick}
          data-testid="open-user-dropdown"
        >
          {TruncateUserName(userContext.userProfile.username)}
        </Button>
        <Menu
          id="log-in-positioned-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          data-testid="user-dropdown-menu"
          PaperProps={{
            style: {
              background: '#EBE5F6',
            },
          }}
          MenuListProps={{
            'aria-labelledby': 'log-in-positioned-button',
          }}
        >
          <MenuItem onClick={navigateToProfile} data-testid="profile-link">
            <AccountCircleIcon data-testid="profile-icon" />
            My Profile
          </MenuItem>
          <MenuItem onClick={signOut} data-testid="sign-out-link">
            <LogoutIcon data-testid="sign-out-icon" />
            Sign Out
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  const AddASpace = () => {
    const matches = useMediaQuery('(min-width:426px)');
    return (
      <Box className={classes.navLinkBar}>
        <NavLink to="/spaces/new" className={classes.links} style={{ display: 'flex' }} data-testid="add-a-space-link">
          <AddCircleOutlineIcon className={classes.icons} fontSize="small" data-testid="add-a-space-icon" />
          {matches ? 'Add a Space' : ''}
        </NavLink>
      </Box>
    );
  };

  const LogIn = () => (
    <Box className={classes.navLinkBar}>
      <NavLink to="/profile" className={classes.links}>
        Log In
      </NavLink>
    </Box>
  );

  return (
    <Box className={isDesktopWidth || !showSearchBar ? classes.root : [classes.root, classes.expandAppBar]} data-testid="app-bar">
      <MaterialAppBar position="fixed" className={[classes.appBar, classes.muiBreakpointWorkaround]}>
        <Toolbar className={classes.muiBreakpointWorkaround}>
          {!isLoading && <Logo />}
          {isDesktopWidth && showSearchBar
            && <Box className={classes.expandedContent}><SearchBar /></Box>}
          <Box className={classes.navLinkBar}>
            <AddASpace />
            {userContext.userProfile?.username ? <LoggedInDropdown /> : <LogIn />}
          </Box>
        </Toolbar>
        {!isDesktopWidth && showSearchBar
          && (
            <Toolbar className={classes.muiBreakpointWorkaround}>
              <Box className={classes.expandedContent}><SearchBar /></Box>
            </Toolbar>
          )}
      </MaterialAppBar>
    </Box>
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
