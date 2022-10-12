import React, { useState, useEffect } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

import { geolocated } from 'react-geolocated';

import { withStyles } from '@material-ui/core/styles';

import {
  Box,
  IconButton,
  TextField,
  Paper,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import States from '../../api/states';
import useSearch from '../../routes/Search/hooks/useSearch';

const filterOptions = createFilterOptions({
  limit: 5,
  trim: true,
});

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
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

const SearchBar = ({
  classes,
  coords,
  isGeolocationEnabled,
}) => {
  const history = useHistory();
  const placeholder = 'City, state, or zip code';
  const { promiseInProgress } = usePromiseTracker();
  const { userLocation } = useSearch({ userCoords: coords, isGeolocationEnabled });
  const geopositionLoading = promiseInProgress || (isGeolocationEnabled && coords === null);

  const [location, setLocation] = useState('');
  const [autofillWithBlankInput, setAutoFillWithBlankInput] = useState([]);
  const [autofillResults, setAutofillResults] = useState(autofillWithBlankInput);

  useEffect(() => {
    const userInput = location.toLowerCase().trim();
    if (userInput === '' && isGeolocationEnabled && !geopositionLoading) {
      setAutofillResults(autofillWithBlankInput);
    } else if (location) {
      const autofillArray = States.filter((obj) => obj.name.toLowerCase().includes(userInput));
      setAutofillResults(autofillArray);
    }
  }, [location]);

  useEffect(() => {
    if (isGeolocationEnabled && !geopositionLoading && userLocation !== null) {
      setAutoFillWithBlankInput([{ name: userLocation.address.city }]);
    }
  }, [geopositionLoading]);

  useEffect(() => {
    setAutofillResults(autofillWithBlankInput);
  }, [autofillWithBlankInput]);

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

  const parseLocationObjectToString = (obj) => {
    let locationObjString = `${obj.name}`;
    if (obj.abbreviation) {
      locationObjString += `, ${obj.abbreviation}`;
    }
    return locationObjString;
  };

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <Box className={classes.root}>
        <Autocomplete
          className={classes.input}
          options={autofillResults}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => parseLocationObjectToString(option)}
          onChange={(event, newLocation) => {
            setLocation(parseLocationObjectToString(newLocation));
          }}
          forcePopupIcon={false}
          disableClearable
          filterSelectedOptions
          filterOptions={filterOptions}
          renderOption={(props) => {
            const dropdownText = parseLocationObjectToString(props);
            return (
              <Box
                component="div"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                className={classes.dropdown}
              >
                <LocationOnIcon className={classes.icon} />
                {dropdownText}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              id="outlined-basic"
              variant="outlined"
              disableunderline="true"
              InputProps={{ ...params.InputProps, style: { padding: 5 } }}
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

export default geolocated({ positionOptions: { timeout: 5000 } })(withStyles(styles)(SearchBar));
