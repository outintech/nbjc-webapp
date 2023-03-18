import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
  Typography,
  IconButton,
  Link,
  Snackbar,
} from '@material-ui/core';

import StarIcon from '@material-ui/icons/Star';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ShareIcon from '@material-ui/icons/Share';

import useMobileDevice from '../../hooks/useMobileDevice';
import ChipList from '../ChipList';
import ReviewCard from '../ReviewsPage/ReviewCard';
import { previousReview, nextReview } from '../../utils/reviewPreview';

const styles = (theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      padding: '6px 6px;',
    },
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
  card: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: '15px',
    margin: '30px',
  },
  cardMedia: {
    margin: 'auto',
    height: '300px',
    width: '100%',
    minWidth: '50%',
    backgroundSize: 'contain',
    [theme.breakpoints.up('md')]: {
      height: '400px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '500px',
    },
  },
  reviewHeader: {
    width: '100%',
    display: 'inline-flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
  },
  reviewDiv: {
    width: '100%',
    display: 'inline-flex',
    flexFlow: 'row',
    justifyContent: 'left',
  },
  reviewContent: {
    flexGrow: 2,
  },
  featuredReview: {
    margin: '20px',
    textAlign: 'left',
    display: 'inline-flex',
  },
  seeAllButton: {
    display: 'inline-flex',
    float: 'right',
    margin: '10px 10px',
  },
  reviewButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px',
  },
  location: {
    display: 'flex',
    'flex-direction': 'row',
    marginBottom: 15,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  distance: {
    textAlign: 'right',
    flexGrow: 2,
  },
  address: {
    marginRight: 30,
    flexGrow: 1,
    textAlign: 'left',
    color: 'black',
  },
  chipWrapper: {
    'margin-top': '15px',
  },
  filter: {
    margin: '15px 20px 15px 0',
  },
  nextButton: {
    float: 'right',
    padding: 0,
  },
  shareButton: {
    float: 'right',
  },
  subtitles: {
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'left',
    color: 'grey',
    marginTop: '10px',
  },
  mainInformation: {
    color: 'black',
  },
  hoursOfOperation: {
    display: 'flex',
  },
  url: {
    textDeocration: 'none',
  },
});

