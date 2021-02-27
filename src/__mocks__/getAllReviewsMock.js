const getAllReviews = (overrides = {}) => {
  const date = new Date();
  // TODO: change to template strings
  // eslint-disable-next-line
  const dateFormatted = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
  const allReviews = {
    userName: '@sage123',
    rating: 4.5,
    dateCreated: dateFormatted,
    totalReviews: 3,
    text:
      "La Colombe is was one of the first places I become a regular at in my neighborhood. The baristas are always friendly, the coffee and the vibe superb. My name doesn't match my ID, but I've neber expereinced any issues being addressed correctly.",
  };
  return {
    ...allReviews,
    ...overrides,
  };
};

export default getAllReviews;
