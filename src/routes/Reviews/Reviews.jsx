import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
import ReviewsPage from '../../components/ReviewsPage';
import { NameContext } from '../../context/NameContext';

const Reviews = () => {
  const { spaceTitle } = useContext(NameContext);

  return (
    <main>
      <ReviewsPage spaceTitle={spaceTitle} />
    </main>
  );
};

export default Reviews;
