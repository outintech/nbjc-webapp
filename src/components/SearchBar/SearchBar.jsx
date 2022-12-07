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

const filterOptions = createFilterOptions({
  limit: 5,
  trim: true,
  stringify: (option) => option.name,
});

const styles = (theme) => ({
  root: {
    zIndex: 3,
    display: 'flex',
    height: '44px',
    boxShadow: 'none',
    alignItems: 'center',
    maxWidth: '584px',
    position: 'relative',
    width: '50%',
  },
  title: {
    padding: '0 0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
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
  autoCompleteContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
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

  useEffect(() => {
    if (isGeolocationEnabled && !geopositionLoading && userLocation.address !== undefined) {
      setAutoFillWithBlankInput([{ name: userLocation.address.city }]);
    }
  }, [geopositionLoading]);

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

  const parseLocationObjectToString = (obj) => (
    obj.abbreviation ? `${obj.name}, ${obj.abbreviation}` : obj.name
  );

  return (
    <Box className={classes.autoCompleteContainer}>
      <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
        <Autocomplete
          className={classes.input}
          options={location.trim() === '' ? autofillWithBlankInput : States}
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
            const dropdownIcon = location.trim() === '' ? <HomeIcon className={classes.icon} />
              : <LocationOnIcon className={classes.icon} />;
            return (
              <Box
                component="div"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                className={classes.dropdown}
              >
                {dropdownIcon}
                {dropdownText}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              variant="outlined"
              disableunderline="true"
              InputProps={{ ...params.InputProps, style: { padding: 5 } }}
              onChange={handleTextInputChange}
              placeholder={placeholder}
            />
          )}
        />
        <Box
          display="block"
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

      </Paper>
    </Box>

  );
};

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default geolocated({ positionOptions: { timeout: 5000 } })(withStyles(styles)(SearchBar));
