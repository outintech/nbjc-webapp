import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import utils from '../../utils';
import SpaceDetailsCard from './SpaceDetailsCard';
import getAllReviews from '../../__mocks__/getAllReviewsMock';

const styles = {
  // root: {
  // }
};

const SpaceDetailsPage = ({
  // classes,
  category,
  averageRating,
  space,
}) => {
  const [cardData, setCardData] = useState();
  const [hoursOfOperation, setHoursOfOperation] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    setCardData(space);
  }, [space]);

  useEffect(() => {
    if (cardData) {
      setHoursOfOperation(utils.formatHoursOfOperation(cardData.hours_of_op));
      setPhoneNumber(utils.formatPhoneNumber(cardData.phone));
    }
  }, [cardData]);

  return (
    <div>
      { cardData
        && (
          <div>
            <SpaceDetailsCard
              totalReviews={getAllReviews().allReviews}
              name={cardData.name}
              id={cardData.id}
              phoneNumber={phoneNumber}
              filters={cardData.indicators}
              website={cardData.url}
              yelpUrl={cardData.yelp_url}
              imageUrl={cardData.photos[0].url}
              address={cardData.address}
              averageRating={averageRating}
              category={category}
              hoursOfOperation={hoursOfOperation}
            />
          </div>
        )}
    </div>
  );
};

SpaceDetailsPage.propTypes = {
  category: PropTypes.string.isRequired,
  averageRating: PropTypes.string.isRequired,
  space: PropTypes.shape({}).isRequired,
};

SpaceDetailsPage.defaultProps = {
};

export default withStyles(styles)(SpaceDetailsPage);
