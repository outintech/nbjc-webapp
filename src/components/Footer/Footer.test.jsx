import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import userEvent from '@testing-library/user-event';

import Footer from './Footer';

const renderFooter = () => (
  render(<Footer />, { wrapper: BrowserRouter })
);

const itHasCorrectLinkLabel = (linkName) => {
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

const itOpensLinkInAnotherTab = (linkName) => {
  it('It has a target value of _blank', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: linkName })).toHaveAttribute('target', '_blank');
  });
  it('It has a rel value of noreferrer', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: linkName })).toHaveAttribute('rel', 'noreferrer');
  });
};

const itRedirectsUserToCorrectPage = (linkName, hrefString) => {
  it('It is not currently on the correct page', () => {
    renderFooter();
    expect(window.location.pathname).not.toBe(hrefString);
  });
  it('It navigates to the correct page when clicked', async () => {
    renderFooter();
    const link = screen.getByRole('link', { name: linkName });

    await userEvent.click(link);
    expect(window.location.pathname).toBe(hrefString);
  });
};

describe('Privacy Policy Link', () => {
  const policyLabel = 'Privacy Policy';
  itRendersAsALink(policyLabel);
  itOpensLinkInAnotherTab(policyLabel);
  itHasCorrectHref(policyLabel, 'https://nbjc.org/privacy-policy/');
  itHasCorrectLinkLabel(policyLabel);
});

describe('National Black Justice Coalition Link', () => {
  const NBJCLabel = 'National Black Justice Coalition';
  itRendersAsALink(NBJCLabel);
  itOpensLinkInAnotherTab(NBJCLabel);
  itHasCorrectHref(NBJCLabel, 'https://nbjc.org/');
  itHasCorrectLinkLabel(NBJCLabel);
});

describe('Out in Tech Link', () => {
  const OITLabel = 'Out in Tech';
  itRendersAsALink(OITLabel);
  itOpensLinkInAnotherTab(OITLabel);
  itHasCorrectHref(OITLabel, 'https://outintech.com/');
  itHasCorrectLinkLabel(OITLabel);
});

describe('Community Guidelines Link', () => {
  const CGLabel = 'Community Guidelines';
  itRendersAsALink(CGLabel);
  itRedirectsUserToCorrectPage(CGLabel, '/community-guidelines');
  itHasCorrectHref(CGLabel, '/community-guidelines');
  itHasCorrectLinkLabel(CGLabel);
});

describe('Donate Link', () => {
  const DonateLabel = 'Donate';
  itRendersAsALink(DonateLabel);
  itHasCorrectHref(DonateLabel, '/donate');
  itRedirectsUserToCorrectPage(DonateLabel, '/donate');
  itHasCorrectLinkLabel(DonateLabel);
});

describe('Terms of Service Link', () => {
  const TOSLabel = 'Terms of Service';
  itRendersAsALink(TOSLabel);
  itHasCorrectHref(TOSLabel, '/terms-of-service');
  itRedirectsUserToCorrectPage(TOSLabel, '/terms-of-service');
  itHasCorrectLinkLabel(TOSLabel);
});

describe('Infringement Policies Link', () => {
  const IFLabel = 'Infringement Policies';
  itRendersAsALink(IFLabel);
  itHasCorrectHref(IFLabel, '/infringement-policies');
  itRedirectsUserToCorrectPage(IFLabel, '/infringement-policies');
  itHasCorrectLinkLabel(IFLabel);
});

const itHasCorrectYear = () => {
  it('It has the correct year', () => {
    const currentYearString = (new Date().getFullYear()).toString();
    renderFooter();
    expect(screen.getByText(currentYearString, { exact: false })).toBeInTheDocument();
  });
};

const itHasCorrectCopyrightLabel = () => {
  it('It has the correct copyright label', () => {
    const currentYear = new Date().getFullYear();
    renderFooter();
    const copyrightLabel = screen.getByText('Copyright', { exact: false }).textContent;
    expect(copyrightLabel).toBe(`Copyright ${currentYear} NBJC`);
  });
};

const itRendersAsText = (stringToMatch) => {
  it('It renders as a text element', () => {
    renderFooter();
    expect(screen.getByText(stringToMatch, { exact: false })).toBeInTheDocument();
  });
};

describe('Copyright String', () => {
  itRendersAsText('Copyright');
  itHasCorrectYear();
  itHasCorrectCopyrightLabel();
});
