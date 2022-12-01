import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

import PrideParadeImage from '../../assets/Rectangle 52.png';
import GroupPrideImage from '../../assets/Rectangle 53.png';
import RainbowMuralImage from '../../assets/Rectangle 54.png';

import PrideParadeImageLarge from '../../assets/Rectangle 52@2x.png';
import GroupPrideImageLarge from '../../assets/Rectangle 53@2x.png';
import RainbowMuralImageLarge from '../../assets/Rectangle 54@2x.png';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '0 40px',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 100px',
    },
  },
  image: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '450px',
    },
    [theme.breakpoints.up('mobile')]: {
      maxWidth: '350px',
      marginBottom: '1rem',
    },
    height: 'auto',
    display: 'inherit',
    width: '100%',
  },
  button: {
    backgroundColor: '#FCFBFE',
    textTransform: 'none',
    border: '1px solid #EBE5F6',
    fontWeight: 600,
    [theme.breakpoints.up('lg')]: {
      minWidth: 122.4,
      minHeight: 40.8,
    },
  },
  fontGridContainer: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      minWidth: 900,
      maxWidth: 900,
    },
    overflow: 'auto',
  },
  title: {
    fontSize: '32px',
    fontWeight: 600,
  },
  font: {
    color: '#1E1131',
  },
  body: {
    fontSize: '20px',
    [theme.breakpoints.up('mobile')]: {
      marginBottom: '1rem',
      fontSize: '22px',
    },
  },
  row: {
    marginTop: '3rem',
  },
  middleRow: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  buttonRow: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      marginTop: 10,
    },
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '1rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: 550,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 800,
    },
  },
  problemButton: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  outerRow: {
    display: 'flex',
    gap: 20,
    [theme.breakpoints.up('md')]: {
      gap: 40,
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRow: {
    display: 'flex',
    gap: 20,
    [theme.breakpoints.up('md')]: {
      gap: 40,
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  margins: {
    margin: '0 auto',
  },
  mobileCenter: {
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
        <Box className={classes.row}>
          <Box className={classes.outerRow}>
            <img src={PrideParadeImageLarge} alt="happy black person at pride parade" className={classes.image} />
            <Box className={[classes.fontGridContainer, classes.row]}>
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
            </Box>
          </Box>
          <Box className={classes.innerRow}>
            <Box className={[classes.fontGridContainer, classes.middleRow]}>
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
            </Box>
            <img src={GroupPrideImageLarge} alt="three black people having fun on a street" className={classes.image} />
          </Box>
          <Box className={classes.outerRow}>
            <img src={RainbowMuralImageLarge} alt="black person in front of rainbow mural" className={classes.image} />
            <Box className={[classes.fontGridContainer, classes.row]}>
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
            </Box>
          </Box>
        </Box>
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
          <Grid item xs={12} md={4} className={classes.mobileCenter}>
            <img src={PrideParadeImage} alt="happy black person at pride parade" className={[classes.image, classes.margin]} />
          </Grid>
          <Grid item xs={12} md={8} className={classes.fontGridContainer}>
            <Typography variant="h2" className={[classes.title, classes.font]} align="center">
              The Mission
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="center">
              Our mission is to spread the word about spaces where people can be themselves.
              All spaces and reviews are published by Lavender Book members.
            </Typography>
            <Button href="/spaces/new" variant="outlined" className={[classes.button, classes.body, classes.buttonRow]}>
              Add a Space
            </Button>
          </Grid>
          <Grid item xs={12} md={8} className={classes.fontGridContainer}>
            <Grid item xs={12} md={4} className={classes.mobileCenter}>
              <img src={GroupPrideImage} alt="three black people having fun on a street" className={[classes.image, classes.margin]} />
            </Grid>
            <Typography variant="h2" className={[classes.title, classes.font]} align="center">
              Discover New Spaces
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="center">
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
          <Grid item xs={12} md={4} className={classes.mobileCenter}>
            <img src={RainbowMuralImage} alt="black person in front of rainbow mural" className={[classes.image, classes.margin]} />
          </Grid>
          <Grid item xs={12} md={8} className={classes.fontGridContainer}>
            <Typography variant="h2" className={[classes.title, classes.font]} align="center">
              What types of spaces can I search?
            </Typography>
            <Typography variant="body1" className={[classes.font, classes.body]} align="center">
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
    )
  );
};

export default withStyles(styles)(Home);
