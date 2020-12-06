import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'stars':
      return {
        ...state,
        stars: action.payload.stars,
      };
    case 'price':
      return {
        ...state,
        price: action.payload.price,
      };
    case 'distance':
      return {
        ...state,
        distance: action.payload.distance,
      };
    default:
      return state;
  }
};

const useFilters = () => {
  // default filter values
  const initialState = {
    stars: 3,
    price: 2,
    distance: 5,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    state,
    dispatch,
  };
};

export default useFilters;
