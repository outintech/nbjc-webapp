import React from 'react';
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';

import AddReview from './AddReview';
import { getSpace, postReview, getReviewForSpaceAndUser } from '../../api';

jest.mock('react-router-dom', () => ({
  useParams: () => ({ spaceId: 1 }),
}));

jest.mock('react-promise-tracker', () => ({
  trackPromise: jest.fn(),
  usePromiseTracker: () => ({ promiseInProgress: false }),
}));

jest.mock('../../api', () => ({
  getSpace: jest.fn(),
  postReview: jest.fn(),
  getReviewForSpaceAndUser: jest.fn(),
}));

describe('AddReview', () => {
  beforeEach(() => {
    getSpace.mockImplementation(() => Promise.resolve({
      data: {
        name: 'abc',
      },
    }));

    getReviewForSpaceAndUser.mockImplementation(() => Promise.resolve({
      data: {
        exists: false,
      },
    }));

    postReview.mockImplementation(() => Promise.resolve({}));
  });

  it('should show the form when review is not present', async () => {
    const { asFragment, getByTestId } = render(<AddReview />);
    const form = await waitFor(() => getByTestId('review-form'));
    expect(form).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show already submitted when review is present', async () => {
    getReviewForSpaceAndUser.mockImplementation(() => Promise.resolve({
      data: {
        exists: true,
      },
    }));
    const { asFragment, getByText } = render(<AddReview />);
    const cta = await waitFor(() => getByText('Your Review exists for this space'));
    expect(cta).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show success page when a review is submitted', async () => {
    const {
      getByTestId,
      getByText,
      asFragment,
    } = render(<AddReview />);
    const form = await waitFor(() => getByTestId('review-form'));
    expect(form).toBeDefined();
    const starRating = screen.getByTestId('star-rating-unfilled-3');
    fireEvent.click(starRating);
    const review = screen.getByTestId('review-content').querySelector('textarea');
    fireEvent.change(review, { target: { value: 'This is a review' } });
    const submit = screen.getByText('Submit').closest('button');
    fireEvent.click(submit);
    expect(postReview).toHaveBeenCalled();
    const success = await waitFor(() => getByText('Your Review Was Submitted!'));
    expect(success).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
