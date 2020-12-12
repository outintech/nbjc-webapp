import React, { useState } from 'react';
import { OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';

import FilterDialog from '../../components/FilterDialog';

const MobileSearch = () => {
  const defaultFilters = {
    stars: 3,
    price: 2,
    distance: 5,
  };

  const [searchText, setSearchText] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <form>
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
          style={{ margin: 8 }}
          value={searchText}
          onChange={handleChange}
        />
        <FilterListOutlinedIcon onClick={() => setOpenFilter(true)} />
      </form>
      <FilterDialog
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        defaultFilters={filters}
        setFilters={(changedFilters) => setFilters(changedFilters)}
      />
    </>
  );
};

MobileSearch.propTypes = {};

export default MobileSearch;
