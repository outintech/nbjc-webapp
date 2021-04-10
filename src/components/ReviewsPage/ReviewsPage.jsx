import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
    width: 'unset',
  },
  paperMain: {
    padding: '10px 10px',
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    height: '25%',
    backgroundColor: 'unset',
  },
  reviewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px',
  },
  paper: {
    backgroundColor: 'unset',
  },
  starIcon: {
    paddingBottom: '0 !important',
    color: theme.palette.primary,
  },
});

const ReviewsPage = ({
  classes,
  reviews,
  reviewsCount,
}) => {
  const history = useHistory();
  let name = '';
  if (history.location && history.location.state) {
    name = history.location.state.name;
  }
  const { spaceId } = useParams();
  const id = parseInt(spaceId, 10);

  return (
    <Grid container className={classes.root} direction="column">
      <Grid item xs={12}>
        <Paper className={classes.paperMain} elevation={0}>
          <Typography variant="h4" align="center">
            Reviews
          </Typography>
          <Typography variant="body1" align="center">
            {` Read ratings and reviews for ${name} from The Lavender Book users.`}
          </Typography>
          <div className={classes.reviewButton}>
            <Button
              variant="contained"
              color="primary"
              href={`/spaces/${id}/reviews/new`}
            >
              Write a review
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant="h5">{`${reviewsCount} ${reviewsCount === 1 ? 'Review' : 'Reviews'} from The Lavender Book users`}</Typography>
          {reviews && reviews.map((review) => (
            <div>
              <ReviewCard
                userName={review.userName}
                rating={review.rating}
                dateCreated={review.dateCreated}
                text={review.content}
                classes={classes}
              />
              <Divider />
            </div>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

ReviewsPage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  reviewsCount: PropTypes.number.isRequired,
};

ReviewsPage.defaultProps = {
};

export default withStyles(styles)(ReviewsPage);
