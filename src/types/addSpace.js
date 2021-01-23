import PropTypes from 'prop-types';

import { businessProps } from './business';
import chipType from './chip';

const addSpaceProps = {
  name: PropTypes.string,
  city: PropTypes.string,
  zipcode: PropTypes.string,
  state: PropTypes.string,
  business: PropTypes.shape(businessProps),
  chips: PropTypes.arrayOf(chipType),
  rating: PropTypes.number,
  review: PropTypes.string,
  anon: PropTypes.bool,
  canContact: PropTypes.bool,
};

export default addSpaceProps;
