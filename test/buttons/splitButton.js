import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import SplitButton from '../../source/react/library/buttons/SplitButton';

describe('<SplitButton />', () => {
  jsdom({ skipWindowCheck: true });

  const defaultProps = {
    label: 'test',
    options: [],
    onClick: () => {},
    onOptionClick: () => {},
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<SplitButton {...defaultProps} />);

    expect(wrapper.length).to.eql(1);
  });

  it('should render the label provided', () => {
    const wrapper = shallow(<SplitButton {...defaultProps} />);

    expect(wrapper.find('Button').prop('children')).to.eql('test');
  });

  it('should render a loading indicator when processing', () => {
    const wrapper = shallow(<SplitButton {...defaultProps} processing />);

    expect(wrapper.find('Button').prop('loading')).to.eql(true);
  });

  it('should render a dropdown menu', () => {
    const wrapper = shallow(<SplitButton {...defaultProps} />);

    expect(wrapper.find('DropdownMenu').length).to.eql(1);
    expect(wrapper.find('DropdownMenu').find('Loading').length).to.eql(0);
  });
});
