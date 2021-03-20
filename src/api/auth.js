import { useAuth0 } from '@auth0/auth0-react';

const getToken = async () => {
  const { getAccessTokenSilently } = useAuth0();
  const token = await getAccessTokenSilently();

  return token;
};

const getUserID = async () => {
  const { user } = useAuth0();
  const userID = user.sub;
  return userID;
};

export { getToken, getUserID };
