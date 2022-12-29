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

const demoUserWithLongUserName = {
  name: 'demoLong',
  userProfile: { username: 'demouserwithsuperlongname' },
};

const itShouldHaveLogo = () => {
  it('It has an element with the alt text of logo', () => {
    renderAppBarWithUser(noUser);
    expect(screen.findByAltText('logo')).toBeInTheDocument();
  });
};

const itRendersUserAccount = () => {
  it('It renders the username of the logged in user', () => {
    renderAppBarWithUser(noUser);
  });
  it('It renders log in for no user', () => {
    /*
    const logInMenu = screen.getByText('Log In');
    expect(logInMenu).toBeInTheDocument();
    */
  });
  it('It does not render log in for a logged in user', () => {

  });
};

const itTruncatesLongUserNames = () => {
  const charLimit = 10;
  it('It truncates long user names', () => {
    /*
    const userMenu = screen.getByText('demoUserWi....');
    expect(userMenu).toBeInTheDocument();
    */
  });
  it('It does not truncate short user names', () => {

  });
};

const itRendersMenuDropdown = () => {
  /*
      const userMenu = screen.getByText('demoUser');
    expect(userMenu).toBeInTheDocument();
    userEvent.click(userMenu);
    const MyProfileButton = screen.getByText('My Profile');
    const LogOutButton = screen.getByText('Sign Out');
    expect(MyProfileButton).toBeInTheDocument();
    expect(LogOutButton).toBeInTheDocument();
  */
};

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

describe('AppBar', () => {
  itShouldHaveLogo();
});
