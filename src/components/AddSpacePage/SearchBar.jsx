import React, { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    // width: theme.spacing(80),
    [theme.breakpoints.up('xs')]: {
      width: theme.spacing(34),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(45),
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(80),
    },
  },
  title: {
    padding: '0 0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
  },
});

const SearchBar = ({ classes }) => {
  const history = useHistory();
  const title = 'Where';
  const placeholder = 'City, state, or zip code';
  const ariaLabel = `Search ${placeholder}`;
  const [location, setLocation] = useState('');

  const handleTextInputChange = (event) => {
    setLocation(event.target.value);
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: '/search/results',
      search: `?location=${location.toString()}`,
    });
  };

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <Box className={classes.root}>
        <Typography
          className={classes.title}
          color="secondary"
          style={{ fontWeight: 'bolder' }}
        >
          {title}
        </Typography>
        <InputBase
          className={classes.input}
          placeholder={placeholder}
          inputProps={{ 'aria-label': ariaLabel }}
          value={location}
          onChange={handleTextInputChange}
        />
        <Box
          display="flex"
          style={{ color: 'white', backgroundColor: '#1E1131' }}
        >
          <IconButton
            type="submit"
            sx={{ p: '10px' }}
            aria-label="search"
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default withStyles(styles)(SearchBar);
