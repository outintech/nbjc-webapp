/**
 * Formats a backend review object into a frontend
 * @param {Object} review - from /spaces/1/reviews
 * @returns {Object} - review result object
*/
const formatReviewResult = (review) => ({
  userName: review.attributed_user,
  dateCreated: (new Date(review.created_at)).toDateString(),
  content: review.content,
  rating: review.rating,
});

export default formatReviewResult;
