import fetch from 'node-fetch';

/**
 * @param {string} spaceId - id for the space to return
 * @returns {Promise} - resolves to a single space
*/
const getSpace = async (spaceId) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = `/api/v1/spaces/${spaceId}`;
  const result = await fetch(url.href);
  return result.json();
};

/**
 * Post a new Yelp API search for a space by a user
 * @param {Object} spaceOpts
 * @param {string} spaceOpts.name -name of space
 * @param {string} spaceOpts.city - space city
 * @param {string} spaceOpts.state - space state
 * @param {string} spaceOpts.zipcode - space zipcode
 * @returns {Promise}
 */
const postYelpSearch = async (spaceOpts) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/create_space_search';
  const data = {
    location: `${spaceOpts.city}, ${spaceOpts.state}`,
    zipcode: spaceOpts.zipcode,
    term: spaceOpts.name,
    // todo: add actual user id
    user_id: 1,
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
    // redirect: 'follow',
    body: JSON.stringify(data),
  });
  return results.json();
};

export { getSpace, postYelpSearch };
