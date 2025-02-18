import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TablePageSelector from '../tablePageSelector/TablePageSelector';

test('renders TablePageSelector with correct buttons', () => {
  render(
    <TablePageSelector currentPage={1} pageCount={5} updatePage={() => {}} />,
  );

  // Check if pagination buttons are rendered correctly
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
});

// });
