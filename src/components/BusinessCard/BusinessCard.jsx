/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import ShareIcon from '@material-ui/icons/Share';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RateReviewIcon from '@material-ui/icons/RateReview';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';

import { spaceProps } from '../../types';
import ChipList from '../ChipList';

const styles = () => ({
  root: {
    borderRadius: '4px',
    border: '1px solid #E5E5E5',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  imageContainer: {
    marginRight: 24,
    position: 'relative',
    flexGrow: 1,
    overflow: 'hidden',
    maxWidth: 254,
    maxHeight: 184,
    minHeight: 184,
  },
  imageContainerMobile: {
    maxWidth: 127,
    maxHeight: 92,
    minHeight: 92,
    minWidth: 127,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: '4px',
  },
  businessTitleContainer: {
    letterSpacing: '-0.4px',
    color: '#1E1131',
    flex: 1,
  },
  addressIcon: {
    height: '100%',
    width: '23px',
  },
  addressContainer: {
    display: 'flex',
    color: '#666666',
    marginBottom: '2px',
  },
  topCardContainer: {
    marginBottom: 10,
    width: '100%',
    display: 'flex',
  },
  titleBarContainer: {
    fontSize: '18px',
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileTitleBar: {
    fontSize: '16px',
  },
  titleAddressParentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  ctaParentContainer: {
    borderTop: '1px solid #E5E5E5',
    paddingTop: '12px',
    minHeight: '40px',
  },
  ctaContainer: {
    display: 'flex',
    maxWidth: '800px',
  },
  ctaButtonContainer: {
    display: 'flex',
    textDecoration: 'none',
    marginRight: 'auto',
    color: '#666666',
  },
  purpleIcon: {
    color: '#633AA3',
    fontWeight: 500,
  },
  addressString: {
    textDecoration: 'underline',
    color: '#666666',
  },
  ordinalNumberMargins: {
    margin: '0 5px',
  },
  bottomCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  chipList: {
    display: 'flex',
    flex: 1,
    maxWidth: '800px',
  },
  cardInformationContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  businessCardContainer: {
    display: 'flex',
    margin: 16,
  },
  shareButton: {
    color: 'black',
  },
});

const convertAddressToGoogleMapsLink = (businessAddress) => {
  const googleAPIQuery = 'https://www.google.com/maps/dir/?api=1&destination=';
  return googleAPIQuery + encodeURIComponent(businessAddress);
};

const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = (`'' + ${phoneNumberString}`).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return 'No number found';
};

const Image = (
  {
    useDesktop, classes, id, imageUrl, showImage,
  },
) => {
  if (showImage === false) {
    return null;
  }
  const placeholderImage = 'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
  const ImageSizing = useDesktop ? '' : classes.imageContainerMobile;
  const CardImage = imageUrl || placeholderImage;
  const LinkToSpace = `/spaces/${id}`;
  return (
    <Box className={`${classes.imageContainer} ${ImageSizing}`}>
      <Link to={LinkToSpace}>
        <img src={CardImage} alt="business" className={classes.cardImage} />
      </Link>
    </Box>
  );
};

const TopCardContent = (
  {
    classes,
    count,
    useDesktop,
    name,
    address,
    imageUrl,
    id,
  },
) => (
  <Box className={classes.topCardContainer}>
    <Image
      classes={classes}
      imageUrl={imageUrl}
      useDesktop={useDesktop}
      id={id}
      showImage={!useDesktop}
    />
    <Box className={classes.titleAddressParentContainer}>
      <TitleBar
        classes={classes}
        count={count}
        useDesktop={useDesktop}
        businessName={name}
      />
      <AddressRow classes={classes} address={address} />
    </Box>
  </Box>
);

const OrdinalNumber = ({ classes, count }) => {
  const ordinalNumberString = `${count}.`;
  return (
    <span className={classes.ordinalNumberMargins}>
      {ordinalNumberString}
    </span>
  );
};

const ShareMenu = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button onClick={handleClick} data-testid="share-button">
        <MoreVertIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ShareIcon className={classes.shareButton} />
          Share
        </MenuItem>
      </Menu>
    </>
  );
};

const TitleBar = ({
  classes,
  useDesktop,
  count,
  businessName,
}) => {
  const smallerFont = useDesktop ? '' : classes.mobileTitleBar;
  const ContainerClasses = `${classes.titleBarContainer} ${smallerFont}`;
  return (
    <Box className={ContainerClasses}>
      <span className={classes.businessTitleContainer}>
        <OrdinalNumber classes={classes} count={count} />
        {businessName}
      </span>
      <ShareMenu classes={classes} />
    </Box>
  );
};

