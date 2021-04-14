import fetch from 'node-fetch';

const wrappedFetch = async (url, opts) => {
  const result = await fetch(url, opts);
  if (result.status < 300) {
    return result.json();
  }

  const error = new Error('fetch error');

  if (result.status === 422) {
    error.status = 422;
    // eslint-disable-next-line
    const message = await result.json();
    error.message = message;
    throw error;
  }
  // todo: what should happen for 3xx?
  if (result.status === 404) {
    error.status = 404;
    throw error;
  } else {
    error.status = 500;
    throw error;
  }
};

export default wrappedFetch;
