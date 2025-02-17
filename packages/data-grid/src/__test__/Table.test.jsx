import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../table/Table';

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  {
    id: 2,
    eventType: 'Spyware/Grayware',
    affectedDevices: 21,
    detections: 634,
  },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  {
    id: 6,
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 0,
  },
  {
    id: 7,
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 0,
  },
];

const columns = [
  {
    label: 'Event Type',
    dataKey: 'eventType',
    className: 'testColumnClassName',
  },
  {
    label: 'Affected Devices',
    dataKey: 'affectedDevices',
    className: 'testColumnClassName',
  },
  {
    label: 'Detections',
    dataKey: 'detections',
    className: 'testColumnClassName',
  },
  {
    label: 'Linked field',
    dataKey: 'Link',
    className: 'testColumnClassName',
  },
];

const wrapper = render(<Table columns={columns} data={data} />);

const wrapper3 = render(<Table columns={columns} data={[]} />);

describe('Snapshot test', () => {
  test('Check component matches previous HTML snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper3).toMatchSnapshot();
  });
});

test('renders table with data', () => {
  render(<Table columns={columns} data={data} rowKey="eventType" />);

  // Check if table headers are rendered
  expect(screen.getByText('Event Type')).toBeInTheDocument();
  expect(screen.getByText('Affected Devices')).toBeInTheDocument();

  // Check if table rows are rendered
  expect(screen.getByText('Virus/Malware')).toBeInTheDocument();
  expect(screen.getByText('20')).toBeInTheDocument();
});

test('calls onRowClick when a row is clicked', () => {
  const handleRowClick = jest.fn();
  render(
    <Table
      columns={columns}
      data={data}
      rowKey="eventType"
      onRowClick={handleRowClick}
    />,
  );

  // Simulate row click
  fireEvent.click(screen.getByText('Virus/Malware'));

  // Check if onRowClick is called
  expect(handleRowClick).toHaveBeenCalledTimes(1);
  expect(handleRowClick).toHaveBeenCalledWith('eventType', 0, {
    affectedDevices: 20,
    detections: 634,
    eventType: 'Virus/Malware',
    id: 0,
  });
});

test('renders loading state', () => {
  render(<Table columns={columns} data={data} loading />);

  // Check if loading indicator is rendered
  expect(screen.getByText('Loading')).toBeInTheDocument();
});

test('renders empty state when no data is provided', () => {
  render(<Table columns={columns} data={[]} />);

  // Check if empty state is rendered
  expect(screen.getByText('No data available')).toBeInTheDocument();
});

test('applies rowClassName correctly', () => {
  render(
    <Table columns={columns} data={data} rowClassName="testRowClassName" />,
  );

  // Check if row class name is applied
  const rows = screen.getAllByRole('row');

  expect(rows[1]).toHaveClass('testRowClassName');
});
