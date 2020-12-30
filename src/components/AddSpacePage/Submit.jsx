import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

import BusinessResultCard from '../BusinessResultCard';
import ChipList from '../ChipList';
import StarRating from '../StarRating';

import { addSpaceProps as addSpacePropTypes } from '../../types';

const styles = (theme) => ({
  pageTitle: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: 40,
    },
    [theme.breakpoints.up('mobile')]: {
      marginBottom: 60,
    },
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    display: 'inline-block',
    marginBottom: 10,
  },
  edit: {
    display: 'inline-block',
    cursor: 'pointer',
    float: 'right',
  },
  checkbox: {
    maginTop: 20,
    marginBottom: 20,
  },
  footer: {
    margin: '40px 0',
  },
  submitButton: {
    float: 'right',
    marginBottom: 20,
  },
});

const Submit = ({
  classes,
  onBack,
  onSubmit,
  addSpaceProps,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [contact, setContact] = useState(false);
  return (
    <>
      <Typography variant={matches ? 'h4' : 'subtitle1'} align="center" className={classes.pageTitle}>
        Review your submission. You can edit the space’s details before
        submitting.
      </Typography>
      <div className={classes.section}>
        <div className={classes.sectionHeader}>
          <Typography
            variant="h6"
            align="center"
            className={classes.sectionTitle}
          >
            Space Details
          </Typography>
          <EditIcon
            color="primary"
            className={classes.edit}
            onClick={() => onBack(1)}
          />
        </div>
        <BusinessResultCard
          business={addSpaceProps.business}
          checked={false}
          hideCheck
        />
      </div>
      <div className={classes.section}>
        <div className={classes.sectionHeader}>
          <Typography
            variant="h6"
            align="center"
            className={classes.sectionTitle}
          >
            Space Attributes
          </Typography>
          <EditIcon
            color="primary"
            className={classes.edit}
            onClick={() => onBack(1)}
          />
        </div>
        <ChipList chips={addSpaceProps.chips} />
      </div>
      <div className={classes.section}>
        <div className={classes.sectionHeader}>
          <Typography
            variant="h6"
            align="center"
            className={classes.sectionTitle}
          >
            Your Rating
          </Typography>
          <EditIcon
            color="primary"
            className={classes.edit}
            onClick={() => onBack(1)}
          />
        </div>
        <StarRating numberFilled={addSpaceProps.rating} editable={false} />
      </div>
      <FormControlLabel
        className={classes.checkbox}
        control={<Checkbox name="anon" color="primary" onChange={() => setContact(!contact)} checked={contact} />}
        label={(
          <Typography variant="body2">
            A National Black Justice Coalition administrator can contact me at
            user@email.com about my submission.
          </Typography>
        )}
      />
      <div className={classes.footer}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.submitButton}
          fullWidth={!matches}
          onClick={() => onSubmit({ ...addSpaceProps, canContact: contact })}
          disableElevation
        >
          Submit
        </Button>
        <Button
          type="cancel"
          variant="outlined"
          color="secondary"
          fullWidth={!matches}
          onClick={onBack}
          disableElevation
        >
          Back
        </Button>
      </div>
    </>
  );
};

Submit.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addSpaceProps: PropTypes.shape(addSpacePropTypes).isRequired,
};

Submit.defaultProps = {};

export default withStyles(styles)(Submit);
