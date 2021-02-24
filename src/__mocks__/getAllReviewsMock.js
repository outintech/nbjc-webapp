const getAllReviews = (overrides = {}) => {
  const allReviews = {
    userName: '@sage123',
    dateCreated: new Date(),
    rating: '4.5',
    text:
      "La Colombe is was one of the first places I become a regular at in my neighborhood. The baristas are always friendly, the coffee and the vibe superb. My name doesn't match my ID, but I've neber expereinced any issues being addressed correctly.",
  };
  return {
    ...allReviews,
    ...overrides,
  };
};

export default getAllReviews;
