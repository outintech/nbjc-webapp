import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Typography } from '@material-ui/core';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

const styles = () => ({
  chip: {
    margin: 10,
  },
  wrapper: {
    display: 'block',
  },
});

const ChipFilters = ({
  chips, onChipSelected, classes, chipSize, overrideClasses,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  return (
    <div className={cx(classes.wrapper, overrideClasses.wrapper)}>
      {chips.map((chip, i) => (
        <Chip
          label={
            <Typography variant="body2">{chip.name}</Typography>
          }
          key={chip.name.replace(/\w/, '')}
          variant={chip.isSelected ? 'default' : 'outlined'}
          size={chipSize || matches ? 'medium' : 'small'}
          onClick={() => onChipSelected(i)}
          icon={chip.isSelected ? <CheckOutlinedIcon /> : null}
          color="primary"
          className={cx(classes.chip, overrideClasses.chip)}
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
  chipSize: PropTypes.oneOf(['small', 'medium', 'large']),
  overrideClasses: PropTypes.shape({}),
};

ChipFilters.defaultProps = {
  chipSize: null,
  overrideClasses: {},
};

export default withStyles(styles)(ChipFilters);
