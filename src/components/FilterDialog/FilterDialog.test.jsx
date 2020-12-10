import React from 'react';
import { render } from '@testing-library/react';

import FilterDialog from './FilterDialog';

jest.mock('../StarRating', () => () => 'StarRating');
jest.mock('./PriceFilter', () => () => 'PriceFilter');

test('FilterDialog', () => {
  const props = {
    open: false,
    onClose: jest.fn(),
  };
  const { asFragment } = render(<FilterDialog {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
