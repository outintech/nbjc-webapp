import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';

import { useMediaQuery, withStyles } from '@material-ui/core';

import MaterialAppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

import { NameContext } from '../../context/NameContext';
import { UserContext } from '../../context/UserContext';

const styles = (theme) => ({
  root: {
    display: 'flex',
    height: 56,
    [theme.breakpoints.up('xs')]: {
      marginBottom: 20,
    },
    [theme.breakpoints.up('mobile')]: {
      marginBottom: 20,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.navBlack.main,
    color: theme.palette.navBlack.contrastText,
  },
  selected: {
    background: theme.palette.action.selected,
  },
  icons: {
    color: '#000',
  },
  drawer: {
    width: 375,
    flexShrink: 0,
    position: 'static !important',
    '& .MuiBackdrop-root': {
      zIndex: 1,
    },
  },
  drawerPaper: {
    width: 375,
  },
  avatar: {
    backgroundColor: '#ffffff',
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    marginLeft: 'auto',
    textTransform: 'uppercase',
  },
  svg: {
    flexGrow: 1,
    align: 'center',
  },
});

const AppBar = ({
  selected,
  classes,
  routes,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const nameContext = useContext(NameContext);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const pageTitle = (routes.find((item) => item.key === selected) || {}).label;

  const goBack = () => {
    history.goBack();
  };
  // if there is no username, the user might not be signed in
  // so fallback to icon
  let avatar = <PersonIcon color="primary" />;
  if (userContext.user.username) {
    avatar = userContext.user.username[0];
  }
  const showDrawerItems = () => routes.map((item) => {
    const otherProps = {
      selected: item.key === selected,
      color: item.key === selected ? 'primary' : 'inherit',
    };
    return (
      <ListItem
        button
        key={item.key}
        selected={otherProps.selected}
        className={cx({ [classes.selected]: otherProps.selected })}
        onClick={() => {
          setShowDrawer(false);
          history.push(item.path);
        }}
      >
        <ListItemIcon>
          <item.icon className={classes.icons} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={classes.icons} variant="subtitle2">
            {item.label}
          </Typography>
        </ListItemText>
      </ListItem>
    );
  });

  const NavIcons = () => {
    let appIcons;
    if (
      selected === 'spaceDetails'
      || selected === 'addReview'
      || selected === 'reviews'
    ) {
      appIcons = (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="go-back"
          onClick={goBack}
          data-testid="appbar-go-back"
        >
          <ArrowBackIos />
        </IconButton>
      );
    } else {
      appIcons = (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setShowDrawer(!showDrawer)}
          data-testid="appbar-menu"
        >
          <MenuIcon />
        </IconButton>
      );
    }
    return appIcons;
  };

  const Logo = () => {
    const matches = useMediaQuery('(min-width:376px)');
    // TODO replace with actual svg files
    if (matches) {
      return (
        <svg className={classes.svg} align="center" width="137" height="40" viewBox="0 0 137 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="136.238" height="40" fill="url(#pattern0)" />
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref="#image0" transform="scale(0.00290698 0.00990099)" />
            </pattern>
            <image id="image0" width="344" height="101" xlinkHref="data:image/png;base64,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" />
          </defs>
        </svg>
      );
    }
    return (
      <svg className={classes.svg} width="40" height="37" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="36.8539" fill="url(#pattern0)" />
        <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0" transform="scale(0.00561798 0.00609756)" />
          </pattern>
          <image id="image0" width="178" height="164" xlinkHref="data:image/png;base64,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" />
        </defs>
      </svg>
    );
  };

  return (
    <div className={classes.root} data-testid="app-bar">
      <MaterialAppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <NavIcons />
          <Typography variant="h6" data-testid="appbar-title">
            {pageTitle || nameContext.spaceTitle}
          </Typography>
          {pageTitle !== 'undefined' && pageTitle === 'Home' ? <Logo /> : null}
          <Avatar className={classes.avatar}>
            <Link href="/profile" underline="none">
              {avatar}
            </Link>
          </Avatar>
        </Toolbar>
      </MaterialAppBar>
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        data-testid="appbar-drawer"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
          backdrop: classes.backdrop,
        }}
      >
        <Toolbar />
        <List>{showDrawerItems()}</List>
      </Drawer>
    </div>
  );
};

AppBar.propTypes = {
  selected: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

AppBar.defaultProps = {
  selected: 'home',
};

export default withStyles(styles)(AppBar);
