import fetch from 'node-fetch';

const getProfileChips = async () => {
  const url = '/api/v1/identities';

  const results = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  /* eslint-disable-next-line */
  return results;
};

export default getProfileChips;
