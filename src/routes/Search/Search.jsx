import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { geolocated, geoPropTypes } from 'react-geolocated';
import cx from 'classnames';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

// import getBusinessMock from '../../__mocks__/getBusinessMock';
import { getSearchResults } from '../../api';
import utils from '../../utils';

import BusinessCard from '../../components/BusinessCard';

import DesktopSearch from './DesktopSearch';
import MobileSearch from './MobileSearch';

const styles = (theme) => ({
  resultsWrapper: {
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
  },
  result: {
    margin: '10px 0px 40px 0px',
  },
  content: {
    margin: '0 15px',
  },
  searchResultsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  searchResult: {
    [theme.breakpoints.up('xs')]: {
      maxWidth: '350px',
      marginRight: 50,
    },
    [theme.breakpoints.up('mobile')]: {
      width: '100%',
    },
  },
});

const Search = ({ classes, coords }) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState();
  // TODO: this needs to come from the db.
  const chips = [{
    name: 'Black Friendly',
  }, {
    name: 'Inclusive',
  }, {
    name: 'Black Owned',
  }, {
    name: 'Gender Neutral Restrooms',
  }, {
    name: 'Accessible',
  }, {
    name: 'Queer hangout space',
  }, {
    name: 'Trans friendly',
  }, {
    name: 'Queer owned',
  }];

  const onSearchSubmit = async (searchTerm) => {
    setSearchResults([]);
    setSearchCriteria(searchTerm);
    try {
      const results = await getSearchResults({});
      // todo: results must come in an array
      setSearchResults([results].map(utils.formatSearchResults));
    } catch (e) {
      // todo: show snackbar?
    }
  };
  // todo: use the coordinates in search query
  console.log(coords);
  return (
    <>
      <div className={classes.content}>
        {matches && <DesktopSearch chips={chips} onSearch={onSearchSubmit} />}
        {!matches && (
          <MobileSearch
            chips={chips}
            onSearch={onSearchSubmit}
            results={searchResults}
          />
        )}
        <div className={cx(classes.resultsWrapper, {
          [classes.desktop]: matches,
        })}
        >
          {searchResults.length > 0 && (
            <Typography variant="h6">
              {`${searchResults.length} results found for ${searchCriteria}`}
            </Typography>
          )}
          <div className={classes.searchResultsWrapper}>
            {searchResults.length > 0
              && searchResults.map((result) => (
                <div
                  className={classes.searchResult}
                >
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
    </>
  );
};

Search.props = {
  classes: PropTypes.shape({}),
};

Search.props = { ...Search.props, ...geoPropTypes };

export default geolocated()(withStyles(styles)(Search));
