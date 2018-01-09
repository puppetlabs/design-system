import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import SplitButton from '../source/react/library/SplitButton';

describe('<SplitButton />', () => {
  jsdom({ skipWindowCheck: true });

  const defaultProps = {
    label: 'test',
    options: [],
    onClick: () => {},
    onOptionClick: () => {},
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<SplitButton { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });

  it('should render the label provided', () => {
    const wrapper = shallow(<SplitButton { ...defaultProps } />);

    expect(wrapper.find('Button').prop('label')).to.eql('test');
  });

  it('should render a loading indicator when processing', () => {
    const wrapper = shallow(<SplitButton { ...defaultProps } processing />);

    expect(wrapper.find('Button').prop('processing')).to.eql(true);
  });

  it('should render a split button in an error state when error is true', () => {
    const wrapper = mount(<SplitButton { ...defaultProps } error />);

    expect(wrapper.find('Button').first().prop('error')).to.eql(true);
    expect(wrapper.find('DropdownMenu').find('Button').prop('error')).to.eql(true);
  });

  it('should render a dropdown menu', () => {
    const wrapper = shallow(<SplitButton { ...defaultProps } />);

    expect(wrapper.find('DropdownMenu').length).to.eql(1);
  });

  it('should render a dropdown menu with a loading indicator when a menu option is processing', () => {
    const wrapper = mount(<SplitButton { ...defaultProps } menuStatus="processing" />);

    expect(wrapper.find('DropdownMenu').find('Icon').prop('type')).to.eql('loader');
  });

  it('should render a dropdown menu with a success indicator when a menu option is successful', () => {
    const wrapper = mount(<SplitButton { ...defaultProps } menuStatus="success" />);

    expect(wrapper.find('DropdownMenu').find('Icon').prop('type')).to.eql('checkmark');
  });
});
