import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Input from '../../source/react/library/input/Input';

describe('<Input />', () => {
  jsdom({ skipWindowCheck: true });

  const requiredProps = {
    name: 'test-input',
  };

  it('should have an accessible ref method to the inner input element', async () => {
    const input = await new Promise(resolve => {
      mount(<Input {...requiredProps} inputRef={resolve} />);
    });

    expect(input.nodeName).to.equal('INPUT');
  });

  it('should have an accessible ref method to the inner input element', async () => {
    const input = await new Promise(resolve => {
      mount(<Input {...requiredProps} type="multiline" inputRef={resolve} />);
    });

    expect(input.nodeName).to.equal('TEXTAREA');
  });

  it('should respond to click events if onClick is provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Input {...requiredProps} onClick={onClick} />);

    wrapper.find('input').simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should respond to change if onChange is provided', () => {
    const onChange = sinon.spy();
    const wrapper = mount(<Input {...requiredProps} onChange={onChange} />);

    wrapper.find('input').simulate('change');

    expect(onChange.called).to.equal(true);
  });

  it('should respond to focus if onFocus is provided', () => {
    const onFocus = sinon.spy();
    const wrapper = mount(<Input {...requiredProps} onFocus={onFocus} />);

    wrapper.find('input').simulate('focus');

    expect(onFocus.called).to.equal(true);
  });

  // it('should have className corresponding to size if size is provided', () => {
  //   const props = { size: 'large' };
  //   const wrapper = shallow(<Input {...requiredProps} {...props} />);
  //
  //   expect(wrapper.hasClass('rc-input-large')).to.equal(true);
  // });
});
