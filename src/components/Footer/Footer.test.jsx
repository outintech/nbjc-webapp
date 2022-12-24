import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Footer from './Footer';

describe('Footer Component', () => {
  let container;

  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
  });

  it('should render the component', () => {
    expect(container.baseElement).toMatchSnapshot();
  });
  it('should check that the NBJCLink element is an external link with the correct href attribute', () => {
    const NBJCLink = screen.getByText('National Black Justice Coalition', { selector: 'a' });
    expect(NBJCLink).toBeInTheDocument();
    expect(NBJCLink).toHaveAttribute('href', 'https://nbjc.org/');
    expect(NBJCLink).toHaveAttribute('target', '_blank');
    expect(NBJCLink).toHaveAttribute('rel', 'noreferrer');
  });
  it('should check that the OutInTechLink element is an external link with the correct href attribute', () => {
    const OITLink = screen.getByText('Out in Tech', { selector: 'a' });
    expect(OITLink).toBeInTheDocument();
    expect(OITLink).toHaveAttribute('href', 'https://outintech.com/');
    expect(OITLink).toHaveAttribute('target', '_blank');
    expect(OITLink).toHaveAttribute('rel', 'noreferrer');
  });
  it('should check that the Privacy Policy Link element is an external link with the correct href attribute', () => {
    const PolicyLink = screen.getByText('Privacy Policy', { selector: 'a' });
    expect(PolicyLink).toBeInTheDocument();
    expect(PolicyLink).toHaveAttribute('href', 'https://nbjc.org/privacy-policy/');
    expect(PolicyLink).toHaveAttribute('target', '_blank');
    expect(PolicyLink).toHaveAttribute('rel', 'noreferrer');
  });
});
