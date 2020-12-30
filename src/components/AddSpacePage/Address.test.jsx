import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import getYelpResultMock from '../../__mocks__/getYelpResultMock';

import Address from './Address';

describe('Address', () => {
  test('renders with default values', () => {
    const businessList = [...Array(10)].map((_, i) => getYelpResultMock({ id: `${i}` }));
    const onNext = jest.fn();
    const onBack = jest.fn();
    const { asFragment } = render(
      <Address businessList={businessList} onNext={onNext} onBack={onBack} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with the preselectedBusiness and passes selected business on submit', () => {
    const businessList = [...Array(10)].map((_, i) => getYelpResultMock({ id: `${i}` }));
    const onNext = jest.fn();
    const onBack = jest.fn();
    render(
      <Address
        businessList={businessList}
        onNext={onNext}
        onBack={onBack}
        addSpaceProps={{ business: businessList[0] }}
      />,
    );
    const business1 = screen.getByTestId('businessresultcard-0').querySelector('input');
    expect(business1.checked).toBe(true);
    const business2 = screen.getByTestId('businessresultcard-1').querySelector('input');
    fireEvent.click(business2);
    expect(business1.checked).toBe(false);
    expect(business2.checked).toBe(true);
    const nextButton = screen.getByText('Next').closest('button');
    fireEvent.click(nextButton);
    expect(onNext.mock.calls.length).toBe(1);
    expect(onNext.mock.calls[0][0]).toEqual({ business: businessList[1] });
  });
});
