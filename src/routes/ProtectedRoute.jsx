/* eslint react/jsx-props-no-spreading: 0 */
import React, { useEffect, useState } from 'react';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProtectedRoute = (component) => (props) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  let token;
  const [authStatus, setAuthStatus] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthStatus('fetching');
        token = await getAccessTokenSilently();
        setAuthStatus('authenticated');
      } catch (err) {
        setAuthStatus('notAuthenticated');
      }
    };
    fetchData();
  }, [token]);
  let Component = component;
  if (authStatus === null || authStatus === 'fetching') {
    return <CircularProgress color="secondary" />;
  }
  if (isAuthenticated || authStatus === 'authenticated') {
    return <Component {...props} />;
  }
  Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
  });
  return <Component {...props} />;
};

export default ProtectedRoute;
