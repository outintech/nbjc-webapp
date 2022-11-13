import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  withStyles,
} from '@material-ui/core/';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    backgroundColor: '#FCFBFE',
    textTransform: 'none',
    border: '1px solid #EBE5F6',
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
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 20,
    maxWidth: 550,
  },
  problemButton: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
  },
});

const Home = ({ classes }) => {
  // since this is a copy heavy page
  // switch to smaller dimensions sooner
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const matches = useMediaQuery('(min-width:960px)');
  const history = useHistory();

  const handleClick = (event, param) => {
    history.push({
      pathname: '/search/results',
      search: `?searchTerm=&category=&location=${param}`,
    });
  };

  const rowTwoButtons = [
    { name: 'NYC', icon: <SolIcon />, search: 'New York City, NY' },
    { name: 'Atlanta', icon: <AtlantaIcon />, search: 'Atlanta, GA' },
    { name: 'DC', icon: <DCIcon />, search: 'Washington DC' },
    { name: 'Houston', icon: <HoustonIcon />, search: 'Houston, TX' },
    { name: 'LA', icon: <LAIcon />, search: 'Los Angeles, CA' },
  ];

  const rowThreeButtons = [
    { name: 'Coffeeshops', icon: <CafeIcon /> },
    { name: 'Barbershops', icon: <BarberIcon /> },
    { name: 'Restaurants', icon: <RestaurantIcon /> },
    { name: 'Wellness', icon: <WellnessIcon /> },
    { name: 'Shopping', icon: <ShoppingIcon /> },
    { name: 'Nightlife', icon: <NightlifeIcon /> },
  ];

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
              <Button href="/spaces/new" variant="outlined" className={classes.button}>
                Add a Space
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} className={[classes.fontGridContainer, classes.row]} style={{ marginLeft: '7rem' }}>
            <Typography variant="h2" className={[classes.title, classes.font]} align="left">
              Discover New Spaces
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="left">
              Lavender Book is here whether you are traveling or looking for a new local
              hangout spot.
            </Typography>
            <Box className={classes.buttonRow}>
              {rowTwoButtons.map((buttonData) => (
                <Button
                  variant="outlined"
                  className={classes.button}
                  startIcon={buttonData.icon}
                  onClick={(event) => handleClick(event, buttonData.search)}
                >
                  {buttonData.name}
                </Button>
              ))}
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
              {rowThreeButtons.map((buttonData) => (
                <Button variant="outlined" className={classes.button} startIcon={buttonData.icon}>
                  {buttonData.name}
                </Button>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.problemButton}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => {
              setShowSupportDialog(true);
            }}
          >
            Report a Problem
          </Button>
        </Box>
        <Dialog
          open={showSupportDialog}
          onClose={() => setShowSupportDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Leave The Lavender Book?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to leave The Lavender Book? You will be taken
              to Google Forms to contact Support.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSupportDialog(false)} color="primary">
              Disagree
            </Button>
            <Button
              onClick={() => {
                window.open('https://forms.gle/mLDNTMGxMojuiKKLA', '_blank');
                setShowSupportDialog(false);
              }}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
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
