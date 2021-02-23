import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import MaterialAppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { ArrowBackIos } from '@material-ui/icons';

const styles = (theme) => ({
  root: {
    display: 'flex',
    height: 56,
    [theme.breakpoints.up('xs')]: {
      marginBottom: 20,
    },
    [theme.breakpoints.up('mobile')]: {
      marginBottom: 80,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  selected: {
    background: 'rgba(98, 0, 238, 0.08) !important',
  },
  drawer: {
    width: 375,
    flexShrink: 0,
    position: 'static !important',
  },
  drawerPaper: {
    width: 375,
  },
});

// eslint-disable-next-line
const AppBar = ({ isLoggedIn, selected, classes, routes }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const pageTitle = (routes.find((item) => item.key === selected) || {}).label;
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const showDrawerItems = () =>
    // eslint-disable-next-line
    routes.map((item) => {
      // todo: add injection security
      if (item.enforceLogin && !isLoggedIn) {
        return null;
      }
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
            <item.icon color={otherProps.color} />
          </ListItemIcon>
          <ListItemText>
            <Typography color={otherProps.color} variant="subtitle2">
              {item.label}
            </Typography>
          </ListItemText>
        </ListItem>
      );
    });
  // eslint-disable-next-line
  const NavIcons = () => {
    let appIcons;
    if (
      history.location.search.length > 0
      || selected === 'spaceDetails'
      || selected === 'addReview'
      || selected === 'review'
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

  return (
    <div className={classes.root}>
      <MaterialAppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <NavIcons />
          <Typography variant="h6" data-testid="appbar-title">
            {pageTitle}
          </Typography>
        </Toolbar>
      </MaterialAppBar>
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        data-testid="appbar-drawer"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <List>{showDrawerItems()}</List>
      </Drawer>
    </div>
  );
};

AppBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  selected: PropTypes.oneOf([
    'home',
    'addSpace',
    'search',
    'profile',
    'addReview',
    'spaceDetails',
    'reviews',
  ]),
  classes: PropTypes.shape({}).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      enforceLogin: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

AppBar.defaultProps = {
  selected: 'home',
  isLoggedIn: false,
};

export default withStyles(styles)(AppBar);
