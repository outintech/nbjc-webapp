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
        price: state.price === action.payload.price ? 0 : action.payload.price,
      };
    case 'distance':
      return {
        ...state,
        distance: action.payload.distance,
      };
    case 'reset':
      return {
        stars: 0,
        price: 0,
        distance: 0,
      };
    default:
      return state;
  }
};

const useFilters = ({ stars = 0, price = 0, distance = 0 }) => {
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
