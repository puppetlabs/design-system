import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import SubsectionItem from '../../source/react/library/sidebar/SubsectionItem';

describe('<SubsectionItem />', () => {
  const defaultProps = {
    title: 'foo',
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<SubsectionItem { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });

  it('should not be active if title prop !== selected prop', () => {
    const wrapper = shallow(<SubsectionItem { ...defaultProps } selected="bar" />);

    expect(wrapper.hasClass('rc-sidebar-subsection-item-selected')).to.eql(false);
  });

  it('should be active if title prop === selected prop', () => {
    const wrapper = shallow(<SubsectionItem { ...defaultProps } selected="foo" />);

    expect(wrapper.hasClass('rc-sidebar-subsection-item-selected')).to.eql(true);
  });

  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<SubsectionItem { ...defaultProps } onClick={ onClick } />);

    wrapper.find('a').simulate('click');

    expect(onClick.called).to.equal(true);
  });
});
