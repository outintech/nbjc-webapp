/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import AppLayout from './components/AppLayout';
import NameContextProvider from './context/NameContext';
import UserContextProvider from './context/UserContext';

import theme from './theme';
import routes, { spaceRoutes } from './routes';
import NotFound from './routes/NotFound';
import UnknownError from './routes/UnknownError';
import ErrorBoundary from './components/ErrorBoundary';

function Spaces() {
  const match = useRouteMatch();
  return (
    <Switch>
      {spaceRoutes.map((route) => (
        <Route
          key={`${match.path}${route.path}`}
          path={`${match.path}${route.path}`}
          exact={route.exact === false ? false : true}
        >
          <AppLayout
            routes={[...routes, ...spaceRoutes]}
            selected={route.key}
          >
            <ErrorBoundary>
              <route.content />
            </ErrorBoundary>
          </AppLayout>
        </Route>
      ))}
    </Switch>
  );
}

function App() {
  return (
    <>
      <UserContextProvider>
        <NameContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
              <Switch>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === false ? false : true}
                  >
                    <AppLayout
                      routes={[...routes, ...spaceRoutes]}
                      selected={route.key}
                    >
                      <ErrorBoundary>
                        <route.content />
                      </ErrorBoundary>
                    </AppLayout>
                  </Route>
                ))}
                {/* /spaces, /spaces/:id, /spaces/new, /spaces/ */}
                <Route path="/spaces">
                  <Spaces />
                </Route>
                <Route path="/500">
                  <AppLayout
                    routes={[...routes, ...spaceRoutes]}
                    selected={null}
                  >
                    <UnknownError />
                  </AppLayout>
                </Route>
                {/* Catch all 404 must remain at end */}
                <Route>
                  <AppLayout
                    routes={[...routes, ...spaceRoutes]}
                    selected={null}
                  >
                    <NotFound />
                  </AppLayout>
                </Route>
              </Switch>
            </div>
          </ThemeProvider>
        </NameContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
