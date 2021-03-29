import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    userId: undefined,
    auth0Id: undefined,
    token: undefined,
  });
  return (
    <UserContext.Provider
      value={{
        user, setUser,
      }}
    >
      {/* eslint-disable-next-line */}
      { props.children }
    </UserContext.Provider>
  );
};

export default UserContextProvider;
