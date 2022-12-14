/* eslint-disable no-unused-vars */
import React from 'react';
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

import { withStyles } from '@material-ui/core/styles';

import { spaceProps } from '../../types';
import ChipList from '../ChipList';

const styles = (theme) => ({
  root: {
    borderRadius: '4px',
    border: '1px solid #E5E5E5',
    width: 'auto',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  searchContentContainer: {
    display: 'flex',
    padding: 24,
  },
  imageContainer: {
    marginRight: 24,
    position: 'relative',
    maxWidth: 254,
    maxHeight: 184,
    minHeight: 184,
    flexGrow: 1,
    overflow: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  businessTitle: {
    marginBottom: 0,
    letterSpacing: '-0.4px',
    lineHeight: '28px',
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
  },
  titleContainer: {
    height: '100%',
    fontSize: '18px',
    fontWeight: 700,
    display: 'flex',
  },
  CTAcontainer: {
    display: 'flex',
    alignItems: 'flex-end',
    borderTop: '1px solid #E5E5E5',
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingTop: '12px',
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 3,
  },
  bottomContent: {
    height: '100%',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  ratingContainer: {
    display: 'flex',
    textDecoration: 'none',
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
});

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
    return null;
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.searchContentContainer}>
        <Box className={classes.imageContainer}>
          <a href={`/spaces/${id}`}>
            <img src={imageUrl || 'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'} alt="alt-text" className={classes.image} />
          </a>
        </Box>
        <Box className={classes.contentContainer}>
          <Box className={classes.titleAddressContainer} style={{ marginBottom: 8 }}>
            <Box className={classes.titleContainer}>
              <p className={classes.businessTitle}>
                <span style={{ marginRight: 5 }}>
                  {count}
                  .
                </span>
                {name}
              </p>
              <MoreVertIcon />
            </Box>
            <Box className={classes.addressContainer}>
              <a
                href={convertAddressToGoogleMapsLink({ address })}
                className={classes.addressContainer}
              >
                <LocationOnIcon className={classes.icon} />
                <Typography variant="body1" className={[classes.grayColor, classes.addressString]}>
                  {address}
                </Typography>
              </a>
            </Box>
          </Box>
          <Box className={classes.bottomContent}>
            <Box className={classes.tagContainer}>
              <ChipList chips={filters} />
            </Box>
            <Box className={classes.CTAcontainer}>
              <a href={`/spaces/${id}/reviews/new`} className={classes.ratingContainer}>
                <RateReviewIcon color="secondary" fontSize="small" style={{ marginRight: 2 }} />
                <span className={classes.grayColor}>Add Review</span>
              </a>
              <Box className={classes.ratingContainer}>
                <span style={{ marginRight: 1 }}>Rating</span>
                <StarIcon color="secondary" fontSize="small" />
                <span className={classes.purpleColor}>{averageRating}</span>
              </Box>
              <a href={`tel:${phoneNumber}`} className={classes.ratingContainer}>
                <PhoneIcon className={classes.purpleColor} fontSize="small" />
                <span className={classes.grayColor}>
                  {formatTenDigitPhoneNumber(phoneNumber)}
                </span>
              </a>
              <Box className={classes.ratingContainer}>
                <LanguageIcon color="secondary" fontSize="small" />
                <span>Visit Website</span>
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
