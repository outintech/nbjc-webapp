/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {
  BrowserRouter as Router, Switch, Route, useRouteMatch,
} from 'react-router-dom';

import AppBar from './components/AppBar';
import NameContextProvider from './context/NameContext';

import theme from './theme';
import routes, { spaceRoutes, profileRoutes } from './routes';
// import CreateProfile from './components/CreateProfile/CreateProfile';
// import ProfileSubmitted from './components/ProfileSubmitted/ProfileSubmitted';

function Spaces() {
  const match = useRouteMatch();
  const spaceKeys = ['addSpace', 'addReview', 'spaceDetails', 'reviews'];
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

function Profiles() {
  const match = useRouteMatch();
  const profileKeys = ['createProfile', 'profileSubmitted'];
  return (
    <Switch>
      {profileRoutes.map((route) => (
        <Route
          key={`${match.path}${route.path}`}
          path={route.path}
          exact={route.exact === false ? false : true}
        >
          <AppBar
            routes={[...routes, ...profileRoutes].filter((r) => !r.skipAppBar).map((r) => ({
              label: r.label,
              path: (profileKeys.includes(r.key) ? `/profile/${r.path}` : r.path),
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
  const spaceKeys = ['addSpace', 'addReview', 'spaceDetails', 'reviews'];
  return (
    <>
      <NameContextProvider>
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
                {/* /spaces, /spaces/:id, /spaces/new, /spaces/ */}
                <Route path="/spaces">
                  <Spaces />
                </Route>
                {/* /login/create, /login/submitted */}
                <Route path="/login">
                  <Profiles />
                </Route>
              </Switch>
            </div>
          </ThemeProvider>
        </Router>
      </NameContextProvider>
    </>
  );
}

export default App;
