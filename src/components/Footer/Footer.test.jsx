import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/';

import Footer from './Footer';

const renderFooter = () => (
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  )
);

const itHasCorrectLabel = (linkName) => {
  it('It has the correct label', () => {
    renderFooter();
    expect(screen.getByText(linkName)).toBeInTheDocument();
  });
};

const itRendersAsALink = (linkName) => {
  it('It renders as a link', () => {
    renderFooter();
    expect(screen.getByText(linkName)).toHaveAttribute('href');
  });
};

const itHasCorrectHref = (linkName, hrefString) => {
  it('It has the correct href', () => {
    renderFooter();
    expect(screen.getByText(linkName)).toHaveAttribute('href', hrefString);
  });
};

const itIsExternalLink = (linkName) => {
  it('It is an external link', () => {
    renderFooter();
    expect(screen.getByText(linkName)).toHaveAttribute('target', '_blank');
  });
};

describe('Privacy Policy Link', () => {
  const policyLabel = 'Privacy Policy';
  itRendersAsALink(policyLabel);
  itIsExternalLink(policyLabel);
  itHasCorrectHref(policyLabel, 'https://nbjc.org/privacy-policy/');
  itHasCorrectLabel(policyLabel);
  // itRedirectsOnClick(policyLabel);
});
