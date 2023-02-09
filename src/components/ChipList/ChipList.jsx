import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Typography } from '@material-ui/core';

const styles = {
  chipWrapper: {
    maxHeight: '100%',
    overflow: 'hidden',
  },
  chip: {
    marginBottom: 8,
    marginRight: 4,
    backgroundColor: '#F2F2F2',
    color: '#666666',
    borderRadius: '4px',
  },
};

const ChipList = ({ chips, classes }) => {
  const parentRef = useRef();
  const [moreChips, setMoreChips] = useState(0);
  const inViewList = [];
  useLayoutEffect(() => {
    // filter out those which are false and count their length
    setMoreChips(inViewList.filter((i) => !i).length);
  }, [inViewList]);

  const chipRenderer = () => (
    chips.map((chip) => {
      const [ref, inView] = useInView({ threshold: 1 });
      inViewList.push(inView);
      return (
        <Chip
          color="primary"
          label={
            <Typography variant="body2">{chip.name}</Typography>
          }
          key={chip.name.replace(/\w/, '')}
          className={classes.chip}
          ref={ref}
          size="small"
        />
      );
    })
  );
  return (
    <>
      <div className={classes.chipWrapper} ref={parentRef}>
        {chipRenderer()}
      </div>
      {moreChips > 0 && (
        <Chip
          color="primary"
          variant="outlined"
          label={`+${moreChips} More`}
        />
      )}
    </>
  );
};

ChipList.propTypes = {
  chips: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
  classes: PropTypes.shape({}).isRequired,
};

ChipList.defaultProps = {
  chips: [],
};

export default withStyles(styles)(ChipList);
