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
  // Check to see if it renders
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
  it('It renders a button when the user is logged in', () => {
    renderAppBarWithUser(demoUser);
  });
  it('It renders a button that has a on click to open a menu when the user is logged in', () => {

  });
  it('It renders a menu when the user is logged in', () => {

  });
  it('It does not render a button when there is no logged in user', () => {

  });
  it('It does not render a menu when there is no logged in user', () => {

  });
};

describe('Log In Menu', () => {
  itRendersLogInForNoUser();
  itRendersUserAccountName();
  itTruncatesLongUserNames();
  itRendersMenuDropdownForUsers();
});

describe('Profile Button', () => {
  // Redirects to correct page.
  // Has the correct label.
  // Has an icon.
});

describe('Log out Button', () => {
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

/*
    const userMenu = screen.getByText('demoUser');
  expect(userMenu).toBeInTheDocument();
  userEvent.click(userMenu);
  const MyProfileButton = screen.getByText('My Profile');
  const LogOutButton = screen.getByText('Sign Out');
  expect(MyProfileButton).toBeInTheDocument();
  expect(LogOutButton).toBeInTheDocument();
*/

const itRedirectsToCorrectPage = () => {
  /*     const userMenu = screen.getByText('demoUser');
     userEvent.click(userMenu);
     const MyProfileButton = screen.getByText('My Profile');
     userEvent.click(MyProfileButton);
     await waitFor(() => expect(window.location.href).toBe('http://localhost/profile'));
   */
};

/*     const logInButton = screen.getByText('Log In', { selector: 'a' });
    expect(logInButton).toBeInTheDocument();
    expect(logInButton.closest('a')).toHaveAttribute('href', '/profile');
*/
