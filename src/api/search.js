import fetch from 'node-fetch';

const paramMap = {
  searchTerm: 'search',
  distance: 'filters[distance]',
  price: 'filters[price]',
  rating: 'filters[rating]',
  indicators: 'filters[indicators]',
  page: 'current[page]',
  pageSize: 'page[size]',
  pageNumber: 'page',
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
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/spaces';
  Object.keys(searchOpts).forEach((key) => {
    if (key === 'indicators' && searchOpts[key].length > 0) {
      url.searchParams.append(paramMap[key], searchOpts[key]);
    } else if (key !== 'indicators' && searchOpts[key]) {
      url.searchParams.append(paramMap[key], searchOpts[key]);
    }
  });
  const results = await fetch(url.href);
  return results.json();
};

export default getSearchResults;
