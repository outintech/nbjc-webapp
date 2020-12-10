import React from 'react';
import { render } from '@testing-library/react';

import StarRating from './StarRating';

test('StarRating with default props', () => {
  const { asFragment } = render(<StarRating />);
  expect(asFragment()).toMatchSnapshot();
});

test('StarRating with some filled', () => {
  const { asFragment } = render(<StarRating numberFilled={2} />);
  expect(asFragment()).toMatchSnapshot();
});