import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ReviewCard from './ReviewCard';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paperMain: {
    padding: '10px 10px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100px',
  },
  paper: {
    padding: '10px 10px',
    textAlign: 'left',
  },
  starIcon: {
    paddingBottom: '0 !important',
    color: theme.palette.primary,
  },
});

const ReviewsPage = ({
  classes,
  // rating,
  // dateCreated,
  // userName,
  // text,
  reviews,
}) => {
  const history = useHistory();
  // eslint-disable-next-line
  const name = history.location.state.name;
  // const name = 'La Colombe Coffee';

  return (
    <main>
      <Grid
        container
        className={classes.root}
        spacing={2}
      >
        <Grid item xs={12}>
          <Paper className={classes.paperMain}>
            <Typography variant="h4" align="center">
              Reviews
            </Typography>
            <Typography variant="body1" align="center">
              {` Read ratings and reviews for ${name} from The Lavender Book users.`}
            </Typography>
          </Paper>
          {reviews.map((review) => (
            <ReviewCard
              userName={review.userName}
              rating={review.rating}
              dateCreated={review.dateCreated}
              text={review.text}
              classes={classes}
            />
          ))}
        </Grid>
      </Grid>
    </main>
  );
};

ReviewsPage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

ReviewsPage.defaultProps = {
};

export default withStyles(styles)(ReviewsPage);