const SpaceDetailCard = ({
  totalReviews,
  id,
  name,
  category,
  averageRating,
  imageUrl,
  address,
  // distance,
  hoursOfOperation,
  filters,
  phoneNumber,
  website,
  classes,
  yelpUrl,
  overrideClasses,
}) => {
  const [open, setOpen] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [isMobileOrTablet] = useMobileDevice();

  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  /* if desktop, copy to clipboard unique url for the space.
  if mobile, share sheet to text, email, whatever is on your phone or tablet
  */
  const handleShare = () => {
    /* navigator */
    if (isMobileOrTablet && navigator.share) {
      navigator
        .share({
          text: `Check out ${name} at ${document.location.href}`,
        })
        .then(() => {
          setOpen(true);
          setSnackBar(true);
        })
        .catch((
          // error
        ) => {
          // console.error('Something went wrong sharing the blog', error);
        });
    } else if (navigator.clipboard) {
      setIsCopied(true);
      const currentUrl = document.location.href || window.location.href;
      if (isCopied) {
        navigator.clipboard.writeText(currentUrl);
        setOpen(true);
        setSnackBar(true);
      }
    }
  };

  const handleClick = () => {
    const location = {
      pathname: `/spaces/${id}/reviews/`,
      state: { name },
    };
    history.push(location);
  };

  return (
    <Card
      className={cx(classes.root, overrideClasses.root, classes.card)}
      variant="outlined"
      key={id}
    >
      <CardHeader
        avatar={(
          <div color="secondary">
            <StarIcon
              color="secondary"
              fontSize="large"
              classes={{ root: classes.starIcon }}
            />
            <Typography
              variant="caption"
              color="secondary"
              className={classes.rating}
              align="center"
            >
              {averageRating}
            </Typography>
          </div>
        )}
        title={(
          <Typography variant="h6" className={classes.h6}>
            {name}
          </Typography>
        )}
        subheader={<Typography variant="body2">{category}</Typography>}
        classes={{ action: classes.headerAction }}
      />
      {/* TODO: add a fallback image if imageUrl is empty */}
      {imageUrl !== '' ? <CardMedia image={imageUrl} className={classes.cardMedia} /> : ''}
      <CardContent>
        <div className={classes.chipWrapper}>
          <ChipList chips={filters} />
        </div>
        <Divider />
        <div className={classes.reviewHeader}>
          <Typography variant="h5" className={classes.featuredReview}>
            Recent Reviews
          </Typography>
          {totalReviews && totalReviews.length > 0 ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClick}
              className={classes.seeAllButton}
            >
              {`See All ${totalReviews.length}`}
            </Button>
          ) : (
            ''
          )}
        </div>
        {totalReviews && totalReviews.length === 0 ? (
          // eslint-disable-next-line
          <Typography variant="body2" align="center">
            There are no reviews. Be the first to rate and review this space!
          </Typography>
        ) : (
          ''
        )}
        {totalReviews && totalReviews.length > 0 && (
          <div className={classes.reviewDiv}>
            <IconButton
              variant="outlined"
              color="primary"
              onClick={() => setCurrentReview(previousReview(currentReview, totalReviews.length))}
            >
              <NavigateBeforeIcon color="primary" />
            </IconButton>
            <ReviewCard
              userName={totalReviews[currentReview].userName}
              dateCreated={totalReviews[currentReview].dateCreated}
              rating={totalReviews[currentReview].rating}
              text={totalReviews[currentReview].content}
              overrideClasses={classes}
            />
            <IconButton
              variant="outlined"
              color="primary"
              onClick={() => setCurrentReview(nextReview(currentReview, totalReviews.length))}
            >
              <NavigateNextIcon color="primary" />
            </IconButton>
          </div>
        )}
        <div className={classes.reviewButton}>
          <Button
            variant="contained"
            color="primary"
            href={`/spaces/${id}/reviews/new`}
          >
            Write a review
          </Button>
        </div>
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>
          Space Address
        </Typography>
        <div className={classes.location}>
          <div className={classes.address}>
            <Typography variant="body1">{address.address_1}</Typography>
            <Typography variant="body1">{address.address_2 && address.address_2}</Typography>
            <Typography variant="body1">{address.city}</Typography>
            <Typography variant="body1">{address.postal_code}</Typography>
            <Typography variant="body1">{address.country}</Typography>
          </div>
          {/* <div className={classes.distance}>
            <Typography variant="body1">TBD: distance</Typography>
          </div> */}
        </div>
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>
          Phone Number
        </Typography>
        <Button color="primary" href={`tel:${phoneNumber}`}>
          {phoneNumber}
        </Button>
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>
          WebSite
        </Typography>
        {website ? (
          <Link
            variant="body1"
            href={website}
            target="_blank"
            rel="noreferrer"
            className={classes.url}
          >
            {website}
          </Link>
        ) : (
          <Link
            variant="body1"
            href={yelpUrl}
            target="_blank"
            rel="noreferrer"
            className={classes.url}
          >
            Link to Yelp
          </Link>
        )}
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>
          Hours Of Operation
        </Typography>
        {/* FIXME:  fix placement of navigate next icon */}
        <Typography variant="body1" className={classes.mainInformation}>
          {hoursOfOperation ? 'Open Now' : 'Closed'}
        </Typography>
        {!hoursOfOperation && (
          <IconButton
            component="span"
            className={classes.nextButton}
            color="secondary"
            aria-label="hours of operation on yelp"
          >
            <a href={yelpUrl} target="_blank" rel="noreferrer">
              <NavigateNextIcon color="primary" />
            </a>
          </IconButton>
        )}
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>
          Share
        </Typography>
        <Button
          color="primary"
          aria-label="visit space"
          component="span"
          className={classes.shareButton}
          onClick={handleShare}
        >
          <ShareIcon color="primary" style={{ padding: 0 }} />
        </Button>
        <Typography variant="body1" className={classes.mainInformation}>
          Share this Space with your network
        </Typography>
        {snackBar ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="Copied Link to the Clipboard." />
        ) : null}
      </CardContent>
    </Card>
  );
};

SpaceDetailCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,

  category: PropTypes.string.isRequired,
  averageRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageUrl: PropTypes.string.isRequired,
  address: PropTypes.shape({}).isRequired,
  /* TODO: POST MVP add distance when geocoding
  distance */
  hoursOfOperation: PropTypes.shape([]).isRequired,
  classes: PropTypes.shape({}).isRequired,
  overrideClasses: PropTypes.shape({}),
};

SpaceDetailCard.defaultProps = {
  overrideClasses: {},
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  averageRating: null,
};

export default withStyles(styles)(SpaceDetailCard);
