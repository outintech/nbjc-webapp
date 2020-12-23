import PropTypes from 'prop-types';

const businessType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  averageRating: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  address: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
});

export default businessType;
