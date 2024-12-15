import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TagBuilder from '../tagBuilder/TagBuilder';

configure({ adapter: new Adapter() });

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
const wrapper = mount(
  <TagBuilder
    filters={filters}
    onRemoveTag={mockfunc}
    onRemoveAll={mockfunc2}
  />,
);

const filters2 = [
  {
    field: 'all-operating-system',
    fieldLabel: 'All Operating System',
    value: 'Windows',
  },
];

const wrapper2 = mount(
  <TagBuilder
    filters={filters2}
    onRemoveTag={mockfunc}
    onRemoveAll={mockfunc2}
  />,
);

describe('Snapshot test', () => {
  test('Check component matches previous HTML snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Check component', () => {
  test('Number of tags rendered ', () => {
    expect(wrapper.find('Tag')).toHaveLength(2);
  });

  test('Remove all icon only appears when more than one tag is present ', () => {
    expect(wrapper.find('button.dg-tag-remove-all-button')).toHaveLength(1);
    expect(wrapper2.find('button.dg-tag-remove-all-button')).toHaveLength(0);
  });

  test('onRemoveTag get called when close icon is clicked ', () => {
    wrapper.find('Button.rc-tag-remove-button').first().simulate('click');
    expect(mockfunc).toHaveBeenCalled();
  });

  test('onRemoveTag get called when close icon is clicked ', () => {
    expect(mockfunc.mock.calls[0][0]).toBe('all-operating-system');
  });

  test('onRemoveAll get called when close all icon is clicked ', () => {
    wrapper.find('button.dg-tag-remove-all-button').simulate('click');
    expect(mockfunc2).toHaveBeenCalled();
  });
});
