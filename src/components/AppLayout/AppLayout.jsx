/* eslint-disable arrow-body-style */
import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '../AppBar';
import Footer from '../Footer';

const styles = {
  root: {
    height: '100%',
  },
  content: {
    height: '100%',
    overflow: 'scroll',
    marginBottom: 125,
  },
};

const AppLayout = ({
  children,
  routes,
  selected,
  classes,
}) => {
  const appBarRoutes = routes
    .filter((r) => !r.skipAppBar)
    .map((r) => ({
      label: r.label,
      path: `${r.prefix}${r.path}`,
      key: r.key,
      enforceLogin: r.enforceLogin,
      icon: r.icon,
    }));
  return (
    <div className={classes.root}>
      <AppBar
        routes={appBarRoutes}
        selected={selected}
      />
      <div className={classes.content}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

AppLayout.propTypes = {};

AppLayout.defaultProps = {};

export default withStyles(styles)(AppLayout);
