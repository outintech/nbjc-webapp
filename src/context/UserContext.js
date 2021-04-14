import React, { createContext, useState, useEffect } from 'react';
import getProfileChips from '../api/profileChips';

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

  const [profileChips, setProfileChips] = useState();

  // TODO: Some of the indentities are duplicated
  useEffect(() => {
    async function fetchIdentities() {
      const results = await getProfileChips();
      console.log(results);
      setProfileChips(results.data);
    }
    fetchIdentities();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user, setUser, userProfile, setUserProfile, profileChips,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
