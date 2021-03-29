import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getSpaceReviews } from '../../api';
import useQuery from '../../hooks/useQuery';
import ReviewsPage from '../../components/ReviewsPage';
import Pagination from '../../components/Pagination';
import formatReview from '../../utils/formatReview';

const Reviews = () => {
  const { spaceId } = useParams();
  const query = useQuery();
  const [spaceReviews, setSpaceReviews] = useState();
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    async function fetchData() {
      const page = query.get('page') || 1;
      const perPage = query.get('perPage') || 10;
      const intId = parseInt(spaceId, 10);
      const {
        data,
        meta = {},
      } = await getSpaceReviews(intId, page, perPage);
      setSpaceReviews(data.map(formatReview));
      setPagination(meta);
    }
    fetchData();
    // setPageStatus('spaceDetail');
  }, [spaceId]);
  return (
    <>
      <ReviewsPage
        reviews={spaceReviews}
      />
      <Pagination
        totalCount={pagination.total_count}
        page={pagination.page}
        perPage={pagination.per_page}
      />
    </>
  );
};

export default Reviews;
