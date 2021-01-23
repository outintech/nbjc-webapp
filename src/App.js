import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import { IndicatorProvider } from './providers/IndicatorContext';

import AppBar from './components/AppBar';

import theme from './theme';
import routes from './routes';

function App() {
  return (
    <>
      <Router>
        <IndicatorProvider>
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
        </IndicatorProvider>
      </Router>
    </>
  );
}

export default App;
