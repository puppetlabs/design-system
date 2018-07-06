import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Section from '../../source/react/library/sidebar/Section';

describe('<Section />', () => {
  const getProps = (newProps = {}) => {
    const defaultProps = {
      title: 'foo',
    };

    return Object.assign(defaultProps, newProps);
  };

  it('should render without blowing up', () => {
    const props = getProps();
    const wrapper = shallow(<Section { ...props } />);

    expect(wrapper.length).to.eql(1);
  });

  it('should not be active if title prop !== selected prop', () => {
    const newProps = { selected: 'bar' };
    const props = getProps(newProps);
    const wrapper = shallow(<Section { ...props } />);

    expect(wrapper.hasClass('rc-sidebar-section-selected')).to.eql(false);
  });

  it('should be active if title prop === selected prop', () => {
    const newProps = { selected: 'foo' };
    const props = getProps(newProps);
    const wrapper = shallow(<Section { ...props } />);

    expect(wrapper.hasClass('rc-sidebar-section-selected')).to.eql(true);
  });

  it('should be active if prop is provided', () => {
    const newProps = { active: true };
    const props = getProps(newProps);
    const wrapper = shallow(<Section { ...props } />);

    expect(wrapper.hasClass('rc-sidebar-section-selected')).to.eql(true);
  });

  it('should not have an icon by default', () => {
    const props = getProps();
    const wrapper = shallow(<Section { ...props } />);

    expect(wrapper.find('Icon').length).to.eql(0);
  });

  it('should have an icon if prop provided', () => {
    const newProps = { icon: 'home' };
    const props = getProps(newProps);
    const wrapper = shallow(<Section { ...props } />);

    expect(wrapper.find('Icon').length).to.eql(1);
  });

  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    const props = getProps({ onClick });
    const wrapper = mount(<Section { ...props } />);

    wrapper.find('a').simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should be "closed" by default', () => {
    const props = getProps();
    const wrapper = shallow(<Section { ...props } />);

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(true);
  });

  it('should be open if prop is provided', () => {
    const newProps = { open: true };
    const props = getProps(newProps);
    const wrapper = mount(<Section { ...props } />);

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(false);
  });

  it('should open if onClick is triggered and it is closed and inactive (default)', () => {
    const props = getProps();
    const wrapper = mount(<Section { ...props } />);

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(true);

    wrapper.find('a').simulate('click');

    expect(wrapper.hasClass('rc-sidebar-section-closed')).to.eql(false);
  });

  it('should close if onClick is triggered and it is open and active', () => {
    const newProps = { open: true, active: true };
    const props = getProps(newProps);
    const wrapper = mount(<Section { ...props } />);

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
