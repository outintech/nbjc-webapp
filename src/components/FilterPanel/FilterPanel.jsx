import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Dialog,
  IconButton,
  Toolbar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  FormControl,
  FormLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Collapse,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  toolbar: {
    justifyContent: 'flex-end',
  },
  dialogBody: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    padding: '0 24px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    '& h2': {
      fontSize: '20px',
      textTransform: 'uppercase',
    },
    '& button': {
      color: '#1e1131',
      textTransform: 'capitalize',
    },
  },
  nameFilter: {
    backgroundColor: '#fff',
    border: '1px solid #999',
  },
  filterGroup: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '24px',
    margin: '16px 0',
    width: '100%',
    '& legend': {
      fontWeight: '600',
      textTransform: 'uppercase',
    },
  },
  clearButton: {
    marginLeft: 'auto',
  },
  apply: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

const FilterPanel = ({
  open,
  onClose,
  type,
  classes,
  allIndicators,
  search,
  updateSearch,
  resultCount,
}) => {
  const [nameFilterVal, setNameFilterVal] = useState('');
  const [priceFilterVal, setPriceFilterVal] = useState(0);
  const [indicatorVals, setIndicatorVals] = useState({});
  const [filterCount, setFilterCount] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const { searchTerm = '', price = 0, indicators = [] } = search;
    setNameFilterVal(searchTerm);
    if (price) {
      setPriceFilterVal(price);
    }
    const checkedIndicators = {};
    allIndicators.forEach((i) => {
      if (indicators.includes(i.value)) {
        checkedIndicators[i.name] = i.value;
      }
    });
    setIndicatorVals(checkedIndicators);
  }, [search, allIndicators]);

  useEffect(() => {
    let active = 0;
    if (nameFilterVal) {
      active++;
    }
    if (priceFilterVal) {
      active++;
    }
    active += Object.values(indicatorVals).length;
    setFilterCount(active);
  }, [nameFilterVal, priceFilterVal, indicatorVals]);

  const clearFilters = () => {
    setNameFilterVal('');
    setPriceFilterVal(0);
    setIndicatorVals({});
  };

  const applyFilters = () => {
    const indicators = [];
    Object.entries(indicatorVals).forEach(([name, value]) => (
      indicators.push({
        name,
        value,
        isSelected: true,
      })
    ));
    updateSearch({
      ...search,
      name: { name: nameFilterVal },
      category: { alias: search.category },
      indicators,
      price: priceFilterVal,
    });
  };

  const header = (
    <div className={classes.header}>
      <h2>
        Filter
        {filterCount > 0 && ` (${filterCount})`}
      </h2>
      <Button
        className={classes.clearButton}
        onClick={() => clearFilters()}
      >
        Clear All
      </Button>
    </div>
  );

  const nameFilter = (
    <TextField
      id="nameFilter"
      className={classes.nameFilter}
      type="text"
      variant="outlined"
      label="Search by name within results"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="search"
              onClick={applyFilters}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={nameFilterVal}
      onChange={(e) => setNameFilterVal(e.target.value)}
    />
  );

  const priceFilter = (
    <FormControl component="fieldset" className={classes.filterGroup}>
      <FormLabel component="legend" className="">Price</FormLabel>
      <RadioGroup
        aria-label="Price"
        name="price"
        value={priceFilterVal}
        onChange={(e) => setPriceFilterVal(parseInt(e.target.value, 10))}
      >
        { [1, 2, 3, 4].map((i) => (
          <FormControlLabel
            key={`price_${i}`}
            control={<Radio />}
            label={`${'$'.repeat(i)}`}
            value={i}
          />
        )) }
      </RadioGroup>
    </FormControl>
  );

  const indicatorCheckboxes = allIndicators.map((i) => (
    <FormControlLabel
      key={`indicator_${i.value}`}
      control={(
        <Checkbox
          name={i.name}
          value={i.value}
          checked={Object.hasOwn(indicatorVals, i.name)}
          onClick={(e) => {
            if (e.target.checked) {
              setIndicatorVals({ ...indicatorVals, [e.target.name]: e.target.value });
            } else {
              setIndicatorVals(
                {
                  ...Object.fromEntries(
                    Object.entries(indicatorVals).filter(
                      ([key]) => key !== e.target.name,
                    ),
                  ),
                },
              );
            }
          }}
        />
      )}
      label={i.name}
    />
  ));

  const indicatorFilters = (
    <FormControl component="fieldset" className={classes.filterGroup}>
      <FormLabel component="legend" className="">Indicators</FormLabel>
      <FormGroup>
        { indicatorCheckboxes.slice(0, 5) }
        <Collapse in={!collapsed}>
          <FormGroup>
            { indicatorCheckboxes.slice(5) }
          </FormGroup>
        </Collapse>
        <Button onClick={() => setCollapsed(!collapsed)}>
          { `Show ${collapsed ? 'More' : 'Less'}` }
        </Button>
      </FormGroup>
    </FormControl>
  );

  const apply = (
    <Button
      onClick={applyFilters}
    >
      Apply
    </Button>
  );

  if (type === 'desktop') {
    return (
      <div className={classes.root}>
        { header }
        { nameFilter }
        { priceFilter }
        { indicatorFilters }
        <div className={classes.apply}>
          { apply }
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Dialog fullScreen open={open} onClose={onClose}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <div className={classes.dialogBody}>
          { header }
          { nameFilter }
          { priceFilter }
          { indicatorFilters }
          <div className={classes.apply}>
            <span>
              {`${resultCount} Search Result${resultCount === 1 ? '' : 's'}`}
            </span>
            <Button
              onClick={onClose}
            >
              Close
            </Button>
            { apply }
          </div>
        </div>
      </Dialog>
    </div>
  );
};

FilterPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['desktop', 'mobile']),
  allIndicators: PropTypes.arrayOf(PropTypes.object),
  search: PropTypes.shape({
    searchTerm: PropTypes.string,
    indicators: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
  }).isRequired,
  updateSearch: PropTypes.func.isRequired,
  resultCount: PropTypes.number,
};

FilterPanel.defaultProps = {
  type: 'mobile',
  allIndicators: [],
  resultCount: 0,
};

export default withStyles(styles)(FilterPanel);
