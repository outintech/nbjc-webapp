/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RateReviewIcon from '@material-ui/icons/RateReview';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';

import { spaceProps } from '../../types';
import ChipList from '../ChipList';
import useQuery from '../../hooks/useQuery';

const styles = (theme) => ({
  root: {
    borderRadius: '4px',
    border: '1px solid #E5E5E5',
    width: 'auto',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  cardParentContainer: {
    display: 'flex',
    padding: 24,
  },
  imageContainer: {
    marginRight: 24,
    position: 'relative',
    flexGrow: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  largeImageDimensions: {
    maxWidth: 254,
    maxHeight: 184,
    minHeight: 184,
  },
  smallImageDimensions: {
    maxWidth: 127,
    maxHeight: 92,
    minHeight: 92,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  businessTitle: {
    marginBottom: 0,
    letterSpacing: '-0.4px',
    height: '100%',
    color: '#1E1131',
    margin: 0,
    flex: 1,
  },
  mobileBusinessTitle: {
    marginBottom: 0,
    letterSpacing: '-0.4px',
    height: '100%',
    color: '#1E1131',
    margin: 0,
    flex: 1,
  },
  icon: {
    height: '100%',
    width: '23px',
  },
  addressContainer: {
    display: 'flex',
    color: '#666666',
    marginBottom: '2px',
  },
  titleAddressContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 8,
    width: '100%',
  },
  titleContainer: {
    height: '100%',
    fontSize: '18px',
    fontWeight: 700,
    display: 'flex',
  },
  mobileTitleContainer: {
    fontSize: '14px',
    fontWeight: 700,
    display: 'flex',
  },
  CTAcontainer: {
    borderTop: '1px solid #E5E5E5',
    paddingTop: '12px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    textAlign: 'center',
    maxWidth: '800px',
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 3,
    maxWidth: '800px',
  },
  bottomContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mobileBottomContent: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  ratingContainer: {
    display: 'flex',
    textDecoration: 'none',
    marginRight: 'auto',
  },
  purpleColor: {
    color: '#633AA3',
  },
  grayColor: {
    color: '#666666',
  },
  addressString: {
    textDecoration: 'underline',
  },
  hideElement: {
    display: 'none',
  },
  mobileContainer: {
    display: 'flex',
    marginLeft: '5px',
    marginTop: '5px',
  },
  ctaSpacing: {
    marginRight: 2,
  },
  indexNumberMargins: {
    marginRight: 5,
  },
});

const convertAddressToGoogleMapsLink = (businessAddress) => {
  const googleAPIQuery = 'https://www.google.com/maps/dir/?api=1&destination=';
  return googleAPIQuery + encodeURIComponent(businessAddress.address);
};

const formatTenDigitPhoneNumber = (phoneNumberString) => {
  const cleaned = (`'' + ${phoneNumberString}`).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return 'No number found';
};

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
  overrideClasses,
  count,
}) => {
  const useDesktop = useMediaQuery('(min-width:838px)');

  const Image = () => {
    const FallBackImage = 'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
    const CardImage = imageUrl || FallBackImage;
    const ImageDimension = useDesktop ? classes.largeImageDimensions : classes.smallImageDimensions;
    return (
      <Box className={[classes.imageContainer, ImageDimension]}>
        <a href={`/spaces/${id}`}>
          <img src={CardImage} alt="business" className={classes.image} />
        </a>
      </Box>
    );
  };

  const AddressIcon = () => (
    <a
      href={convertAddressToGoogleMapsLink({ address })}
      className={classes.addressContainer}
    >
      <LocationOnIcon className={classes.icon} />
    </a>
  );

  const AddressString = () => (
    <Typography variant="body1" className={[classes.grayColor, classes.addressString]}>
      {address}
    </Typography>
  );

  const AddressRow = () => (
    <Box className={classes.addressContainer}>
      <AddressIcon />
      <AddressString />
    </Box>
  );

  const BusinessName = () => (
    <p className={useDesktop ? classes.businessTitle : classes.mobileBusinessTitle}>
      <span className={classes.indexNumberMargins}>
        {count}
        .
      </span>
      {name}
    </p>
  );

  const ShareButton = () => (
    <>
      <MoreVertIcon />
    </>
  );

  const BusinessNameShareButtonRow = () => (
    <Box className={useDesktop ? classes.titleContainer : classes.mobileTitleContainer}>
      <BusinessName />
      <ShareButton />
    </Box>
  );

  const ChipsRow = () => (
    <Box className={classes.tagContainer}>
      <ChipList chips={filters} />
    </Box>
  );

  const RatingCTA = () => (
    <Box className={classes.ratingContainer}>
      <span className={classes.ctaSpacing}>Rating</span>
      <StarIcon color="secondary" fontSize="small" />
      <span className={classes.purpleColor}>{averageRating}</span>
    </Box>
  );

  const VisitWebsiteCTA = () => (
    <Box className={classes.ratingContainer}>
      <LanguageIcon color="secondary" fontSize="small" />
      {useDesktop ? <span>Visit Website</span> : null}
    </Box>
  );

  const PhoneNumberCTA = () => (
    <a href={`tel:${phoneNumber}`} className={classes.ratingContainer}>
      <PhoneIcon className={classes.purpleColor} fontSize="small" />
      {useDesktop ? (
        <span className={classes.grayColor}>
          {formatTenDigitPhoneNumber(phoneNumber)}
        </span>
      ) : null}
    </a>
  );

  const AddReviewCTA = () => (
    <a href={`/spaces/${id}/reviews/new`} className={classes.ratingContainer}>
      <RateReviewIcon color="secondary" fontSize="small" className={classes.ctaSpacing} />
      <span className={classes.grayColor}>Add Review</span>
    </a>
  );

  return (
    <Box className={classes.root}>
      <Box className={useDesktop ? classes.cardParentContainer : []}>
        {useDesktop ? <Image /> : null}
        <Box className={classes.contentContainer}>
          <Box className={useDesktop ? [] : classes.mobileContainer}>
            {useDesktop ? null : <Image />}
            <Box className={classes.titleAddressContainer}>
              <BusinessNameShareButtonRow />
              <AddressRow />
            </Box>
          </Box>
          <Box className={useDesktop
            ? classes.bottomContent : [classes.bottomContent, classes.mobileBottomContent]}
          >
            <ChipsRow />
            <Box className={classes.CTAcontainer}>
              <Box className={classes.buttonContainer}>
                <AddReviewCTA />
                <RatingCTA />
                <PhoneNumberCTA />
                <VisitWebsiteCTA />
              </Box>
            </Box>
          </Box>
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