const AddressRow = ({ classes, address }) => {
  const AddressLink = convertAddressToGoogleMapsLink(address);
  return (
    <>
      <a
        href={AddressLink}
        className={classes.addressContainer}
        target="_blank"
        rel="noreferrer"
      >
        <LocationOnIcon className={classes.addressIcon} data-testid="location-icon" />
        <Typography variant="body1" className={classes.addressString}>
          {address}
        </Typography>
      </a>
      <div style={{ flex: 1 }} />
    </>
  );
};

const AddReviewCTA = ({ id, classes }) => {
  const spacesUrl = `/spaces/${id}/reviews/new`;
  return (
    <Link to={spacesUrl} className={classes.ctaButtonContainer}>
      <RateReviewIcon color="secondary" fontSize="small" data-testid="review-icon" />
      <span>Add Review</span>
    </Link>
  );
};

const RatingCTA = ({ classes, averageRating }) => {
  const label = 'Rating';
  return (
    <Box className={classes.ctaButtonContainer}>
      <span>{label}</span>
      <StarIcon color="secondary" fontSize="small" />
      <span className={classes.purpleIcon}>{averageRating}</span>
    </Box>
  );
};

const CallPhoneCTA = ({ phoneNumber, classes, useDesktop }) => {
  if (phoneNumber === '') {
    return null;
  }
  const phoneString = `tel:${phoneNumber}`;
  const label = (<span>{formatPhoneNumber(phoneNumber)}</span>);
  const displayLabelOnDesktop = useDesktop ? label : null;
  return (
    <a href={phoneString} className={classes.ctaButtonContainer}>
      <PhoneIcon className={classes.purpleIcon} fontSize="small" />
      {displayLabelOnDesktop}
    </a>
  );
};

const VisitWebsiteCTA = ({ classes, useDesktop }) => {
  const label = useDesktop ? <span>Visit Website</span> : null;
  return (
    <Box className={classes.ctaButtonContainer}>
      <LanguageIcon color="secondary" fontSize="small" />
      {label}
    </Box>
  );
};

const CTAs = (
  {
    classes, id, averageRating, phoneNumber, useDesktop,
  },
) => (
  <Box className={classes.ctaParentContainer}>
    <Box className={classes.ctaContainer}>
      <AddReviewCTA classes={classes} id={id} />
      <RatingCTA classes={classes} averageRating={averageRating} />
      <CallPhoneCTA phoneNumber={phoneNumber} classes={classes} useDesktop={useDesktop} />
      <VisitWebsiteCTA classes={classes} useDesktop={useDesktop} />
    </Box>
  </Box>
);

const BottomCardContent = (
  {
    classes, id, averageRating, phoneNumber, useDesktop, filters,
  },
) => (
  <Box className={classes.bottomCardContainer}>
    <Box className={classes.chipList}>
      <ChipList chips={filters} />
    </Box>
    <CTAs
      classes={classes}
      id={id}
      averageRating={averageRating}
      phoneNumber={phoneNumber}
      useDesktop={useDesktop}
    />
  </Box>
);

const BusinessCard = ({
  business: {
    id,
    name,
    category,
    averageRating,
    imageUrl,
    address,
    distance,
    filters,
    phoneNumber,
    url,
  },
  classes,
  count,
}) => {
  const useDesktop = useMediaQuery('(min-width:838px)');

  return (
    <Box className={classes.root}>
      <Box className={classes.businessCardContainer}>
        <Image
          classes={classes}
          imageUrl={imageUrl}
          useDesktop={useDesktop}
          id={id}
          showImage={useDesktop}
        />
        <Box className={classes.cardInformationContainer}>
          <TopCardContent
            classes={classes}
            address={address}
            useDesktop={useDesktop}
            count={count}
            name={name}
            imageUrl={imageUrl}
            id={id}
          />
          <BottomCardContent
            classes={classes}
            id={id}
            averageRating={averageRating}
            phoneNumber={phoneNumber}
            useDesktop={useDesktop}
            filters={filters}
          />
        </Box>
      </Box>
    </Box>
  );
};

BusinessCard.propTypes = {
  business: PropTypes.shape(spaceProps).isRequired,
  classes: PropTypes.shape({}).isRequired,
  overrideClasses: PropTypes.shape({}),
};

BusinessCard.defaultProps = {
  overrideClasses: {},
};

export default withStyles(styles)(BusinessCard);

// eslint-disable-next-line import/no-mutable-exports
export let Tests = {
  convertAddressToGoogleMapsLink,
  formatPhoneNumber,
  Image,
  TopCardContent,
  OrdinalNumber,
  ShareMenu,
  TitleBar,
  AddressRow,
  AddReviewCTA,
  RatingCTA,
  CallPhoneCTA,
  VisitWebsiteCTA,
  CTAs,
  BottomCardContent,
};

if (process.env.NODE_ENV !== 'test') {
  Tests = undefined;
}
