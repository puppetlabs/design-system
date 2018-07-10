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
    const wrapper = shallow(<Section { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });

  it('should not be active if title prop !== selected prop', () => {
    const wrapper = shallow(<Section { ...defaultProps } selected="bar" />);

    expect(wrapper.hasClass('rc-sidebar-section-selected')).to.eql(false);
  });

  it('should be active if title prop === selected prop', () => {
    const wrapper = shallow(<Section { ...defaultProps } selected="foo" />);

    expect(wrapper.hasClass('rc-sidebar-section-selected')).to.eql(true);
  });

  it('should be active if prop is provided', () => {
    const wrapper = shallow(<Section { ...defaultProps } active />);

    expect(wrapper.hasClass('rc-sidebar-section-selected')).to.eql(true);
  });

  it('should not have an icon by default', () => {
    const wrapper = shallow(<Section { ...defaultProps } />);

    expect(wrapper.find('.rc-sidebar-section-icon Icon').length).to.eql(0);
  });

  it('should have an icon if prop provided', () => {
    const wrapper = shallow(<Section { ...defaultProps } icon="home" />);

    expect(wrapper.find('.rc-sidebar-section-icon Icon').length).to.eql(1);
  });

  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Section { ...defaultProps } onClick={ onClick } />);

    wrapper.find('a').simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should be "closed" by default', () => {
    const wrapper = shallow(<Section { ...defaultProps } />);

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(true);
  });

  it('should be open if prop is provided', () => {
    const wrapper = mount(<Section { ...defaultProps } open />);

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(false);
  });

  it('should open if onClick is triggered and it is closed and inactive (default)', () => {
    const wrapper = mount(<Section { ...defaultProps } />);

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(true);

    wrapper.find('a').simulate('click');

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(false);
  });

  it('should close if onClick is triggered and it is open and active', () => {
    const wrapper = mount(<Section { ...defaultProps } open active />);

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(false);

    wrapper.find('a').simulate('click');

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(true);
  });

  it('should properly render provided children', () => {
    const wrapper = shallow(
      <Section>
        <span className="test-child">hello!</span>
      </Section>,
    );

    expect(wrapper.find('.test-child').length).to.eql(1);
  });
});
