import fetch from 'node-fetch';

const paramMap = {
  searchTerm: 'search_term',
  distance: 'distance',
  price: 'price',
  rating: 'rating',
  indicators: 'indicators',
  page: 'current[page]',
  pageSize: 'page[size]',
};

/**
 * Search by search_term and filters
 * @param {Object} searchOpts
 * @param {string} searchOpts.searchTerm - name of space to search
 * @param {number} searchOpts.distance - distance from user's current location
 * @param {number} searchOpts.rating - minimum average rating
 * @param {number} searchOpts.price - maximum price rating
 * @param {Array<string>} searchOpts.indicators - list of indicators
 * @param {page} searchOpts.page - current page to return
 * @param {pageSize} searchOpts.pageSize - size of each page
 * @returns {Promise} - resolves to list of businesses or errors when none found
*/
const getSearchResults = async (searchOpts) => {
  // todo: change this to an env variable
  const baseUrl = 'https://00895f10-199e-4807-b94f-a924c303a692.mock.pstmn.io';
  const url = new URL(baseUrl);
  url.pathname = '/api/v1/spaces';
  Object.keys(searchOpts).forEach((key) => {
    url.searchParams.append(paramMap[key], searchOpts[key]);
  });
  const results = await fetch(url.href);
  return results.json();
};

export default getSearchResults;
