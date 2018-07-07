import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import SubsectionItem from '../../source/react/library/sidebar/SubsectionItem';

describe('<SubsectionItem />', () => {
  const getProps = (newProps = {}) => {
    const defaultProps = {
      title: 'foo',
    };

    return Object.assign(defaultProps, newProps);
  };

  it('should render without blowing up', () => {
    const props = getProps();
    const wrapper = shallow(<SubsectionItem { ...props } />);

    expect(wrapper.length).to.eql(1);
  });

  it('should not be active if title prop !== selected prop', () => {
    const newProps = { selected: 'bar' };
    const props = getProps(newProps);
    const wrapper = shallow(<SubsectionItem { ...props } />);

    expect(wrapper.hasClass('rc-sidebar-subsection-item-selected')).to.eql(false);
  });

  it('should be active if title prop === selected prop', () => {
    const newProps = { selected: 'foo' };
    const props = getProps(newProps);
    const wrapper = shallow(<SubsectionItem { ...props } />);

    expect(wrapper.hasClass('rc-sidebar-subsection-item-selected')).to.eql(true);
  });

  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    const props = getProps({ onClick });
    const wrapper = mount(<SubsectionItem { ...props } />);

    wrapper.find('a').simulate('click');

    expect(onClick.called).to.equal(true);
  });
});
