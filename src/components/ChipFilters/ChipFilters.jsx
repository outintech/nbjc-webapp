import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Typography } from '@material-ui/core';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

const styles = () => ({
  chip: {
    margin: 10,
  },
  mobileWrapper: {
    display: 'flex',
    overflow: 'scroll',
  },
});

const ChipFilters = ({ chips, onChipSelected, classes }) => {
  const matches = useMediaQuery('(min-width:376px)');
  return (
    <div className={matches ? '' : classes.mobileWrapper}>
      {chips.map((chip, i) => (
        <Chip
          label={
            <Typography variant="body2">{chip.name}</Typography>
          }
          key={chip.name.replace(/\w/, '')}
          variant={chip.isSelected ? 'default' : 'outlined'}
          size={matches ? 'medium' : 'small'}
          onClick={() => onChipSelected(i)}
          icon={chip.isSelected ? <CheckOutlinedIcon /> : null}
          color="primary"
          className={classes.chip}
        />
      ))}
    </div>
  );
};

ChipFilters.propTypes = {
  chips: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
  })).isRequired,
  onChipSelected: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

ChipFilters.defaultProps = {};

export default withStyles(styles)(ChipFilters);
