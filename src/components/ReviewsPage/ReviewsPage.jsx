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
  },
  paperMain: {
    padding: '10px 10px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '25%',
  },
  reviewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px',
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
  reviews,
}) => {
  const history = useHistory();
  let name = '';
  // TODO: fix the linting
  // eslint-disable-next-line
  if (history.location && history.location.state) {
    name = history.location.state.name;
  }
  const { spaceId } = useParams();
  const id = parseInt(spaceId, 10);

  return (
    <main>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paperMain}>
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
          <Typography variant="body1">{`${(reviews || []).length} Reviews from the Lavender Book`}</Typography>
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
