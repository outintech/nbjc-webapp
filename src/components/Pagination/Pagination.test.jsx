/* eslint-disable  */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Pagination, { Tests } from './Pagination';

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

// Work around to MUI bug with toHaveStyle https://github.com/testing-library/jest-dom/issues/350
const convertHexToRGBA = (hexCode) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

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

  });
});

/* const CheckValidPageNumber = (totalPages, input) => {
  if (typeof input !== 'string') {
    return false;
  }
  const pageNum = Number(input);
  const checkValidType = Number.isInteger(pageNum);
  const checkValidRange = pageNum >= 1 && pageNum <= totalPages;
  if (checkValidType && checkValidRange) {
    return true;
  }
  return false;
};
*/