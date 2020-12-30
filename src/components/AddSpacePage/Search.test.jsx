import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Search from './Search';

describe('Search', () => {
  test('renders with default values', () => {
    const { asFragment } = render(
      <Search />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the form with validation and passes data on submit', () => {
    const onNext = jest.fn();
    render(
      <Search onNext={onNext} />,
    );
    const nextButton = screen.getByText('Next').closest('button');
    expect(nextButton).toBeDisabled();
    // enter form details
    const name = screen.getByTestId('addspace-name').querySelector('input');
    fireEvent.change(name, { target: { value: 'Test' } });
    const city = screen.getByTestId('addspace-city').querySelector('input');
    fireEvent.change(city, { target: { value: 'test city' } });
    const state = screen.getByTestId('addspace-state').querySelector('input');
    fireEvent.change(state, { target: { value: 'NY' } });
    expect(nextButton).not.toBeDisabled();
    const zip = screen.getByTestId('addspace-zipcode').querySelector('input');
    fireEvent.change(zip, { target: { value: '10001' } });

    fireEvent.click(nextButton);
    expect(onNext.mock.calls.length).toBe(1);
    expect(onNext.mock.calls[0][0]).toEqual({
      name: 'Test',
      city: 'test city',
      state: 'NY',
      zipcode: '10001',
    });
  });
});
