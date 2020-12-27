import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import {
  Card, CardContent, Checkbox, Typography,
} from '@material-ui/core';

import { businessProps } from '../../types';

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    maxHeight: 160,
    borderColor: theme.palette.primary.main,
  },
  checked: {
    backgroundColor: `${theme.palette.primary.light}20`,
  },
  title: {
    display: 'inline',
  },
  checkbox: {
    float: 'right',
    padding: 0,
    borderColor: theme.palette.primary.main,
  },
  wrapper: {
    display: 'flex',
    '& h6': {
      fontWeight: 600,
      marginRight: 15,
    },
  },
});

const BusinessResultCard = ({
  business, classes, checked, onCheck, overrideClasses, hideCheck,
}) => (
  <div className={cx(classes.resultCard, overrideClasses.resultCard)}>
    <Card className={cx(classes.card, { [classes.checked]: checked })} variant="outlined">
      <CardContent>
        <div>
          <Typography variant="subtitle1" className={classes.title}>{business.name}</Typography>
          {!hideCheck && <Checkbox color="primary" className={classes.checkbox} checked={checked} onChange={onCheck} /> }
        </div>
        <Typography variant="caption">{business.category}</Typography>
        <div className={classes.wrapper}>
          <Typography variant="subtitle2">Address:</Typography>
          <Typography variant="body2">{business.address}</Typography>
        </div>
        <div className={classes.wrapper}>
          <Typography variant="subtitle2">Phone number:</Typography>
          <Typography variant="body2">{business.phoneNumber}</Typography>
        </div>
      </CardContent>
    </Card>
  </div>
);

BusinessResultCard.propTypes = {
  business: PropTypes.shape(businessProps).isRequired,
  checked: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
  overrideClasses: PropTypes.shape({}),
  hideCheck: PropTypes.bool,
};

BusinessResultCard.defaultProps = {
  overrideClasses: {},
  hideCheck: false,
};

export default withStyles(styles)(BusinessResultCard);
