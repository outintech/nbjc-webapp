import fetch from 'node-fetch';

const getAllIndicators = async () => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/indicators';
  const results = await fetch(url.href);
  // todo: add error handling
  const { data } = await results.json();
  const formattedIndicators = data.map((indicator) => ({
    name: indicator.name,
    value: `${indicator.id}`,
  }));
  return new Promise((resolve) => {
    resolve(formattedIndicators);
  });
};

export default getAllIndicators;
