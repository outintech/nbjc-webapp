import React from 'react';
import { render } from '@testing-library/react';

import ChipFilters from './ChipFilters';

describe('ChipFilters', () => {
  test('render', () => {
    const chips = [{
      name: 'Black Friendly',
    }, {
      name: 'Inclusive',
    }, {
      name: 'Black Owned',
    }, {
      name: 'Gender Neutral Restrooms',
    }, {
      name: 'Accessible',
    }, {
      name: 'Queer hangout space',
    }, {
      name: 'Trans friendly',
    }, {
      name: 'Queer owned',
    }];
    const { asFragment } = render(<ChipFilters chips={chips} onChipSelected={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
