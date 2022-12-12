import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';

import {
  Button,
  Card,
  CardActionArea,
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

const styles = (theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      padding: '6px 6px;',
    },
    flexGrow: 1,
    marginTop: '8px',
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
}) => (
  <Card className={cx(classes.root, overrideClasses.root)} variant="outlined" key={id}>
    <CardActionArea href={`/spaces/${id}`} disableRipple style={{ display: 'flex' }}>
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
        // TODO: POSTMVP feature
        action={false && <BookmarkBorderIcon color="secondary" />}
        title={<Typography variant="h6">{name}</Typography>}
        subheader={<Typography variant="body2">{category}</Typography>}
        classes={{ action: classes.headerAction }}
      />
      <CardMedia
        image={imageUrl}
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
        <div className={classes.footer}>
          <Button color="primary" href={`tel:${phoneNumber}`}>Call Space</Button>
          <Button color="primary" href={`/spaces/${id}/reviews/new`}>Write a review</Button>
          <Button color="primary" aria-label="visit space" component="span" className={classes.shareButton} disableRipple>
            <a href={url} target="_blank" rel="noreferrer">
              <ShareIcon
                color="primary"
                style={{ padding: 0 }}
              />
            </a>
          </Button>
        </div>
      </CardContent>
    </CardActionArea>
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
