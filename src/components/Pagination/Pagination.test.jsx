import React from 'react';
import { render } from '@testing-library/react';

import Pagination from './Pagination';

test.skip('Pagination', () => {
  const { asFragment } = render(<Pagination totalCount={50} page={2} perPage={10} />);
  expect(asFragment()).toMatchSnapshot();
});
