import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSpace } from '../../api';

import SpaceDetailsPage from '../../components/SpaceDetailsPage';

const SpaceDetails = () => {
  const { spaceId } = useParams();
  const [space, setSpace] = useState();

  useEffect(() => {
    async function fetchData() {
      const intId = parseInt(spaceId, 10);
      // todo: add validation to number.
      const { data } = await getSpace(intId);
      setSpace(data);
    }
    fetchData();
    // setPageStatus('spaceDetail');
  }, [spaceId]);

  return (
    <>
      {/* TODO: add average Rating & category props & name */}
      <SpaceDetailsPage space={space} />
    </>
  );
};

export default SpaceDetails;
