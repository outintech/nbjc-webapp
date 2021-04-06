import wrappedFetch from './wrappedFetch';

const getProfileChips = async () => {
  // const url = new URL(process.env.REACT_APP_API_HOST);
  // TODO: Not getting the data back with the URL env variable, need to update this url
  const url = 'http://127.0.0.1:8080/api/v1/identities';

  const results = await wrappedFetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      // Accept: 'application/json',
    },
  });
  return results;
};

export default getProfileChips;
