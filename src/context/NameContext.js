import React, { createContext, useState } from 'react';

export const NameContext = createContext();

const NameContextProvider = ({ children }) => {
  const [spaceTitle, setSpaceTitle] = useState('');
  const [spaceData, setSpaceData] = useState();

  return (
    <NameContext.Provider
      value={{
        spaceTitle, setSpaceTitle, spaceData, setSpaceData,
      }}
    >
      {children}
    </NameContext.Provider>
  );
};

export default NameContextProvider;
