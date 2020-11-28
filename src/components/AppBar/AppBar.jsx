import React from 'react';
import PropTypes from 'prop-types';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

const AppBar = ({ pageTitle }) => {
  return (
    <MaterialAppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          {pageTitle}
        </Typography>
      </Toolbar>
    </MaterialAppBar>
  );
};

AppBar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};
export default AppBar;