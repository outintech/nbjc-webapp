import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SearchBar from './SearchBar';

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe('SearchBar', () => {
  test('passes zip code data on submit and navigates to search results', () => {
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
    expect(mockPush.mock.calls.length).toBe(1);
    expect(mockPush.mock.calls[0][0]).toEqual({
      pathname: '/search/results',
      search: '?location=20009',
    });
  });
  test('passes city data on submit and navigates to search results', () => {
    render(<SearchBar />);
    const submit = screen
      .getByTestId('searchbar-submit')
      .querySelector('button');
    // enter form details
    const location = screen
      .getByTestId('searchbar-input')
      .querySelector('input');
    fireEvent.change(location, { target: { value: 'washington dc' } });

    fireEvent.click(submit);
    expect(mockPush.mock.calls.length).toBe(1);
    expect(mockPush.mock.calls[0][0]).toEqual({
      pathname: '/search/results',
      search: '?location=washington dc',
    });
  });
});
