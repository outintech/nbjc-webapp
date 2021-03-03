import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  // eslint-disable-next-line
  const name = history.location.state.name;

  return (
    <main>
      <Grid
        container
        className={classes.root}
        spacing={2}
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Reviews
            </Typography>
            <Typography variant="body1" align="center">
              {` Read ratings and reviews for ${name} from The Lavender Book users.`}
            </Typography>
          </Paper>
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
