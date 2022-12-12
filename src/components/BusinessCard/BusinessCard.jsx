/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';

import {
  Box,
  Icon,
  Typography,
} from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';

import { withStyles } from '@material-ui/core/styles';

import { spaceProps } from '../../types';

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
    border: '1px solid black',
    marginRight: 142,
    width: 'auto',
    height: '100%',
  },
  searchContentContainer: {
    maxHeight: '216px',
    maxWidth: '760px',
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
    flexGrow: 3,
    border: '1px solid black',
    justifyContent: 'space-around',
  },
  businessTitle: {
    marginBottom: 0,
    fontsize: '20px',
    fontWeight: 500,
    letterSpacing: '-0.4px',
    lineHeight: '28px',
  },
  icon: {

  },
  addressContainer: {
    display: 'flex',
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
  console.log(classes);

  return (
    <Box className={classes.businessCardContainer}>
      <Box className={classes.searchContentContainer}>
        <Box className={classes.imageContainer}>
          <a href="/">
            <img src={imageUrl} alt="alt-text" className={classes.image} />
          </a>
        </Box>
        <Box className={classes.contentContainer}>
          <Box>
            <h3 className={classes.businessTitle}>Title</h3>
          </Box>
          <Box className={classes.addressContainer}>
            <LocationOnIcon className={classes.icon} />
            <Typography variant="body1">{address}</Typography>
          </Box>
          <Box>
            Tags
          </Box>
          <Box>
            CTAs
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
