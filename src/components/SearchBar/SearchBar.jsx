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
import Autocomplete from '@material-ui/lab/Autocomplete';

import States from '../../api/states';
import useSearch from '../../routes/Search/hooks/useSearch';

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

  const minResultsToDisplay = 1;
  const maxResultsToDisplay = 5;

  const [location, setLocation] = useState('');
  const [autofillWithBlankInput, setAutoFillWithBlankInput] = useState([]);
  const [autofillResults, setAutofillResults] = useState(autofillWithBlankInput);

  useEffect(() => {
    if (location === '' && isGeolocationEnabled && !geopositionLoading) {
      setAutofillResults(autofillWithBlankInput);
    } else if (location) {
      const userInput = location.trim().toLowerCase();
      const autofillArray = States.filter((obj) => obj.name.toLowerCase().includes(userInput));
      setAutofillResults(autofillArray.slice(minResultsToDisplay - 1, maxResultsToDisplay));
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

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <Box className={classes.root}>
        <Autocomplete
          className={classes.input}
          options={autofillResults}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => {
            let label = option.name;
            if (option.abbreviation) {
              label += `, ${option.abbreviation}`;
            }
            return label;
          }}
          onChange={(event, newLocation) => {
            if (newLocation.name === 'Current Location' && !geopositionLoading && isGeolocationEnabled) {
              setLocation(userLocation.address.city);
            } else if (newLocation.abbreviation) {
              setLocation(`${newLocation.name}, ${newLocation.abbreviation}`);
            } else {
              setLocation(`${newLocation.name}`);
            }
          }}
          forcePopupIcon={false}
          disableClearable
          filterSelectedOptions
          renderOption={(props) => {
            let dropdownText = `${props.name}`;
            if (props.abbreviation) {
              dropdownText += `, ${props.abbreviation}`;
            }
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
