/* eslint-disable  */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Pagination, { Tests } from './Pagination';
import { Check } from '@material-ui/icons';

const {
  getPageLink,
  NextButton,
  BackButton,
  CheckValidPageNumber,
  GoToPage,
  RangeOfResults,
  OpenGoToPageButton,
  PaginationButton,
  RenderPaginationButtons,
  calculatePaginationMenu,
  CalculatePageRange,
} = Tests;

test.skip('Pagination', () => {
  const { asFragment } = render(<Pagination totalCount={50} page={2} perPage={10} />);
  expect(asFragment()).toMatchSnapshot();
});

describe('Pagination Component', () => {
  describe('NextButton', () => {
    const testProps = {
      classes: {},
      pageLink: '/',
    }
    const { container } = render(<NavigateNextIcon />);
    const iconHtml = container.innerHTML;
    cleanup();
    it('It should have a correct icon label', () => {
      render(<NextButton {...testProps} />);
      const nextButton = screen.getByTestId('next-button-icon');
      expect(nextButton.innerHTML).toBe(iconHtml);
    });
    it('It should have an href value if passed in', () => {
      render(<NextButton {...testProps} />);
      const nextButton = screen.getByTestId('next-button-icon');
      expect(nextButton).toHaveAttribute('href', '/');
    });
    it('It should not have an href if pageLink was undefined', () => {
      const noLinkProps = {
        classes: {},
        pageLink: undefined,
      };
      render(<NextButton {...noLinkProps} />);
      const nextButton = screen.getByTestId('next-button-icon');
      expect(nextButton).not.toHaveAttribute('href');
    });
    it('It should have a correct aria-label value', () => {
      render(<NextButton {...testProps} />);
      expect(screen.getByLabelText('Go next page')).toBeInTheDocument();
    });
  });

  describe('CheckValidPageNumber', () => {
    it('It should return false if the input was not of type string or type number', () => {
      expect(CheckValidPageNumber(10, null)).toBe(false);
      expect(CheckValidPageNumber(20, undefined)).toBe(false);
      expect(CheckValidPageNumber(10, { input: 1 })).toBe(false);
    });
    it('It should return false if the value is a string or number but is not a integer', () => {
      expect(CheckValidPageNumber(10, 4.52)).toBe(false);
      expect(CheckValidPageNumber(20, '11.11')).toBe(false);
    });
    it('It should return false if the input is greater than totalPages', () => {
      expect(CheckValidPageNumber(1, '2')).toBe(false);
      expect(CheckValidPageNumber(1000000, 10000001)).toBe(false);
    });
    it('It should return true if the input is of type number or string, an integer and within the range 1-totalPages', () => {
      expect(CheckValidPageNumber(20, '20')).toBe(true);
      expect(CheckValidPageNumber(20, 20)).toBe(true);
      expect(CheckValidPageNumber(20, '15')).toBe(true);
      expect(CheckValidPageNumber(20, 15)).toBe(true);
      expect(CheckValidPageNumber(40, 1)).toBe(true);
      expect(CheckValidPageNumber(5000000, 102460)).toBe(true);
    });
  });

  describe('RangeOfResults', () => {
    it('It should not render if it is smaller than the media query, desktopDimensions is false', () => {
      const noRenderProps = {
        classes: {},
        totalCount: 40,
        calculateRange: 'Showing',
        desktopDimensions: false,
      };
      render(<RangeOfResults {...noRenderProps} />);
      const rangeOfResults = screen.queryByText('Showing', { exact: false });
      expect(rangeOfResults).not.toBeInTheDocument();
    });
    it('It should not render if the totalCount of results is 0', () => {
      const noRenderProps = {
        classes: {},
        totalCount: 0,
        calculateRange: 'Showing',
        desktopDimensions: true,
      };
      render(<RangeOfResults {...noRenderProps} />);
      const rangeOfResults = screen.queryByText('Showing', { exact: false });
      expect(rangeOfResults).not.toBeInTheDocument();
    });
    it('It should render the range of results', () => {
      const dummyProps = {
        classes: {},
        totalCount: 40,
        calculateRange: `Showing ${5} - ${10} of ${40} results`,
        desktopDimensions: true,
      };
      render(<RangeOfResults {...dummyProps} />);
      const rangeOfResults = screen.queryByText('Showing', { exact: false });
      expect(rangeOfResults).toBeInTheDocument();
    });
  });
});
