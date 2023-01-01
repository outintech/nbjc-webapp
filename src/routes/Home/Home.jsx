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
    marginBottom: 4,
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
  mobileImage: {
    height: 'auto',
    width: 'auto',
    display: 'inherit',
    maxWidth: '300px',
    minWidth: '300px',
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
  rowContainer: {
    [theme.breakpoints.up('md')]: {
      gap: 40,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  alignColumn: {
    flexDirection: 'column',
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
  },
  expandWidth: {
    width: '100%',
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
    <Typography variant="h2" align={alignDirection} className={classes.textHeader} data-testid="row-title">
      {titleString}
    </Typography>
    <Typography variant="body1" align={alignDirection} className={classes.textParagraphBody} data-testid="row-body">
      {bodyString}
    </Typography>
  </>
);

RowTextContent.propTypes = {
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
    rowObject: {
      imageUrl,
      imageAltText,
      flippedImageSide,
      title,
      body,
      buttonRowFunction,
    },
  },
) => {
  const mediumWidth = useMediaQuery('(min-width:960px');
  const smallWidth = useMediaQuery('(min-width:425px');
  const imageSize = smallWidth ? classes.image : classes.mobileImage;
  const displayAsColumn = mediumWidth ? null : classes.alignColumn;
  const centerFont = mediumWidth ? 'left' : 'center';
  const flipImage = mediumWidth ? flippedImageSide : false;

  const imageComponent = (
    <img src={imageUrl} alt={imageAltText} className={imageSize} />);
  const displayImageOnFlip = flipImage ? imageComponent : null;
  const displayImageWithoutFlip = flipImage ? null : imageComponent;
  return (
    <Box className={`${classes.rowContainer} ${displayAsColumn}`}>
      {displayImageWithoutFlip}
      <Box className={classes.textContainer}>
        <RowTextContent
          classes={classes}
          titleString={title}
          bodyString={body}
          alignDirection={centerFont}
        />
        {buttonRowFunction(mediumWidth)}
      </Box>
      {displayImageOnFlip}
    </Box>
  );
};

const Home = ({ classes }) => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const history = useHistory();

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

  const AddASpaceButton = (breakpoint) => {
    const baseButton = (
      <Button href="/spaces/new" variant="outlined" className={classes.searchButton}>
        Add a Space
      </Button>
    );
    const wideButton = (
      <Box className={`${classes.searchButtonContainer} ${classes.expandWidth}`}>
        {baseButton}
      </Box>
    );
    return breakpoint ? wideButton : baseButton;
  };

  const QuickLocationButtons = () => {
    const locationButtons = [
      { name: 'NYC', icon: <SolIcon />, search: 'New York City, NY' },
      { name: 'Atlanta', icon: <AtlantaIcon />, search: 'Atlanta, GA' },
      { name: 'DC', icon: <DCIcon />, search: 'Washington DC' },
      { name: 'Houston', icon: <HoustonIcon />, search: 'Houston, TX' },
      { name: 'LA', icon: <LAIcon />, search: 'Los Angeles, CA' },
    ];
    const handleClick = (event, param) => {
      history.push({
        pathname: '/search/results',
        search: `?searchTerm=&category=&location=${param}`,
      });
    };
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
      buttonRowFunction: AddASpaceButton,
    },
    rowTwo: {
      title: 'Discover New Spaces',
      body: 'Lavender Book is here whether you are traveling or looking for a new local hangout spot.',
      imageUrl: GroupPrideImageLarge,
      imageAltText: 'three black people having fun on a street',
      flippedImageSide: true,
      buttonRowFunction: QuickLocationButtons,
    },
    rowThree: {
      title: 'What types of spaces can I search?',
      body: 'Not sure where to start? Use the categories below to narrow your search to specific types of spaces.',
      imageUrl: RainbowMuralImageLarge,
      imageAltText: 'black person in front of rainbow mural',
      flippedImageSide: false,
      buttonRowFunction: QuickCategoryButtons,
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

// eslint-disable-next-line import/no-mutable-exports
export let Tests = {
  ParentRowContainer,
  ButtonComponent,
  RowTextContent,
};

if (process.env.NODE_ENV !== 'test') {
  Tests = undefined;
}
