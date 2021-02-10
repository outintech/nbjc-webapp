import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import utils from '../../utils';
import SpaceDetailsCard from './SpaceDetailsCard';

const styles = {
  // root: {

  // }
};

const SpaceDetailsPage = ({
  // classes,
  // name,
  // category,
  // averageRating,
  space,
}) => {
  const [cardData, setCardData] = useState();
  // const [hoursOfOperation, setHoursOfOperation] = useState();
  // const [isOpen, setIsOpen] = useState();

  useEffect(() => {
    setCardData(space);
  }, [space]);

  useEffect(() => {
    if (cardData) {
      utils.formatHoursOfOperation(cardData.hours_of_op);
    }
  }, [cardData]);

  return (
    <div>
      { cardData
        && (
          <div>
            <SpaceDetailsCard
              name={cardData.name}
              id={cardData.id}
              phoneNumber={cardData.phone}
              filters={cardData.indicators}
              url={cardData.yelp_url}
              imageUrl={cardData.photos[0].url}
              address={cardData.address}
              averageRating="4.5"
              category="coffee"
              hoursOfOperation="true"
            />
          </div>
        )}

    </div>
  );
};

// TODO: fix warnings and add reqiured propTypes
SpaceDetailsPage.propTypes = {
  // name: PropTypes.string.isRequired,
  // category: PropTypes.string.isRequired,
  // averageRating: PropTypes.string.isRequired,
  space: PropTypes.shape({}).isRequired,
};

SpaceDetailsPage.defaultProps = {

};

export default withStyles(styles)(SpaceDetailsPage);
