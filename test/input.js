import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Input from '../source/react/library/Input';

describe('<Input />', () => {
  jsdom({ skipWindowCheck: true });

  it('should have an accessible ref available to the input element so that we can get the value from an uncontrolled input', () => {
    const wrapper = mount(<Input />);

    expect(wrapper.instance().input.nodeName).to.equal('INPUT');
  });

  it('should have an accessible ref available to the textarea element so that we can get the value from an uncontrolled input', () => {
    const wrapper = mount(<Input multiline />);

    expect(wrapper.instance().input.nodeName).to.equal('TEXTAREA');
  });

  it('should respond to click events if onClick is provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Input onClick={ onClick } />);

    wrapper.simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should respond to change if onChange is provided', () => {
    const onChange = sinon.spy();
    const wrapper = mount(<Input onChange={ onChange } />);

    wrapper.simulate('change');

    expect(onChange.called).to.equal(true);
  });

  it('should respond to focus if onFocus is provided', () => {
    const onFocus = sinon.spy();
    const wrapper = mount(<Input onFocus={ onFocus } />);

    wrapper.simulate('focus');

    expect(onFocus.called).to.equal(true);
  });

  it('should have className corresponding to size if size is provided', () => {
    const props = { size: 'large' };
    const wrapper = shallow(<Input { ...props } />);

    expect(wrapper.hasClass('rc-input-large')).to.equal(true);
  });
});
