import fetch from 'node-fetch';

/**
  * Get a user based on user's auth0 token
  * @param {Object} userOpts
  * @param {string} userOpts.token - User's auth0 token
  * @param {string} userOpts.userId - user's auth0 id
  * @returns {Promise} - resolves to user object
*/

function getUser({ userId, token }) {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/users';
  url.searchParams.append('auth0_id', userId);
  console.log(userId, token, url);
  const results = fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return results;
}

export default getUser;
