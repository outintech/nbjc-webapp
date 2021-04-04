import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: undefined,
    auth0Id: undefined,
    token: undefined,
  });

  const [userProfile, setUserProfile] = useState({
    name: undefined,
    username: undefined,
    pronouns: undefined,
    location: undefined,
  });

  return (
    <UserContext.Provider
      value={{
        user, setUser, userProfile, setUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
