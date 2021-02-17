// src/auth/auth0-provider-with-history.js

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'dev-inz0b2tv.us.auth0.com'; // process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = 'AJfV70psKlUrEckGzlcoGj0iK50drkQt'; // process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  // where Auth0 redirects back to the app
  const onRedirectCallback = (appState) => {
    // send users back to where they were before auth
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
