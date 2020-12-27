import React from 'react';
import { render } from '@testing-library/react';

import Review from './Review';

describe('Review', () => {
  test('renders with default values', () => {
    const { asFragment } = render(
      <Review onNext={jest.fn()} onBack={jest.fn()} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
