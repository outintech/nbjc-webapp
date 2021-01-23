import React from 'react';
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
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ShareIcon from '@material-ui/icons/Share';

import { spaceProps } from '../../types';
import ChipList from '../ChipList';

const styles = {
  root: {
    '& .MuiSvgIcon-root': {
      padding: '6px 6px;',
    },
    maxWidth: 345,
  },
  rating: {
    display: 'block',
    'text-align': 'center',
  },
  cardMedia: {
    width: 350,
    height: 200,
    margin: 'auto',
  },
  // todo: this needs to be a hyrperlink
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
  shareButton: {
    float: 'right',
    padding: '6px 6px',
  },
};

const BusinessCard = ({
  business: {
    name,
    category,
    averageRating,
    imageUrl,
    address,
    distance,
    filters,
  },
  classes,
  overrideClasses,
}) => (
  <Card className={cx(classes.root, overrideClasses.root)} variant="outlined">
    <CardHeader
      avatar={(
        <div color="secondary">
          <StarIcon color="secondary" fontSize="large" />
          <Typography
            variant="body2"
            color="secondary"
            className={classes.rating}
          >
            {averageRating}
          </Typography>
        </div>
      )}
      action={<BookmarkBorderIcon fontSize="large" color="secondary" />}
      title={<Typography variant="h6">{name}</Typography>}
      subheader={<Typography variant="body2">{category}</Typography>}
    />
    <CardMedia
      image={imageUrl}
      // todo make this responsive
      className={classes.cardMedia}
    />
    <CardContent>
      <div className={classes.location}>
        <div className={classes.address}>
          <Typography variant="body1">{address}</Typography>
        </div>
        <div className={classes.distance}>
          <Typography variant="body1">{distance}</Typography>
        </div>
      </div>
      <Divider />
      <div className={classes.chipWrapper}>
        <ChipList chips={filters} />
      </div>
      <div>
        <Button color="secondary">Call Space</Button>
        <Button color="secondary">Write a review</Button>
        <ShareIcon
          color="secondary"
          size="small"
          className={classes.shareButton}
        />
      </div>
    </CardContent>
  </Card>
);

BusinessCard.propTypes = {
  business: PropTypes.shape(spaceProps).isRequired,
  classes: PropTypes.shape({}).isRequired,
  overrideClasses: PropTypes.shape({}),
};

BusinessCard.defaultProps = {
  overrideClasses: {},
};

export default withStyles(styles)(BusinessCard);
