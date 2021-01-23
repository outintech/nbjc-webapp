import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router, Link, Switch, Route,
} from 'react-router-dom';

import AppBar from './components/AppBar';

import theme from './theme';
import routes from './routes';

function App() {
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
                  exact
                >
                  <AppBar
                    routes={routes}
                    selected={route.key}
                  />
                  <route.content />
                </Route>
              ))}
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
