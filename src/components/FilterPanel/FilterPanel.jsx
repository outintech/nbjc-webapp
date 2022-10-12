/* eslint-disable no-unused-vars */
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
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const styles = {
  toolbar: {
    justifyContent: 'flex-end',
  },
  dialogBody: {
    padding: '0 24px',
    marginBottom: 15,
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  clearButton: {
    marginLeft: 'auto',
  },
  indicators: {
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
}) => {
  const checkedFilters = 2;
  const header = (
    <div className={classes.filterHeader}>
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
    />
  );

  const priceFilter = <div>$$ more to come $$</div>;

  const indicatorFilters = (
    <div className={classes.indicators}>
      { indicators.map((i) => (
        <FormControlLabel control={<Checkbox name={i.name} />} label={i.name} />
      )) }
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
  indicators: PropTypes.arrayOf(PropTypes.string),
};

FilterPanel.defaultProps = {
  type: 'mobile',
  indicators: [],
};

export default withStyles(styles)(FilterPanel);
