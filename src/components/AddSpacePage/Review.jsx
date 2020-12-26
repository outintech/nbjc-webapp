import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import StarRating from '../StarRating';

const styles = () => ({
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

const Review = ({ classes, onBack, onNext }) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [formValues, setFormValues] = useState({
    rating: 0,
    review: '',
    anon: false,
  });

  const onChange = (e) => {
    switch (e.target.name) {
      case 'review':
        setFormValues({ ...formValues, review: e.target.value });
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
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Typography variant="subtitle1" align="center">
          Rate and review this space. You can rate and review anonymously.
        </Typography>
        <Typography variant="h6">
          Rate this space
        </Typography>
        <StarRating numberFilled={formValues.rating} onRatingChanged={(rating) => onChange({ target: { rating, name: 'rating' } })} />
        <Typography variant="h6">
          Share your thought
        </Typography>
        <TextField
          value={formValues.review}
          onChange={onChange}
          variant="outlined"
          label="Write a Review"
          helperText="Required"
          name="review"
          rows={5}
          fullWidth={!matches}
          multiline
        />
        <FormControlLabel
          className={classes.checkbox}
          control={(
            <Checkbox
              name="anon"
              color="primary"
              onChange={onChange}
            />
          )}
          label={(
            <Typography variant="body2">
              Publish my rating and review anonymously.
            </Typography>
          )}
        />
        <div className={classes.footer}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submitButton}
            fullWidth={!matches}
            onClick={onNext}
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
      </form>
    </>
  );
};

Review.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

Review.defaultProps = {};

export default withStyles(styles)(Review);
