import React from 'react';
import { render, screen } from '@testing-library/react';
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

const itRedirectsUserToLogin = () => {
  it('It navigates to the profile page to log in when clicked', async () => {
    renderAppBarWithUser(noUser);
    const Login = screen.getByText('Log In');
    await userEvent.click(Login);

    expect(window.location.pathname).toBe('/profile');
  });
};

describe('Log In Menu', () => {
  itRendersLogInForNoUser();
  itRendersUserAccountName();
  itTruncatesLongUserNames();
  itRendersMenuDropdownForUsers();
  itRedirectsUserToLogin();
});

const itRedirectsUserToProfilePage = () => {
  it('It navigates to the profile page when clicked', async () => {
    renderAppBarWithUser(demoUser);
    const dropdownMenu = screen.getByTestId('open-user-dropdown');
    userEvent.click(dropdownMenu);
    const profileLink = screen.getByText('My Profile');

    await userEvent.click(profileLink);

    expect(window.location.pathname).toBe('/profile');
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

const itLogsOutUserOnClick = () => {
  it('It logs out the user on click', () => {
    // Mock user sign out.
  });
};

const itHasSignOutLabel = () => {
  it('It has a sign out label', () => {
    renderAppBarWithUser(demoUser);
    userEvent.click(screen.getByTestId('open-user-dropdown'));
    const signOutLink = screen.getByTestId('sign-out-link');

    expect(signOutLink.textContent).toBe('Sign Out');
  });
};

const itHasSignOutIcon = () => {
  it('It has a sign out icon', () => {
    renderAppBarWithUser(demoUser);
    userEvent.click(screen.getByTestId('open-user-dropdown'));
    const signOutIcon = screen.getByTestId('sign-out-icon');

    expect(signOutIcon).toBeInTheDocument();
  });
};

describe('Sign out Button', () => {
  itLogsOutUserOnClick();
  itHasSignOutLabel();
  itHasSignOutIcon();
});

const itRendersAddASpaceLink = () => {
  it('It renders an add a space link', () => {
    renderAppBarWithUser(noUser);
    const addASpace = screen.getByTestId('add-a-space-link');
    expect(addASpace).toBeInTheDocument();
  });
};

const itRedirectsUserToAddASpacePage = () => {
  /*
  it('It redirects user to add a space page when clicked', async () => {
    renderAppBarWithUser(noUser);
    const addASpace = screen.getByTestId('add-a-space-link');

    await userEvent.click(addASpace);
    expect(window.location.pathname).toBe('/spaces/new');
  });
  Might have some hoisting errors.
  */
};

const itRendersAddASpaceIcon = () => {
  it('It renders an icon', () => {
    renderAppBarWithUser(demoUser);
    const icon = screen.queryByTestId('add-a-space-icon');
    expect(icon).toBeInTheDocument();
  });
};

describe('Add a Space Button', () => {
  itRendersAddASpaceLink();
  itRedirectsUserToAddASpacePage();
  itRendersAddASpaceIcon();
});

/*
  it('It tests rendering based on conditional widths')
  Not sure this is possible with Jest. It might have to be a E2E test.
*/
