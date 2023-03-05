import React from 'react';
import { screen, render } from '@testing-library/react';

import SupportButton from './SupportButton';

describe('SupportButton', () => {
  it('It should render a correct label', () => {
    render(<SupportButton />);
    const button = screen.getByText('Report a Problem');
    expect(button).toBeInTheDocument();
  });
});
