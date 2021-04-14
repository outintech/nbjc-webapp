import wrappedFetch from './wrappedFetch';

const getProfileChips = async () => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  // TODO: Not getting the data back with the URL env variable, need to update this url

  const results = await wrappedFetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return results;
};

export default getProfileChips;
