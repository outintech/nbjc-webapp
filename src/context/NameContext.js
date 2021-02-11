import React, { createContext, useState } from 'react';
// import PropTypes from 'prop-types';

export const NameContext = createContext();

const NameContextProvider = (props) => {
  const [spaceTitle, setSpaceTitle] = useState('fruit');
  const [spaceData, setSpaceData] = useState();

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
