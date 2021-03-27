import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSpaceReviews } from '../../api';
import ReviewsPage from '../../components/ReviewsPage';
import formatReview from '../../utils/formatReview';

const Reviews = () => {
  const { spaceId } = useParams();
  const [spaceReviews, setSpaceReviews] = useState();

  useEffect(() => {
    async function fetchData() {
      const intId = parseInt(spaceId, 10);
      // todo: add validation to number.
      const { data } = await getSpaceReviews(intId);
      setSpaceReviews(data.map(formatReview));
    }
    fetchData();
    // setPageStatus('spaceDetail');
  }, [spaceId]);
  return (
    <ReviewsPage
      reviews={spaceReviews}
    />
  );
};

export default Reviews;
