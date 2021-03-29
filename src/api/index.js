import getAllIndicators from './indicators';
import getCategories from './categories';
import getSearchResults from './search';
import { getSpace, postYelpSearch, postAddSpace, postSpace, getSpacesByName } from './space';
import {
  postReview,
  getReviewForSpaceAndUser,
  getSpaceReviews,
} from './review';
import { getUser, createUser } from './user';
import getLocation from './location';

export {
  getCategories,
  getReviewForSpaceAndUser,
  getSearchResults,
  getAllIndicators,
  getSpace,
  postYelpSearch,
  postAddSpace,
  getSpacesByName,
  postReview,
  getSpaceReviews,
  getLocation,
  postSpace,
  getUser,
  createUser,
};
