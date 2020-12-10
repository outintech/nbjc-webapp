import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Chip, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const styles = {
  wrapper: {
    display: 'inline',
  },
  filter: {
    marginRight: 10,
    minWidth: 42,
    textAlign: 'center',
  },
};

const PriceFilter = ({ filters, classes, onFilterClick }) => (
  <div className={classes.wrapper}>
    {filters.map((filter) => (
      <Chip
        label={(
          <Typography color={filter.active ? 'inherit' : 'primary'} variant="body2">
            {filter.label}
          </Typography>
        )}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...filter.active && { icon: <CheckIcon /> }}
        color={filter.active ? 'primary' : 'default'}
        className={classes.filter}
        onClick={() => onFilterClick(filter.value)}
        key={filter.value}
      />
    ))}
  </div>
);

PriceFilter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequierd,
      active: PropTypes.bool,
    }),
  ).isRequired,
  onFilterClick: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(PriceFilter);
