/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Dialog,
  IconButton,
  Toolbar,
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
};

const FilterPanel = ({
  open,
  onClose,
  type,
  classes,
  filters,
  setFilters,
}) => {
  const placeholder = `We got some filters: ${Object.keys(filters).join()}!`;

  if (type === 'desktop') {
    return (
      <div className={classes.root}>
        { placeholder }
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
          { placeholder }
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
