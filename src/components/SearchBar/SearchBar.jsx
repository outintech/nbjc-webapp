import React, { useState, useEffect } from 'react';

import {
  Box,
  IconButton,
  TextField,
  Paper,
  // Typography,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import States from '../../api/states';

/*
.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
  padding: 5px;}
*/

// Or .MuiIconButton-root padding 16px

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
  dropdown: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
});

const SearchBar = ({ classes }) => {
  const history = useHistory();
  // const title = 'Where';
  const placeholder = 'City, state, or zip code';
  // const ariaLabel = `Search ${placeholder}`;

  const minResultsToDisplay = 1;
  const maxResultsToDisplay = 5;

  const [location, setLocation] = useState('');
  const [locationNames, setLocationNames] = useState([{ name: 'Current Location' }]);

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        const trimmedInput = location.trim().toLowerCase();
        const autofill = States.filter((obj) => obj.name.toLowerCase().includes(trimmedInput));
        setLocationNames(autofill.slice(minResultsToDisplay - 1, maxResultsToDisplay));
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
      search: `?searchTerm=&category=&location=${location.trim()}`,
    });
  };

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <Box className={classes.root}>
        <Autocomplete
          sx={{ p: '10px' }}
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
          filterSelectedOptions
          renderOption={(props) => {
            if (props.abbreviation) {
              const label = `${props.name}, ${props.abbreviation}`;
              return (
                <Box
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  className={classes.dropdown}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...props}
                >
                  <LocationOnIcon className={classes.icon} />
                  {label}
                </Box>
              );
            }
            return (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                className={classes.dropdown}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
              >
                <LocationOnIcon className={classes.icon} />
                {props.name}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              id="outlined-basic"
              label="Where"
              variant="outlined"
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
