import React from 'react';
import { render } from '@testing-library/react';

import SpaceDetailsPage from './SpaceDetailsPage';

test('renders SpaceDetailsPage', () => {
  const props = {
    name: 'La colombe coffee roasters',
    category: 'Coffee',
    averageRating: '4.5',
  };
  const { asFragment } = render(<SpaceDetailsPage {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
