import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';
import { getUser } from '../api';
// import tokenFile from './token.json';

// TODO check if user is already registered by hitting
// /users params user: auth0_id: dsfjs endpoint
// if userID comes back, send users back to where they were before auth
// otherwise, send users to finish their profile and register
// 0. get user auth 0 id and token
// 1. Fetch /api/v1/userd?auth0_id=ID_HERE
// 2. If error -> go to /users/new to create a new user profile
// 3. Else skip to 5
// 4. Create a user profile -> submit handler check return to and send there or /
// 5. Go to appState.returnTo
const useAuthenticatedUser = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { promiseInProgress } = usePromiseTracker();
  const history = useHistory();
  const returnTo = history.location.pathname;
  let registeredUser;
  const [redirectToCreate, setRedirectToCreate] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getAccessTokenSilently();
        const auth0ID = user.sub;
        // const { token } = tokenFile;
        try {
          registeredUser = await getUser({
            userId: auth0ID,
            token,
          });
          console.log(registeredUser);
          setRedirectToCreate(true);
        } catch (e) {
          // based on the error, create the user
          registeredUser = 'blah';
          setRedirectToCreate(true);
          // history.push({ pathname: '/users/new', search: `returnTo=${returnTo}` });
          console.log(e);
        }
      } catch (e) {
        // todo : error handling
        console.log(e);
      }
    }
    if (!registeredUser) {
      trackPromise(
        fetchData(),
      );
    }
  }, [user]);

  return {
    loadingUser: promiseInProgress,
    redirectToCreate,
    returnTo,
  };
};

export default useAuthenticatedUser;
