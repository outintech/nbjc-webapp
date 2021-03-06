import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

import AppBar from './AppBar';


describe('AppBar', () => {
  const routes = [{
    label: 'Home',
    path: '/',
    key: 'home',
    icon: HomeIcon,
  }, {
    label: 'Search for a space',
    path: '/search',
    key: 'search',
    icon: SearchIcon,
  }];
  
  test('renders with default state', () => {
    const { asFragment } = render(
      <AppBar routes={routes} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    
    test('renders the drawer', () => {
      render(
        <AppBar selected="search" routes={routes} />,
        );
        const pageTitle = screen.getByTestId('appbar-title');
        expect(pageTitle.textContent).toBe('Search for a space');
        
        const menu = screen.getByTestId('appbar-menu');
        fireEvent.click(menu);
        
        const drawer = screen.getByTestId('appbar-drawer');
        expect(drawer).not.toBe(undefined);
      });
    });

    const mockHistoryPush = jest.fn();
    
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
      useLocation: jest.fn().mockReturnValue({
        path: '/search',
        search: '',
        hash: '',
        state: undefined,
        key: '',
      }),
    }));
    
    

