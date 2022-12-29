import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Footer from './Footer';

const renderFooter = () => (
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  )
);

const itHasCorrectLabel = (linkName) => {
  it('Renders as a link', () => {
    renderFooter();
    expect(screen.getByText(linkName)).toBeInTheDocument();
  });
};

describe('Privacy Policy Link', () => {
  const policyLabel = 'Privacy Policy';
  // itRendersAsALink(policyLabel);
  // itIsExternalLink(policyLabel);
  // itHasCorrectHref(policyLabel, 'https://nbjc.org/privacy-policy/');
  itHasCorrectLabel(policyLabel);
  // itRedirectsOnClick(policyLabel);
});
