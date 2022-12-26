import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import AppBar from './AppBar';
import { UserContext } from '../../context/UserContext';

describe('AppBar styling', () => {
  it('should check that the lavender book logo exists and is visible', () => {
    const UserProfile = {
      name: 'demo',
      userProfile: { username: 'demoUser' },
    };
    render(
      <>
        <UserContext.Provider value={UserProfile}>
          <BrowserRouter>
            <AppBar />
          </BrowserRouter>
        </UserContext.Provider>
      </>,
    );
    const logo = screen.findByAltText('logo');
    expect(logo).toBeInTheDocument();
  });
  it('should check if the users account name is too large it be truncated and displayed instead', () => {
    const UserProfile = {
      name: 'demo',
      userProfile: { username: 'demoUserWithAReallyLogName' },
    };
    render(
      <>
        <UserContext.Provider value={UserProfile}>
          <BrowserRouter>
            <AppBar />
          </BrowserRouter>
        </UserContext.Provider>
      </>,
    );
    const userMenu = screen.getByText('demoUserWi....');
    expect(userMenu).toBeInTheDocument();
  });
});

describe('AppBar with a logged in user', () => {
  const UserProfile = {
    name: 'demo',
    userProfile: { username: 'demoUser' },
  };
  it('should check if the username appears and clicking it opens a dropdown menu', () => {
    render(
      <>
        <UserContext.Provider value={UserProfile}>
          <BrowserRouter>
            <AppBar />
          </BrowserRouter>
        </UserContext.Provider>
      </>,
    );
    const userMenu = screen.getByText('demoUser');
    expect(userMenu).toBeInTheDocument();
    userEvent.click(userMenu);
    const MyProfileButton = screen.getByText('My Profile');
    const LogOutButton = screen.getByText('Sign Out');
    expect(MyProfileButton).toBeInTheDocument();
    expect(LogOutButton).toBeInTheDocument();
  });
  it('clicking on the profile button in the users dropdown should redirect them to the proper page', async () => {
    render(
      <>
        <UserContext.Provider value={UserProfile}>
          <BrowserRouter>
            <AppBar />
          </BrowserRouter>
        </UserContext.Provider>
      </>,
    );
    const userMenu = screen.getByText('demoUser');
    userEvent.click(userMenu);
    const MyProfileButton = screen.getByText('My Profile');
    userEvent.click(MyProfileButton);
    await waitFor(() => expect(window.location.href).toBe('http://localhost/profile'));
  });
});

describe('AppBar without logged in user', () => {
  it('should check if a user is not logged in that the Log In button displays', () => {
    const UserProfile = {
      name: undefined,
      userProfile: { username: undefined },
    };
    render(
      <>
        <UserContext.Provider value={UserProfile}>
          <BrowserRouter>
            <AppBar />
          </BrowserRouter>
        </UserContext.Provider>
      </>,
    );
    const logInMenu = screen.getByText('Log In');
    expect(logInMenu).toBeInTheDocument();
  });
  it('should check if the log in button exists and has the correct href', async () => {
    const UserProfile = {
      name: undefined,
      userProfile: { username: undefined },
    };
    render(
      <>
        <UserContext.Provider value={UserProfile}>
          <BrowserRouter>
            <AppBar />
          </BrowserRouter>
        </UserContext.Provider>
      </>,
    );
    const logInButton = screen.getByText('Log In', { selector: 'a' });
    expect(logInButton).toBeInTheDocument();
    expect(logInButton.closest('a')).toHaveAttribute('href', '/profile');
  });
});
