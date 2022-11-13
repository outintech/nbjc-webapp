import React from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  withStyles,
} from '@material-ui/core/';

import { ReactComponent as SolIcon } from '../../assets/noto_statue-of-liberty.svg';
import { ReactComponent as AtlantaIcon } from '../../assets/noto_peach.svg';
import { ReactComponent as DCIcon } from '../../assets/noto_classical-building.svg';
import { ReactComponent as HoustonIcon } from '../../assets/noto_cactus.svg';
import { ReactComponent as LAIcon } from '../../assets/noto_palm-tree.svg';

import { ReactComponent as CafeIcon } from '../../assets/noto_hot-beverage.svg';
import { ReactComponent as BarberIcon } from '../../assets/noto_barber-pole.svg';
import { ReactComponent as RestaurantIcon } from '../../assets/noto_fork-and-knife-with-plate.svg';
import { ReactComponent as WellnessIcon } from '../../assets/noto_woman-in-lotus-position-dark-skin-tone.svg';
import { ReactComponent as ShoppingIcon } from '../../assets/noto_shopping-bags.svg';
import { ReactComponent as NightlifeIcon } from '../../assets/noto_cocktail-glass.svg';

import FirstGridImage from '../../assets/Rectangle 52.png';
import SecondGridImage from '../../assets/Rectangle 53.png';
import ThirdGridImage from '../../assets/Rectangle 54.png';

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
      maxWidth: '350px',
      marginBottom: '20px',
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
    backgroundColor: '#EBE5F6',
    marginRight: '20px',
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
    fontSize: '28px',
    fontWeight: 600,
  },
  font: {
    color: '#1E1131',
  },
  body: {
    fontSize: '20px',
    [theme.breakpoints.up('mobile')]: {
      marginBottom: '20px',
    },
  },
  row: {
    marginLeft: 60,
    marginRight: 40,
    marginTop: 40,
  },
  buttonRow: {
    marginBottom: 20,
  },
  problemButton: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    marginRight: '5px',
  },
});

const Home = ({ classes }) => {
  // since this is a copy heavy page
  // switch to smaller dimensions sooner
  const matches = useMediaQuery('(min-width:960px)');

  return (
    matches ? (
      <Box className={classes.root}>
        <Grid container className={classes.row}>
          <Grid item xs={12} md={4}>
            <img src={FirstGridImage} alt="meaningful text" className={classes.image} />
          </Grid>
          <Grid item xs={12} md={6} className={[classes.fontGridContainer, classes.row]}>
            <Typography variant="h2" className={[classes.title, classes.font]} align="left">
              The Mission
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="left">
              Our mission is to spread the word about spaces where people can be themselves.
              All spaces and reviews are published by Lavender Book members.
            </Typography>
            <Box>
              <Button variant="outlined" className={classes.button}>
                Add a Space
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} className={[classes.fontGridContainer, classes.row]}>
            <Typography variant="h2" className={[classes.title, classes.font]} align="left">
              Discover New Spaces
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="left">
              Lavender Book is here whether you are traveling or looking for a new local
              hangout spot.
            </Typography>
            <Box>
              <Button variant="outlined" className={classes.button}>
                <SolIcon className={classes.icon} />
                NYC
              </Button>
              <Button variant="outlined" className={classes.button}>
                <AtlantaIcon className={classes.icon} />
                Atlanta
              </Button>
              <Button variant="outlined" className={classes.button}>
                <DCIcon className={classes.icon} />
                DC
              </Button>
              <Button variant="outlined" className={classes.button}>
                <HoustonIcon className={classes.icon} />
                Houston
              </Button>
              <Button variant="outlined" className={classes.button}>
                <LAIcon className={classes.icon} />
                LA
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <img src={SecondGridImage} alt="meaningful text" className={classes.image} />
          </Grid>
          <Grid item xs={12} md={4}>
            <img src={ThirdGridImage} alt="meaningful text" className={classes.image} />
          </Grid>
          <Grid item xs={12} md={6} className={[classes.fontGridContainer, classes.row]}>
            <Typography variant="h2" className={[classes.title, classes.font]} align="left">
              What types of spaces can I search?
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="left">
              Not sure where to start? Use the categories below to narrow your search to specific
              types of spaces.
            </Typography>
            <Box className={classes.buttonRow}>
              <Button variant="outlined" className={classes.button}>
                <CafeIcon className={classes.icon} />
                Coffeeshops
              </Button>
              <Button variant="outlined" className={classes.button}>
                <BarberIcon className={classes.icon} />
                Barbershops
              </Button>
              <Button variant="outlined" className={classes.button}>
                <RestaurantIcon className={classes.icon} />
                Restaurants
              </Button>
            </Box>
            <Box>
              <Button variant="outlined" className={classes.button}>
                <WellnessIcon className={classes.icon} />
                Wellness
              </Button>
              <Button variant="outlined" className={classes.button}>
                <ShoppingIcon className={classes.icon} />
                Shopping
              </Button>
              <Button variant="outlined" className={classes.button}>
                <NightlifeIcon className={classes.icon} />
                Nightlife
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.problemButton}>
          <Button variant="outlined" className={classes.button}>
            Report a Problem
          </Button>
        </Box>

      </Box>
    ) : (
      <Box className={classes.root}>
        <Grid container>
          <imageOne />
          <Grid item xs={12} md={4}>
            <img src={FirstGridImage} alt="meaningful text" className={classes.image} />
          </Grid>
          <Grid item xs={12} md={8} className={classes.fontGridContainer}>
            <Typography variant="h2" className={[classes.title, classes.font]} align="center">
              The Mission
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="center">
              Our mission is to spread the word about spaces where people can be themselves.
              All spaces and reviews are published by Lavender Book members.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8} className={classes.fontGridContainer}>
            <Grid item xs={12} md={4}>
              <img src={SecondGridImage} alt="meaningful text" className={classes.image} />
            </Grid>
            <Typography variant="h2" className={[classes.title, classes.font]} align="center">
              Discover New Spaces
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="center">
              Lavender Book is here whether you are traveling or looking for a new local
              hangout spot.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src={ThirdGridImage} alt="meaningful text" className={classes.image} />
          </Grid>
          <Grid item xs={12} md={8} className={classes.fontGridContainer}>
            <Typography variant="h2" className={[classes.title, classes.font]} align="center">
              What types of spaces can I search?
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="center">
              Not sure where to start? Use the categories below to narrow your search to specific
              types of spaces.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default withStyles(styles)(Home);
