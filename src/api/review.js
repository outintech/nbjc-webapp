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
    review: reviewOpts.detail,
    anonymous: reviewOpts.anonymous,
  };

  try {
    const results = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(data),
    });
    return results.json();
  } catch (err) {
    // todo: during integration remove this to let the caller
    // deal with the error.
    console.log(err);
    return Promise.resolve({});
  }
};

export default postReview;
