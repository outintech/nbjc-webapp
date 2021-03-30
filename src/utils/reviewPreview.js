/**
 * * Formats the current hours of operation
 * and compares them to the current date to
 * determine if the space is open
 *  * @param {Object} hoursOfOperation - From /spaces
 * @returns {Boolean} determines if the space is open or closed
*/

const previousReview = (reviewIndex, numberOfReviews) => {
  let nextReviewIndex;
  if (reviewIndex === 0) {
    nextReviewIndex = numberOfReviews - 1;
  } else nextReviewIndex = reviewIndex - 1;
  return nextReviewIndex;
};

const nextReview = (reviewIndex, numberOfReviews) => {
  let nextReviewIndex;
  if (reviewIndex === numberOfReviews - 1) {
    nextReviewIndex = 0;
  } else nextReviewIndex = reviewIndex + 1;
  return nextReviewIndex;
};

export { previousReview, nextReview };
