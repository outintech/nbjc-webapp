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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
  desktopMargins: {
    marginLeft: 40,
    marginBottom: 20,
    marginRight: 142,
    flex: 1,
  },
  mobileMargins: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flex: 1,
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
  filterButton: {
    width: '76px !important',
    marginBottom: '16px',
    height: 36,
    border: '#EBE5F6 1px solid',
    padding: 8,
    gap: 10,
    borderRadius: 4,
    marginRight: 8,
  },
  filterButtonText: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    textTransform: 'none',
  },
  filterTextColor: {
    color: '#1E1131',
  },
  clearAllColor: {
    border: 0,
    color: '#633AA3',
  },
  numOfResultsContainer: {
    fontWeight: 600,
    fontSize: '32px',
    color: '#1E1131',
    lineHeight: '32px',
    marginBottom: 16,
  },
  numResultsMobileFont: {
    fontSize: '20px',
    lineHeight: '25px',
    marginBottom: 8,
  },
  sortLeftContainer: {
    flex: 1,
  },
  sortMenuContainer: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    color: '#633AA3',
    textTransform: 'none',
  },
  sortMobileMenuContainer: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '40px',
    backgroundColor: '#F2F2F2',
    marginBottom: 8,
    lineHeight: '24px',
    fontSize: '16px',
  },
  searchSettingLabel: {
    fontWeight: 600,
    lineHeight: '17.5px',
    color: '#1E1131',
    marginRight: 6,
  },
  searchSettingMobileLabel: {
    fontWeight: 400,
    lineHeight: '24px',
    color: '#1E1131',
    fontSize: '16px',
    marginLeft: 32,
  },
  rowContainer: {
    display: 'flex',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardMargins: {
    marginBottom: 40,
  },
  headerMargins: {
    marginTop: 24,
  },
  overrideListItem: {
    backgroundColor: 'pink',
  },
  selectedChoice: {
    fontWeight: 600,
    backgroundColor: '#E5E5E5',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)',
  },
});

