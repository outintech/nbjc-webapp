import fetch from 'node-fetch';

/**
 * Post a new review for a space by a user
 * @param {Object} reviewOpts
 * @param {number} reviewOpts.spaceId - id for the space to post the review
 * @param {number} reviewOpts.rating - review star rating
 * @param {string} reviewOpts.detail - review message
 * @param {boolean} reviewOpts.anonymous - boolean to indicate if the review is anonymous
 */
const postReview = async (reviewOpts) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = `/api/v1/spaces/${reviewOpts.spaceId}/reviews`;
  const data = {
    rating: reviewOpts.rating,
    content: reviewOpts.detail,
    anonymous: reviewOpts.anonymous,
    // todo: add actual user id
    user_id: 1,
    space_id: reviewOpts.spaceId,
  };

  const results = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // todo: add actual user token.
      Authorization: 'Token eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjE3NjcyMjIzfQ.fLtzvF_gYMb_59SV_rDOE3qMqR_RLSvjdXTC_hXPqUs',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
  return results.json();
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
  const results = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return results.json();
};

export { postReview, getReviewForSpaceAndUser };
