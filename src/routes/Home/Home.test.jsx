import React from 'react';
import { render } from '@testing-library/react';

import Home from './Home';

describe('TopRow', () => {
  it('It should render an image', () => {
    render(<Home />);
    // TODO: Double check if the alt text in Home follows conventions.
    // const firstRowImage = screen.getByAltText('happy black person at pride parade');
    // expect(firstRowImage).toBeInTheDocument();
  });
  it('should have a valid src', () => {

  });
});

describe('MiddleRow', () => {

});

describe('BottomRow', () => {

});

describe('Add a Space Button', () => {

});

describe('Quick Category Buttons', () => {

});

describe('Quick Location Buttons', () => {

});

describe('Support Button', () => {

});