const ReusableMenu = (
  {
    classes, menuValues, menuStrings, onMenuClick, sortLabel, currentValue = menuValues[0], mobile,
  },
) => {
  const SortContainerClass = mobile ? classes.sortMobileMenuContainer : classes.sortMenuContainer;
  const SearchSettingClass = mobile ? classes.searchSettingMobileLabel : classes.searchSettingLabel;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={SortContainerClass}>
        <span className={SearchSettingClass}>
          {sortLabel}
        </span>
        <Button
          onClick={handleClick}
          variant="text"
          size="small"
        >
          <div className={classes.sortMenuContainer}>
            <span>{`${menuValues[selectedIndex]} ${menuStrings}`}</span>
            <ArrowDropDownIcon />
          </div>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuProps={{ variant: 'menu' }}
          PaperProps={{
            style: {
              left: '100%',
              transform: 'translateX(-23%) translateY(32%)',
            },
          }}
          MenuListProps={{
            style: {
              padding: 0,
              backgroundColor: '#F2F2F2',
            },
          }}
        >
          {menuValues.map((value, index) => {
            const boldedText = index === selectedIndex ? classes.selectedChoice : '';
            return (
              <MenuItem
                onClick={(event) => handleMenuItemClick(event, index)}
                className={boldedText}
                /* eslint-disable react/no-array-index-key */
                key={index}
              >
                {`${value} ${menuStrings}`}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </>
  );
};

const querySearch = () => (
  null
);

const DistanceMenu = ({ classes, mobile }) => (
  <ReusableMenu
    classes={classes}
    menuValues={[5, 10, 20]}
    menuStrings="miles"
    onMenuClick={[querySearch]}
    sortLabel="Sort by: "
    currentValue="5"
    mobile={mobile}
  />
);

const SortByMenu = ({ classes, mobile }) => (
  <ReusableMenu
    classes={classes}
    menuValues={['Name', 'Highly Rated', 'Recently Added', 'Most Reviewed']}
    menuStrings=""
    onMenuClick={[querySearch]}
    sortLabel="Sort by: "
    currentValue="Highly Rated"
    mobile={mobile}
  />
);

const ShowingPerPageMenu = ({ classes, mobile }) => (
  <ReusableMenu
    classes={classes}
    menuValues={[5, 10, 20]}
    menuStrings="per page"
    onMenuClick={[querySearch]}
    sortLabel="Sort by: "
    currentValue="5"
    mobile={mobile}
  />
);

const TopSortRow = ({ classes, mobile }) => {
  const ContainerClass = mobile ? classes.columnContainer : classes.rowContainer;
  return (
    <section className={ContainerClass}>
      {mobile ? null
        : (
          <div className={classes.sortLeftContainer}>
            <ShowingPerPageMenu classes={classes} />
          </div>
        )}
      <div className={ContainerClass}>
        <DistanceMenu classes={classes} mobile={mobile} />
        <SortByMenu classes={classes} mobile={mobile} />
      </div>
    </section>
  );
};

const SortRowMobile = ({ classes, useDesktop }) => {
  if (useDesktop) {
    return null;
  }
  return (
    <section className={classes.SortParentContainer}>
      <ShowingPerPageMenu classes={classes} mobile />
    </section>
  );
};

const NumberOfResultsHeader = ({ classes, pagination, mobile }) => {
  const resultString = pagination.total_count >= 2 ? 'Results' : 'Result';
  const numOfResultsString = `${pagination.total_count} Search ${resultString}`;
  const applyFonts = mobile ? classes.numResultsMobileFont : '';
  return (
    <div className={`${classes.numOfResultsContainer} ${applyFonts}`}>
      {numOfResultsString}
    </div>
  );
};

const OpenFilterPanelButton = (
  {
    classes, openFilter, setOpenFilter, clearFilters, display,
  },
) => {
  if (display === false) {
    return null;
  }
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => setOpenFilter(!openFilter)}
        color="primary"
        className={classes.filterButton}
      >
        <span className={`${classes.filterButtonText} ${classes.filterTextColor}`}>Filter</span>
      </Button>
      <Button
        className={`${classes.filterButton} ${classes.clearAllColor}`}
        onClick={() => null}
        style={{ backgroundColor: 'transparent' }}
      >
        <span className={classes.filterButtonText}>Clear All</span>
      </Button>
    </div>
  );
};

const FilterPanelAside = ({
  openFilter,
  setOpenFilter,
  isWiderThanBreakpoint,
  indicators,
  search,
  updateSearch,
  searchResults,
  classes,
}) => {
  const ShowFilterPanel = searchResults !== null && searchResults.length > 0
    && (isWiderThanBreakpoint || openFilter);
  if (ShowFilterPanel === false) {
    return null;
  }
  return (
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
  );
};

const SearchBodyHeader = ({
  classes, pagination, setOpenFilter, openFilter, useDesktop, display,
}) => {
  if (display === false) {
    return null;
  }
  return (
    <header className={classes.headerMargins}>
      <NumberOfResultsHeader
        classes={classes}
        pagination={pagination}
        mobile={!useDesktop}
      />
      <OpenFilterPanelButton
        classes={classes}
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        display={!useDesktop}
      />
      <TopSortRow classes={classes} mobile={!useDesktop} />
    </header>
  );
};

const Search = ({
  classes,
  coords,
  isGeolocationEnabled,
}) => {
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

  const isWiderThanBreakpoint = useMediaQuery('(min-width:1376px)');
  const useDesktop = useMediaQuery('(min-width:838px)');
  const SearchPageMargins = isWiderThanBreakpoint ? classes.desktopMargins : classes.mobileMargins;
  const FoundOneOrMoreResults = searchResults !== null && searchResults.length > 0;

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
        <FilterPanelAside
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          isWiderThanBreakpoint={isWiderThanBreakpoint}
          indicators={indicators}
          search={search}
          updateSearch={updateSearch}
          searchResults={searchResults}
          classes={classes}
        />
        <div className={SearchPageMargins}>
          <SearchBodyHeader
            classes={classes}
            pagination={pagination}
            setOpenFilter={setOpenFilter}
            openFilter={openFilter}
            useDesktop={useDesktop}
            display={FoundOneOrMoreResults}
          />
          <div>
            {FoundOneOrMoreResults && searchResults.map((result, index) => (
              <div className={classes.cardMargins} key={result.id}>
                <BusinessCard
                  business={result}
                  key={result.id}
                  count={(pagination.page - 1) * 10 + index + 1}
                />
              </div>
            ))}
          </div>
          {pagination && pagination !== null && !loading && (
            <div>
              <SortRowMobile classes={classes} useDesktop={useDesktop} />
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
