import React from 'react';
import { render } from '@testing-library/react';

import BusinessResultCard from './BusinessResultCard';

describe('BusinessResultCard', () => {
  test('renders', () => {
    const onCheck=jest.fn();
    const business = {
      id: '123',
      name: 'La colombe coffee roasters',
      category: 'Coffee',
      address: '924 Blagden Alley Way Washington, D.C. 20001',
      distance: '0.03mi',
      phoneNumber: '123-456-7890',
    };
    const { asFragment } = render(
      <BusinessResultCard
        business={business}
        onCheck={onCheck}
        checked={false}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
