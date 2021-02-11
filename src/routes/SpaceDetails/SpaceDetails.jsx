import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getSpace } from '../../api';

import SpaceDetailsPage from '../../components/SpaceDetailsPage';
import { NameContext } from '../../context/NameContext';

const SpaceDetails = () => {
  const { setSpaceTitle, setSpaceData } = useContext(NameContext);
  const { spaceId } = useParams();
  const [space, setSpace] = useState();

  useEffect(() => {
    async function fetchData() {
      const intId = parseInt(spaceId, 10);
      // todo: add validation to number.
      const { data } = await getSpace(intId);
      setSpace(data);
      setSpaceData(data);
      setSpaceTitle(data.name);
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

SpaceDetails.props = {
  space: PropTypes.shape({}),
};

export default SpaceDetails;
