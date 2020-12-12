import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';

import theme from './theme';
import { Home, Search } from './routes';

function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Link to="/">
              <Button color="primary" variant="contained" disableElevation>
                Home
              </Button>
            </Link>
            <Link to="/search">
              <Button color="primary" variant="contained" disableElevation>
                Search
              </Button>
            </Link>
          </div>
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
