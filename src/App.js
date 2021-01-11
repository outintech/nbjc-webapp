/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {
  BrowserRouter as Router, Switch, Route, useRouteMatch,
} from 'react-router-dom';

import AppBar from './components/AppBar';

import theme from './theme';
import routes, { spaceRoutes } from './routes';

function Spaces() {
  const match = useRouteMatch();
  const spaceKeys = ['addSpace', 'addReview'];
  return (
    <Switch>
      {spaceRoutes.map((route) => (
        <Route
          key={`${match.path}${route.path}`}
          path={`${match.path}${route.path}`}
          exact={route.exact === false ? false : true}
        >
          <AppBar
            routes={[...routes, ...spaceRoutes].filter((r) => !r.skipAppBar).map((r) => ({
              label: r.label,
              path: (spaceKeys.includes(r.key) ? `/spaces${r.path}` : r.path),
              key: r.key,
              enforceLogin: r.enforceLogin,
              icon: r.icon,
            }))}
            selected={route.key}
          />
          <route.content />
        </Route>
      ))}
    </Switch>
  );
}

function App() {
  console.log([...routes, ...spaceRoutes].filter((r) => !r.skipAppBar));
  const spaceKeys = ['addSpace', 'addReview'];
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact === false ? false : true}
                >
                  <AppBar
                    routes={[...routes, ...spaceRoutes].filter((r) => !r.skipAppBar).map((r) => ({
                      label: r.label,
                      path: (spaceKeys.includes(r.key) ? `/spaces${r.path}` : r.path),
                      key: r.key,
                      enforceLogin: r.enforceLogin,
                      icon: r.icon,
                    }))}
                    selected={route.key}
                  />
                  <route.content />
                </Route>
              ))}
              <Route path="/spaces">
                <Spaces />
              </Route>
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
