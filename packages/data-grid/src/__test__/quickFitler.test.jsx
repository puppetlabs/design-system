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
];

const mockfunc = jest.fn();
const wrapper = mount(
  <QuickFilter filters={filters} onFilterSelect={mockfunc} />,
);

describe('Snapshot test', () => {
  test('Check component matches previous HTML snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Check component', () => {
  test('Number of dropdowns rendered ', () => {
    expect(
      wrapper.find('.dg-quick-filter-filters > .dg-quick-filter'),
    ).toHaveLength(2);
  });

  test('onFilterSelect function gets called', () => {
    wrapper.find('li.rc-menu-list-item').first().simulate('click');
    expect(mockfunc).toHaveBeenCalled();
  });
});
