/* eslint-disable no-unused-vars, no-console */
import React from 'react';
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
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  toolbar: {
    justifyContent: 'flex-end',
  },
  dialogBody: {
    padding: '0 24px',
    marginBottom: 15,
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

const FilterPanel = ({
  open,
  onClose,
  type,
  classes,
  indicators,
  /* search */
  /* updateSearch */
}) => {
  const checkedFilters = 2;
  const header = (
    <div className={classes.header}>
      <h2>
        Filter
        { ` (${checkedFilters})` }
      </h2>
      <Button
        className={classes.clearButton}
      >
        Clear All
      </Button>
    </div>
  );

  const nameFilter = (
    <TextField
      type="text"
      variant="outlined"
      label="Search by name within results"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="search"
              onClick={() => console.log('call updateSearch with input value')}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  const priceFilter = (
    <div className="group">
      <div className="groupLabel">
        Price
      </div>
      <div className={classes.controls}>
        { [1, 2, 3, 4].map((i) => (
          <FormControlLabel
            key={`price_${i}`}
            control={<Checkbox name={`price_${i}`} onClick={() => console.log('price checkbox!')} />}
            label={`${'$'.repeat(i)}`}
          />
        )) }
      </div>
    </div>
  );

  const indicatorFilters = (
    <div className="group">
      <div className="groupLabel">
        Indicators
      </div>
      <div className={classes.controls}>
        { indicators.map((i) => (
          <FormControlLabel
            key={`indicator_${i.value}`}
            control={<Checkbox name={`indicator_${i.name}`} onClick={() => console.log('indicator!')} />}
            label={i.name}
          />
        )) }
      </div>
    </div>
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
