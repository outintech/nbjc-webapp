import React from 'react';
import { render } from '@testing-library/react';

import ErrorSnackbar from './ErrorSnackbar';

describe('ErrorSnackbar', () => {
  it('should render with default props', () => {
    const props = {
      snackbarOpen: true,
      onClose: jest.fn(),
      body: 'Test body message',
    };
    const { asFragment } = render(<ErrorSnackbar {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render without support link', () => {
    const props = {
      snackbarOpen: true,
      onClose: jest.fn(),
      body: 'Test body message',
      showSupport: false,
    };
    const { asFragment } = render(<ErrorSnackbar {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
