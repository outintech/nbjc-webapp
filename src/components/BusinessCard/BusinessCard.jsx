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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';

import { spaceProps } from '../../types';
import ChipList from '../ChipList';
import useQuery from '../../hooks/useQuery';

const styles = (theme) => ({
  root: {
    borderRadius: '4px',
    border: '1px solid #E5E5E5',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
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
  cardImage: {
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
    minWidth: 127,
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
  addressIcon: {
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
    fontSize: '16px',
    fontWeight: 700,
    display: 'flex',
  },
  CTAParentContainer: {
    borderTop: '1px solid #E5E5E5',
    paddingTop: '12px',
  },
  CTAContainer: {
    display: 'flex',
    maxWidth: '800px',
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 3,
    maxWidth: '800px',
  },
  bottomCardRowContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mobileBottomMargins: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  ratingContainer: {
    display: 'flex',
    textDecoration: 'none',
    marginRight: 'auto',
    color: '#666666',
  },
  purple: {
    color: '#633AA3',
  },
  gray: {
    color: '#666666',
  },
  addressString: {
    textDecoration: 'underline',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#666666',
  },

  hideElement: {
    display: 'none',
  },

  mobileContainer: {
    display: 'flex',
    marginLeft: '5px',
    marginTop: '5px',
  },
  indexNumberMargins: {
    marginRight: 5,
  },
});

const convertAddressToGoogleMapsLink = (businessAddress) => {
  const googleAPIQuery = 'https://www.google.com/maps/dir/?api=1&destination=';
  return googleAPIQuery + encodeURIComponent(businessAddress.address);
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
    useDesktop, classes, id, imageUrl,
  },
) => {
  const placeholderImage = 'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
  const dimensions = useDesktop ? classes.largeImageDimensions : classes.smallImageDimensions;
  const CardImage = imageUrl || placeholderImage;
  const LinkToSpace = `/spaces/${id}`;
  return (
    <Box className={`${classes.imageContainer} ${dimensions}`}>
      <a href={LinkToSpace}>
        <img src={CardImage} alt="business" className={classes.cardImage} />
      </a>
    </Box>
  );
};

const DisplayAddressRow = ({ classes, address }) => {
  const AddressLink = convertAddressToGoogleMapsLink(address);
  return (
    <>
      <a
        href={AddressLink}
        className={classes.addressContainer}
        target="_blank"
        rel="noreferrer"
      >
        <LocationOnIcon className={classes.addressIcon} />
        <Typography variant="body1" className={classes.addressString}>
          {address}
        </Typography>
      </a>
    </>
  );
};

const AddReviewCTA = ({ id, classes }) => {
  const link = `/spaces/${id}/reviews/new`;
  return (
    <a href={link} className={classes.ratingContainer}>
      <RateReviewIcon color="secondary" fontSize="small" />
      <span>Add Review</span>
    </a>
  );
};

const RatingCTA = ({ classes, averageRating }) => {
  const label = 'Rating';
  return (
    <Box className={classes.ratingContainer}>
      <span>{label}</span>
      <StarIcon color="secondary" fontSize="small" />
      <span className={classes.purple}>{averageRating}</span>
    </Box>
  );
};

const CallPhoneCTA = ({ phoneNumber, classes, useDesktop }) => {
  const phoneString = `tel:${phoneNumber}`;
  const label = (<span>{formatPhoneNumber(phoneNumber)}</span>);
  const displayLabelOnDesktop = useDesktop ? label : null;
  return (
    <a href={phoneString} className={classes.ratingContainer}>
      <PhoneIcon className={classes.purple} fontSize="small" />
      {displayLabelOnDesktop}
    </a>
  );
};

const VisitWebsiteCTA = ({ classes, useDesktop }) => {
  const label = useDesktop ? <span>Visit Website</span> : null;
  return (
    <Box className={classes.ratingContainer}>
      <LanguageIcon color="secondary" fontSize="small" />
      {label}
    </Box>
  );
};

const DisplayCTAs = (
  {
    classes, id, averageRating, phoneNumber, useDesktop,
  },
) => (
  <Box className={classes.CTAParentContainer}>
    <Box className={classes.CTAContainer}>
      <AddReviewCTA classes={classes} id={id} />
      <RatingCTA classes={classes} averageRating={averageRating} />
      <CallPhoneCTA phoneNumber={phoneNumber} classes={classes} useDesktop={useDesktop} />
      <VisitWebsiteCTA classes={classes} useDesktop={useDesktop} />
    </Box>
  </Box>
);

const DisplayChips = ({ classes, filters }) => (
  <Box className={classes.chipContainer}>
    <ChipList chips={filters} />
  </Box>
);

const DisplayBottomCardContent = (
  {
    classes, id, averageRating, phoneNumber, useDesktop, filters,
  },
) => {
  const addMarginsForMobile = useDesktop ? '' : classes.mobileMargins;
  const ParentContainerClass = `${classes.bottomCardRowContainer} ${addMarginsForMobile}`;
  return (
    <Box className={ParentContainerClass}>
      <DisplayChips classes={classes} filters={filters} />
      <DisplayCTAs
        classes={classes}
        id={id}
        averageRating={averageRating}
        phoneNumber={phoneNumber}
        useDesktop={useDesktop}
      />
    </Box>
  );
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

  return (
    <Box className={classes.root}>
      <Box className={useDesktop ? classes.cardParentContainer : []}>
        {useDesktop ? (
          <Image
            classes={classes}
            imageUrl={imageUrl}
            useDesktop={useDesktop}
            id={id}
          />
        ) : null}
        <Box className={classes.contentContainer}>
          <Box className={useDesktop ? [] : classes.mobileContainer}>
            {useDesktop ? null : (
              <Image
                classes={classes}
                imageUrl={imageUrl}
                useDesktop={useDesktop}
                id={id}
              />
            )}
            <Box className={classes.titleAddressContainer}>
              <Box className={useDesktop ? classes.titleContainer : classes.mobileTitleContainer}>
                <p className={useDesktop ? classes.businessTitle : classes.mobileBusinessTitle}>
                  <span className={classes.indexNumberMargins}>
                    {`${count}.`}
                  </span>
                  {name}
                </p>
                <MoreVertIcon />
              </Box>
              <DisplayAddressRow classes={classes} address={address} />
            </Box>
          </Box>
          <DisplayBottomCardContent
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
