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
import HomeIcon from '@material-ui/icons/Home';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import States from '../../api/states';
import useSearch from '../../routes/Search/hooks/useSearch';

const autoCompleteSettings = createFilterOptions({
  limit: 5,
  trim: true,
  stringify: (option) => option.name,
});

const styles = (theme) => ({
  root: {
    display: 'flex',
    maxHeight: '48px',
    height: '100%',
    alignItems: 'center',
    maxWidth: '584px',
    minWidth: '252px',
    width: '90%',
  },
  searchInput: {
    flex: 1,
  },
  dropdownIcon: {
    color: theme.palette.primary.main,
  },
  dropdownMenu: {
    display: 'flex',
    fontWeight: 'bold',
  },
  autoCompleteContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  submitButtonContainer: {
    color: 'white',
    backgroundColor: '#1E1131',
    minWidth: '48px',
  },
  removeTextFieldRadius: {  
    borderRadius: 0,
  },
  placeholderFont: {
    fontWeight: 500,
    color: '#999999',
    fontSize: '18px',
    lineHeight: '22px',
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
  const [userLocationAutocomplete, setUserLocationAutocomplete] = useState([]);

  useEffect(() => {
    try {
      setUserLocationAutocomplete([{ name: userLocation.address.city }]);
    } catch (e) {
      setUserLocationAutocomplete([]);
    }
  }, [geopositionLoading]);

  const handleTextInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: '/search/results',
      search: `?searchTerm=&category=&location=${location.trim()}`,
    });
  };

  const parseLocationObjectToString = (obj) => (
    obj.abbreviation ? `${obj.name}, ${obj.abbreviation}` : obj.name
  );

  return (
    <Box className={classes.autoCompleteContainer}>
      <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
        <Autocomplete
          className={classes.searchInput}
          options={location.trim() === '' ? userLocationAutocomplete : States}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => parseLocationObjectToString(option)}
          onChange={(event, selectedOption) => {
            setLocation(parseLocationObjectToString(selectedOption));
          }}
          forcePopupIcon={false}
          disableClearable
          filterOptions={autoCompleteSettings}
          renderOption={(props) => {
            const dropdownText = parseLocationObjectToString(props);
            const dropdownIcon = location.trim() === '' ? <HomeIcon className={classes.dropdownIcon} />
              : <LocationOnIcon className={classes.dropdownIcon} />;
            return (
              <Box className={classes.dropdownMenu}>
                {dropdownIcon}
                {dropdownText}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              // Padding is for lining up the gray outline of the textfield
              InputProps={{
                ...params.InputProps,
                style: { padding: 5 },
                classes: { root: classes.removeTextFieldRadius, input: classes.placeholderFont },
              }}
              variant="outlined"
              onChange={handleTextInputChange}
              placeholder={placeholder}
            />
          )}
        />
        <Box
          display="block"
          data-testid="searchbar-submit"
          className={classes.submitButtonContainer}
        >
          <IconButton
            type="submit"
            aria-label="search"
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default geolocated({ positionOptions: { timeout: 5000 } })(withStyles(styles)(SearchBar));
