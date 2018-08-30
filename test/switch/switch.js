import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Switch from '../../source/react/library/switch/Switch';

describe('<Switch />', () => {
  jsdom({ skipWindowCheck: true });

  const defaultProps = {
    name: 'id',
    checked: true,
    onChange: sinon.spy(),
  };

  it('should have className provided by className prop if provided', () => {
    const wrapper = shallow(<Switch {...defaultProps} className="foo" />);

    expect(wrapper.hasClass('foo')).to.equal(true);
  });

  it('should have className "rc-switch-checked" if className prop is not provided', () => {
    const wrapper = shallow(<Switch {...defaultProps} />);

    expect(wrapper.hasClass('rc-switch-checked')).to.equal(true);
  });

  it('should trigger provided onChange function from props when input is changed', () => {
    const wrapper = mount(<Switch {...defaultProps} />);

    const input = wrapper.find('.rc-switch-checkbox');

    input.simulate('change');

    expect(wrapper.prop('onChange').calledOnce).to.equal(true);
  });
});
