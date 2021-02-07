import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  Button,
  TextField,
  Typography,
  InputLabel,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';

import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';

import { searchProps, chipType } from '../../types';

import ChipFilters from '../../components/ChipFilters';
import FilterDialog from '../../components/FilterDialog';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import { getCategories, getSpacesByName } from '../../api';

const styles = (theme) => ({
  form: {
    margin: '10px 0px',
  },
  filterWrapper: {
    display: 'flex',
    [theme.breakpoints.up('mobile')]: {
      flexWrap: 'wrap',
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
});

const SearchForm = ({
  classes,
  onSearch,
  onFilterApplied,
  searchCriteria,
  chips,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [formValues, setFormValues] = useState({
    name: '',
    location: '',
    category: {},
    indicators: chips.map((chip) => ({
      ...chip,
      isSelected: false,
    })),
  });

  const [openFilter, setOpenFilter] = useState(false);
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
    fetchData();
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
    if (
      formValues.name.length === 0
      && formValues.location.length === 0
      && formValues.category.length === 0
    ) {
      setShowError(true);
    } else {
      onSearch(formValues);
    }
  };

  const filters = {
    stars: searchCriteria.rating || 0,
    distance: searchCriteria.distance || 0,
    price: searchCriteria.price || 0,
  };

  const setFilters = (changedFilters) => {
    onFilterApplied('distance', changedFilters.distance);
    onFilterApplied('price', changedFilters.price);
    onFilterApplied('rating', changedFilters.stars);
  };
  return (
    <>
      <form className={classes.form} onSubmit={onSearchSubmit}>
        <Typography variant={matches ? 'h2' : 'h4'} align="center">
          Search for a Space
        </Typography>
        <Typography
          variant={matches ? 'h4' : 'subtitle1'}
          align="center"
        >
          Search for spaces by name, location, category, or attributes.
        </Typography>
        <InputLabel type="inputLabel" className={classes.inputLabel}>
          <Typography variant="h6">What&apos;s the space?</Typography>
        </InputLabel>
        <Autocomplete
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={spaceNames}
          style={{ width: 300 }}
          onChange={onNameChange}
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
          autoFocus
        />
        <InputLabel type="inputLabel" className={classes.inputLabel}>
          <Typography variant="h6">What type of Space are you looking for? </Typography>
        </InputLabel>
        <Autocomplete
          getOptionSelected={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={categories}
          style={{ width: 300 }}
          onChange={onCategoryChange}
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
              autoFocus
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
            />
          )}
        />

        <div className={classes.filterWrapper}>
          { false
            && (
            <FilterDialog
              open={openFilter}
              onClose={() => setOpenFilter(false)}
              onToggle={() => setOpenFilter(!openFilter)}
              defaultFilters={filters}
              setFilters={(changedFilters) => setFilters(changedFilters)}
              type={matches ? 'desktop' : 'mobile'}
              overrideClasses={{ root: classes.filterDialog }}
            />
            )}
          {!matches && false && (
            <FilterListOutlinedIcon
              onClick={() => setOpenFilter(true)}
              className={classes.filterButton}
            />
          )}
          <InputLabel type="inputLabel" className={classes.inputLabel}>
            <Typography variant="h6">Select all that apply</Typography>
          </InputLabel>
          <ChipFilters
            chips={formValues.indicators}
            onChipSelected={(i) => handleIndicatorSelect(chips[i].value)}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth={!matches}
          data-testid="search-searchform-submit"
          disableElevation
        >
          Search
        </Button>
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
};

SearchForm.defaultProps = {};

export default withStyles(styles)(SearchForm);
