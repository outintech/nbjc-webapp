import PropTypes from 'prop-types';

const chipType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
});

export default chipType;
