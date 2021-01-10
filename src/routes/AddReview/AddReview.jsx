import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getSpace, postReview } from '../../api';
import Review from '../../components/AddSpacePage/Review';

const AddReview = () => {
  const { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const history = useHistory();
  // todo: call backend to verify user does not have review for space
  useEffect(() => {
    async function fetchData() {
      const intId = parseInt(spaceId, 10);
      // todo: add validation to number.
      const { data } = await getSpace(intId);
      setSpace(data);
    }
    fetchData();
  }, [spaceId]);

  const saveReview = (formData) => {
    postReview({
      spaceId,
      rating: formData.rating,
      detail: formData.review,
      anonymous: formData.anon,
    })
      .then(() => {
        history.push(`/spaces/${spaceId}/reviews/success`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {space && (
        <Review
          title={(isDesktop) => (
            <>
              <Typography variant={isDesktop ? 'h2' : 'h4'} align="center">
                Rate and Review
              </Typography>
              <Typography variant={isDesktop ? 'h4' : 'subtitle1'} align="center">
                {`You can rate ${space.name} anonymously.`}
              </Typography>
            </>
          )}
          showBack={false}
          submitLabel="Submit"
          onNext={saveReview}
        />
      )}
      {!space && <CircularProgress color="secondary" /> }
    </>
  );
};

export default AddReview;
