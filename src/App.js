import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import logo from './logo.svg';
import './App.css';

import { palette } from './components/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={palette}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Button color="primary" variant="contained" disableElevation>Primary</Button>
            <Button variant="outlined">default</Button>
            <Button color="secondary">Secondary</Button>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              NBJC Webapp
            </a>
          </header>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
