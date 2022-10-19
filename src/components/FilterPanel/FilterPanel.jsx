/* eslint-disable no-unused-vars, no-console */
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
  },
  clearButton: {
    marginLeft: 'auto',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
  },
};

const priceFilterDefault = {
  price_1: false,
  price_2: false,
  price_3: false,
  price_4: false,
};

const FilterPanel = ({
  open,
  onClose,
  type,
  classes,
  indicators,
  /* search */
  /* updateSearch */
}) => {
  const [nameFilterVal, setNameFilterVal] = useState('');
  const [priceFilterVal, setPriceFilterVal] = useState(priceFilterDefault);
  const [indicatorVals, setIndicatorVals] = useState({});
  const [filterCount, setFilterCount] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    let active = 0;
    if (nameFilterVal) {
      active++;
    }
    active += Object.values(priceFilterVal).filter((v) => v === true).length;
    active += Object.values(indicatorVals).length;
    setFilterCount(active);
  }, [nameFilterVal, priceFilterVal, indicatorVals]);

  const clearFilters = () => {
    setNameFilterVal('');
    setPriceFilterVal(priceFilterDefault);
    setIndicatorVals({});
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
      type="text"
      variant="outlined"
      label="Search by name within results"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="search"
              onClick={() => console.log('do the search!')}
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
    <FormControl component="fieldset" className="">
      <FormLabel component="legend" className="">Price</FormLabel>
      <FormGroup>
        { [1, 2, 3, 4].map((i) => (
          <FormControlLabel
            key={`price_${i}`}
            control={(
              <Checkbox
                name={`price_${i}`}
                checked={priceFilterVal[`price_${i}`]}
                onClick={(e) => setPriceFilterVal(
                  { ...priceFilterVal, [e.target.name]: e.target.checked },
                )}
                inputProps={{ 'aria-label': `Price, level ${i}` }}
              />
            )}
            label={`${'$'.repeat(i)}`}
          />
        )) }
      </FormGroup>
    </FormControl>
  );

  const indicatorFilters = (
    <FormControl component="fieldset" className="">
      <FormLabel component="legend" className="">Indicators</FormLabel>
      <Collapse in={!collapsed} collapsedSize="269px">
        <FormGroup>
          { indicators.map((i) => (
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
                              ([key, val]) => key !== e.target.name,
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
          )) }
        </FormGroup>
      </Collapse>
      <Button onClick={() => setCollapsed(!collapsed)}>
        { `Show ${collapsed ? 'More' : 'Less'}` }
      </Button>
    </FormControl>
  );

  if (type === 'desktop') {
    return (
      <div className={classes.root}>
        { header }
        { nameFilter }
        { priceFilter }
        { indicatorFilters }
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
        </div>
      </Dialog>
    </div>
  );
};

FilterPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['desktop', 'mobile']),
  indicators: PropTypes.arrayOf(PropTypes.object),
};

FilterPanel.defaultProps = {
  type: 'mobile',
  indicators: [],
};

export default withStyles(styles)(FilterPanel);
