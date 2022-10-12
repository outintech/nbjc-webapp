/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Dialog,
  IconButton,
  Toolbar,
  Button,
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
};

const FilterPanel = ({
  open,
  onClose,
  type,
  classes,
  filters,
  setFilters,
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

  if (type === 'desktop') {
    return (
      <div className={classes.root}>
        { header }
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
        </div>
      </Dialog>
    </div>
  );
};

FilterPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['desktop', 'mobile']),
  filters: PropTypes.shape({
    stars: PropTypes.number,
    distance: PropTypes.number,
    price: PropTypes.number,
  }),
  setFilters: PropTypes.func.isRequired,
};

FilterPanel.defaultProps = {
  type: 'mobile',
  filters: {
    stars: 0,
    distance: 0,
    price: 0,
  },
};

export default withStyles(styles)(FilterPanel);
