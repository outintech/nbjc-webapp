import fetch from 'node-fetch';
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
const getSearchResults = async () => {
  const url = 'https://00895f10-199e-4807-b94f-a924c303a692.mock.pstmn.io/spaces/1';
  const results = await fetch(url);
  return results.json();
};

export default getSearchResults;
