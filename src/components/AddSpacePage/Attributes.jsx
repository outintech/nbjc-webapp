import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Button, Typography } from '@material-ui/core';

import ChipFilters from '../ChipFilters';
import { chipType, addSpaceProps as addSpacePropTypes } from '../../types';

const styles = (theme) => ({
  chipWrapper: {
    display: 'block',
  },
  chip: {
    [theme.breakpoints.up('xs')]: {
      margin: '10px 10px 0 0',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '30px 40px 0 0',
    },
  },
  footer: {
    margin: '40px 0',
  },
  submitButton: {
    float: 'right',
    marginBottom: 20,
  },
});

const Attributes = ({
  chips,
  onBack,
  onNext,
  classes,
  addSpaceProps,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  const { chips: initialChips = [] } = addSpaceProps;
  const initialChipMap = initialChips.reduce((acc, c) => {
    acc[c.value] = c;
    return acc;
  }, {});
  const [activeChips, setActiveChips] = useState(
    chips.map((c) => ({ ...c, isSelected: !!initialChipMap[c.value] })),
  );
  const onChipSelected = (i) => {
    const oldChips = [...activeChips];
    oldChips[i].isSelected = !oldChips[i].isSelected;
    setActiveChips(oldChips);
  };

  const isAnySelected = () => ((activeChips.filter((c) => c.isSelected) || []).length > 0);

  const onSubmit = () => {
    const selectedChips = activeChips.filter((chip) => chip.isSelected);
    onNext({ chips: selectedChips });
  };

  return (
    <>
      <Typography variant="subtitle1" align="center">
        What are the attributes that make this an OurGuide space?
      </Typography>
      <Typography variant="h6">Select all that apply</Typography>
      <ChipFilters
        chips={activeChips}
        onChipSelected={onChipSelected}
        chipSize="medium"
        overrideClasses={{ wrapper: classes.chipWrapper, chip: classes.chip }}
      />
      <div className={classes.footer}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.submitButton}
          fullWidth={!matches}
          onClick={onSubmit}
          disabled={!isAnySelected()}
          disableElevation
        >
          Next
        </Button>
        <Button
          type="cancel"
          variant="outlined"
          color="secondary"
          fullWidth={!matches}
          onClick={onBack}
          disableElevation
        >
          Back
        </Button>
      </div>
    </>
  );
};

Attributes.propTypes = {
  chips: PropTypes.arrayOf(chipType).isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  addSpaceProps: PropTypes.shape(addSpacePropTypes),
};

Attributes.defaultProps = {
  addSpaceProps: {},
};

export default withStyles(styles)(Attributes);
