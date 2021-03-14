import fetch from 'node-fetch';
import { getToken, getUserID } from './auth';

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

const postSpace = async () => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  const token = await getToken();
  url.pathname = '/api/v1/spaces';
  const userID = getUserID();
  const data = {
    user_id: userID,
  };

  const results = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
  return results.json();
};

export { getSpace, postSpace };
