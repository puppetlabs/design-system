import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TablePageSelector from '../tablePageSelector/TablePageSelector';

configure({ adapter: new Adapter() });

const wrapper = mount(
  <TablePageSelector
    currentPage={1}
    pageCount={4}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper2 = mount(
  <TablePageSelector
    currentPage={2}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper3 = mount(
  <TablePageSelector
    currentPage={3}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper4 = mount(
  <TablePageSelector
    currentPage={4}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper5 = mount(
  <TablePageSelector
    currentPage={11}
    pageCount={20}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper6 = mount(
  <TablePageSelector
    currentPage={5}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper7 = mount(
  <TablePageSelector
    currentPage={6}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const wrapper8 = mount(
  <TablePageSelector
    currentPage={7}
    pageCount={7}
    delta={1}
    updatePage={() => {}}
  />,
);
const mockFunction = jest.fn();
const wrapper9 = mount(
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

describe('Pagination Navigation', () => {
  test('Check correct number of buttons are rendered', () => {
    expect(wrapper.findWhere((n) => n.type() === 'button')).toHaveLength(6);
    expect(wrapper2.findWhere((n) => n.type() === 'button')).toHaveLength(7);
    expect(wrapper3.findWhere((n) => n.type() === 'button')).toHaveLength(8);
    expect(wrapper4.findWhere((n) => n.type() === 'button')).toHaveLength(9);
    expect(wrapper5.findWhere((n) => n.type() === 'button')).toHaveLength(9);
    expect(wrapper6.findWhere((n) => n.type() === 'button')).toHaveLength(8);
    expect(wrapper7.findWhere((n) => n.type() === 'button')).toHaveLength(7);
    expect(wrapper8.findWhere((n) => n.type() === 'button')).toHaveLength(6);
  });
  test('When buttons are clicked the correct value is returned to onClickHander', () => {
    wrapper9.find('button').first().simulate('click');

    wrapper9.find('button').at(3).simulate('click');

    wrapper9.find('button').last().simulate('click');

    expect(mockFunction.mock.calls[0][0]).toBe(6);
    expect(mockFunction.mock.calls[1][0]).toBe(5);
  });
});

describe('Page Navigation', () => {
  const wrapper10 = mount(<TablePageSelector updatePage={() => {}} />);

  test('Check only arrow render', () => {
    expect(wrapper10).toMatchSnapshot();
    expect(wrapper10.findWhere((n) => n.type() === 'button')).toHaveLength(2);
  });
});
