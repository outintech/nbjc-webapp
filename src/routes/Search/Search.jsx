import React, { useState, useEffect } from 'react';

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
import FilterDialog from '../../components/FilterDialog';
import { getAllIndicators } from '../../api';

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
    width: '100px !important',
    height: 36,
  },
});

const Search = ({ classes, coords }) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [indicators, setIndicators] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllIndicators();
      setIndicators(data);
    }
    try {
      fetchData();
    } catch (err) {
      // todo: retry?
      console.log(err);
    }
  }, []);

  const {
    updateSearch,
    updateFilters,
    search,
    searchResults,
    loading,
    pagination,
    userLocation,
  } = useSearch({ userCoords: coords, indicators });
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

  const getResultsString = () => {
    let text = `${pagination.total_count} results found for`;
    let comma = '';
    if (search.searchTerm) {
      text = `${text} ${search.searchTerm}`;
      comma = ',';
    }
    if (search.category) {
      text = `${text}${comma} ${search.category}`;
      comma = ',';
    }

    const indicatorNames = indicators
      .filter((indicator) => search.indicators.includes(indicator.value))
      .map((indicator) => indicator.name);

    if (indicatorNames.length < 3) {
      text = `${text}${comma} ${indicatorNames.join(' and ')}`;
    } else {
      text = `${text}${comma} ${indicatorNames[0]} and ${indicatorNames.length - 1} more`;
    }
    return text;
  };

  return (
    <div className={classes.content}>
      {indicators.length > 0 && searchResults === null && (
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
          <>
            <div className={classes.filterButtonWrapper}>
              <Typography variant="h6" className={classes.searchresultsText}>
                {getResultsString()}
              </Typography>
              <Button variant="outlined" onClick={() => setOpenFilter(!openFilter)} color="primary" className={classes.filterButton}>FILTER</Button>
            </div>
            <div className={classes.filterWrapper}>
              {openFilter && (
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
            </div>
          </>
        )}
        <div className={classes.searchResultsWrapper}>
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
                Please try again or add a space to OurGuide.
              </Typography>
              <div className={classes.emptyStateFooter}>
                <Button variant="outlined" href="/" color="secondary">
                  Home
                </Button>
                <Button variant="contained" href="/space/new" color="secondary" disableElevation>
                  Add space
                </Button>
              </div>
            </div>
          )}
        {(loading || indicators.length < 1) && <CircularProgress color="secondary" />}
      </div>
    </div>
  );
};

Search.props = {
  classes: PropTypes.shape({}),
};

Search.props = { ...Search.props, ...geoPropTypes };

export default geolocated()(withStyles(styles)(Search));
