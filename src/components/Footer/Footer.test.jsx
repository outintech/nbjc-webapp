import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
// import userEvent from '@testing-library/user-event';

import Footer from './Footer';

const renderFooter = () => (
  render(<Footer />, { wrapper: BrowserRouter })
);

const itHasCorrectLabel = (linkName) => {
  it('It has the correct label', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: linkName })).toBeInTheDocument();
  });
};

const itRendersAsALink = (linkName) => {
  it('It renders as a link', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: linkName })).toHaveAttribute('href');
  });
};

const itHasCorrectHref = (linkName, hrefString) => {
  it('It has the correct href', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: linkName })).toHaveAttribute('href', hrefString);
  });
};

const itIsExternalLink = (linkName) => {
  it('It has a target value of _blank', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: linkName })).toHaveAttribute('target', '_blank');
  });
  it('It has a rel value of noreferrer', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: linkName })).toHaveAttribute('rel', 'noreferrer');
  });
};

/*
const itNavigatesToCorrectPage = (linkName) => {
  it('It navigates to the correct page when clicked', async () => {
    renderFooter();
    const link = screen.getByRole('link', { name: linkName });

    await userEvent.click(link);

    expect(screen.getByText(linkName)).toBe('hi');
  });
};
*/

describe('Privacy Policy Link', () => {
  const policyLabel = 'Privacy Policy';
  itRendersAsALink(policyLabel);
  itIsExternalLink(policyLabel);
  itHasCorrectHref(policyLabel, 'https://nbjc.org/privacy-policy/');
  itHasCorrectLabel(policyLabel);
});

describe('National Black Justice Coalition Link', () => {
  const NBJCLabel = 'National Black Justice Coalition';
  itRendersAsALink(NBJCLabel);
  itIsExternalLink(NBJCLabel);
  itHasCorrectHref(NBJCLabel, 'https://nbjc.org/');
  itHasCorrectLabel(NBJCLabel);
});
