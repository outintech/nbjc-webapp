import React from 'react';
import PropTypes from 'prop-types';
import { geolocated, geoPropTypes } from 'react-geolocated';
import cx from 'classnames';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

import BusinessCard from '../../components/BusinessCard';

import useSearch from './hooks/useSearch';
import SearchForm from './SearchForm';

const styles = (theme) => ({
  result: {
    margin: '10px 0px 40px 0px',
  },
  content: {
    margin: '0 15px',
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
  },
  searchResultsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 350px)',
    gridGap: 50,
  },
  searchResult: {
    [theme.breakpoints.up('xs')]: {
      maxWidth: '350px',
    },
    [theme.breakpoints.up('mobile')]: {
      width: '100%',
    },
  },
});

const Search = ({ classes, coords }) => {
  const matches = useMediaQuery('(min-width:376px)');
  const { updateSearch, search, searchResults } = useSearch({ useLocation: coords });

  const onSearchSubmit = async (searchTerm) => {
    updateSearch('searchTerm', searchTerm);
  };

  const onFilterApplied = (filter, value) => {
    updateSearch(filter, value);
  };

  return (
    <div className={classes.content}>
      <SearchForm
        chips={search.chips}
        onSearch={onSearchSubmit}
        onFilterApplied={onFilterApplied}
        searchCriteria={search}
      />
      <div
        className={cx(classes.resultsWrapper, {
          [classes.desktop]: matches,
        })}
      >
        {searchResults.length > 0 && (
          <Typography variant="h6">
            {`${searchResults.length} results found for ${search.searchTerm}`}
          </Typography>
        )}
        <div className={classes.searchResultsWrapper}>
          {searchResults.length > 0
            && searchResults.map((result) => (
              <div className={classes.searchResult}>
                <BusinessCard
                  business={result}
                  key={result.id}
                  overrideClasses={{ root: classes.result }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

Search.props = {
  classes: PropTypes.shape({}),
};

Search.props = { ...Search.props, ...geoPropTypes };

export default geolocated()(withStyles(styles)(Search));
