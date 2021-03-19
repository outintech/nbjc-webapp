// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

// import ProfilePage from './ProfilePage';

// test('expect text area name to be in document', () => {
//   render(<ProfilePage />);
//   expect(screen.getByTestId('text-field-name')).toBeInTheDocument();
// });

// test('expect text area pronouns to be in document', () => {
//   render(<ProfilePage />);
//   expect(screen.getByTestId('text-field-pronouns')).toBeInTheDocument();
// });

// test('expect text area location to be in document', () => {
//   render(<ProfilePage />);
//   expect(screen.getByTestId('text-field-location')).toBeInTheDocument();
// });

// test("expect output to be in document after submit event is fired", async () => {
//   render(<ProfilePage />);
//   fireEvent.click(screen.getLbaelText(""));
//   await expect(screen.getByTestId("result")).toBeInTheDocument();
// });

// const Button = ({ onClick, children }) => (
//   <button onClick={onClick}>{children}</button>
// );

// test('calls onClick prop when clicked', () => {
//   const handleClick = jest.fn();
//   render(<Button onClick={handleClick}>Save</Button>);
//   fireEvent.click(screen.getByText(/Save/i));
//   expect(handleClick).toHaveBeenCalledTimes(1);
// });

// test('calls onClick prop when clicked', () => {
//   const handleClick = jest.fn();
//   render(<Button onClick={handleClick}>Cancel</Button>);
//   fireEvent.click(screen.getByText(/Cancel/i));
//   expect(handleClick).toHaveBeenCalledTimes(1);
// });
