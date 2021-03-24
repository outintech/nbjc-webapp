import PropTypes from 'prop-types';

const businessProps = {
  yelp_id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.arrayOf(
    PropTypes.shape({
      alias: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  location: PropTypes.shape({
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string.isRequired,
    address3: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    display_address: PropTypes.arrayOf(PropTypes.string.isRequired),
    state: PropTypes.string.isRequired,
    zip_code: PropTypes.string.isRequired,
  }),
  address: PropTypes.string.isRequired,
  distance: PropTypes.string,
  phone: PropTypes.string,
};

const spaceProps = {
  ...businessProps,
  averageRating: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  url: PropTypes.string,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export { businessProps, spaceProps };
