import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getSpace } from '../../api';
import SpaceDetailsPage from '../../components/SpaceDetailsPage';
import { NameContext } from '../../context/NameContext';
import useError from '../../hooks/useError';

const SpaceDetails = () => {
  const { setSpaceTitle, setSpaceData, spaceTitle } = useContext(NameContext);
  const { spaceId } = useParams();
  const [space, setSpace] = useState();
  const throwError = useError();

  useEffect(() => {
    async function fetchData() {
      const intId = parseInt(spaceId, 10);
      try {
        const { data } = await getSpace(intId);
        setSpace(data);
      } catch (e) {
        throwError(e);
      }
    }
    fetchData();
    // setPageStatus('spaceDetail');
  }, [spaceId]);

  // updating the state in name context
  useEffect(() => {
    if (space) {
      setSpaceData(space);
      setSpaceTitle(space.name);
    }
  }, [space]);
  const totalReviews = space && space.reviews ? space.reviews.length : 0;
  const {
    category_buckets: categoryBuckets = [],
    avg_rating: averageRating,
  } = space || {};
  return (
    <>
      <SpaceDetailsPage
        category={(categoryBuckets[0] || {}).name}
        averageRating={averageRating}
        space={space}
        spaceTitle={spaceTitle}
        totalReviews={totalReviews}
      />
    </>
  );
};

SpaceDetails.props = {
  space: PropTypes.shape({}),
};

export default SpaceDetails;
