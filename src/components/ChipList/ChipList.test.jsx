import React from 'react';
import { render } from '@testing-library/react';
import ChipList from './ChipList';

jest.mock('react-intersection-observer', () => ({
  useInView: () => [{}, true],
}));

describe('ChipList', () => {
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
    const { asFragment } = render(<ChipList chips={chips} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
