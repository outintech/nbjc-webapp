import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { logout } = useAuth0();
  return (
    <>
      <p>Home Page</p>
      {/* pass a redirect */}
      <button
        type="button"
        onClick={() => logout({
          returnTo: 'http://localhost:3000',
          client_id: 'AJfV70psKlUrEckGzlcoGj0iK50drkQt',
          federated: 'https://dev-inz0b2tv.us.auth0.com/v2/logout?federated',
        })}
      >
        logout
      </button>
    </>
  );
};

export default Home;
