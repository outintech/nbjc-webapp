/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { geolocated, geoPropTypes } from 'react-geolocated';
import cx from 'classnames';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import BusinessCard from '../../components/BusinessCard';
import FilterPanel from '../../components/FilterPanel';
import Pagination from '../../components/Pagination';

import useSearch from './hooks/useSearch';
import SearchForm from './SearchForm';

const styles = (theme) => ({
  result: {
    // This is for setting the margins of the results returned from search.
  },
  content: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  resultsWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  filtersContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'column',
    flexShrink: 0,
    width: '316px',
    height: '100%',
    zIndex: 999,
    paddingTop: '32px',
    backgroundColor: '#f2f2f2',
  },
  list: {
    display: 'grid',
    gridGap: 50,
  },
  searchResult: {
    width: '80%',
    marginRight: 142,
    marginLeft: 40,
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
  searchresultsText: {
    flexGrow: 2,
  },
  filterButton: {
    width: '100px !important',
    marginBottom: '16px',
    height: 36,
    border: '#EBE5F6 1px solid',
  },
  filterButtonText: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#1E1131',
  },
  searchCountHeader: {
    fontWeight: 600,
    fontSize: '32px',
    color: '#1E1131',
    lineHeight: '32px',
    marginBottom: 16,
  },
  leftSideFilter: {
    flex: 1,
  },
  rightSideFilter: {
    display: 'flex',
  },
  filterDropdown: {
    display: 'flex',
  },
  boldedText: {
    fontWeight: 600,
    lineHeight: '17.5px',
    color: '#1E1131',
    marginRight: 6,
  },
  purpleText: {
    display: 'flex',
    color: '#633AA3',
  },
  arrowDropdown: {
    marginRight: 6,
    paddingBottom: 4,
    verticalAlign: 'middle',
  },
  hiddenElement: {
    display: 'none',
  },
});

const Search = ({
  classes,
  coords,
  isGeolocationEnabled,
}) => {
  const isWiderThanBreakpoint = useMediaQuery('(min-width:1376px)');

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
          [classes.desktop]: isWiderThanBreakpoint,
        })}
      >
        {searchResults !== null && searchResults.length > 0 && (
          <div className={classes.filtersContainer}>
            <FilterPanel
              open={openFilter}
              onClose={() => setOpenFilter(false)}
              type={isWiderThanBreakpoint ? 'desktop' : 'mobile'}
              allIndicators={indicators}
              search={search}
              updateSearch={updateSearch}
              resultCount={searchResults.length}
            />
          </div>
        )}
        <div>
          {searchResults !== null && searchResults.length > 0
            ? (
              <div className={classes.searchResult} style={{ marginTop: '24px' }}>
                <div className={classes.searchCountHeader}>
                  {`${pagination.total_count} Search ${pagination.totalCount >= 2 ? 'Result' : 'Results'}`}
                </div>
                <div style={{ display: 'flex' }}>
                  <div className={classes.leftSideFilter}>
                    <div className={classes.filterDropdown}>
                      <span className={classes.boldedText}>Showing:</span>
                      <span className={classes.purpleText}>
                        <span className={classes.purpleText}>10 per page</span>
                        <ArrowDropDownIcon className={classes.arrowDropdown} />
                      </span>
                    </div>
                  </div>
                  <div className={classes.rightSideFilter}>
                    <div className={classes.filterDropdown}>
                      <span className={classes.boldedText}>Distance:</span>
                      <span className={classes.purpleText}>
                        <span className={classes.purpleText}>5 miles</span>
                        <ArrowDropDownIcon className={classes.arrowDropdown} />
                      </span>
                    </div>
                    <div className={classes.filterDropdown}>
                      <span className={classes.boldedText}>Sort by:</span>
                      <span className={classes.purpleText}>
                        <span className={classes.purpleText}>Highly Rated</span>
                        <ArrowDropDownIcon className={classes.arrowDropdown} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
            : null}
          <div className={classes.list}>
            {searchResults !== null && searchResults.length > 0
              && searchResults.map((result, index) => (
                <div className={classes.searchResult} key={result.id}>
                  <BusinessCard
                    business={result}
                    key={result.id}
                    count={(pagination.page - 1) * 10 + index + 1}
                    overrideClasses={{ root: classes.result }}
                  />
                </div>
              ))}
          </div>
          {pagination && pagination !== null && (
            <div className={classes.searchResult}>
              <Pagination
                totalCount={pagination.total_count || 0}
                page={pagination.page || 1}
                perPage={pagination.perPage || 10}
              />
            </div>
          )}
        </div>
      </div>

      {searchResults !== null
        && search.searchTerm !== null
        && searchResults.length === 0
        && !loading
        && (
          <div className={classes.emptyStateWrapper}>
            <Typography variant={isWiderThanBreakpoint ? 'h2' : 'h4'} align="center">
              No Results
            </Typography>
            <div className={classes.emptyStateIcon}>
              <SearchIcon color="primary" fontSize="large" className={classes.emptyStateIcon} />
            </div>
            <Typography variant={isWiderThanBreakpoint ? 'h4' : 'subtitle1'} align="center">
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
