import React from 'react';
import { render } from '@testing-library/react';

import Success from './Success';

describe('Success', () => {
  test('renders', () => {
    const { asFragment } = render(
      <Success />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
