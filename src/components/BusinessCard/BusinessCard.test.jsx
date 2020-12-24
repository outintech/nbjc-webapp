import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import MockChipList from '../ChipList';
import BusinessCard from './BusinessCard';

jest.mock('../ChipList', () => () => (<></>));
test('renders the BusinessCardComponent', () => {
  const props = {
    name: 'La colombe coffee roasters',
    category: 'Coffee',
    averageRating: '4.5',
    imageUrl:
      'https://s3-media3.fl.yelpcdn.com/bphoto/ONmc2uTWa4W5AAI2irBpXw/o.jpg',
    address: '924 Blagden Alley Way Washington, D.C. 20001',
    distance: '0.03mi',
    filters: [
      {
        name: 'Black Friendly',
      },
      {
        name: 'Inclusive',
      },
      {
        name: 'Black Owned',
      },
      {
        name: 'Gender Neutral Restrooms',
      },
      {
        name: 'Accessible',
      },
      {
        name: 'Queer hangout space',
      },
      {
        name: 'Trans friendly',
      },
      {
        name: 'Queer owned',
      },
    ],
  };
  const { asFragment } = render(<BusinessCard business={props} />);
  expect(asFragment()).toMatchSnapshot();
});
