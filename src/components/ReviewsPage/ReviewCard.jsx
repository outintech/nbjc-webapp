import React from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const StyledRating = withStyles({
  iconFilled: {
    color: '#9276b5',
  },
})(Rating);

const styles = (theme) => ({
  reviewUserName: {
    display: 'inline-block',
  },
  reviewDate: {
    [theme.breakpoints.up('xs')]: {
      float: 'right',
    },
    [theme.breakpoints.up('mobile')]: {
      float: 'inherit',
      marginLeft: 15,
    },
  },
});

function ReviewCard({
  userName,
  dateCreated,
  rating,
  text,
  classes,
  overrideClasses = {},
}) {
  const matches = useMediaQuery('(min-width:376px)');
  return (
    <Card
      className={cx(classes.paper, overrideClasses.reviewContent)}
      elevation="none"
    >
      <Typography
        variant={matches ? 'h5' : 'h6'}
        className={classes.reviewUserName}
      >
        {`@${userName}`}
      </Typography>
      <Typography variant="caption" className={classes.reviewDate}>
        {dateCreated}
      </Typography>
      <br />
      <StyledRating
        name="read-only"
        value={rating}
        readOnly
        className={classes.reviewRating}
      />
      <Typography variant={matches ? 'body1' : 'body2'}>
        {`"${text}"`}
      </Typography>
    </Card>
  );
}

export default withStyles(styles)(ReviewCard);
