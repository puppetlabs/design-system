import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuickFilter from '../quickFilter/QuickFilter';

const filters = [
  {
    fieldLabel: 'All Operating System',
    field: 'All-Operating-System',
    options: [
      {
        value: 'linux',
        icon: 'pencil',
        label: 'linux',
      },
      {
        value: 'Windows',
        icon: 'send',
        label: 'Windows',
      },
      {
        value: 'MacOS',
        label: 'MacOS',
        icon: 'link',
      },
    ],
  },
  {
    fieldLabel: 'Puppet installed',
    field: 'Puppet-installed',
    options: [
      {
        value: 'True',
        icon: 'pencil',
        label: 'True',
      },
      {
        value: 'False',
        icon: 'send',
        label: 'False',
      },
      {
        value: 'Unknown',
        label: 'Unknown',
        icon: 'link',
      },
    ],
  },
  {
    fieldLabel: 'Empty filter',
    field: 'Empty-array',
    options: [],
  },
];

test('renders QuickFilter with options', () => {
  render(<QuickFilter filters={filters} />);

  // Check if filter field label is rendered
  expect(screen.getByText('All Operating System')).toBeInTheDocument();

  // Check if filter options are rendered
  fireEvent.click(screen.getByText('All Operating System'));
  expect(screen.getByText('linux')).toBeInTheDocument();
  expect(screen.getByText('Windows')).toBeInTheDocument();
  expect(screen.getByText('MacOS')).toBeInTheDocument();
});

test('selects an option from QuickFilter', () => {
  const handleFilterChange = jest.fn();
  render(<QuickFilter filters={filters} onFilterSelect={handleFilterChange} />);

  // Open filter options
  fireEvent.click(screen.getByText('All Operating System'));
  expect(screen.getByText('Windows')).toBeInTheDocument();
  // Select an option
  fireEvent.click(screen.getByText('Windows'));

  // Check if onFilterChange is called with the correct value
  expect(handleFilterChange).toHaveBeenCalledTimes(1);
  expect(handleFilterChange).toHaveBeenCalledWith(
    'All-Operating-System',
    'All Operating System',
    'Windows',
  );
});
