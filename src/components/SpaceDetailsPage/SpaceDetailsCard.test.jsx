import React from 'react';
import { render } from '@testing-library/react';

import SpaceDetailsCard from './SpaceDetailsCard';
import getAllReviews from '../../__mocks__/getAllReviewsMock';

jest.mock('react-intersection-observer', () => ({
  useInView: () => [{}, true],
}));

describe('SpaceDetailsCard', () => { 
  test('renders ', () => {
    const props = {
        totalReviews: getAllReviews().totalReviews,
        address: {
            address_1: '205 E Houston St',
            address_2: '',
            city: 'New York',
            country: 'US',
            postal_code: '10002',
            space_id: 1,
            state: 'NY',
          },
      name: "Katz's Delicatessen",
      category: 'Restaurant',
      averageRating: '4.5',
      id: '1',
      imageUrl: '"https://s3-media1.fl.yelpcdn.com/bphoto/B6xNx79cSE7bFxqERBYOhg/o.jpg"',
      hoursOfOperation: true || false,
      filters: [{
          id: '5',
          name: 'POC-owned',
      }],
      phoneNumber: '+1 (212) 254-2246',
      yelpUrl: '"https://www.yelp.com/biz/katzs-delicatessen-new-york?adjust_creative=cZpSYyZPR1LaxFGR9syHlQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cZpSYyZPR1LaxFGR9syHlQ"',
    };
    const { asFragment } = render(<SpaceDetailsCard {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
})
  