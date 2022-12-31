/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from './Home';
import { Tests } from './Home';
const {
  ParentRowContainer,
  ButtonComponent,
  RowTextContent,
} = Tests;
/*
const ButtonComponent = ({ classes, hrefString, buttonLabel }) => (
  <Button href={hrefString} variant="outlined" className={classes.searchButton}>
    {buttonLabel}
  </Button>
);
*/

describe('ButtonComponent', () => {
  it('It should render if all the props are passed in', () => {
    render(<ButtonComponent />);
  });
});



const itRendersTitle = () => {
  it('It should render the title passed in as title props', () => {
    const title = 'Sample Title';
    console.log(RowTextComponent);
    render(<RowTextComponent title={title} />);
    expect(screen.getByText('Sample Title'));
  });
};

describe('RowTextContent', () => {
  it('It should check that the title renders with testid', () => {

  });
  it('It should render the body text given a body props', () => {

  });
  it('It should not render and return null if not provided all of the props', () => {

  });
  it('It should have a title of type of h2', () => {

  });
  it('It should have a body string with a p element', () => {

  });
});





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
