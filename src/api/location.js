import wrappedFetch from './wrappedFetch';

/**
 * Get a location based on lat and lng
 * @param {Object} locationParams
 * @param {number} locationParams.lat - latitude to look up
 * @param {number} locationParams.lng - longitude to look up
 * @returns {Promise} - resolves to a reverse geocoded lookup object
*/
const getLocation = async (locationParams) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/geolocations';
  url.searchParams.append('lat', locationParams.lat);
  url.searchParams.append('lng', locationParams.lng);
  let result;
  try {
    result = await wrappedFetch(url.href);
  } catch (e) {
    // if reverse geocode fails allow user to still
    // search by other fields
    result = {};
  }
  return result;
};

export default getLocation;
