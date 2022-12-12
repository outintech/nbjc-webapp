/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';

import {
  Box,
  Icon,
  Typography,
} from '@material-ui/core';

import StarIcon from '@material-ui/icons/Star';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RateReviewIcon from '@material-ui/icons/RateReview';

import { withStyles } from '@material-ui/core/styles';

import { spaceProps } from '../../types';
import ChipList from '../ChipList';

const styles = (theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      padding: '6px 6px;',
    },
    flexGrow: 1,
    marginTop: '8px',
    marginRight: '142px',
  },
  starIcon: {
    paddingBottom: '0 !important',
  },
  rating: {
    display: 'block',
  },
  headerAction: {
    margin: '0 !important',
  },
  cardMedia: {
    margin: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: 344,
      height: 194,
    },
    [theme.breakpoints.up('mobile')]: {
      width: 436,
      height: 222,
    },
  },
  location: {
    display: 'flex',
    'flex-direction': 'row',
    marginBottom: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    textDecorationLine: 'underline',
  },

  distance: {
    textAlign: 'right',
    flexGrow: 2,
  },
  address: {
    marginRight: 30,
    flexGrow: 1,
  },
  chipWrapper: {
    'margin-top': '15px',
  },
  filter: {
    margin: '15px 20px 15px 0',
  },
  footer: {
    marginTop: 30,
  },
  shareButton: {
    float: 'right',
  },
  businessCardContainer: {
    borderRadius: '4px',
    border: '1px solid #E5E5E5',
    marginRight: 142,
    width: 'auto',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  searchContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 24,
  },
  imageContainer: {
    marginRight: 24,
    position: 'relative',
    maxWidth: 254,
    maxHeight: 184,
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
  },
  icon: {
    height: '100%',
    width: '23px',
  },
  addressContainer: {
    display: 'flex',
    color: '#666666',
  },
  titleAddressContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleContainer: {
    height: '100%',
    fontSize: '18px',
    fontWeight: 700,
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
  },
  ratingScore: {
    color: '#633AA3',
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
}) => {
  const convertAddressToGoogleMapsLink = (businessAddress) => {
    const googleAPIQuery = 'https://www.google.com/maps/dir/?api=1&destination=';
    return googleAPIQuery + encodeURIComponent(businessAddress.address);
  };

  return (
    <Box className={classes.businessCardContainer}>
      <Box className={classes.searchContentContainer}>
        <Box className={classes.imageContainer}>
          <a href="/">
            <img src={imageUrl} alt="alt-text" className={classes.image} />
          </a>
        </Box>
        <Box className={classes.contentContainer}>
          <Box className={classes.titleAddressContainer} style={{ marginBottom: 8 }}>
            <Box className={classes.titleContainer}>
              <p className={classes.businessTitle} style={{ margin: 0, height: '100%' }}>
                <span style={{ marginRight: 2 }}>1.</span>
                {name}
              </p>
            </Box>
            <Box className={classes.addressContainer}>
              <a
                href={convertAddressToGoogleMapsLink({ address })}
                className={classes.addressContainer}
              >
                <LocationOnIcon className={classes.icon} />
                <Typography variant="body1" style={{ textDecoration: 'underline', color: '#666666' }}>{address}</Typography>
              </a>
            </Box>
          </Box>
          <Box className={classes.bottomContent}>
            <Box className={classes.tagContainer}>
              <ChipList chips={filters} />
            </Box>
            <Box className={classes.CTAcontainer}>
              <Box className={classes.ratingContainer}>
                <RateReviewIcon color="secondary" fontSize="small" style={{ marginRight: 2 }} />
                <span>Add Review</span>
              </Box>
              <Box className={classes.ratingContainer}>
                <span style={{ marginRight: 1 }}>Rating</span>
                <StarIcon color="secondary" fontSize="small" />
                <span className={classes.ratingScore}>{averageRating}</span>
              </Box>
              <Box className={classes.ratingContainer}>
                {phoneNumber}
              </Box>
              <Box className={classes.ratingContainer}>
                <StarIcon color="secondary" fontSize="small" />
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
