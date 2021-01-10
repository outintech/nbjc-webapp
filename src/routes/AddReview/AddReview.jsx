import React from 'react';
import { useParams } from 'react-router-dom';

const AddReview = () => {
  const { spaceId } = useParams();
  // todo: call backend to verify user does not have review for space
  return (
    <>
      <h3>Review for</h3>
      <>{spaceId}</>
    </>
  );
};

export default AddReview;
