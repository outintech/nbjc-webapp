import PropTypes from 'prop-types';

import chipType from './chip';

const searchProps = {
  searchTerm: PropTypes.string,
  distance: PropTypes.number,
  rating: PropTypes.number,
  price: PropTypes.number,
  indicators: PropTypes.arrayOf(PropTypes.string),
  chips: PropTypes.arrayOf(chipType),
};

export default searchProps;
