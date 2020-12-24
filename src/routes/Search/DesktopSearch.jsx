import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  OutlinedInput, InputAdornment, IconButton, Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { chipType } from '../../types';

import ChipFilters from '../../components/ChipFilters';
import FilterDialog from '../../components/FilterDialog';

const styles = {
  form: {
    margin: '80px 100px',
  },
  inputField: {
    marginBottom: 12,
  },
};

const DesktopSearch = ({ classes, chips, onSearch }) => {
  const defaultFilters = {
    stars: 0,
    price: 0,
    distance: 0,
  };
  const [searchText, setSearchText] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  // const [filtersActive, setFiltersActive] = useState(false);
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  return (
    <form onSubmit={onSearchSubmit} className={classes.form}>
      <OutlinedInput
        type="text"
        endAdornment={(
          <InputAdornment position="end">
            <IconButton>
              {searchText.length > 0 ? (
                <ClearOutlinedIcon onClick={() => setSearchText('')} />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </InputAdornment>
        )}
        startAdornment={(
          <InputAdornment position="start">
            <Typography variant="caption">Search</Typography>
          </InputAdornment>
        )}
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleChange}
        className={classes.inputField}
        placeholder="Coffee, Laptop Repair"
      />
      <FilterDialog
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        defaultFilters={filters}
        setFilters={(changedFilters) => setFilters(changedFilters)}
        type="desktop"
      />
      <ChipFilters chips={chips} onChipSelected={() => {}} />
    </form>
  );
};

DesktopSearch.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  chips: PropTypes.arrayOf(chipType),
  onSearch: PropTypes.func.isRequired,
};

DesktopSearch.defaultProps = {
  chips: [],
};

export default withStyles(styles)(DesktopSearch);
