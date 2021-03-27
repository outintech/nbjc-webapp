import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const StyledRating = withStyles({
  iconFilled: {
    color: '#9276b5',
  },
})(Rating);

export default function ReviewCard({
  userName, dateCreated, rating, text, classes,
}) {
  return (
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
  );
}
