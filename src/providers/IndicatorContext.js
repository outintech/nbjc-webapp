import React, { useState, useEffect } from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import { getAllIndicators } from '../api';

const IndicatorContext = React.createContext();

const IndicatorProvider = ({ children }) => {
  const [indicators, setIndicators] = useState([]);
  const { promiseInProgress } = usePromiseTracker();
  useEffect(() => {
    async function fetchData() {
      const data = await getAllIndicators();
      setIndicators(data);
    }

    try {
      trackPromise(
        fetchData(),
      );
    } catch (err) {
      // todo: retry?
      console.log(err);
    }
  }, []);
  return (
    <IndicatorContext.Provider
      value={{ indicators, indicatorLoading: promiseInProgress }}
    >
      {children}
    </IndicatorContext.Provider>
  );
};

export { IndicatorContext, IndicatorProvider };
