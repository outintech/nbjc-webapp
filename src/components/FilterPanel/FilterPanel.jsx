import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Dialog,
  IconButton,
  Toolbar,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Collapse,
  Typography,
  InputAdornment,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  dialog: {
    paddingRight: '20%',
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  toolbar: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'flex-end',
  },
  dialogBody: {
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    padding: '0 24px',
    position: 'relative',
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
    alignItems: 'baseline',
    maxHeight: '80px',
    marginBottom: '5px',
  },
  nameFilter: {
    backgroundColor: '#fff',
    border: '1px solid #999',
    borderRadius: '4px',
  },
  filterGroup: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '24px',
    margin: '0 0 16px 0',
    width: '100%',
    '&:first-of-type': {
      marginTop: '16px',
    },
  },
  filterHeader: {
    color: '#1E1131',
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'left',
    letterSpacing: '0px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '3px',
  },
  visuallyHidden: {
    position: 'absolute',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    width: '1px',
    height: '1px',
    whiteSpace: 'nowrap',
  },
  filterToggle: {
    fontSize: '14px',
    fontWeight: '600',
    paddingLeft: '0',
    textTransform: 'capitalize',
    '& > *': {
      justifyContent: 'flex-start',
    },
  },
  clearButton: {
    flexGrow: 1,
    justifyContent: 'right',
    maxHeight: '23.991',
  },
  apply: {
    backgroundColor: '#fff',
    bottom: '0px',
    left: '0px',
    padding: '16px 0',
    position: 'sticky',
    textAlign: 'center',
    width: '100%',
    '& button': {
      margin: '0 8px',
      padding: '12px 42px',
    },
    marginBottom: '188px',
  },
  resultCount: {
    display: 'inline-block',
    marginBottom: '20px',
    width: '100%',
  },
  filterContainer: {
    display: 'flex',
  },
  filterFont: {
    fontWeight: 700,
    lineHeight: '24px',
    letterSpacing: '0px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    color: '#1E1131',
  },
  verticalContainer: {
    width: '100%',
    display: 'inline-block',
    paddingLeft: '28px',
    paddingRight: '28px',
  },
  filterParentContainer: {
    display: 'inline-flex',
    width: '!00%',
  },
  filterBarContent: {
    top: 'auto',
  },
  clearButtonFont: {
    color: '#1E1131',
    fontWeight: 600,
    lineHeight: '24px',
    fontSize: '14px',
    height: 'inherit',
  },
  filterSearchContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkBox: {
    verticalAlign: 'top',
    display: 'table-cell',
    color: '#1E1131',
  },
  formFontColor: {
    color: '#1E1131',
  },
  checkBoxLabels: {
    fontSize: '14px',
    fontWeight: '600',
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
    if (open) {
      onClose();
    }
  };

  const header = (
    <div className={classes.header}>
      <h2 className={classes.filterFont}>
        <p style={{ marginRight: 5 }}>Filter</p>
        {filterCount > 0 && ` (${filterCount})`}
      </h2>
      <Button
        className={classes.clearButton}
        onClick={() => clearFilters()}
        style={{ backgroundColor: 'transparent' }}
      >
        <span className={classes.clearButtonFont}>Clear All</span>
      </Button>
    </div>
  );

  const nameFilter = (
    <Box className={classes.filterSearchContainer}>
      <TextField
        id="nameFilter"
        className={classes.nameFilter}
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
        placeholder="Search by name"
        value={nameFilterVal}
        InputProps={{
          disableUnderline: true,
          padding: 5,
          classes: { borderRadius: 0 },
          endAdornment: (
            <InputAdornment
              style={{ right: 5 }}
              onClick={applyFilters}
            >
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setNameFilterVal(e.target.value)}
      />
    </Box>
  );

  const priceFilter = (
    <FormControl component="fieldset" className={classes.filterGroup}>
      <FormLabel component="legend" className={classes.visuallyHidden}>Price</FormLabel>
      <div
        aria-hidden="true"
        className={classes.filterHeader}
      >
        Price
      </div>
      <RadioGroup
        aria-label="Price"
        name="price"
        value={priceFilterVal}
        onChange={(e) => setPriceFilterVal(parseInt(e.target.value, 10))}
      >
        {[1, 2, 3, 4].map((i) => (
          <FormControlLabel
            key={`price_${i}`}
            control={<Radio />}
            label={
              (
                <Typography className={classes.checkBoxLabels}>
                  {'$'.repeat(i)}
                </Typography>
              )
            }
            aria-label={`price level ${i}`}
            value={i}
          />
        ))}
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
          className={classes.checkBox}
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
      label={<Typography className={classes.checkBoxLabels}>{i.name}</Typography>}
    />
  ));

  const indicatorFilters = (
    <FormControl component="fieldset" className={classes.filterGroup}>
      <FormLabel component="legend" className={classes.visuallyHidden}>Indicators</FormLabel>
      <div
        aria-hidden="true"
        className={classes.filterHeader}
      >
        Inclusion
      </div>
      <FormGroup className={classes.formFontColor}>
        {indicatorCheckboxes.slice(0, 5)}
        <Collapse in={!collapsed}>
          <FormGroup>
            {indicatorCheckboxes.slice(5)}
          </FormGroup>
        </Collapse>
        <Button
          onClick={() => setCollapsed(!collapsed)}
          className={classes.filterToggle}
        >
          {`See ${collapsed ? 'More' : 'Less'}`}
          <span className={classes.visuallyHidden}>Indicators</span>
        </Button>
      </FormGroup>
    </FormControl>
  );

  const apply = (
    <Button
      onClick={applyFilters}
      variant="contained"
      color="primary"
    >
      Apply
    </Button>
  );

  if (type === 'desktop') {
    return (
      <Box className={classes.filterContainer}>
        <div className={classes.root}>
          <Box className={classes.verticalContainer}>
            <Box className={classes.filterBarContent}>
              {header}
              {nameFilter}
              {priceFilter}
              {indicatorFilters}
              <div className={classes.apply}>
                {apply}
              </div>
            </Box>
          </Box>
        </div>
      </Box>
    );
  }
  return (
    <div className={classes.root}>
      <Dialog
        fullScreen
        className={classes.dialog}
        open={open}
        onClose={onClose}
      >
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
          {header}
          {nameFilter}
          {priceFilter}
          {indicatorFilters}
        </div>
        <div className={classes.apply}>
          <span className={classes.resultCount}>
            {`${resultCount} Search Result${resultCount === 1 ? '' : 's'}`}
          </span>
          <Button
            onClick={onClose}
            variant="outlined"
            color="default"
          >
            Close
          </Button>
          {apply}
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
