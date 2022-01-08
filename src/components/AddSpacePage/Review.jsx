import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import StarRating from '../StarRating';

import { addSpaceProps as addSpacePropTypes } from '../../types';

const styles = (theme) => ({
  ratingText: {
    [theme.breakpoints.down('mobile')]: {
      float: 'right',
    },
  },
  review: {
    marginTop: 20,
  },
  remaining: {
    float: 'right',
  },
  checkbox: {
    display: 'block',
    '& p': {
      display: 'inline-block',
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

const Review = ({
  classes,
  onBack,
  onNext,
  addSpaceProps,
  title,
  showBack,
  submitLabel,
  disableSubmit,
  overrideClasses,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [formValues, setFormValues] = useState({
    rating: addSpaceProps.rating || 0,
    review: addSpaceProps.review || '',
    anon: addSpaceProps.anon || false,
  });

  const getSanitizedReview = (review) => {
    // todo: sanitize input for invalid characters
    if (review.length > 500) {
      return review.substring(0, 499);
    }
    return review;
  };

  const onChange = (e) => {
    switch (e.target.name) {
      case 'review':
        setFormValues({ ...formValues, review: getSanitizedReview(e.target.value) });
        break;
      case 'anon':
        setFormValues({ ...formValues, anon: !formValues.anon });
        break;
      case 'rating':
        setFormValues({ ...formValues, rating: e.target.value });
        break;
      default:
        break;
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onNext(formValues);
  };

  const validateForm = () => formValues.review.length > 0 && formValues.rating > 0;
  // eslint-disable-next-line
  const reviewPlaceholder = 'Did the staff ask for your pronouns? How would you describe the service you received? Did you feel safe entering or being inside the space? Did anyone specific help you? What languages were spoken? Was the space accurate to the listing on The Lavender Book? Was the space accessible? Would you go back?';

  return (
    <>
      <form onSubmit={onFormSubmit} data-testid="review-form">
        {title(matches)}
        <Typography variant="h6">Rate this space</Typography>
        <div>
          <StarRating
            numberFilled={formValues.rating}
            onRatingChanged={(rating) => onChange({ target: { value: rating, name: 'rating' } })}
          />
          <Typography
            variant="caption"
            className={classes.ratingText}
          >
            {`${formValues.rating} stars`}
          </Typography>
        </div>
        <Typography variant="h6">Share your thoughts</Typography>
        <TextField
          value={formValues.review}
          onChange={onChange}
          variant="outlined"
          label="Write a Review"
          helperText={(
            <>
              <Typography variant="caption" color="primary">
                Required
              </Typography>
              <Typography variant="caption" className={classes.remaining}>
                {`${500 - formValues.review.length} characters remaining`}
              </Typography>
            </>
          )}
          placeholder={reviewPlaceholder}
          name="review"
          rows={5}
          className={classes.review}
          data-testid="review-content"
          fullWidth
          multiline
        />
        <FormControlLabel
          className={classes.checkbox}
          checked={formValues.anon}
          control={<Checkbox name="anon" color="primary" onChange={onChange} />}
          label={(
            <Typography variant="body2">
              Publish my rating and review anonymously.
            </Typography>
          )}
        />
        <div className={cx(classes.footer, overrideClasses.footer)}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={cx(classes.submitButton, overrideClasses.submitButton)}
            fullWidth={!matches}
            onClick={onFormSubmit}
            disabled={!validateForm() || disableSubmit()}
            disableElevation
          >
            {submitLabel}
          </Button>
          {showBack && (
            <Button
              type="cancel"
              variant="outlined"
              color="primary"
              fullWidth={!matches}
              onClick={onBack}
              disableElevation
            >
              Back
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

Review.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  addSpaceProps: PropTypes.shape(addSpacePropTypes),
  title: PropTypes.func,
  showBack: PropTypes.bool,
  submitLabel: PropTypes.string,
  disableSubmit: PropTypes.func,
  overrideClasses: PropTypes.shape({}),
};

Review.defaultProps = {
  addSpaceProps: {},
  title: (matches) => (
    <Typography variant={matches ? 'h4' : 'subtitle1'} align="center">
      Rate and review this space. You can rate and review anonymously.
    </Typography>
  ),
  showBack: true,
  onBack: () => {},
  submitLabel: 'Next',
  disableSubmit: () => false,
  overrideClasses: {},
};

export default withStyles(styles)(Review);
