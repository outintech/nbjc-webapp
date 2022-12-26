import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import MockChipList from '../ChipList';
import BusinessCard from './BusinessCard';

jest.mock('../ChipList', () => () => (<></>));
test('renders the BusinessCardComponent', () => {
  const props = {
    id: '123',
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
    phoneNumber: '000000000',
    url: 'example.com',
  };
  const { asFragment } = render(<BusinessCard business={props} />);
  expect(asFragment()).toMatchSnapshot();
});

describe('Business Card', () => {
  it('should given a address it should render a usable link to google maps', () => {

  });
  it('should given a 10 digit phone number it should render it in a international format', () => {

  });
  it('should redirect to the respective space page when clicking on the image', () => {

  });
  it('should provide a backup image if no image was provided', () => {

  });
  it('should render a proper ordinal number for each card', () => {

  });
  it('should have a vert menu (three dots) that opens a dropdown when you click it', () => {

  });
  it('should prompt the user to share current business url when the user clicks on the share button', () => {

  });
  it('should redirect the user to google maps if the user clicks on the address string', () => {

  });
  it('should provide a add review CTA that redirects the user to add a review', () => {

  });
  it('should show the user the correct rating in a CTA', () => {

  });
  it('should allow the user to call the number on the CTA if one is provided', () => {

  });
  it('should hide the phone CTA if theres no provided number', () => {

  });
  it('should hide the phone number string for smaller resolutions', () => {

  });
  it('should hide the visit website string for smaller resolutions', () => {

  });
  it('should contain a visible chiplist', () => {

  });
});
