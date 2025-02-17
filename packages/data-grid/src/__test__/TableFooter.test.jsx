import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableFooter } from '../index';

test('renders TableFooter with children', () => {
  render(
    <TableFooter>
      <div>Child content</div>
    </TableFooter>,
  );

  // Check if the child content is rendered
  expect(screen.getByText('Child content')).toBeInTheDocument();
});

test('Displays rowCountText correctly', () => {
  render(<TableFooter rowCountText="5 reports" />);
  expect(screen.getByText('5 reports')).toBeInTheDocument();
});

test('Renders correct Pagination content', () => {
  const mockfunc = jest.fn();
  render(
    <TableFooter
      PageSelector
      currentPage={1}
      pageCount={2}
      updatePage={mockfunc}
    />,
  );

  // Check if pagination buttons are rendered correctly
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
});

test('updatePage fires when pagination button is clicked', () => {
  const mockfunc = jest.fn();
  render(
    <TableFooter
      PageSelector
      currentPage={1}
      pageCount={2}
      updatePage={mockfunc}
    />,
  );

  // Simulate button clicks
  fireEvent.click(screen.getByText('1'));
  fireEvent.click(screen.getByText('2'));

  // Check if updatePage is called
  expect(mockfunc).toHaveBeenCalledTimes(2);
});
