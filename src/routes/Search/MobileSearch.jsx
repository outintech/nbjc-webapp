import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';

import { chipType } from '../../types';

import ChipFilters from '../../components/ChipFilters';
import FilterDialog from '../../components/FilterDialog';

const styles = {
  form: {
    margin: '10px 0px',
  },
  filterWrapper: {
    display: 'flex',
  },
  filterButton: {
    margin: '10px 0px',
  },
};

const MobileSearch = ({
  classes, chips, onSearch,
}) => {
  const defaultFilters = {
    stars: 0,
    price: 0,
    distance: 0,
  };

  const [searchText, setSearchText] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };

  return (
    <>
      <form className={classes.form} onSubmit={onSearchSubmit}>
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
          variant="outlined"
          fullWidth
          style={{ margin: '8px 0px' }}
          value={searchText}
          onChange={handleChange}
        />
        <div className={classes.filterWrapper}>
          <FilterListOutlinedIcon
            onClick={() => setOpenFilter(true)}
            className={classes.filterButton}
          />
          <ChipFilters chips={chips} onChipSelected={() => {}} />
        </div>
      </form>
      <div>
        <FilterDialog
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          defaultFilters={filters}
          setFilters={(changedFilters) => setFilters(changedFilters)}
        />
      </div>
    </>
  );
};

MobileSearch.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  chips: PropTypes.arrayOf(chipType),
  onSearch: PropTypes.func.isRequired,
};

MobileSearch.defaultProps = {
  chips: [],
};

export default withStyles(styles)(MobileSearch);
