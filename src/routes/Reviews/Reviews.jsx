import React from 'react';
import ReviewsPage from '../../components/ReviewsPage';
import getAllReviews from '../../__mocks__/getAllReviewsMock';

const Reviews = () => (
  <ReviewsPage
    text={getAllReviews().text}
    userName={getAllReviews().userName}
    rating={getAllReviews().rating}
    dateCreated={getAllReviews().dateCreated}
  />
);

export default Reviews;
