import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  button: {
    '&:hover': {
      background: 'none',
    },
  },
};

const StarRating = ({ color, numberFilled, classes }) => {
  const totalStars = 5;
  const [filled, setNumberFilled] = useState(numberFilled);
  const [totalRating, setTotalRating] = useState(numberFilled);

  const getStars = () => {
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      const rating = i + 1;
      if (rating <= filled || rating <= totalRating) {
        stars.push(
          <IconButton
            className={classes.button}
            disableRipple
            onMouseEnter={() => setNumberFilled(rating)}
            onMouseLeave={() => setNumberFilled(totalRating)}
            onClick={() => setTotalRating(rating)}
            color={color}
            key={rating}
          >
            <StarIcon />
          </IconButton>,
        );
      } else {
        stars.push(
          <IconButton
            className={classes.button}
            disableRipple
            onMouseEnter={() => setNumberFilled(rating)}
            onMouseLeave={() => setNumberFilled(totalRating)}
            onClick={() => setTotalRating(rating)}
            color={color}
            key={rating}
          >
            <StarBorderIcon />
          </IconButton>,
        );
      }
    }
    return stars;
  };

  return (
    <>
      {getStars()}
    </>
  );
};

StarRating.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  color: PropTypes.string,
  numberFilled: PropTypes.number,
};

StarRating.defaultProps = {
  color: 'primary',
  numberFilled: 0,
};

export default withStyles(styles)(StarRating);
