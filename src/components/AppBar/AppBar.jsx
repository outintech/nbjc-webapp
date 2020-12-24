import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const styles = {
  selected: {
    background: 'rgba(98, 0, 238, 0.08) !important',
  },
};

const AppBar = ({
  isLoggedIn, selected, classes, onNavigate,
}) => {
  const drawerItems = [{
    label: 'Home',
    link: '/home',
    icon: HomeIcon,
    key: 'home',
  }, {
    label: 'Search for a Space',
    link: '/search',
    icon: SearchIcon,
    key: 'search',
  }, {
    label: 'Add a space',
    link: '/space/new',
    icon: AddCircleOutlineIcon,
    key: 'addSpace',
  }, {
    label: 'Profile',
    link: '/profile',
    icon: PersonOutlineIcon,
    key: 'profile',
  }];

  const [showDrawer, setShowDrawer] = useState(false);
  const pageTitle = drawerItems.find((item) => item.key === selected).label;
  const showDrawerItems = () => (
    drawerItems.map((item) => {
      // todo: add injection security
      if (item.key === 'profile' && !isLoggedIn) {
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
          onClick={() => onNavigate(item)}
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
    })
  );

  return (
    <>
      <MaterialAppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setShowDrawer(!showDrawer)} data-testid="appbar-menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" data-testid="appbar-title">{pageTitle}</Typography>
        </Toolbar>
      </MaterialAppBar>
      <Drawer open={showDrawer} onClose={() => setShowDrawer(false)} data-testid="appbar-drawer">
        <List>
          {showDrawerItems()}
        </List>
      </Drawer>
    </>
  );
};

AppBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  selected: PropTypes.oneOf(['home', 'addSpace', 'search', 'profile']),
  classes: PropTypes.shape({}).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

AppBar.defaultProps = {
  selected: 'home',
  isLoggedIn: false,
};

export default withStyles(styles)(AppBar);
