import React, { createContext, useState } from 'react';

export const NameContext = createContext();

const NameContextProvider = (props) => {
  const [spaceTitle, setSpaceTitle] = useState('');
  const [spaceData, setSpaceData] = useState();

  return (
    <NameContext.Provider
      value={{
        spaceTitle, setSpaceTitle, spaceData, setSpaceData,
      }}
    >
      {/* eslint-disable-next-line */}
      { props.children }
    </NameContext.Provider>
  );
};

export default NameContextProvider;
