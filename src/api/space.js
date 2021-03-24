import fetch from 'node-fetch';

/**
 * @param {string} spaceId - id for the space to return
 * @returns {Promise} - resolves to a single space
*/
const getSpace = async (spaceId) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = `/api/v1/spaces/${spaceId}`;
  const result = await fetch(url.href);
  return result.json();
};

/**
 * Post a new Yelp API search for a space by a user
 * @param {Object} spaceOpts
 * @param {string} spaceOpts.name -name of space
 * @param {string} spaceOpts.city - space city
 * @param {string} spaceOpts.state - space state
 * @param {string} spaceOpts.zipcode - space zipcode
 * @returns {Promise}
 */
const postYelpSearch = async (spaceOpts) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/create_space_search';
  const data = {
    location: `${spaceOpts.city}, ${spaceOpts.state}`,
    zipcode: spaceOpts.zipcode,
    term: spaceOpts.name,
    // todo: add actual user id
    user_id: 1,
  };
  const spaceSearch = {
    space_search: data,
  };

  const results = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // todo: add actual user token.
      Authorization: 'Token eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjE3NjcyMjIzfQ.fLtzvF_gYMb_59SV_rDOE3qMqR_RLSvjdXTC_hXPqUs',
    },
    // redirect: 'follow',
    body: JSON.stringify(spaceSearch),
  });
  return results.json();
};

const postAddSpace = async (spaceOpts) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/spaces';

  console.log(spaceOpts.chips);

  const data = {
    phone: spaceOpts.business.phone,
    name: spaceOpts.business.name,
    price_level: spaceOpts.business.price_level,
    provider_urn: spaceOpts.business.provider_urn,
    provider_url: spaceOpts.business.provider_url,
    address_attributes: [{
      address_1: spaceOpts.business.location.address_1,
      address_2: spaceOpts.business.location.address_2,
      address_3: spaceOpts.business.location.address_3,
      city: spaceOpts.business.location.city,
      postal_code: spaceOpts.business.location.zipcode,
      country: spaceOpts.business.location.country,
      state: spaceOpts.business.location.state,
    }],
    languages_attributes: [],
    indicators_attributes: [],
    reviews_attributes: [{
      anonymous: spaceOpts.anon,
      vibe_check: 1,
      rating: spaceOpts.rating,
      content: spaceOpts.content,
      // todo: add actual user id
      user_id: 1,
    }],
    // todo: add actual user id
    user_id: 1,
  };
  const addSpace = {
    space: data,
  };
  console.log(addSpace);
  // const results = await fetch(url, {
  //   method: 'POST',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     // todo: add actual user token.
  //     Authorization: 'Token eyJhbGciOiJIUzI1NiJ9'
  // '.eyJpZCI6MSwiZXhwIjoxNjE3NjcyMjIzfQ.fLtzvF_gYMb_59SV_rDOE3qMqR_RLSvjdXTC_hXPqUs',
  //   },
  //   // redirect: 'follow',
  //   body: JSON.stringify(addSpace),
  // });
  // return results.json();
};

export { getSpace, postYelpSearch, postAddSpace };
