import wrappedFetch from './wrappedFetch';

/**
  * Get a user based on user's auth0 token
  * @param {Object} userOpts
  * @param {string} userOpts.token - User's auth0 token
  * @param {string} userOpts.userId - user's auth0 id
  * @returns {Promise} - resolves to user object
*/

const getUser = async ({ userId, token }) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/users';
  url.searchParams.append('auth0_id', userId);
  const results = await wrappedFetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return results;
};

/**
  * Get a user's profile based on user's db id
  * @param {string} token - User's auth0 token
  * @param {string} userId - user's db id
  * @returns {Promise} - resolves to user object
*/
const getUserProfile = async (userId, token) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = `/api/v1/users/${userId}?include=identites`;
  const results = await wrappedFetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return results;
};

/**
 * Create a new user
 * @param {Object} userOpts
 * @param {string} userOpts.token - User's Auth0 token
 * @param {string} userOpts.authOId - User's Auth0 Id
 * @param {string} userOpts.username - User's username
 * @param {string} userOpts.pronouns - User's pronouns
 * @param {string} userOpts.location - User's location
 * @param {Array} userOpts.identities - User identities
*/
const createUser = async (userOpts) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/users';
  const data = {
    auth0_id: userOpts.auth0Id,
    username: userOpts.username,
    pronouns: userOpts.pronouns,
    location: userOpts.location,
    name: userOpts.name,
  };
  const results = await wrappedFetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${userOpts.token}`,
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
  return results;
};

/**
 * Update an existing user
 * @param {Object} userOpts
 * @param {string} userOpts.username - User's username
 * @param {string} userOpts.pronouns - User's pronouns
 * @param {string} userOpts.location - User's location
 * @param {Array} userOpts.identities - User identities
 * @param {string} token - User's Auth0 token
*/
const updateUser = async (userOpts, token) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/users';
  const data = {
    username: userOpts.username,
    pronouns: userOpts.pronouns,
    location: userOpts.location,
  };
  const results = await wrappedFetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
  return results;
};

export {
  getUser,
  getUserProfile,
  createUser,
  updateUser,
};
