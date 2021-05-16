/* eslint-disable arrow-body-style */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from '../AppBar';
import Footer from '../Footer';

const styles = (theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    height: '100%',
    overflow: 'scroll',
    flex: 1,
    [theme.breakpoints.up('xs')]: {
      marginBottom: 20,
    },
    [theme.breakpoints.up('mobile')]: {
      marginBottom: 125,
    },
  },
});

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
      icon: r.icon,
    }));
  const { isLoading } = useAuth0();
  return (
    <div className={classes.root}>
      <AppBar
        routes={appBarRoutes}
        selected={selected}
        isLoading={isLoading}
      />
      <div className={classes.content}>
        {isLoading && (
          <CircularProgress color="secondary" />
        )}
        {!isLoading && (
          <>
            {children}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

AppLayout.propTypes = {};

AppLayout.defaultProps = {};

export default withStyles(styles)(AppLayout);
