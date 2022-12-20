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
  DesktopMargins: {
    marginLeft: 40,
    marginBottom: 20,
    marginRight: 142,
    flex: 1,
  },
  MobileMargins: {
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
  NumOfResultsContainer: {
    fontWeight: 600,
    fontSize: '32px',
    color: '#1E1131',
    lineHeight: '32px',
    marginBottom: 16,
  },
  NumResultsMobileFont: {
    fontWeight: 600,
    fontSize: '20px',
    color: '#1E1131',
    lineHeight: '25px',
    marginBottom: 8,
  },
  SortLeftContainer: {
    flex: 1,
  },
  SortRightContainer: {
    display: 'flex',
  },
  SortMenuContainer: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    color: '#633AA3',
    textTransform: 'none',
  },
  SortMobileMenuContainer: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '40px',
    backgroundColor: '#F2F2F2',
    marginBottom: 8,
  },
  SearchSettingLabel: {
    fontWeight: 600,
    lineHeight: '17.5px',
    color: '#1E1131',
    marginRight: 6,
  },
  SearchSettingMobileLabel: {
    fontWeight: 400,
    lineHeight: '17.5px',
    color: '#1E1131',
    fontSize: '16px',
    marginLeft: 32,
  },
  RowContainer: {
    display: 'flex',
  },
  ColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  CardMargins: {
    marginBottom: 40,
  },
  HeaderMargins: {
    marginTop: 24,
  },
});

const ReusableMenu = (
  {
    classes, values, placeholder, searchFunction = null, mobile,
  },
) => {
  const SortContainerClass = mobile ? classes.SortMobileMenuContainer : classes.SortMenuContainer;
  const SearchSettingClass = mobile ? classes.SearchSettingMobileLabel : classes.SearchSettingLabel;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const placeholderValue = `${values[0]} ${placeholder}`;
  return (
    <>
      <div className={SortContainerClass}>
        <span className={SearchSettingClass}>{placeholderValue}</span>
        <Button
          onClick={handleClick}
          variant="text"
          size="small"
        >
          <div className={classes.SortMenuContainer}>
            <span>{placeholderValue}</span>
            <ArrowDropDownIcon />
          </div>
        </Button>
        <Menu
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
        >
          {values.map((value) => (
            <MenuItem onClick={searchFunction}>
              {`${value} ${placeholder}`}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
};

const DistanceMenu = ({ classes, mobile }) => {
  const searchFunction = null;
  const values = [5, 10, 20];
  const placeHolder = 'Distance:';
  return (
    <ReusableMenu
      classes={classes}
      searchFunction={searchFunction}
      mobile={mobile}
      placeholder={placeHolder}
      values={values}
    />
  );
};

const SortByMenu = ({ classes, mobile }) => {
  const searchFunction = null;
  const values = [5, 10, 20];
  const placeHolder = 'Sort by:';
  return (
    <ReusableMenu
      classes={classes}
      searchFunction={searchFunction}
      mobile={mobile}
      placeholder={placeHolder}
      values={values}
    />
  );
};

const ShowingMenu = ({ classes, mobile }) => {
  const searchFunction = null;
  const values = [5, 10, 20];
  const placeHolder = 'Showing:';
  return (
    <ReusableMenu
      classes={classes}
      searchFunction={searchFunction}
      mobile={mobile}
      placeholder={placeHolder}
      values={values}
    />
  );
};

const SortByBar = ({ classes, mobile }) => {
  const ContainerClass = mobile ? classes.ColumnContainer : classes.RowContainer;
  return (
    <section className={ContainerClass}>
      {mobile ? null
        : (
          <div className={classes.SortLeftContainer}>
            <ShowingMenu classes={classes} mobile={mobile} />
          </div>
        )}
      <div className={ContainerClass}>
        <DistanceMenu classes={classes} mobile={mobile} />
        <SortByMenu classes={classes} mobile={mobile} />
      </div>
    </section>
  );
};

const SortByBarBottomMobile = ({ classes, useDesktop }) => {
  if (useDesktop) {
    return null;
  }
  return (
    <section className={classes.SortParentContainer}>
      <ShowingMenu classes={classes} mobile />
    </section>
  );
};

const NumberOfResultsHeader = ({ classes, pagination, mobile }) => {
  const resultString = pagination.total_count >= 2 ? 'Results' : 'Result';
  const headerText = `${pagination.total_count} Search ${resultString}`;
  const headerClass = mobile ? classes.NumResultsMobileFont : classes.NumOfResultsContainer;
  return (
    <div className={headerClass}>
      {headerText}
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

const TopSortByMenus = ({
  classes, pagination, setOpenFilter, openFilter, useDesktop, display,
}) => {
  if (display === false) {
    return null;
  }
  return (
    <header className={classes.HeaderMargins}>
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
      <SortByBar classes={classes} mobile={!useDesktop} />
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
  const SearchPageMargins = isWiderThanBreakpoint ? classes.DesktopMargins : classes.MobileMargins;
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
          <TopSortByMenus
            classes={classes}
            pagination={pagination}
            setOpenFilter={setOpenFilter}
            openFilter={openFilter}
            useDesktop={useDesktop}
            display={FoundOneOrMoreResults}
          />
          <div>
            {FoundOneOrMoreResults && searchResults.map((result, index) => (
              <div className={classes.CardMargins} key={result.id}>
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
              <SortByBarBottomMobile classes={classes} useDesktop={useDesktop} />
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
