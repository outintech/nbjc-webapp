import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AppBar from '../../components/AppBar';

import DesktopSearch from './DesktopSearch';
import MobileSearch from './MobileSearch';

const Search = () => {
  const matches = useMediaQuery('(min-width:376px)');
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

  return (
    <>
      <AppBar
        pageTitle="Search for a space"
      />
      { matches && <DesktopSearch chips={chips} /> }
      {!matches && <MobileSearch /> }
    </>
  );
};

export default Search;
