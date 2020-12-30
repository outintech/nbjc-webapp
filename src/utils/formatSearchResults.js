/**
 * Formats a spaces object (/spaces) into a search results object
 * @param {Object} space - From /spaces
 * @returns {Object} - search result object required by /routes/Search
 */
const formatSearchResults = (space) => {
  const {
    address: {
      address_1: line1,
      address_2: line2,
      city,
      state,
      postal_code: zipcode,
    },
  } = space;
  const stitchedAddress = `${line1} ${line2} ${city} ${state} ${zipcode}`;
  return {
    id: `${space.id}`,
    name: space.name,
    category: space.category || '',
    address: stitchedAddress,
    averageRating: 4,
    phoneNumber: space.phone,
    filters: space.indicators.map((i) => ({ name: i.name })),
    imageUrl: (space.photos[0] || {}).url,
    url: space.url || space.yelp_url,
  };
};

export default formatSearchResults;
