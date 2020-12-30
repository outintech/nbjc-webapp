import React from 'react';
import { render } from '@testing-library/react';

import getYelpResultMock from '../../__mocks__/getYelpResultMock';
import chips from '../../api/chips';

import Submit from './Submit';

jest.mock('react-intersection-observer', () => ({
  useInView: () => [{}, true],
}));

describe('Review', () => {
  test('renders with default values', () => {
    const addSpaceProps = {
      business: getYelpResultMock(),
      chips: [
        { ...chips[0], isSelected: true },
        { ...chips[1], isSelected: true },
        { ...chips[2], isSelected: true },
      ],
      rating: 4,
    };
    const { asFragment } = render(
      <Submit onSubmit={jest.fn()} onBack={jest.fn()} addSpaceProps={addSpaceProps} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
