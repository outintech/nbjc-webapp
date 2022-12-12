/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';

import { Box } from '@material-ui/core';

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
    maxHeight: '216px',
    maxWidth: '760px',
    marginRight: 142,

  },
  searchContentContainer: {
    display: 'flex',
    padding: 24,
  },
  imageContainer: {
    marginRight: 24,
    position: 'relative',
    width: 171,
    height: 171,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    border: '1px solid black',
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
            <img src="https://via.placeholder.com/171" alt="alt-text" className={classes.image} />
          </a>
        </Box>
        <Box className={classes.contentContainer}>
          Content

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
