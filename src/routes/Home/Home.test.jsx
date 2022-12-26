import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from './Home';

describe('Home component', () => {
  beforeEach(() => {
    render(
      <Home />,
    );
  });
  it('should have an image of a person in front of a pride parade', () => {
    const ParadeImage = screen.getByAltText('happy black person at pride parade');
    expect(ParadeImage).toBeInTheDocument();
  });
  it('should have a image of a person in front of a mural', () => {
    const muralImage = screen.getByAltText('black person in front of rainbow mural');
    expect(muralImage).toBeInTheDocument();
  });
  it('should have a image of three people having fun on the street', () => {
    const streetImage = screen.getByAltText('three black people having fun on a street');
    expect(streetImage).toBeInTheDocument();
  });
  it('should have a Add a Space button', () => {
    const AddASpaceButton = screen.getByRole('link', { name: /Add a Space/ });
    expect(AddASpaceButton);
  });
});
