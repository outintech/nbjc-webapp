import PropTypes from 'prop-types';

const businessProps = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
};

const spaceProps = {
  ...businessProps,
  averageRating: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export { businessProps, spaceProps };
