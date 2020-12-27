import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
  noHover: {
    '&:hover': {
      cursor: 'default',
    },
  },
};

const StarRating = ({
  color,
  numberFilled,
  classes,
  onRatingChanged,
  editable,
}) => {
  const totalStars = 5;
  const [filled, setNumberFilled] = useState(numberFilled);
  const [totalRating, setTotalRating] = useState(numberFilled);

  const setFilled = (number) => {
    if (!editable) {
      return;
    }
    setNumberFilled(number);
  };

  const changeRating = (rating) => {
    if (!editable) {
      return;
    }
    if (rating === 1 && totalRating === 1) {
      setTotalRating(0);
      onRatingChanged(0);
      return;
    }
    setTotalRating(rating);
    onRatingChanged(rating);
  };

  const getStars = () => {
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      const rating = i + 1;
      if (rating <= filled || rating <= totalRating) {
        stars.push(
          <IconButton
            className={cx(classes.button, { [classes.noHover]: !editable })}
            disableRipple
            onMouseEnter={() => setFilled(rating)}
            onMouseLeave={() => setFilled(totalRating)}
            onClick={() => changeRating(rating)}
            color={color}
            key={rating}
          >
            <StarIcon />
          </IconButton>,
        );
      } else {
        stars.push(
          <IconButton
            className={cx(classes.button, { [classes.noHover]: !editable })}
            disableRipple
            onMouseEnter={() => setFilled(rating)}
            onMouseLeave={() => setFilled(totalRating)}
            onClick={() => changeRating(rating)}
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

  return <>{getStars()}</>;
};

StarRating.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  color: PropTypes.string,
  numberFilled: PropTypes.number,
  onRatingChanged: PropTypes.func,
  editable: PropTypes.bool,
};

StarRating.defaultProps = {
  color: 'primary',
  numberFilled: 0,
  onRatingChanged: () => {},
  editable: true,
};

export default withStyles(styles)(StarRating);
