/* eslint-disable no-unused-vars */

import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import { Share } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import BusinessCard, { Tests } from './BusinessCard';
import MockChipList from '../ChipList';

jest.mock('../ChipList', () => () => (<></>));

const {
  convertAddressToGoogleMapsLink,
  formatPhoneNumber,
  Image,
  TopCardContent,
  OrdinalNumber,
  ShareMenu,
  TitleBar,
  AddressRow,
  AddReviewCTA,
  RatingCTA,
  CallPhoneCTA,
  VisitWebsiteCTA,
  CTAs,
  BottomCardContent,
} = Tests;

describe('BusinessCard', () => {
  describe('convertAddressToGoogleMapsLink', () => {
    const googleAPIQuery = 'https://www.google.com/maps/dir/?api=1&destination=';
    it('It should return a link to Google Maps that is URL encoded', () => {
      const googleMapsLink = convertAddressToGoogleMapsLink('1701 Pennsylvania Ave NW Washington, DC DC 20006');
      const stringToMatch = `${googleAPIQuery}1701%20Pennsylvania%20Ave%20NW%20Washington%2C%20DC%20DC%2020006`;
      expect(googleMapsLink).toBe(stringToMatch);
    });
    it('It should return a different link to Google Maps that is URL encoded', () => {
      const googleMapsLink = convertAddressToGoogleMapsLink('651 Florida Ave NW Washington, DC DC 20001');
      const stringToMatch = `${googleAPIQuery}651%20Florida%20Ave%20NW%20Washington%2C%20DC%20DC%2020001`;
      expect(googleMapsLink).toBe(stringToMatch);
    });
  });
  describe('formatPhoneNumber', () => {
    it('It should return a string saying no phone number found if no phone number is passed in', () => {
      const phoneNumber = formatPhoneNumber(undefined);
      expect(phoneNumber).toBe('No number found');
    });
  });
  describe('OrdinalNumber', () => {
    const dummyProps = {
      classes: {},
      count: 1,
    };
    it('It should take an integer value and add a . in front of it', () => {
      render(<OrdinalNumber {...dummyProps} />);
      expect(screen.getByText('1.')).toBeInTheDocument();
    });
  });
  describe('ShareMenu', () => {
    it('It should open up a menu item that has the label share on click', () => {
      render(<ShareMenu classes={{}} />);
      const shareButton = screen.getByTestId('share-button');
      expect(screen.queryByText('Share')).not.toBeInTheDocument();

      userEvent.click(shareButton);
      expect(screen.getByText('Share')).toBeInTheDocument();
    });
  });
  describe('TitleBar', () => {
    const dummyProps = {
      classes: {},
      useDesktop: true,
      count: 5,
      businessName: 'Free Newspapers for $10.99',
    };
    it('It should render a business name', () => {
      render(<TitleBar {...dummyProps} />);
      expect(screen.getByText('Free Newspapers for $10.99')).toBeInTheDocument();
    });
    it('It should render an ordinal number', () => {
      render(<TitleBar {...dummyProps} />);
      expect(screen.getByText('5.')).toBeInTheDocument();
    });
  });
  describe('AddressRow', () => {
    const dummyProps = {
      classes: {},
      address: '1701 Pennsylvania Ave NW Washington, DC DC 20006',
    };
    it('It should have an icon', () => {
      render(<AddressRow {...dummyProps} />);
      const icon = screen.getByTestId('location-icon');
      expect(icon).toBeInTheDocument();
    });
    it('It should have the address label', () => {
      render(<AddressRow {...dummyProps} />);
      const address = screen.getByText('1701 Pennsylvania Ave NW Washington, DC DC 20006');
      expect(address).toBeInTheDocument();
    });
    it('It should have an href value of google maps', () => {
      render(<AddressRow {...dummyProps} />);
      const addressLink = screen.getByRole('link');
      expect(addressLink).toHaveAttribute('href', 'https://www.google.com/maps/dir/?api=1&destination=1701%20Pennsylvania%20Ave%20NW%20Washington%2C%20DC%20DC%2020006');
    });
  });
  describe('AddReviewCTA', () => {
    const dummyProps = {
      classes: {},
      id: 1,
    };
    const renderReviewCTA = () => {
      render(
        <BrowserRouter>
          <AddReviewCTA {...dummyProps} />
        </BrowserRouter>,
      );
    };
    it('It should have a href of /spaces/id/reviews/new', () => {
      renderReviewCTA();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/spaces/1/reviews/new');
    });
    it('It should have a correct label', () => {
      renderReviewCTA();
      expect(screen.getByText('Add Review')).toBeInTheDocument();
    });
    it('It should have an icon', () => {
      renderReviewCTA();
      expect(screen.getByTestId('review-icon')).toBeInTheDocument();
    });
  });
  describe('RatingCTA', () => {

  });
});

/*
const RatingCTA = ({ classes, averageRating }) => {
  const label = 'Rating';
  return (
    <Box className={classes.ctaButtonContainer}>
      <span>{label}</span>
      <StarIcon color="secondary" fontSize="small" />
      <span className={classes.purpleIcon}>{averageRating}</span>
    </Box>
  );
};
*/

/*
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
*/
