import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';

import { searchProps } from '../../types';

import ChipFilters from '../../components/ChipFilters';
import FilterDialog from '../../components/FilterDialog';

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
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [searchText, setSearchText] = useState(searchCriteria.searchTerm || '');
  const [openFilter, setOpenFilter] = useState(false);
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
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

  const { chips } = searchCriteria;
  return (
    <form className={classes.form} onSubmit={onSearchSubmit}>
      <OutlinedInput
        type="text"
        endAdornment={(
          <InputAdornment position="end">
            <IconButton onClick={() => {
              if (searchText.length > 0) {
                setSearchText('');
                onSearch('');
              }
            }}
            >
              {searchText.length > 0 ? (
                <ClearOutlinedIcon />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </InputAdornment>
        )}
        variant="outlined"
        fullWidth
        style={{ margin: '8px 0px' }}
        value={searchText}
        onChange={handleChange}
        startAdornment={matches && (
          <InputAdornment position="start">
            <Typography variant="caption">Search</Typography>
          </InputAdornment>
        )}
        placeholder="Coffee, Laptop Repair"
        autoFocus
      />
      <div className={classes.filterWrapper}>
        <FilterDialog
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onToggle={() => setOpenFilter(!openFilter)}
          defaultFilters={filters}
          setFilters={(changedFilters) => setFilters(changedFilters)}
          type={matches ? 'desktop' : 'mobile'}
          overrideClasses={{ root: classes.filterDialog }}
        />
        {!matches && (
          <FilterListOutlinedIcon
            onClick={() => setOpenFilter(true)}
            className={classes.filterButton}
          />
        )}
        <ChipFilters
          chips={searchCriteria.chips}
          onChipSelected={(i) => onFilterApplied('indicators', chips[i].value)}
        />
      </div>
    </form>
  );
};

SearchForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onSearch: PropTypes.func.isRequired,
  onFilterApplied: PropTypes.func.isRequired,
  searchCriteria: PropTypes.shape(searchProps).isRequired,
};

SearchForm.defaultProps = {};

export default withStyles(styles)(SearchForm);
