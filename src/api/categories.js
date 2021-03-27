import wrappedFetch from './wrappedFetch';

/**
 * Get categories by search term
 * @param {Object} searchOpts
 * @param {string} searchOpts.searchTerm - name of space to search
 * @returns {Promise} - resolves to list of businesses or errors when none found
*/
const getCategories = async (searchOpts) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/categories';
  url.searchParams.append('search', searchOpts.searchTerm);
  url.searchParams.append('page', 1);
  url.searchParams.append('per_page', 5);
  const results = await wrappedFetch(url.href);
  let formattedCategories;
  try {
    const { data } = await results;
    formattedCategories = data.map((category) => ({
      title: category.title,
      alias: category.alias,
      value: `${category.id}`,
    }));
  } catch (e) {
    // since this is just autocomplete no need to
    // show error to the user
    formattedCategories = [];
  }
  return new Promise((resolve) => {
    resolve(formattedCategories);
  });
};

export default getCategories;
