/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';

import Search, { Tests } from './Search';
import userEvent from '@testing-library/user-event';

const {
    SortByMenu,
} = Tests;

describe('Search Page', () => {
    describe('SortByMenu', () => {
        const dummyProps = {
            classes: {},
            mobile: false,
        };
        it('It should render a button', () => {
            render(<SortByMenu {...dummyProps} />);
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
        });
        it('It should render a label', () => {
            render(<SortByMenu {...dummyProps} />);
            const label = screen.getByTestId('menu-dropdown-label');
            expect(label).toBeInTheDocument();
        });
        it('It should render a label that prefixes the value', () => {
            render(<SortByMenu {...dummyProps} />);
            const label = screen.getByTestId('menu-dropdown-label');
            expect(label.textContent).toContain('Sort by:');
        });
        it('It should render the current value on the label', () => {
            render(<SortByMenu {...dummyProps} />);
            const currentValue = screen.getByText('Highly Rated');
            expect(currentValue).toBeInTheDocument();
        });
        it('It should render menu items on click', () => {
            render(<SortByMenu {...dummyProps} />);
            const button = screen.getByRole('button');
            const menuItem = screen.queryByText('Recently Added');
            expect(menuItem).not.toBeInTheDocument();

            userEvent.click(button);
            expect(screen.getByText('Recently Added')).toBeInTheDocument();
        });
    });
});
