import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Button,
} from '@material-ui/core';
import { ReactComponent as SubmissionSuccess } from './LavBook-SUCCESS 1.svg';

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  successImg: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    margin: '60px auto 20px auto',
  },
  blurb: {
    textAlign: 'center',
    margin: '25px auto 50px auto',
    width: '80%',
  },
  button: {
    width: '250px',
    height: '36px',
    margin: '10px auto',
  },
  link: {
    width: '250px',
    height: '36px',
    margin: '10px auto',
    textDecoration: 'none',
  },
});

const ProfileSubmitted = ({ classes }) => (
  <Container className={classes.container}>
    <Typography
      variant="h4"
      className={classes.title}
    >
      Profile Submitted
    </Typography>
    <div className={classes.successImg}>
      <SubmissionSuccess />
    </div>
    <Typography className={classes.blurb}>
      Thank you for joining The Lavender Book.
      Get to know the community by searching for a space or submitting a review.
    </Typography>
    <Link
      className={classes.link}
      to="/spaces"
    >
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        SEARCH FOR A SPACE
      </Button>
    </Link>
    <Link
      className={classes.link}
      to="/spaces/new"
    >
      <Button
        variant="outlined"
        color="secondary"
        className={classes.button}
      >
        ADD A SPACE
      </Button>
    </Link>
  </Container>
);

export default withStyles(styles)(ProfileSubmitted);
