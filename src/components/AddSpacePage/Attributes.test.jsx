import React from 'react';
import { render } from '@testing-library/react';

import chips from '../../api/chips';

import Attributes from './Attributes';

describe('Attributes', () => {
  test('renders with default values', () => {
    const { asFragment } = render(
      <Attributes onNext={jest.fn()} onBack={jest.fn()} chips={chips} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
