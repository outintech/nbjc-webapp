/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      margin: '3rem 100px',
    },
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'inherit',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '450px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '350px',
      marginBottom: '1rem',
    },
  },
  mobileImage: {
    height: 'auto',
    width: 'auto',
    display: 'inherit',
  },
  smallMobileImage: {
    height: 'auto',
    width: 'auto',
    display: 'inherit',
    maxWidth: '300px',
    minWidth: '300px',
  },
  searchButton: {
    [theme.breakpoints.up('lg')]: {
      // Width/Height is 1.7x larger than the base MUI button size.
      minWidth: 122.4,
      minHeight: 40.8,
    },
    backgroundColor: '#FCFBFE',
    textTransform: 'none',
    border: '1px solid #EBE5F6',
    fontWeight: 600,
  },
  textContainer: {
    [theme.breakpoints.up('lg')]: {
      minWidth: 875,
      maxWidth: 875,
    },
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'auto',
  },
  textHeader: {
    color: '#1E1131',
    fontSize: '32px',
    fontWeight: 600,
  },
  textParagraphBody: {
    [theme.breakpoints.up('mobile')]: {
      marginBottom: '1rem',
      fontSize: '22px',
    },
    color: '#1E1131',
    fontSize: '20px',
  },
  searchButtonContainer: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 550,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 800,
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      marginTop: 10,
    },
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '1rem',
  },
  desktopImageTextContainer: {
    [theme.breakpoints.up('md')]: {
      gap: 40,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const RowTextContent = (
  {
    classes,
    titleString,
    bodyString,
    alignDirection,
  },
) => (
  <>
    <Typography variant="h2" align={alignDirection} className={classes.textHeader}>
      {titleString}
    </Typography>
    <Typography variant="body1" align={alignDirection} className={classes.textParagraphBody}>
      {bodyString}
    </Typography>
  </>
);

RowTextContent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  titleString: PropTypes.string.isRequired,
  bodyString: PropTypes.string,
  alignDirection: PropTypes.string,
};

RowTextContent.defaultProps = {
  bodyString: '',
  alignDirection: 'left',
};

const ButtonComponent = ({ classes, hrefString, buttonLabel }) => (
  <Button href={hrefString} variant="outlined" className={classes.searchButton}>
    {buttonLabel}
  </Button>
);

ButtonComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  hrefString: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

const ParentRowContainer = (
  {
    classes,
    rowObject,
  },
) => {
  const imageComponent = (
    <img src={rowObject.imageUrl} alt={rowObject.imageAltText} className={classes.image} />);
  const displayImageOnFlip = rowObject.flippedImageSide ? imageComponent : null;
  const displayImageWithoutFlip = rowObject.flippedImageSide ? null : imageComponent;
  return (
    <Box className={classes.desktopImageTextContainer}>
      {displayImageWithoutFlip}
      <Box className={classes.textContainer}>
        <RowTextContent
          classes={classes}
          titleString={rowObject.title}
          bodyString={rowObject.body}
        />
        {rowObject.buttonRowFunction}
      </Box>
      {displayImageOnFlip}
    </Box>
  );
};

ParentRowContainer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  rowObject: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string,
      imageUrl: PropTypes.string.isRequired,
      imageAltText: PropTypes.string.isRequired,
      flippedImageSide: PropTypes.bool,
      buttonRowFunction: PropTypes.func,
    }),
  ).isRequired,
};

const Home = ({ classes }) => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const desktopBreakpoint = useMediaQuery('(min-width:960px)');
  const mobileBreakpoint = useMediaQuery('(min-width:425px');
  const history = useHistory();

  const handleClick = (event, param) => {
    history.push({
      pathname: '/search/results',
      search: `?searchTerm=&category=&location=${param}`,
    });
  };

  const SupportButton = () => {
    const supportLink = 'https://forms.gle/mLDNTMGxMojuiKKLA';
    return (
      <Box>
        <Box className={classes.centerContent} style={{ marginTop: '1rem' }}>
          <Button
            variant="outlined"
            className={classes.searchButton}
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
                window.open(supportLink, '_blank');
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
    );
  };

  const QuickLocationButtons = () => {
    const locationButtons = [
      { name: 'NYC', icon: <SolIcon />, search: 'New York City, NY' },
      { name: 'Atlanta', icon: <AtlantaIcon />, search: 'Atlanta, GA' },
      { name: 'DC', icon: <DCIcon />, search: 'Washington DC' },
      { name: 'Houston', icon: <HoustonIcon />, search: 'Houston, TX' },
      { name: 'LA', icon: <LAIcon />, search: 'Los Angeles, CA' },
    ];
    return (
      <Box className={classes.searchButtonContainer}>
        {locationButtons.map((buttonData, index) => (
          <Button
            variant="outlined"
            startIcon={buttonData.icon}
            onClick={(event) => handleClick(event, buttonData.search)}
            className={classes.searchButton}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {buttonData.name}
          </Button>
        ))}
      </Box>
    );
  };

  const QuickCategoryButtons = () => {
    const categoryButtons = [
      { name: 'Coffeeshops', icon: <CafeIcon /> },
      { name: 'Barbershops', icon: <BarberIcon /> },
      { name: 'Restaurants', icon: <RestaurantIcon /> },
      { name: 'Wellness', icon: <WellnessIcon /> },
      { name: 'Shopping', icon: <ShoppingIcon /> },
      { name: 'Nightlife', icon: <NightlifeIcon /> },
    ];
    return (
      <Box className={classes.searchButtonContainer}>
        {categoryButtons.map((buttonData, index) => (
          <Button
            variant="outlined"
            className={classes.searchButton}
            startIcon={buttonData.icon}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {buttonData.name}
          </Button>
        ))}
      </Box>
    );
  };

  const rowContent = {
    rowOne: {
      title: 'The Mission',
      body: 'Our mission is to spread the word about spaces where people can be themselves. All spaces and reviews are published by Lavender Book members.',
      imageUrl: PrideParadeImageLarge,
      imageAltText: 'happy black person at pride parade',
      flippedImageSide: false,
      buttonRowFunction: null,
    },
    rowTwo: {
      title: 'Discover New Spaces',
      body: 'Lavender Book is here whether you are traveling or looking for a new local hangout spot.',
      imageUrl: GroupPrideImageLarge,
      imageAltText: 'three black people having fun on a street',
      flippedImageSide: true,
      buttonRowFunction: QuickLocationButtons(),
    },
    rowThree: {
      title: 'What types of spaces can I search?',
      body: 'Not sure where to start? Use the categories below to narrow your search to specific types of spaces.',
      imageUrl: RainbowMuralImageLarge,
      imageAltText: 'black person in front of rainbow mural',
      flippedImageSide: false,
      buttonRowFunction: QuickCategoryButtons(),
    },
  };

  return (
    <Box className={classes.root}>
      <ParentRowContainer classes={classes} rowObject={rowContent.rowOne} />
      <ParentRowContainer classes={classes} rowObject={rowContent.rowTwo} />
      <ParentRowContainer classes={classes} rowObject={rowContent.rowThree} />
      <SupportButton />
    </Box>
  );
};

export default withStyles(styles)(Home);
