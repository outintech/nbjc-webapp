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
    case 'reset':
      return {
        stars: 3,
        price: 2,
        distance: 5,
      };
    default:
      return state;
  }
};

const useFilters = ({ stars = 3, price = 2, distance = 5 }) => {
  // default filter values
  const initialState = {
    stars,
    price,
    distance,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    state,
    dispatch,
  };
};

export default useFilters;
