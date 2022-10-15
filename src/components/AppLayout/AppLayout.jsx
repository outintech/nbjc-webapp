/* eslint-disable arrow-body-style */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
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
    flex: 1,
    [theme.breakpoints.up('xs')]: {
      margin: '10px 0px 20px 0px',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '20px 0px 125px 0px',
    },
  },
});

const AppLayout = ({
  children,
  routes,
  selected,
  classes,
}) => {
  const history = useHistory();
  const ifHome = history.location.pathname === '/';
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
      { ifHome && <Header /> }
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
