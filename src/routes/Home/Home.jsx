/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  withStyles,
} from '@material-ui/core/';

import SupportButton from '../../components/SupportButton/SupportButton';

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
  const displayButtonsIfPassedAsProps = buttonRowFunction === undefined
    ? null : buttonRowFunction(classes, mediumWidth);

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
        {displayButtonsIfPassedAsProps}
      </Box>
      {displayImageOnFlip}
    </Box>
  );
};

const AddASpaceButton = (classes, breakpoint) => {
  const baseButton = (
    <Button href="/spaces/new" variant="outlined" className={classes.searchButton} data-testid="add-space-button">
      Add a Space
    </Button>
  );
  const wideButton = (
    <Box className={`${classes.searchButtonContainer} ${classes.expandWidth}`} data-testid="add-space-parent">
      {baseButton}
    </Box>
  );
  return breakpoint ? wideButton : baseButton;
};

const ButtonRow = ({ classes, buttonSet, handleClick }) => (
  <Box className={classes.searchButtonContainer}>
    {buttonSet.map((buttonData, index) => (
      <Button
        variant="outlined"
        startIcon={<img src={buttonData.icon} alt="icon" />}
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

const QuickLocationButtons = (classes) => {
  const history = useHistory();
  const locationButtons = [
    { name: 'NYC', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_statue-of-liberty.svg', search: 'New York City, NY' },
    { name: 'Atlanta', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_peach.svg', search: 'Atlanta, GA' },
    { name: 'DC', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_classical-building.svg', search: 'Washington DC' },
    { name: 'Houston', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_cactus.svg', search: 'Houston, TX' },
    { name: 'LA', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_palm-tree.svg', search: 'Los Angeles, CA' },
  ];
  const handleClick = (event, param) => {
    history.push({
      pathname: '/search/results',
      search: `?searchTerm=&category=&location=${param}`,
    });
  };
  return (<ButtonRow classes={classes} handleClick={handleClick} buttonSet={locationButtons} />);
};

const QuickCategoryButtons = (classes) => {
  const history = useHistory();
  const categoryButtons = [
    { name: 'Coffeeshops', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_hot-beverage.svg' },
    { name: 'Barbershops', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_barber-pole.svg' },
    { name: 'Restaurants', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_fork-and-knife-with-plate.svg' },
    { name: 'Wellness', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_woman-in-lotus-position-dark-skin-tone.svg' },
    { name: 'Shopping', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_shopping-bags.svg' },
    { name: 'Nightlife', icon: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/noto_cocktail-glass.svg' },
  ];
  const handleClick = (event, param) => {
    history.push({
      pathname: '/search/results',
      search: `?searchTerm=&category=&location=${param}`,
    });
  };
  return (<ButtonRow classes={classes} buttonSet={categoryButtons} handleClick={handleClick} />);
};

const Home = ({ classes }) => {
  const rowContent = {
    rowOne: {
      title: 'The Mission',
      body: 'Welcome! The Lavender Book is a community-driven platform built for the Black Queer, Black Trans, and Black Gender Non-Binary communities. Our mission is to spread the word about spaces where people can be themselves. All spaces and reviews are published by Lavender Book members.',
      imageUrl: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/Rectangle%2052@2x.png',
      imageAltText: 'happy black person at pride parade',
      flippedImageSide: false,
      buttonRowFunction: AddASpaceButton,
    },
    rowTwo: {
      title: 'Discover New Spaces',
      body: 'Lavender Book is here whether you are traveling or looking for a new local hangout spot.',
      imageUrl: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/Rectangle%2053@2x.png',
      imageAltText: 'three black people having fun on a street',
      flippedImageSide: true,
      buttonRowFunction: QuickLocationButtons,
    },
    rowThree: {
      title: 'What types of spaces can I search?',
      body: 'Not sure where to start? Use the categories below to narrow your search to specific types of spaces.',
      imageUrl: 'https://lavenderboook.nyc3.cdn.digitaloceanspaces.com/assets/Rectangle%2054@2x.png',
      imageAltText: 'black person in front of rainbow mural',
      flippedImageSide: false,
      buttonRowFunction: QuickCategoryButtons,
    },
  };

  return (
    <Box className={classes.root}>
      {Object.keys(rowContent)
        .map((rowObj) => <ParentRowContainer classes={classes} rowObject={rowContent[rowObj]} />)}
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
  AddASpaceButton,
  ButtonRow,
};

if (process.env.NODE_ENV !== 'test') {
  Tests = undefined;
}
