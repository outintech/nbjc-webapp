import React from 'react';
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  withStyles,
} from '@material-ui/core/';

// import Button from '@material-ui/core/Button';

import FirstGridImage from '../../assets/Rectangle 52.png';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
  },
  image: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('mobile')]: {
      maxWidth: '500px',
    },
    height: 'auto',
    display: 'inherit',
    margin: '0 auto',
    width: '100%',
  },
  buttonWrapper: {
    [theme.breakpoints.up('xs')]: {
      flexWrap: 'wrap-reverse',
    },
    [theme.breakpoints.up('mobile')]: {
      flexWrap: 'no-wrap',
    },
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'space-evenly',
  },
  button: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: '25px',
    },
    [theme.breakpoints.up('mobile')]: {
      marginBottom: '0px',
    },
    width: '250px',
  },
  break: {
    [theme.breakpoints.up('xs')]: {
      width: '0px',
    },
    [theme.breakpoints.up('mobile')]: {
      width: '25px',
    },
  },
  fontGridContainer: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: '30px',
    fontWeight: 600,
  },
  font: {
    color: '#1E1131',
  },
  body: {
    fontSize: '18px',
  },
});

const Home = ({ classes }) => {
  // since this is a copy heavy page
  // switch to smaller dimensions sooner
  const matches = useMediaQuery('(min-width:500px)'); // Use this to center the typography when mobile view.
  console.log(matches);
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <img src={FirstGridImage} alt="meaningful text" className={classes.image} />
        </Grid>
        <Grid item xs={12} md={8} className={classes.fontGridContainer}>
          <Typography variant="h2" className={[classes.title, classes.font]} align="left">
            The Mission
          </Typography>
          <Typography variant="body1" className={[classes.font, classes.body]} align="left">
            Our mission is to spread the word about spaces where people can be themselves.
            All spaces and reviews are published by Lavender Book members.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} className={classes.fontGridContainer}>
          <Typography variant="h2" className={[classes.title, classes.font]} align="left">
            The Mission
          </Typography>
          <Typography variant="body1" className={[classes.font, classes.body]} align="left">
            Our mission is to spread the word about spaces where people can be themselves.
            All spaces and reviews are published by Lavender Book members.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={FirstGridImage} alt="meaningful text" className={classes.image} />
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={FirstGridImage} alt="meaningful text" className={classes.image} />
        </Grid>
        <Grid item xs={12} md={8} className={classes.fontGridContainer}>
          <Typography variant="h2" className={[classes.title, classes.font]} align="left">
            The Mission
          </Typography>
          <Typography variant="body1" className={[classes.font, classes.body]} align="left">
            Our mission is to spread the word about spaces where people can be themselves.
            All spaces and reviews are published by Lavender Book members.
          </Typography>
        </Grid>
      </Grid>
    </Box>

  );
};

export default withStyles(styles)(Home);
