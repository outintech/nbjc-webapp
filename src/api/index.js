import getAllIndicators from './indicators';
import getCategories from './categories';
import getSearchResults from './search';
import { getSpace, postSpace, getSpacesByName } from './space';
import { postReview, getReviewForSpaceAndUser } from './review';
import getUser from './user';
import getLocation from './location';

export {
  getCategories,
  getReviewForSpaceAndUser,
  getSearchResults,
  getAllIndicators,
  getSpace,
  getSpacesByName,
  postReview,
  getLocation,
  postSpace,
  getUser,
};
