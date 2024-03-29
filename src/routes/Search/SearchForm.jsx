import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import {
  Button,
  TextField,
  Typography,
  InputLabel,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';

import { searchProps, chipType } from '../../types';

import ChipFilters from '../../components/ChipFilters';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import { getCategories, getSpacesByName } from '../../api';

const styles = (theme) => ({
  form: {
    margin: '10px 0px',
  },
  autocompleteField: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('mobile')]: {
      width: 326,
    },
  },
  location: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('mobile')]: {
      width: 326,
    },
  },
  filterButton: {
    margin: '10px 0px',
  },
  filterDialog: {
    [theme.breakpoints.up('mobile')]: {
      width: '100%',
      marginBottom: 40,
      marginTop: 10,
    },
  },
  submitButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 60,
    width: '100%',
  },
  submitButton: {
    [theme.breakpoints.up('mobile')]: {
      width: 250,
    },
  },
  header: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: 40,
    },
    [theme.breakpoints.up('mobile')]: {
      marginBottom: 60,
    },
  },
  inputLabel: {
    color: '#000000',
  },
});

const SearchForm = ({
  classes,
  onSearch,
  chips,
  location,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [formValues, setFormValues] = useState({
    name: undefined,
    location,
    category: undefined,
    indicators: chips.map((chip) => ({
      ...chip,
      isSelected: false,
    })),
  });

  useEffect(() => {
    if (location) {
      let locationString = '';
      if (location.city && location.state) {
        locationString = `${location.city}, ${location.state}`;
      }
      setFormValues({
        ...formValues,
        location: locationString,
      });
    }
  }, [location]);
  const [showError, setShowError] = useState(false);

  /** Start Name Autocomplete */
  const [nameText, setNameText] = useState('');
  const [spaceNames, setSpaceNames] = useState([]);
  const onNameTextChange = (e) => {
    setNameText(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await getSpacesByName({ name: nameText });
      setSpaceNames(result);
    };
    fetchData();
  }, [nameText]);
  const onNameChange = (e, value) => {
    if (value === null) {
      setNameText('');
    }
    setFormValues({
      ...formValues,
      name: value,
    });
  };
  /** End Name Autocomplete */

  /** Start Category Autocomplete */
  const [categoryText, setCategoryText] = useState('');
  const [categories, setCategories] = useState([]);

  const onCategoryTextChange = (e) => {
    setCategoryText(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCategories({ searchTerm: categoryText });
      setCategories(result);
    };
    if (categoryText.length) {
      fetchData();
    } else {
      setCategories([]);
    }
  }, [categoryText]);

  const onCategoryChange = (e, value) => {
    if (value === null) {
      setCategoryText('');
    }
    setFormValues({
      ...formValues,
      category: value,
    });
  };
  /** End Category Autocomplete */

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleIndicatorSelect = (value) => {
    setFormValues({
      ...formValues,
      indicators: formValues.indicators.map((chip) => ({
        ...chip,
        ...(chip.value === value
          ? { isSelected: !chip.isSelected }
          : {}),
      })),
    });
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const hasSelectedIndicators = formValues
      .indicators
      .filter((indicator) => indicator.isSelected);
    if (
      !(formValues.name || nameText)
      && !formValues.location
      && !(formValues.category || categoryText)
      && !(hasSelectedIndicators.length > 0)
    ) {
      setShowError(true);
    } else {
      // nameText/categoryText is present when the user
      // typed a free form name or category instead of choosing an
      // option from the dropdown value.
      let name = formValues.name || nameText;
      if (typeof name === 'string') {
        name = {
          name,
        };
      }
      let category = formValues.category || categoryText;
      if (typeof category === 'string') {
        category = {
          alias: category,
        };
      }
      onSearch({
        name,
        location: formValues.location,
        category,
        indicators: formValues.indicators,
      });
    }
  };
  return (
    <>
      <form className={classes.form} onSubmit={onSearchSubmit}>
        <header className={classes.header}>
          <Typography variant={matches ? 'h2' : 'h4'} align="center">
            Search for a Space
          </Typography>
          <Typography
            variant={matches ? 'h4' : 'subtitle1'}
            align="center"
          >
            Search for Spaces by name, location, category, or attributes.
          </Typography>
        </header>
        <InputLabel type="inputLabel" className={classes.inputLabel}>
          <Typography variant="h6">What&apos;s the Space?</Typography>
        </InputLabel>
        <Autocomplete
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={spaceNames}
          className={classes.autocompleteField}
          onChange={onNameChange}
          freeSolo
          renderInput={(params) => (
            <TextField
              type="text"
              variant="outlined"
              style={{ margin: '8px 0px' }}
              value={nameText}
              onChange={onNameTextChange}
              placeholder="Space Name"
              helperText="Optional"
              name="name"
              autoFocus
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
            />
          )}
        />
        <InputLabel type="inputLabel" className={classes.inputLabel}>
          <Typography variant="h6">Where are you looking?</Typography>
        </InputLabel>
        <TextField
          type="text"
          variant="outlined"
          fullWidth={!matches}
          style={{ margin: '8px 0px' }}
          value={formValues.location}
          onChange={handleChange}
          placeholder="City, State"
          helperText="Optional"
          name="location"
          className={classes.location}
        />
        <InputLabel type="inputLabel" className={classes.inputLabel}>
          <Typography variant="h6">What type of Space are you looking for? </Typography>
        </InputLabel>
        <Autocomplete
          getOptionSelected={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={categories}
          className={classes.autocompleteField}
          onChange={onCategoryChange}
          freeSolo
          renderInput={(params) => (
            <TextField
              type="text"
              variant="outlined"
              style={{ margin: '8px 0px' }}
              value={categoryText}
              onChange={onCategoryTextChange}
              placeholder="Space Category"
              helperText="Optional"
              name="category"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
            />
          )}
          renderOption={(option, { inputValue }) => {
            const textMatches = match(option.title, inputValue);
            const parts = parse(option.title, textMatches);
            return (
              <div>
                {parts.map((part) => (
                  <span key={part.text} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}
              </div>
            );
          }}
        />

        <div className={classes.filterWrapper}>
          <InputLabel type="inputLabel" className={classes.inputLabel}>
            <Typography variant="h6">Select all that apply</Typography>
          </InputLabel>
          <ChipFilters
            chips={formValues.indicators}
            onChipSelected={(i) => handleIndicatorSelect(chips[i].value)}
            chipSize="medium"
          />
        </div>
        <div className={classes.submitButtonWrapper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth={!matches}
            data-testid="search-searchform-submit"
            className={classes.submitButton}
            align="center"
            disableElevation
          >
            Search
          </Button>
        </div>
      </form>
      <ErrorSnackbar
        snackbarOpen={showError}
        onClose={() => setShowError(false)}
        body="You must enter at least one piece of infomration in order to search for a space."
        showSupport={false}
      />
    </>
  );
};

SearchForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onSearch: PropTypes.func.isRequired,
  onFilterApplied: PropTypes.func.isRequired,
  searchCriteria: PropTypes.shape(searchProps).isRequired,
  chips: PropTypes.arrayOf(PropTypes.shape(chipType)).isRequired,
  location: PropTypes.shape({}),
};

SearchForm.defaultProps = {
  location: {},
};

export default withStyles(styles)(SearchForm);
