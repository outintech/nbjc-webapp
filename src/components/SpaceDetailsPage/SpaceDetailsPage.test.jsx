import React from 'react';
import { render } from '@testing-library/react';

import SpaceDetailsPage from './SpaceDetailsPage';

test('renders SpaceDetailsPage', () => {
  const props = {
    category: 'Restaurant',
    averageRating: '4.5',
    space: {
      address: {
        address_1: '205 E Houston St',
        address_2: '',
        city: 'New York',
        country: 'US',
        postal_code: '10002',
        space_id: 1,
        state: 'NY',
      },
      id: '1',
      indicators: [{
        name: 'POC-owned',
        id: '5',
      }],
      phone: '+12122542246',
      name: "Katz's Delicatessen",
      photos: [
        {
          url:
            'https://s3-media1.fl.yelpcdn.com/bphoto/B6xNx79cSE7bFxqERBYOhg/o.jpg',
        },
      ],
      yelp_url: "https://www.yelp.com/biz/katzs-delicatessen-new-york?adjust_creative=cZpSYyZPR1LaxFGR9syHlQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cZpSYyZPR1LaxFGR9syHlQ"
    },
  };
  const { asFragment } = render(<SpaceDetailsPage {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
