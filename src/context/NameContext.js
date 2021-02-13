import React, { createContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

export const NameContext = createContext();

const NameContextProvider = (props) => {
  const [spaceTitle, setSpaceTitle] = useState('');
  const [spaceData, setSpaceData] = useState();

  useEffect(() => {
    console.log(spaceTitle);
  }, [spaceTitle]);

  return (
    <NameContext.Provider
      value={{
        spaceTitle, setSpaceTitle, spaceData, setSpaceData,
      }}
    >
      {/* eslint-disable-next-line */}
      {props.children}
    </NameContext.Provider>
  );
};

// NameContextProvider.propTypes = {

// };

export default NameContextProvider;
