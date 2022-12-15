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
    overflow: 'hidden',
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
  mobileImageContainer: {
    marginRight: 24,
    position: 'relative',
    maxWidth: 127,
    maxHeight: 92,
    minHeight: 92,
    flexGrow: 1,
    overflow: 'hidden',
  },
  mobileTitleContainer: {
    fontSize: '16px',
    fontWeight: 700,
    display: 'flex',
  },
  mobileTagContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 3,
    maxWidth: '800px',
  },
  mobileBusinessTitle: {
    marginBottom: 0,
    letterSpacing: '-0.4px',
    height: '100%',
    color: '#1E1131',
    margin: 0,
    flex: 1,
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
  const [useMobile, setUseMobile] = useState(false);
  const mobileCTABreakpoint = useMediaQuery('(min-width:500px)');
  const desktopCTABreakpoint = useMediaQuery('(min-width:838px)');

  useEffect(() => {
    if (desktopCTABreakpoint) {
      setUseMobile(false);
    } else {
      setUseMobile(true);
    }
  }, [desktopCTABreakpoint]);

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

  const ChipTags = () => (
    <Box className={useMobile ? classes.mobileTagContainer : classes.tagContainer}>
      <ChipList chips={filters} />
    </Box>
  );

  const hideCTAs = ((useMobile && !mobileCTABreakpoint)
    || (!useMobile && !desktopCTABreakpoint));

  const PhoneNumber = () => (
    hideCTAs ? null : (
      <span className={classes.grayColor}>
        {formatTenDigitPhoneNumber(phoneNumber)}
      </span>
    )
  );

  const VisitWebsite = () => (
    hideCTAs ? null : (
      <span>Visit Website</span>
    )
  );

  const CTAButtons = () => (
    <Box className={classes.CTAcontainer}>
      <Box className={classes.buttonContainer}>
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
          <PhoneNumber />
        </a>
        <Box className={classes.ratingContainer}>
          <LanguageIcon color="secondary" fontSize="small" />
          <VisitWebsite />
        </Box>
      </Box>
    </Box>
  );

  const TitleAndDropdownMenu = () => (
    <Box className={useMobile ? classes.mobileTitleContainer : classes.titleContainer}>
      <p className={useMobile ? classes.mobileBusinessTitle : classes.businessTitle}>
        <span style={{ marginRight: 5 }}>
          {count}
          .
        </span>
        {name}
      </p>
      <MoreVertIcon />
    </Box>
  );

  const Address = () => (
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
  );

  const Image = () => (
    <Box className={useMobile ? classes.mobileImageContainer : classes.imageContainer}>
      <a href={`/spaces/${id}`}>
        <img src={imageUrl || 'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'} alt="alt-text" className={classes.image} />
      </a>
    </Box>
  );

  const DesktopCard = () => (
    <Box className={classes.root}>
      <Box className={classes.searchContentContainer}>
        <Image />
        <Box className={classes.contentContainer}>
          <Box className={classes.titleAddressContainer} style={{ marginBottom: 8 }}>
            <TitleAndDropdownMenu />
            <Address />
          </Box>
          <Box className={classes.bottomContent}>
            <ChipTags />
            <CTAButtons />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const MobileCard = () => (
    <Box className={classes.root}>
      <Box className={classes.contentContainer}>
        <Box style={{ display: 'flex', marginLeft: '5px', marginTop: '5px' }}>
          <Image />
          <Box className={classes.titleAddressContainer} style={{ marginBottom: 8, width: '100%' }}>
            <TitleAndDropdownMenu />
            <Address />
          </Box>
        </Box>
        <Box className={classes.bottomContent} style={{ marginTop: '5px', marginLeft: '5px', marginBottom: '5px' }}>
          <ChipTags />
          <CTAButtons />
        </Box>
      </Box>
    </Box>

  );

  return (
    <Box>
      {useMobile ? MobileCard : DesktopCard}
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
