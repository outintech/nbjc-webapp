import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import Footer from './Footer';

describe('Do the correct links exist in the Footer Component', () => {
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
  it('should check if the copyright exista and has the right year', () => {
    const CurrentYear = new Date().getFullYear();
    expect(screen.getByText(`Copyright ${CurrentYear} NBJC`)).toBeInTheDocument();
  });
  it('should check if the Donate Link element exists as a label', () => {
    const DonateLink = screen.getByText('Donate');
    expect(DonateLink).toBeInTheDocument();
  });
  it('should check for an existing Community Guidelines link', () => {
    const CommunityGuidelinesLink = screen.getByText('Community Guidelines', { selector: 'a' });
    expect(CommunityGuidelinesLink).toBeInTheDocument();
  });
});

describe('Do the internal links redirect you to the right path', () => {
  it('should check for a CommunityGuidelinessLink redirects to the correct page', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    const CommunityButton = screen.getByText('Community Guidelines', { selector: 'a' });
    expect(CommunityButton).toBeInTheDocument();

    userEvent.click(CommunityButton);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/community-guidelines');
  });

  it('should check for a Terms of Service link that redirects you to that page', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    const TermsOfServiceButton = screen.getByText('Terms of Service', { selector: 'a' });
    expect(TermsOfServiceButton).toBeInTheDocument();

    userEvent.click(TermsOfServiceButton);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/terms-of-service');
  });
  it('should check for a Infringement Policies link that redirects you to that page', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    const InfringementButton = screen.getByText('Infringement Policies', { selector: 'a' });
    expect(InfringementButton).toBeInTheDocument();

    userEvent.click(InfringementButton);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/infringement-policies');
  });
});
