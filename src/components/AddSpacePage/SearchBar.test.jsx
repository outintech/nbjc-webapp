import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('renders the form with validation and passes data on submit', () => {
    const onNext = jest.fn();
    render(<SearchBar />);
    const submit = screen
      .getByTestId('searchbar-submit')
      .querySelector('button');
    // enter form details
    const location = screen
      .getByTestId('searchbar-input')
      .querySelector('input');
    fireEvent.change(location, { target: { value: '20009' } });

    fireEvent.click(submit);
    expect(onNext.mock.calls.length).toBe(1);
    expect(onNext.mock.calls[0][0]).toEqual({
      zipcode: '20009',
    });
  });
});
