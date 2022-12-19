/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { geolocated, geoPropTypes } from 'react-geolocated';
import cx from 'classnames';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import BusinessCard from '../../components/BusinessCard';
import FilterPanel from '../../components/FilterPanel';
import Pagination from '../../components/Pagination';
import useSearch from './hooks/useSearch';
import SearchForm from './SearchForm';

const styles = () => ({
  content: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  resultsWrapper: {
    display: 'flex',
  },
  filtersContainer: {
    zIndex: 999,
    paddingTop: '32px',
    backgroundColor: '#f2f2f2',
  },
  searchResult: {
    marginLeft: 40,
    marginBottom: 20,
    marginRight: 142,
  },
  searchResultBreakpoint: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  emptyStateWrapper: {
    marginTop: 60,
    width: '100%',
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
  SortLeftContainer: {
    flex: 1,
  },
  SortRightContainer: {
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
  searchBodyContainer: {
    width: '100%',
  },
  SortingPerPageContainer: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    color: '#633AA3',
    textTransform: 'none',
  },
  SearchSettingLabel: {
    fontWeight: 600,
    lineHeight: '17.5px',
    color: '#1E1131',
    marginRight: 6,
  },
  SortParentContainer: {
    display: 'flex',
  },
});

const PerPageDropDown = ({ classes, perPage }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const placeholderValue = `${perPage} per page`;
  return (
    <>
      <Button
        onClick={handleClick}
        variant="text"
        size="small"
        aria-controls={open ? 'Perpage-Menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <div className={classes.SortingPerPageContainer}>
          <span>{placeholderValue}</span>
          <ArrowDropDownIcon />
        </div>
      </Button>
      <Menu
        id="Perpage-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        MenuListProps={{
          'aria-labelledby': 'How many results',
        }}
      >
        <MenuItem onClick={handleClose}>10 per page</MenuItem>
        <MenuItem onClick={handleClose}>25 per page</MenuItem>
        <MenuItem onClick={handleClose}>50 per page</MenuItem>
      </Menu>
    </>
  );
};

const SortingPerPageContainer = ({ classes, perPage }) => {
  const label = 'Showing:';
  return (
    <div className={classes.SortingPerPageContainer}>
      <span className={classes.SearchSettingLabel}>{label}</span>
      <PerPageDropDown classes={classes} perPage={perPage} />
    </div>
  );
};

const DistanceSortContainer = ({ classes }) => {
  const label = 'Distance:';
  return (
    <div className={classes.SortingPerPageContainer}>
      <span className={classes.SearchSettingLabel}>{label}</span>
      <ArrowDropDownIcon />
    </div>
  );
};

const RatingSortContainer = ({ classes }) => {
  const label = 'Sort by:';
  return (
    <div className={classes.SortingPerPageContainer}>
      <span className={classes.SearchSettingLabel}>{label}</span>
      <ArrowDropDownIcon />
    </div>
  );
};

const SortByBar = ({ classes, pagination }) => (
  <section className={classes.SortParentContainer}>
    <div className={classes.SortLeftContainer}>
      <SortingPerPageContainer classes={classes} perPage={pagination.per_page} />
    </div>
    <div className={classes.SortRightContainer}>
      <DistanceSortContainer classes={classes} />
      <RatingSortContainer classes={classes} />
    </div>
  </section>
);

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
      <div className={cx(classes.resultsWrapper, { [classes.desktop]: isWiderThanBreakpoint })}>
        {searchResults !== null
          && searchResults.length > 0
          && (isWiderThanBreakpoint || openFilter)
          && (
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
        <div className={classes.searchBodyContainer}>
          {searchResults !== null && searchResults.length > 0
            ? (
              <div
                className={isWiderThanBreakpoint
                  ? classes.searchResult
                  : classes.searchResultBreakpoint}
                style={{ marginTop: '24px' }}
              >
                <div className={classes.searchCountHeader}>
                  {`${pagination.total_count} Search ${pagination.totalCount >= 2 ? 'Result' : 'Results'}`}
                </div>
                {!isWiderThanBreakpoint && (
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenFilter(!openFilter)}
                      color="primary"
                      className={classes.filterButton}
                    >
                      FILTER
                    </Button>
                  </div>
                )}
                <SortByBar classes={classes} pagination={pagination} />
              </div>
            )
            : null}
          <div>
            {searchResults !== null && searchResults.length > 0
              && searchResults.map((result, index) => (
                <div
                  className={isWiderThanBreakpoint
                    ? classes.searchResult
                    : classes.searchResultBreakpoint}
                  key={result.id}
                >
                  <BusinessCard
                    business={result}
                    key={result.id}
                    count={(pagination.page - 1) * 10 + index + 1}
                  />
                </div>
              ))}
          </div>
          {pagination && pagination !== null && (
            <div className={isWiderThanBreakpoint
              ? classes.searchResult
              : classes.searchResultBreakpoint}
            >
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
