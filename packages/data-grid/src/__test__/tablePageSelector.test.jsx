import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TablePageSelector from '../tablePageSelector/TablePageSelector';

const wrapper = render(
  <TablePageSelector
    currentPage={1}
    pageCount={4}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper2 = render(
  <TablePageSelector
    currentPage={2}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper3 = render(
  <TablePageSelector
    currentPage={3}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper4 = render(
  <TablePageSelector
    currentPage={4}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper5 = render(
  <TablePageSelector
    currentPage={11}
    pageCount={20}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper6 = render(
  <TablePageSelector
    currentPage={5}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper7 = render(
  <TablePageSelector
    currentPage={6}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper8 = render(
  <TablePageSelector
    currentPage={7}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const mockFunction = jest.fn();
const wrapper9 = render(
  <TablePageSelector
    currentPage={7}
    pageCount={7}
    delta={2}
    updatePage={mockFunction}
  />,
);

describe('Snapshot test', () => {
  test('Check component matches previous HTML snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper3).toMatchSnapshot();
    expect(wrapper4).toMatchSnapshot();
    expect(wrapper5).toMatchSnapshot();
    expect(wrapper6).toMatchSnapshot();
    expect(wrapper7).toMatchSnapshot();
    expect(wrapper8).toMatchSnapshot();
  });
});

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
