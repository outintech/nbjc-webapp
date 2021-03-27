import getAllIndicators from './indicators';
import getCategories from './categories';
import getSearchResults from './search';
import {
  postReview,
  getReviewForSpaceAndUser,
  getSpaceReviews,
} from './review';
import { getSpace, postSpace, getSpacesByName } from './space';
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
  getSpaceReviews,
  getLocation,
  postSpace,
  getUser,
};
