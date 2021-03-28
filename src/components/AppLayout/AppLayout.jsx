/* eslint-disable arrow-body-style */
import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '../AppBar';
import Footer from '../Footer';

const styles = {};

const AppLayout = ({ children, routes, selected }) => {
  const appBarRoutes = routes
    .filter((r) => !r.skipAppBar)
    .map((r) => ({
      label: r.label,
      path: `/${r.prefix}${r.path}`,
      key: r.key,
      enforceLogin: r.enforceLogin,
      icon: r.icon,
    }));
  return (
    <>
      <AppBar
        routes={appBarRoutes}
        selected={selected}
      />
      {children}
      <Footer />
    </>
  );
};

AppLayout.propTypes = {};

AppLayout.defaultProps = {};

export default withStyles(styles)(AppLayout);
