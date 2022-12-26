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
  it('should properly check if the next page exists', () => {

  });
  it('should return the correct value if given a non-existant page', () => {

  });
  it('if the user types in a invalid input to the GoToPage it should show a error prompt', () => {

  });
  it('if the user clicks on the input field on the GoToPage and presses enter it should navigate to the correct page', () => {

  });
  it('should render the correct page range if theres more than one page', () => {

  });
  it('should not render any page range if theres only one page', () => {

  });
  it('should display a button that opens the goToPage component and closes it', () => {

  });
  it('given certain screen sizes, pagination should be centered or not', () => {

  });
  it('given various combinations, pagination should render the correct combination of pages', () => {

  });
});
