import React, { useState, useEffect } from 'react';

import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import States from '../../api/states';

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
    alignItems: 'left',
  },
  icon: {
    color: theme.palette.primary.main,
    display: 'flex',
  },
});

const SearchBar = ({ classes }) => {
  const history = useHistory();
  const title = 'Where';
  const placeholder = 'City, state, or zip code';
  // const ariaLabel = `Search ${placeholder}`;
  const [location, setLocation] = useState('');
  const [locationNames, setLocationNames] = useState([{ name: 'Current Location' }]);

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        const userInput = location.toLowerCase();
        let autofill = States.filter((obj) => (obj.name.toLowerCase().includes(userInput)));
        autofill = autofill.filter((obj) => obj.name.toLowerCase()[0] === userInput[0]);
        autofill = autofill.slice(0, 5);
        setLocationNames(autofill);
      }
    };
    fetchData();
    if (location === '') {
      setLocationNames([{ name: 'Current Location ' }]);
    }
  }, [location]);

  const handleTextInputChange = (event) => {
    setLocation(event.target.value);
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: '/search/results',
      search: `?searchTerm=&category=&location=${location}`,
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
        <Autocomplete
          options={locationNames}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => {
            let label = option.name;
            if (option.abbreviation) {
              label += `, ${option.abbreviation}`;
            }
            return label;
          }}
          onChange={(event, newLocation) => {
            if (newLocation.name && newLocation.abbreviation) {
              setLocation(`${newLocation.name}, ${newLocation.abbreviation}`);
            } else {
              setLocation(`${newLocation.name}`);
            }
          }}
          className={classes.input}
          forcePopupIcon={false}
          disableClearable
          renderOption={(props, options) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
            >
              <LocationOnIcon
                className={classes.icon}
              />
              {options.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              onChange={handleTextInputChange}
              placeholder={placeholder}
            />
          )}
        />
        <Box
          display="flex"
          data-testid="searchbar-submit"
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

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default withStyles(styles)(SearchBar);

/*
        <Autocomplete
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={locationNames}
          onChange={handleTextInputChange}
          className={classes.input}
          freeSolo
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              onChange={handleTextInputChange}
              placeholder={placeholder}
            />
          )}
        />
*/
