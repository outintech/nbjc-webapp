import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
  Card,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Rating from '@material-ui/lab/Rating';
// import StarIcon from '@material-ui/icons/Star';

const StyledRating = withStyles({
  iconFilled: {
    color: '#9276b5',
  },
})(Rating);

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
  rating,
  dateCreated,
  userName,
  text,
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
          <Card className={classes.paper}>
            <Typography variant="body1">
              {userName}
            </Typography>
            <Typography variant="body1">
              {dateCreated}
            </Typography>
            <StyledRating name="read-only" value={rating} readOnly />
            <Typography variant="body1">
              {`"${text}"`}
            </Typography>
          </Card>
          <Card className={classes.paper}>
            <Typography variant="body1">
              {userName}
            </Typography>
            <Typography variant="body1">
              {dateCreated}
            </Typography>
            <StyledRating name="read-only" value={rating} readOnly />
            <Typography variant="body1">
              {`"${text}"`}
            </Typography>
          </Card>
          <Card className={classes.paper}>
            <Typography variant="body1">
              {userName}
            </Typography>
            <Typography variant="body1">
              {dateCreated}
            </Typography>
            <StyledRating name="read-only" value={rating} readOnly />
            <Typography variant="body1">
              {`"${text}"`}
            </Typography>
          </Card>
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
