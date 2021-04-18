import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { businessProps, addSpaceProps as addSpacePropTypes } from '../../types';
import BusinessResultCard from '../BusinessResultCard';

const styles = (theme) => ({
  listWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 290px)',
    maxHeight: 460,
    overflow: 'scroll',
    marginBottom: 20,
    [theme.breakpoints.up('mobile')]: {
      maxHeight: 500,
    },
  },
  card: {
    margin: '20px',
  },
  footer: {
    display: 'block',
    marginBottom: 20,
  },
  yelpFooter: {
    marginBottom: 15,
    display: 'flex',
  },
  yelpIcon: {
    width: 45,
  },
  yelpText: {
    lineHeight: '45px',
    marginLeft: 5,
  },
  submitButton: {
    float: 'right',
    marginBottom: 20,
  },
});

const Address = ({
  businessList,
  classes,
  onBack,
  onNext,
  addSpaceProps,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  const { business: preSelectedBusiness } = addSpaceProps;
  let preSelected;
  if (preSelectedBusiness) {
    preSelected = businessList.findIndex((b) => b.id === preSelectedBusiness.id);
  }
  const [selected, setSelected] = useState(preSelected === undefined ? null : preSelected);
  const onCheck = (index) => {
    if (selected === index) {
      setSelected();
    } else {
      setSelected(index);
    }
  };

  return (
    <>
      <Typography variant={matches ? 'h4' : 'subtitle1'} align="center">Select the location of the space you want to submit to The Lavender Book.</Typography>
      <div className={classes.listWrapper}>
        {businessList.map((business, index) => (
          <BusinessResultCard
            business={business}
            key={business.yelp_id}
            checked={selected === index}
            onCheck={() => onCheck(index)}
            overrideClasses={{ resultCard: classes.card }}
          />
        ))}
      </div>
      <div className={classes.footer}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
          fullWidth={!matches}
          disabled={selected === undefined || selected === null}
          onClick={() => onNext({ business: businessList[selected] })}
          data-testid="addspace-business-next"
          disableElevation
        >
          Next
        </Button>
        <Button
          type="cancel"
          variant="outlined"
          color="primary"
          className={classes.backButton}
          fullWidth={!matches}
          onClick={onBack}
          disableElevation
        >
          Back
        </Button>

      </div>
      <div className={classes.yelpFooter}>
        <img src="/yelp_burst_icon.png" alt="Yelp Burst Icon" className={classes.yelpIcon} />
        <span className={classes.yelpText}>This space information is powered by Yelp.</span>
      </div>
    </>
  );
};

Address.propTypes = {
  businessList: PropTypes.arrayOf(PropTypes.shape(businessProps)).isRequired,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  addSpaceProps: PropTypes.shape(addSpacePropTypes),
  classes: PropTypes.shape({}).isRequired,
};

Address.defaultProps = {
  onNext: () => {},
  onBack: () => {},
  addSpaceProps: {},
};

export default withStyles(styles)(Address);
