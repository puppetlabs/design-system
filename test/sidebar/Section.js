import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Section from '../../source/react/library/sidebar/Section';

describe('<Section />', () => {
  const defaultProps = {
    title: 'foo',
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<Section {...defaultProps} />);

    expect(wrapper.length).to.eql(1);
  });

  it('should not be active if title prop !== selected prop', () => {
    const wrapper = shallow(<Section {...defaultProps} selected="bar" />);

    expect(wrapper.hasClass('rc-sidebar-item-selected')).to.eql(false);
  });

  it('should be active if title prop === selected prop', () => {
    const wrapper = shallow(<Section {...defaultProps} activeSection="foo" />);

    expect(wrapper.find('.rc-sidebar-item-selected').length).to.eql(1);
  });

  it('should be active if prop is provided', () => {
    const wrapper = shallow(<Section {...defaultProps} active />);

    expect(wrapper.find('.rc-sidebar-item-selected').length).to.eql(1);
  });

  it('should not have an icon by default', () => {
    const wrapper = shallow(<Section {...defaultProps} />);

    expect(wrapper.find('.rc-sidebar-item-icon Icon').length).to.eql(0);
  });

  it('should have an icon if prop provided', () => {
    const wrapper = shallow(<Section {...defaultProps} icon="home" />);

    expect(wrapper.find('.rc-sidebar-item-icon Icon').length).to.eql(1);
  });

  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Section {...defaultProps} onClick={onClick} />);

    wrapper.find('a').simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should handle null children', () => {
    const child = null;
    const wrapper = shallow(<Section>{child}</Section>);

    expect(wrapper.length).to.eql(1);
  });
});
