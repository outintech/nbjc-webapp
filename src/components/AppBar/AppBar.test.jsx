/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import AppBar from './AppBar';
import { UserContext } from '../../context/UserContext';

const renderAppBarWithUser = (userObj) => {
  render(
    <UserContext.Provider value={userObj}>
      <BrowserRouter>
        <AppBar />
      </BrowserRouter>
    </UserContext.Provider>,
  );
};

const noUser = {
  name: undefined,
  userProfile: { username: undefined },
};

const demoUser = {
  name: 'demo',
  userProfile: { username: 'demouser' },
};

const itShouldHaveLogo = () => {
  it('It has an element with the alt text of logo', () => {
    renderAppBarWithUser(noUser);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });
};

describe('AppBar', () => {
  itShouldHaveLogo();
});

const itRendersLogInForNoUser = () => {
  it('It renders log in for no user', () => {
    renderAppBarWithUser(noUser);
    const logInMenu = screen.getByText('Log In');
    expect(logInMenu).toBeInTheDocument();
  });
  it('It does not render log in for a user', () => {
    renderAppBarWithUser(demoUser);
    const logInMenu = screen.queryByText('Log In');
    expect(logInMenu).not.toBeInTheDocument();
  });
};

const itRendersUserAccountName = () => {
  const userOne = { name: 'Rebecca', userProfile: { username: 'Acceber' } };
  const userTwo = { name: 'Chili', userProfile: { username: 'Paprika' } };
  it('It renders the username of the logged in user', () => {
    renderAppBarWithUser(userOne);
    const userName = screen.getByText(userOne.userProfile.username);
    expect(userName).toBeInTheDocument();
  });
  it('It renders the username of another logged in user', () => {
    renderAppBarWithUser(userTwo);
    const userName = screen.getByText(userTwo.userProfile.username);
    expect(userName).toBeInTheDocument();
  });
};

const itTruncatesLongUserNames = () => {
  const demoUserWithLongUserName = { name: 'demoLong', userProfile: { username: 'demouserwithsuperlongname' } };
  const demoUserWithShortUserName = { name: 'demoShort', userProfile: { username: 'mouse' } };
  const anotherShortDemoUser = { name: 'demoShort2', userProfile: { username: 'mars' } };
  it('It displays part of the user name when truncated', () => {
    renderAppBarWithUser(demoUserWithLongUserName);
    expect(screen.getByText('demo', { exact: false })).toBeInTheDocument();
  });
  it('It does not display the full username when truncated', () => {
    renderAppBarWithUser(demoUserWithLongUserName);
    expect(screen.queryByText('demouserwithsuperlongname')).not.toBeInTheDocument();
  });
  it('It does not truncate short user names', () => {
    renderAppBarWithUser(demoUserWithShortUserName);
    expect(screen.getByText('mouse')).toBeInTheDocument();
  });
  it('It does not truncate another short user name', () => {
    renderAppBarWithUser(anotherShortDemoUser);
    expect(screen.getByText('mars')).toBeInTheDocument();
  });
};

const itRendersMenuDropdownForUsers = () => {
  it('It renders a button for a dropdown menu when the user is logged in', () => {
    renderAppBarWithUser(demoUser);
    const button = screen.getByTestId('open-user-dropdown');
    expect(button).toBeInTheDocument();
  });
  it('It does not render a button for a dropdown menu when there is no logged in user', () => {
    renderAppBarWithUser(noUser);
    const button = screen.queryByTestId('open-user-dropdown');
    expect(button).not.toBeInTheDocument();
  });
  it('It opens a menu when button is clicked on', () => {
    renderAppBarWithUser(demoUser);
    const dropdownMenu = screen.getByTestId('open-user-dropdown');

    userEvent.click(dropdownMenu);
    const menu = screen.getByTestId('user-dropdown-menu');
    expect(menu).toBeInTheDocument();
  });
  it('It does not display menu when not clicked on', () => {
    renderAppBarWithUser(demoUser);
    const menu = screen.queryByTestId('user-dropdown-menu');
    expect(menu).not.toBeInTheDocument();
  });
};

describe('Log In Menu', () => {
  itRendersLogInForNoUser();
  itRendersUserAccountName();
  itTruncatesLongUserNames();
  itRendersMenuDropdownForUsers();
});

const itChecksCurrentPage = (pathString) => {
  it(`It is not currently on the ${pathString} page`, () => {
    renderAppBarWithUser(noUser);
    expect(window.location.pathname).not.toBe(pathString);
  });
};

const itRedirectsUserToProfilePage = () => {
  const hrefString = '/profile';
  itChecksCurrentPage(hrefString);
  it('It navigates to the profile page when clicked', async () => {
    renderAppBarWithUser(demoUser);
    const dropdownMenu = screen.getByTestId('open-user-dropdown');
    userEvent.click(dropdownMenu);
    const profileLink = screen.getByText('My Profile');

    await userEvent.click(profileLink);

    expect(window.location.pathname).toBe(hrefString);
  });
};

const itRendersAProfileButton = () => {
  it('It renders a profile button with the correct label', () => {
    renderAppBarWithUser(demoUser);
    const dropdownMenu = screen.getByTestId('open-user-dropdown');
    userEvent.click(dropdownMenu);
    const profileLink = screen.getByTestId('profile-icon');
    expect(profileLink).toBeInTheDocument();
  });
};

const itRendersWithAIcon = () => {
  it('It renders an icon', () => {
    renderAppBarWithUser(demoUser);
    const dropdownMenu = screen.getByTestId('open-user-dropdown');
    userEvent.click(dropdownMenu);
    const icon = screen.queryByTestId('profile-icon');
    expect(icon).toBeInTheDocument();
  });
  it('The icon is not rendered if the component is not rendered', () => {
    renderAppBarWithUser(demoUser);
    const icon = screen.queryByTestId('profile-icon');
    expect(icon).not.toBeInTheDocument();
  });
};

const itHasACorrectLabel = () => {
  it('It has a correct label', () => {
    renderAppBarWithUser(demoUser);
    userEvent.click(screen.getByTestId('open-user-dropdown'));
    const profileLink = screen.getByTestId('profile-link');

    expect(profileLink.textContent).toBe('My Profile');
  });
};

describe('Profile Button', () => {
  itRendersAProfileButton();
  itRedirectsUserToProfilePage();
  itRendersWithAIcon();
  itHasACorrectLabel();
});

describe('Log In Button', () => {
  // Redirects to the correct page
  // Has the correct label.
});

describe('Sign out Button', () => {
  // Mock logout function and test that it gets called on click.
  // Has the correct label.
  // Has an icon.
});

describe('Add a Space Button', () => {
  // Check to see if it contains the correct icon
  // Check to see if it contains the right label
  // Check to see if the icon still appears for smaller screen sizes
  // Check to see if the label doesn't appear for smaller screen sizes.
  // Check that you get redirected to the correct location when clicking on it.
});
