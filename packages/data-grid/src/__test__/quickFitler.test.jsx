import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuickFilter from '../quickFilter/QuickFilter';

configure({ adapter: new Adapter() });

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

const emptyFilterLabel = 'test empty filter label';

const mockfunc = jest.fn();
const wrapper = mount(
  <QuickFilter
    filters={filters}
    onFilterSelect={mockfunc}
    emptyFilterLabel={emptyFilterLabel}
  />,
);
describe('Snapshot test', () => {
  test('Check component matches previous HTML snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Check total number of quick filters', () => {
  test('Number of quick filters rendered', () => {
    expect(wrapper.find('div.dg-quick-filter-filter')).toHaveLength(3);
  });
});

describe('Check number of empty quick filters', () => {
  test('Number of empty quick filters rendered', () => {
    expect(wrapper.find('div.dg-quick-filter-empty')).toHaveLength(1);
  });

  test('Empty filter label text', () => {
    expect(
      wrapper
        .find('div.dg-quick-filter-empty')
        .find('span.rc-menu-list-item-content')
        .text(),
    ).toEqual('test empty filter label');
  });
});

describe('Check component', () => {
  test('Number of dropdowns rendered ', () => {
    expect(wrapper.find('ButtonSelect.dg-quick-filter')).toHaveLength(6);
  });

  test('onFilterSelect function gets called', () => {
    wrapper
      .find('li.rc-menu-list-item')
      .first()
      .simulate('click');
    expect(mockfunc).toHaveBeenCalled();
  });
});
