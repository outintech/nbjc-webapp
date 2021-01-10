import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { getSpace, postReview } from '../../api';
import Review from '../../components/AddSpacePage/Review';
import Success from '../../components/AddSpacePage/Success';

const AddReview = () => {
  const { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const [pageStatus, setPageStatus] = useState('review');
  // todo: call backend to verify user does not have review for space
  useEffect(() => {
    async function fetchData() {
      const intId = parseInt(spaceId, 10);
      // todo: add validation to number.
      const { data } = await getSpace(intId);
      setSpace(data);
    }
    fetchData();
    setPageStatus('review');
  }, [spaceId]);

  const saveReview = (formData) => {
    postReview({
      spaceId,
      rating: formData.rating,
      detail: formData.review,
      anonymous: formData.anon,
    })
      .then(() => {
        setPageStatus('success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {space && pageStatus === 'review' && (
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
      {space && pageStatus === 'success' && (
        <Success
          title="Your Review Was Submitted!"
          subtitle={`Thank you for rating and reviewing ${space.name} on OurGuide.`}
          primaryButton={(isDesktop) => (
            <Button
              variant="contained"
              align="center"
              fullWidth={!isDesktop}
              href={`/spaces/${space.id}`}
              color="primary"
              disableElevation
            >
              Go to space
            </Button>
          )}
        />
      )}
      {!space && <CircularProgress color="secondary" /> }
    </>
  );
};

export default AddReview;
