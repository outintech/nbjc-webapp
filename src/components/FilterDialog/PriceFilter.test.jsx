import React from 'react';
import { render } from '@testing-library/react';
import PriceFilter from './PriceFilter';

test('renders the BusinessCardComponent', () => {
  const active = 1;
  const priceFilters = [...Array(4)].map((_, i) => ({
    label: [...Array(i + 1)].map(() => '$').join(),
    value: i + 1,
    active: active === i + 1,
  }));
  const filterClick = jest.fn();
  const { asFragment } = render(<PriceFilter filters={priceFilters} onFilterClick={filterClick} />);
  expect(asFragment()).toMatchSnapshot();
});
