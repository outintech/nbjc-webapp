import React from 'react';
import ReviewsPage from '../../components/ReviewsPage';
import getAllReviews from '../../__mocks__/getAllReviewsMock';

const Reviews = () => (
  <ReviewsPage
    text={getAllReviews().text}
    dateCreated={getAllReviews().dateCreated}
    userName={getAllReviews().userName}
    rating={getAllReviews().rating}
  />
);

export default Reviews;
