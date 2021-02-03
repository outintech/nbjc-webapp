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
});

const Search = ({ classes, coords }) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [indicators, setIndicators] = useState([]);

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
    search,
    searchResults,
    loading,
  } = useSearch({ useLocation: coords, indicators });
  const onSearchSubmit = async (searchTerm) => {
    updateSearch(searchTerm);
  };

  const onFilterApplied = (filter, value) => {
    updateSearch(filter, value);
  };
  return (
    <div className={classes.content}>
      {indicators.length > 0 && searchResults.length < 1 && (
        <SearchForm
          chips={indicators}
          onSearch={onSearchSubmit}
          onFilterApplied={onFilterApplied}
          searchCriteria={search}
        />
      )}
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
