import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Switch } from 'react-router-dom';

import AppBar from './AppBar';
import { UserContext } from '../../context/UserContext';

describe('AppBar', () => {
  it('should check that the lavender book logo exists and is visible', () => {
    const dummyValue = {
      name: 'abcd',
      userProfile: 'abcd',
    };
    render(
      <>
        <UserContext.Provider value={dummyValue}>
          <BrowserRouter>
            <Switch>
              <AppBar />
            </Switch>
          </BrowserRouter>
        </UserContext.Provider>
      </>,

    );
  });
  it('should check if a user is not logged in that the Log In button displays', () => {

  });
  it('should check that Add a Space link exists in the AppBar', () => {

  });
  it('should remove the Add a Space text when the dimensions get smaller enough', () => {

  });
  it('should check that the navBar is white', () => {

  });
  it('should check if the user is logged in it displays the users account name instead of log in', () => {

  });
  it('should check if the users account name is too large it be concanated and displayed instead', () => {

  });
  it('should check if theres a dropdown menu when the user is logged in', () => {

  });
  it('should check that there is not a dropdown menu when the user is logged in', () => {

  });
  it('if the user is logged in the dropdown menu should allow the user to click the dropdown menu and log out', () => {

  });
  it('if the user is logged in and clicks the dropdown button if the user clicks out of it the dropdown should disappaer', () => {

  });
  it('if the user is logged in, there should be an option in the dropdown allowing the user to check their profile', () => {

  });
  it('if the user clicks on the check profile, they should be redirected to the right page', () => {

  });
});
