import PropTypes from 'prop-types';

const chipType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  // todo: make this required once we decide on the api
  value: PropTypes.string,
  isSelected: PropTypes.bool,
});

export default chipType;
