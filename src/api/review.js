import wrappedFetch from './wrappedFetch';

/**
 * Post a new review for a space by a user
 * @param {Object} reviewOpts
 * @param {number} reviewOpts.spaceId - id for the space to post the review
 * @param {number} reviewOpts.rating - review star rating
 * @param {string} reviewOpts.detail - review message
 * @param {boolean} reviewOpts.anonymous - boolean to indicate if the review is anonymous
 * @param {string} reviewOpts.token - User's Auth0 token
 * @param {string} reviewOpts.auth0Id - User's Auth0 Id
 * @param {string} reviewOpts.userId - User's user Id
 */
const postReview = async (reviewOpts) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/spaces/reviews';
  const data = {
    rating: reviewOpts.rating,
    content: reviewOpts.detail,
    anonymous: reviewOpts.anonymous,
    user_id: reviewOpts.userId,
    space_id: reviewOpts.spaceId,
    auth0_id: reviewOpts.auth0Id,
  };

  const results = await wrappedFetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${reviewOpts.token}`,
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
  return results;
};

/**
 * Get a user's review for a space
 * @param {Object} reviewOpts
 * @param {number} reviewsOpts.spaceId - id for the space to retrieve the user
 * @param {number} reviewOpts.userId - id of the user
 * @returns {Promise}
*/
const getReviewForSpaceAndUser = async (reviewOpts) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = `/api/v1/spaces/${reviewOpts.spaceId}/reviews`;
  url.searchParams.append('user_id', reviewOpts.userId);
  const results = await wrappedFetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return results;
};

/**
 * Get a space's reviews
 * @param {string} spaceId - id of the space to fetch the reviews
 * @param {number} page - page number
 * @param {number} perPage - count per page
 * @returns {Promise} - resolves to array of spaces
*/
const getSpaceReviews = async (spaceId, page, perPage) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = `/api/v1/spaces/${spaceId}/reviews`;
  url.searchParams.append('page', page);
  url.searchParams.append('per_page', perPage);
  const results = await wrappedFetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return results;
};

export { postReview, getReviewForSpaceAndUser, getSpaceReviews };
