import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import AppBar from './AppBar';

describe('AppBar', () => {
  test('renders with default state', () => {
    const { asFragment } = render(
      <AppBar onNavigate={jest.fn} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the drawer', () => {
    const mockNavigate = jest.fn();
    render(
      <AppBar onNavigate={mockNavigate} selected="search" />,
    );
    const pageTitle = screen.getByTestId('appbar-title');
    expect(pageTitle.textContent).toBe('Search for a Space');

    const menu = screen.getByTestId('appbar-menu');
    fireEvent.click(menu);

    const drawer = screen.getByTestId('appbar-drawer');
    expect(drawer).not.toBe(undefined);
    fireEvent.click(screen.getByText('Add a space'));

    expect(mockNavigate.mock.calls.length).toBe(1);
    expect(mockNavigate.mock.calls[0][0].key).toBe('addSpace');
  });
});
