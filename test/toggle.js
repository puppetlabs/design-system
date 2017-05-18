import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Toggle from '../source/react/library/Toggle';

describe('<Toggle />', () => {
  jsdom({ skipWindowCheck: true });

  const defaultProps = {
    left: 'option 1',
    right: 'option 2',
    onChange: sinon.spy(),
  };

  it('should have className "rc-toggle-active" on left option by default', () => {
    const wrapper = shallow(<Toggle { ...defaultProps } />);

    expect(wrapper.find('.rc-toggle-active').text()).to.eql('option 1');
  });

  it('should have className "rc-toggle-checked" on active option', () => {
    const wrapper = shallow(<Toggle { ...defaultProps } active="option 2" />);

    expect(wrapper.find('.rc-toggle-active').text()).to.eql('option 2');
  });

  it('should trigger provided onChange function from props when input is changed', () => {
    const wrapper = mount(<Toggle { ...defaultProps } />);

    const input = wrapper.find('.rc-switch-checkbox');

    input.simulate('change');

    expect(wrapper.prop('onChange').calledOnce).to.equal(true);
  });
});
