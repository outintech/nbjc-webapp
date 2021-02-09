import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';

import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
// import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ShareIcon from '@material-ui/icons/Share';

// import { spaceProps } from '../../types';
import ChipList from '../ChipList';

const styles = (theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      padding: '6px 6px;',
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: 344,
    },
    [theme.breakpoints.up('mobile')]: {
      maxWidth: 436,
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
    padding: '30px',
    marginLeft: '30px',
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
  // todo: this needs to be a hyperlink
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
    textAlign: 'left',
    fontStyle: 'italic',
    color: 'black',
  },
  chipWrapper: {
    'margin-top': '15px',
  },
  filter: {
    margin: '15px 20px 15px 0',
    // fontStyle: 'italic', TODO: make italic
  },
  footer: {
    marginTop: 30,
  },
  shareButton: {
    float: 'right',
  },
  h6: {
    fontStyle: 'italic',
  },
  subtitles: {
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'left',
    color: 'grey',
  },
  mainInformation: {
    fontStyle: 'italic',
    color: 'black',
  },
});

const SpaceDetailCard = ({
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
  url,
  classes,
  overrideClasses,
}) => {
  useEffect(() => {
    console.log(id, name, category);
  }, []);
  return (
    <Card className={cx(classes.root, overrideClasses.root, classes.card)} variant="outlined" key={id}>
      <CardHeader
        avatar={(
          <div color="secondary">
            <StarIcon color="secondary" fontSize="large" classes={{ root: classes.starIcon }} />
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
        // action={<BookmarkBorderIcon color="secondary" />}
        title={<Typography variant="h6" className={classes.h6}>{name}</Typography>}
        subheader={<Typography variant="body2">{category}</Typography>}
        classes={{ action: classes.headerAction }}
      />
      <CardMedia
        image={imageUrl}
        className={classes.cardMedia}
      />
      <CardContent>
        <div className={classes.chipWrapper}>
          <ChipList chips={filters} />
        </div>
        <Divider />
        { /*  TODO:  ADD FEATURED REVIEW COMPONENT */}
        <Typography variant="body1">Featured Reviews</Typography>
        <Button color="primary" href={`/spaces/${id}/reviews/new`}>Write a review</Button>
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>Space Address</Typography>
        <div className={classes.location}>
          <div className={classes.address}>
            <Typography variant="body1">{address.address_1}</Typography>
            <Typography variant="body1">{address.address_2}</Typography>
            <Typography variant="body1">{address.city}</Typography>
            <Typography variant="body1">{address.postal_code}</Typography>
            <Typography variant="body1">{address.country}</Typography>
          </div>
          <div className={classes.distance}>
            <Typography variant="body1">TBD: distance</Typography>
          </div>
        </div>
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>Phone Number</Typography>
        <Button color="primary" href={`tel:${phoneNumber}`}>{phoneNumber}</Button>
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>WebSite</Typography>
        <a variant="body1" href={url} target="_blank" rel="noreferrer">{url}</a>
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>Hours Of Operation</Typography>
        <Typography variant="body1" className={classes.mainInformation}>{hoursOfOperation.open[0].day}</Typography>
        <Divider />
        <Typography variant="body1" className={classes.subtitles}>Share</Typography>
        <Button color="primary" aria-label="visit space" component="span" className={classes.shareButton} disableRipple>
          <a href={url} target="_blank" rel="noreferrer">
            <ShareIcon
              color="primary"
              style={{ padding: 0 }}
            />
          </a>
        </Button>
        <Typography variant="body1" className={classes.mainInformation}>Share this Space with your network</Typography>
      </CardContent>
    </Card>
  );
};

SpaceDetailCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  url: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  overrideClasses: PropTypes.shape({}),
};

SpaceDetailCard.defaultProps = {
  overrideClasses: {},
};

export default withStyles(styles)(SpaceDetailCard);