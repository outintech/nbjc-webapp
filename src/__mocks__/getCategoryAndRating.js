const getCategoryAndRating = (overrides = {}) => {
  const categoryAndRating = {
    category: 'Restaurant',
    averageRating: 4.5,
  };
  return {
    ...categoryAndRating,
    ...overrides,
  };
};

export default getCategoryAndRating;
