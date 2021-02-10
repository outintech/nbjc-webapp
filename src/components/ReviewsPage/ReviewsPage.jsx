import React, { useContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { NameContext } from '../../context/NameContext';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '10px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100px',
  },
});

const ReviewsPage = ({ classes }) => {
  const { spaceTitle } = useContext(NameContext);
  const [title, setTitle] = useState();

  useEffect(() => {
    setTitle(spaceTitle);
  }, [spaceTitle]);

  return (
    <main>
      <Grid
        container
        // direction="column"
        // justify="felx-start"
        // alignItems="stretch"
        className={classes.root}
        spacing={2}
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Reviews
            </Typography>
            <Typography variant="body2" align="center">
              Read ratings and reviews for
              {title}
              from The Lavender Book users.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
};

ReviewsPage.propTypes = {};

ReviewsPage.defaultProps = {};

export default withStyles(styles)(ReviewsPage);
