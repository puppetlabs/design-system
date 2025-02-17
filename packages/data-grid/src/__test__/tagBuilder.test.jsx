import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TagBuilder from '../tagBuilder/TagBuilder';
import '@testing-library/jest-dom';

const filters = [
  {
    field: 'all-operating-system',
    fieldLabel: 'All Operating System',
    value: 'Windows',
  },
  {
    field: 'puppet-installed',
    fieldLabel: 'Puppet Installed',
    value: 'true',
  },
];

const mockfunc = jest.fn();
const mockfunc2 = jest.fn();
const wrapper = render(
  <TagBuilder
    filters={filters}
    onRemoveTag={mockfunc}
    onRemoveAll={mockfunc2}
  />,
);

describe('Snapshot test', () => {
  test('Check component matches previous HTML snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

test('renders TagBuilder with filters', () => {
  render(
    <TagBuilder
      filters={filters}
      onRemoveTag={() => {}}
      onRemoveAll={() => {}}
    />,
  );

  // Check if filter tags are rendered

  expect(
    screen.getByText('All Operating System = Windows'),
  ).toBeInTheDocument();
  expect(screen.getByText('Puppet Installed = true')).toBeInTheDocument();
});

test('calls onRemoveTag when a tag is removed', () => {
  const mockRemoveTag = jest.fn();
  render(
    <TagBuilder
      filters={filters}
      onRemoveTag={mockRemoveTag}
      onRemoveAll={mockRemoveTag}
    />,
  );

  // Simulate tag removal
  fireEvent.click(screen.getAllByLabelText('Remove tag')[0]);

  // Check if onRemoveTag is called with correct arguments
  expect(mockRemoveTag).toHaveBeenCalledTimes(1);
  expect(mockRemoveTag).toHaveBeenCalledWith('all-operating-system');
});

test('calls onRemoveAll when the remove all button is clicked', () => {
  const mockRemoveAll = jest.fn();
  render(
    <TagBuilder
      filters={filters}
      onRemoveTag={() => {}}
      onRemoveAll={mockRemoveAll}
    />,
  );

  // Simulate remove all tags
  fireEvent.click(screen.getByText('Remove all'));

  // Check if onRemoveAll is called
  expect(mockRemoveAll).toHaveBeenCalledTimes(1);
});
