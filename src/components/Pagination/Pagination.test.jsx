import React from 'react';
import { render } from '@testing-library/react';

import Pagination from './Pagination';

test.skip('Pagination', () => {
  const { asFragment } = render(<Pagination totalCount={50} page={2} perPage={10} />);
  expect(asFragment()).toMatchSnapshot();
});

describe('Pagination testing', () => {
  it('should get the correct pageLink given a page and perpage query', () => {

  });
  it('should render a faded next button with no link if theres no next page', () => {

  });
  it('should go to the next page when clicking on the next button if it exists', () => {

  });
  it('should render a faded back button with no link if theres no previous page', () => {

  });
  it('should go to the previous page when clicking on the back button if it exists', () => {

  });
});
