/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { geolocated, geoPropTypes } from 'react-geolocated';
import cx from 'classnames';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

import BusinessCard from '../../components/BusinessCard';
import FilterPanel from '../../components/FilterPanel';
import Pagination from '../../components/Pagination';

import useSearch from './hooks/useSearch';
import SearchForm from './SearchForm';

const styles = (theme) => ({
  result: {
    margin: '10px 0px 40px 0px',
  },
  content: {
    margin: '0 15px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('mobile')]: {
      margin: '0 15px',
    },
  },
  resultsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('mobile')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 3fr',
    },
  },
  filters: {
    [theme.breakpoints.up('mobile')]: {
      padding: '61px 24px 0 24px',
    },
  },
  list: {
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
  emptyStateWrapper: {
    marginTop: 60,
  },
  emptyStateIcon: {
    width: 55,
    height: 55,
    margin: '0 auto',
  },
  emptyStateFooter: {
    marginTop: 80,
    display: 'flex',
    justifyContent: 'center',
    '& a:first-child': {
      marginRight: 20,
    },
  },
  filterButtonWrapper: {
    display: 'flex',
  },
  searchresultsText: {
    flexGrow: 2,
  },
  filterButton: {
    [theme.breakpoints.up('mobile')]: {
      display: 'none',
    },
    width: '100px !important',
    height: 36,
  },
});

const Search = ({
  classes,
  coords,
  isGeolocationEnabled,
}) => {
  const matches = useMediaQuery('(min-width:376px)');

  const [openFilter, setOpenFilter] = useState(false);
  const {
    updateSearch,
    updateFilters,
    search,
    searchResults,
    loading,
    pagination = {},
    userLocation,
    indicators = [],
  } = useSearch({ userCoords: coords, isGeolocationEnabled });
  const onSearchSubmit = async (searchTerm) => {
    updateSearch(searchTerm);
  };

  const onFilterApplied = (filter, value) => {
    updateSearch(filter, value);
  };

  const filters = {
    stars: search.rating || 0,
    distance: search.distance || 0,
    price: search.price || 0,
  };

  const setFilters = (changedFilters) => {
    updateFilters('distance', changedFilters.distance);
    updateFilters('price', changedFilters.price);
    updateFilters('rating', changedFilters.stars);
  };

  const isGeoLoading = isGeolocationEnabled && coords === null;

  return (
    <div className={classes.content}>
      {indicators.length > 0 && searchResults === null && !isGeoLoading && !loading && (
        <SearchForm
          chips={indicators}
          onSearch={onSearchSubmit}
          onFilterApplied={onFilterApplied}
          searchCriteria={search}
          location={userLocation.address}
        />
      )}
      <div
        className={cx(classes.resultsWrapper, {
          [classes.desktop]: matches,
        })}
      >
        {searchResults !== null && searchResults.length > 0 && (
          <div className={classes.filters}>
            <Button
              variant="outlined"
              onClick={() => setOpenFilter(!openFilter)}
              color="primary"
              className={classes.filterButton}
            >
              FILTER
            </Button>
            <FilterPanel
              open={openFilter}
              onClose={() => setOpenFilter(false)}
              type={matches ? 'desktop' : 'mobile'}
              allIndicators={indicators}
              search={search}
              updateSearch={updateSearch}
              resultCount={searchResults.length}
            />
          </div>
        )}
        <div className={classes.list}>
          {searchResults !== null && searchResults.length > 0
            && searchResults.map((result) => (
              <div className={classes.searchResult} key={result.id}>
                <BusinessCard
                  business={result}
                  key={result.id}
                  overrideClasses={{ root: classes.result }}
                />
              </div>
            ))}
        </div>
      </div>
      {pagination && pagination !== null && (
        <Pagination
          totalCount={pagination.total_count || 0}
          page={pagination.page || 1}
          perPage={pagination.perPage || 10}
        />
      )}
      {searchResults !== null
        && search.searchTerm !== null
        && searchResults.length === 0
        && !loading
        && (
          <div className={classes.emptyStateWrapper}>
            <Typography variant={matches ? 'h2' : 'h4'} align="center">
              No Results
            </Typography>
            <div className={classes.emptyStateIcon}>
              <SearchIcon color="primary" fontSize="large" className={classes.emptyStateIcon} />
            </div>
            <Typography variant={matches ? 'h4' : 'subtitle1'} align="center">
              We couldn’t find what you’re looking for.
              Please try again or add a space to Lavender Book.
            </Typography>
            <div className={classes.emptyStateFooter}>
              <Button variant="outlined" href="/" color="secondary">
                Home
              </Button>
              <Button variant="contained" href="/spaces/new" color="secondary" disableElevation>
                Add space
              </Button>
            </div>
          </div>
        )}
      {loading && <CircularProgress color="secondary" />}
    </div>
  );
};

Search.props = {
  classes: PropTypes.shape({}),
};

Search.props = { ...Search.props, ...geoPropTypes };

export default geolocated({ positionOptions: { timeout: 5000 } })(withStyles(styles)(Search));
