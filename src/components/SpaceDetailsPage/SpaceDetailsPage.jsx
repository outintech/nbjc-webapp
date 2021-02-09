import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import {
  Button,
  Typography,
  Checkbox,
  TextField,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import StarRating from '../StarRating';
import SpaceDetailsCard from './SpaceDetailsCard';

const styles = {

};

const SpaceDetailsPage = ({
  classes,
  name,
  category,
  averageRating,
  space,
}) => {
  const [cardData, setCardData] = useState({});

  useEffect(() => {
    setCardData(space);
  }, [space]);

  return (
    <>
      { cardData
        && (
          <div>
            <SpaceDetailsCard
              name={cardData.name}
              id={cardData.id}
              phoneNumber={cardData.phone}
              filters={cardData.filters}
              url={cardData.url}
            />
          </div>
        )}
      <FormGroup>
        <h1> Rate and review this space.</h1>
        <h1> You can rate and review anonymously.</h1>
        <div
          aria-label="Name of Space"
          avatar={(
            <div color="secondary">
              <StarIcon color="secondary" fontSize="large" />
              <Typography
                variant="body2"
                color="secondary"
                className={classes.rating}
              >
                {averageRating}
              </Typography>
            </div>
          )}
          title={<Typography variant="h6">{name}</Typography>}
          subheader={<Typography variant="body2">{category}</Typography>}
        />

        <p>Rate this space.</p>
        <StarRating />

        <p>Share your thoughts</p>
        <TextField
          id="outlined-multiline-static"
          label="Write Review"
          multiline
          placeholder="Write Your Review Here"
          variant="outlined"
          required
        />

        <FormControlLabel
          control={<Checkbox name="publish" />}
          label="Publish my rating and review anonymously."
        />

        <Button color="secondary">Submit</Button>
      </FormGroup>
    </>
  );
};

// TODO: fix warnings and add reqiured propTypes
SpaceDetailsPage.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  averageRating: PropTypes.string.isRequired,
  space: PropTypes.shape({}).isRequired,
};

SpaceDetailsPage.defaultProps = {

};

export default withStyles(styles)(SpaceDetailsPage);
