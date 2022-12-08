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
    backgroundColor: theme.palette.navWhite.light,
    color: theme.palette.navWhite.contrastText,
  },
  muiBreakpointWorkaround: {
    minHeight: 64,
  },
  links: {
    marginRight: '1rem',
    color: theme.palette.navWhite.textDark,
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
    flexGrow: 1,
    textAlign: 'left',
    marginRight: '0.3rem',
  },
  logoWithSearchBar: {
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
  searchBarWrapper: {
    flex: '1',
  },
  bottomRow: {
    display: 'flex',
    flexDirection: 'column',
  },
  mobileLogo: {
    flexGrow: 1,
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
    let conditionalClass = classes.logoWithSearchBar;
    if (path === '/' || (!isDesktopWidth && showSearchBar)) {
      conditionalClass = classes.logo;
    }
    return (
      <Box className={conditionalClass}>
        <NavLink to="/">
          <img src={logoSrc} alt="logo" />
        </NavLink>
      </Box>
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
      <Box>
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
      </Box>
    );
  };

  const AddASpace = () => {
    const matches = useMediaQuery('(min-width:426px)');
    return (
      <Box className={classes.navLinkBar}>
        <NavLink to="/spaces/new" className={classes.links} style={{ display: 'flex' }}>
          <AddCircleOutlineIcon className={classes.icons} fontSize="small" />
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
          {!isLoading ? (
            <Logo />
          ) : null}
          {(isDesktopWidth && showSearchBar)
            ? <Box className={classes.searchBarWrapper}><SearchBar /></Box> : null}
          <Box className={classes.navLinkBar}>
            <AddASpace />
            {userContext.userProfile.username ? <PositionedMenu /> : <LogIn />}
          </Box>
        </Toolbar>
        {(!isDesktopWidth && showSearchBar) ? (
          <Toolbar className={classes.muiBreakpointWorkaround}>
            <Box className={classes.searchBarWrapper}><SearchBar /></Box>
          </Toolbar>
        ) : null}
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
