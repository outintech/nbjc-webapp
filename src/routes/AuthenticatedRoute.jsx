import React from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import useAuthenticatedUser from '../hooks/useAuthenticatedUser';

const withUser = (WrappedComponent) => (props) => {
  const {
    loadingUser,
    redirectToCreate,
    returnTo,
  } = useAuthenticatedUser();
  return (
    <>
      {loadingUser && <CircularProgress color="secondary" />}
      {!loadingUser && redirectToCreate && (
        <Redirect
          to={{
            pathname: '/users/new',
            search: `?returnTo=${returnTo}`,
          }}
        />
      )}
      {!loadingUser && !redirectToCreate && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WrappedComponent {...props} />
      )}
    </>
  );
};

export default withUser;
